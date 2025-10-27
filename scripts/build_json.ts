// External
import geojsonArea from '@mapbox/geojson-area';
import geojsonBounds from 'geojson-bounds';
import geojsonPrecision from 'geojson-precision';
import geojsonRewind from '@mapbox/geojson-rewind';
import { Glob } from 'bun';
import JSON5 from 'json5';
import jsonschema from 'jsonschema';
import LocationConflation from '@rapideditor/location-conflation';
import localeCompare from 'locale-compare';
import path from 'bun:path';
import stringify from '@aitodotai/json-stringify-pretty-compact';
import { styleText } from 'bun:util';
import YAML from 'js-yaml';
const withLocale = localeCompare('en-US');

// Internal
import { resolveStrings } from '../lib/resolve_strings.ts';
import { sortObject } from '../lib/sort_object.ts';
import { simplify } from '../lib/simplify.ts';
import { writeFileWithMeta } from '../lib/write_file_with_meta.ts';

// JSON
const geojsonSchemaJSON = await Bun.file('schema/geojson.json').json();
const featureSchemaJSON = await Bun.file('schema/feature.json').json();
const resourceSchemaJSON = await Bun.file('schema/resource.json').json();

const Validator = jsonschema.Validator;
let v = new Validator();
v.addSchema(geojsonSchemaJSON, 'http://json.schemastore.org/geojson.json');


let _tstrings = { _defaults: {}, _communities: {} };
let _defaults = {};
let _features = [];
let _resources = {};

buildAll();

async function buildAll() {
  const START = '🏗   ' + styleText('yellow', 'Building json…');
  const END = '👍  ' + styleText('green', 'json built');
  console.log('');
  console.log(START);
  console.time(END);

  // Defaults
  _defaults = await collectDefaults();
  await writeFileWithMeta('./dist/json/defaults.json', stringify({ defaults: sortObject(_defaults) }) + '\n');

  // Features
  _features = await collectFeatures();
  const featureCollection = { type: 'FeatureCollection', features: _features };
  await writeFileWithMeta('./dist/json/featureCollection.json', stringify(featureCollection, { maxLength: 9999 }) + '\n');
  const loco = new LocationConflation(featureCollection);

  // Resources
  _resources = await collectResources(loco);
  await writeFileWithMeta('./dist/json/resources.json', stringify({ resources: sortObject(_resources) }, { maxLength: 9999 }) + '\n');

  // Generate the combined file - a FeatureCollection with everything included.
  const combined = generateCombined(loco);
  await writeFileWithMeta('./dist/json/completeFeatureCollection.json', stringify(combined) + '\n');

  // Translations
  _tstrings._defaults = sortObject(_tstrings._defaults);
  _tstrings._communities = sortObject(_tstrings._communities);
  await Bun.write('./i18n/en.yaml', YAML.dump({ en: sortObject(_tstrings) }, { lineWidth: -1 }) );

  console.timeEnd(END);
}


//
// Gather default strings from `./src/defaults.json`
//
async function collectDefaults() {
  process.stdout.write('📦  Defaults: ');

  const contents = await Bun.file('./src/defaults.json').json();
  const defaults = contents.defaults;

  Object.keys(defaults).forEach(k => _tstrings._defaults[k] = defaults[k]);

  process.stdout.write(styleText('green', '✓') + ' 1\n');
  return defaults;
}


//
// Gather feature files from `./features/**/*.geojson`
//
async function collectFeatures() {
  let features = [];
  const seen = new Map();   // Map<id, filepath>
  process.stdout.write('📦  Features: ');

  const glob = new Glob('./features/**/*');
  for (const filepath of glob.scanSync()) {
    if (!/\.geojson$/.test(filepath)) {
      console.error(styleText('red', `Error - file should have a .geojson extension:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    const contents = await Bun.file(filepath).text();
    let parsed;
    try {
      parsed = JSON5.parse(contents);
    } catch (jsonParseError) {
      console.error(styleText('red', `Error - ${jsonParseError.message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    let feature = geojsonPrecision(geojsonRewind(parsed, true), 5);
    let fc = feature.features;

    // A FeatureCollection with a single feature inside (geojson.io likes to make these).
    if (feature.type === 'FeatureCollection' && Array.isArray(fc) && fc.length === 1) {
      feature = fc[0];
    }

    // Warn if this feature is so small it would better be represented as a circular area.
    let area = geojsonArea.geometry(feature.geometry) / 1e6;   // m² to km²
    area = Number(area.toFixed(2));
    if (area < 2000) {
      const extent = geojsonBounds.extent(feature);
      const lon = ((extent[0] + extent[2]) / 2).toFixed(4);
      const lat = ((extent[1] + extent[3]) / 2).toFixed(4);
      console.warn('');
      console.warn(styleText('yellow', `Warning for ` + styleText('yellow', filepath) + `:`));
      console.warn(styleText('yellow', `GeoJSON feature for small area (${area} km²).  Consider circular include location instead: [${lon}, ${lat}]`));
    }

    // use the filename as the feature.id
    const id = path.basename(filepath).toLowerCase();
    feature.id = id;

    // sort properties
    let obj = {};
    if (feature.type)       { obj.type = feature.type; }
    if (feature.id)         { obj.id = feature.id; }
    if (feature.properties) { obj.properties = feature.properties; }

    // validate that the feature has a suitable geometry
    if (feature.geometry?.type !== 'Polygon' && feature.geometry?.type !== 'MultiPolygon') {
      console.error(styleText('red', 'Error - Feature type must be "Polygon" or "MultiPolygon" in:'));
      console.error('  ' + styleText('yellow', file));
      process.exit(1);
    }
    if (!feature.geometry?.coordinates) {
      console.error(styleText('red', 'Error - Feature missing coordinates in:'));
      console.error('  ' + styleText('yellow', file));
      process.exit(1);
    }
    obj.geometry = {
      type: feature.geometry.type,
      coordinates: feature.geometry.coordinates
    };

    feature = obj;

    validateFile(filepath, feature, featureSchemaJSON);
    await prettifyFile(filepath, feature, contents);

    if (seen.has(id)) {
      console.error(styleText('red', 'Error - Duplicate filenames: ') + styleText('yellow', id));
      console.error(styleText('yellow', '  ' + seen.get(id)));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }
    features.push(feature);
    seen.set(id, filepath);

    process.stdout.write(styleText('green', '✓'));
  }

  // sort features by id
  features.sort((a, b) => withLocale(a.id, b.id));

  process.stdout.write(' ' + features.length + '\n');
  return features;
}


//
// Gather resource files from `./resources/**/*.json`
//
async function collectResources(loco) {
  let resources = {};
  const seen = new Map();   // Map<id, filepath>
  process.stdout.write('📦  Resources: ');

  const glob = new Glob('./resources/**/*');
  for (const filepath of glob.scanSync()) {
    if (!/\.json$/.test(filepath)) {
      console.error(styleText('red', `Error - file should have a .json extension:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    const contents = await Bun.file(filepath).text();
    let item;
    try {
      item = JSON5.parse(contents);
    } catch (jsonParseError) {
      console.error(styleText('red', `Error - ${jsonParseError.message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    // Check locationSet
    item.locationSet = item.locationSet || {};
    try {
      const resolved = loco.resolveLocationSet(item.locationSet);
      if (!resolved.feature.geometry.coordinates.length || !resolved.feature.properties.area) {
        throw new Error(`locationSet ${resolved.id} resolves to an empty feature.`);
      }
    } catch (err) {
      console.error(styleText('red', `Error - ${err.message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    // Check strings
    item.strings = item.strings || {};
    convertURLs(item);   // first: perform trivial url conversions in-place
    let resolvedStrings;
    try {
      resolvedStrings = resolveStrings(item, _defaults);
      if (!resolvedStrings.name)         { throw new Error('Cannot resolve a value for name'); }
      if (!resolvedStrings.description)  { throw new Error('Cannot resolve a value for description'); }
      if (!resolvedStrings.url)          { throw new Error('Cannot resolve a value for url'); }

    } catch (err) {
      console.error(styleText('red', `Error - ${err.message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    // Clean and sort the properties for consistency, save them that way.
    let obj = {};
    if (item.id)       { obj.id = item.id; }
    if (item.type)     { obj.type = item.type; }
    if (item.account)  { obj.account = item.account; }

    obj.locationSet = {};
    if (item.locationSet.include)  { obj.locationSet.include = item.locationSet.include; }
    if (item.locationSet.exclude)  { obj.locationSet.exclude = item.locationSet.exclude; }

    if (item.languageCodes)        { obj.languageCodes = item.languageCodes.sort(withLocale); }
    if (item.order !== undefined)  { obj.order = item.order; }

    obj.strings = {};

    // If this item has a "community name" string, generate `communityID` and store it.
    // https://github.com/osmlab/osm-community-index/issues/616
    if (item.strings.community) {
      const communityID = simplify(item.strings.community);
      if (!communityID) {
        console.error(styleText('red', `Error - Generated empty communityID in:`));
        console.error(styleText('yellow', '  ' + filepath));
        process.exit(1);
      }
      _tstrings._communities[communityID] = item.strings.community;
      obj.strings.community = item.strings.community;
      obj.strings.communityID = communityID;
    }

    if (item.strings.name)                 { obj.strings.name = item.strings.name; }
    if (item.strings.description)          { obj.strings.description = item.strings.description; }
    if (item.strings.extendedDescription)  { obj.strings.extendedDescription = item.strings.extendedDescription; }
    if (item.strings.signupUrl)            { obj.strings.signupUrl = item.strings.signupUrl; }
    if (item.strings.url)                  { obj.strings.url = item.strings.url; }

    if (item.contacts)  { obj.contacts = item.contacts; }
    if (item.events)    { obj.events = item.events; }

    item = obj;

    validateFile(filepath, item, resourceSchemaJSON);
    await prettifyFile(filepath, item, contents);

    const itemID = item.id;
    if (seen.has(itemID)) {
      console.error(styleText('red', 'Error - Duplicate resource id: ') + styleText('yellow', itemID));
      console.error(styleText('yellow', '  ' + seen.get(itemID)));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    resources[itemID] = item;
    seen.set(itemID, filepath);

    // Collect translation strings for this resource
    let translateStrings = {};
    if (item.strings.name)                 { translateStrings.name = item.strings.name; }
    if (item.strings.description)          { translateStrings.description = item.strings.description; }
    if (item.strings.extendedDescription)  { translateStrings.extendedDescription = item.strings.extendedDescription; }


    // Validate event dates and collect translation strings from upcoming events (where `i18n=true`)
    if (item.events) {
      let estrings = {};

      for (let i = 0; i < item.events.length; i++) {
        const event = item.events[i];

        // check date
        const d = new Date(event.when);
        if (isNaN(d.getTime())) {
          console.error(styleText('red', 'Error - Bad date: ') + styleText('yellow', event.when));
          console.error(styleText('yellow', '  ' + filepath));
          process.exit(1);
        }

        if (!event.i18n) continue;

        if (estrings[event.id]) {
          console.error(styleText('red', 'Error - Duplicate event id: ') + styleText('yellow', event.id));
          console.error(styleText('yellow', '  ' + filepath));
          process.exit(1);
        }

        estrings[event.id] = {
          name: event.name,
          description: event.description,
          where: event.where
        };
      }

      if (Object.keys(estrings).length) {
        translateStrings.events = estrings;
      }
    }

    if (Object.keys(translateStrings).length) {
      _tstrings[itemID] = translateStrings;
    }

    process.stdout.write(styleText('green', '✓'));
  }

  process.stdout.write(' ' + seen.size + '\n');

  return resources;
}


// If we have a url that matches a known format, try to extract the `account` value from it.
function convertURLs(item) {
  const url = item.strings && item.strings.url;
  if (!url) return;

  let matchUrl;

  if (item.type === 'aparat') {
    matchUrl = url.match(/aparat.com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'bluesky') {
    matchUrl = url.match(/bsky.app\/profile\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'discord') {
    matchUrl = url.match(/discord.gg\/(\w+)\/?$/i);
  } else if (item.type === 'facebook') {
    matchUrl = url.match(/facebook.com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'forum') {
    matchUrl = url.match(/forum.openstreetmap.org\/viewforum.php\?id=(\d+)\/?$/i);
  } else if (item.type === 'github') {
    matchUrl = url.match(/github.com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'gitlab') {
    matchUrl = url.match(/gitlab.com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'instagram') {
    matchUrl = url.match(/instagram.com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'irc') {
    matchUrl = url.match(/webchat.oftc.net\/\?channels=([\-A-Za-z0-9_]+)\/?$/i);
  } else if (item.type === 'linkedin') {
    matchUrl = url.match(/linkedin.com\/company\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'mailinglist') {
    matchUrl = url.match(/lists.openstreetmap.org\/listinfo\/([\-A-Za-z0-9_]+)\/?$/i);
  } else if (item.type === 'meetup') {
    matchUrl = url.match(/meetup.com\/([\-A-Za-z0-9_]+)\/?$/i);
  } else if (item.type === 'telegram') {
    matchUrl = url.match(/t.me\/([\-A-Za-z0-9_]+)\/?$/i);
  } else if (item.type === 'threads') {
    matchUrl = url.match(/threads.net\/@([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'tiktok') {
    matchUrl = url.match(/tiktok.com\/@([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'twitter' || item.type === 'x') {
    matchUrl = url.match(/twitter.com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'youtube') {
    matchUrl = url.match(/youtube.com\/channel\/([\-A-Za-z0-9_.]+)\/?$/i);
  }

  if (matchUrl) {
    item.account = matchUrl[1];
    delete item.strings.url;
  }
}


function validateFile(file, resource, schema) {
  const validationErrors = v.validate(resource, schema).errors;
  if (validationErrors.length) {
    console.error(styleText('red', 'Error - Schema validation:'));
    console.error(styleText('yellow', '  ' + file + ': '));
    validationErrors.forEach(error => {
      if (error.property) {
        console.error(styleText('yellow', '  ' + error.property + ' ' + error.message));
      } else {
        console.error(styleText('yellow', '  ' + error));
      }
    });
    process.exit(1);
  }
}


async function prettifyFile(file, object, contents) {
  const pretty = stringify(object, { maxLength: 70 }) + '\n';
  if (pretty !== contents) {
    await Bun.write(file, pretty);
  }
}


// generateCombined
// Generate a combined GeoJSON FeatureCollection
// containing all the features w/ resources stored in properties
//
// {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       id: 'Q117',
//       geometry: { … },
//       properties: {
//         'area': 297118.3,
//         'resources': {
//           'osm-gh-facebook': { … },
//           'osm-gh-twitter': { … },
//           'talk-gh': { … }
//         }
//       }
//     }, {
//       type: 'Feature',
//       id: 'Q1019',
//       geometry: { … },
//       properties: {
//         'area': 964945.85,
//         'resources': {
//           'osm-mg-facebook': { … },
//           'osm-mg-twitter': { … },
//           'talk-mg': { … }
//         }
//       }
//     },
//     …
//   ]
// }
//
function generateCombined(loco) {
  let keepFeatures = {};

  Object.keys(_resources).forEach(resourceID => {
    const resource = _resources[resourceID];
    const feature = loco.resolveLocationSet(resource.locationSet).feature;

    let keepFeature = keepFeatures[feature.id];
    if (!keepFeature) {
      keepFeature = deepClone(feature);
      keepFeature.properties.resources = {};
      keepFeatures[feature.id] = keepFeature;
    }

    const item = deepClone(resource);
    item.resolved = resolveStrings(item, _defaults);

    keepFeature.properties.resources[resourceID] = item;
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}


function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
