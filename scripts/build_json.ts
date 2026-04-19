import geojsonArea from '@mapbox/geojson-area';
import geojsonBounds from 'geojson-bounds';
import geojsonPrecision from 'geojson-precision';
import geojsonRewind from '@mapbox/geojson-rewind';
import { Glob, YAML } from 'bun';
import JSON5 from 'json5';
import jsonschema, { type Schema } from 'jsonschema';
import LocationConflation, { type FeatureCollection as LCFeatureCollection } from '@rapideditor/location-conflation';
import path from 'node:path';
import stringify from 'json-stringify-pretty-compact';
import { styleText } from 'node:util';

import { resolveStrings } from '../lib/resolve_strings.ts';
import { sortObject } from '../lib/sort_object.ts';
import { simplify } from '../lib/simplify.ts';
import type { OciDefaults, OciResource, OciTranslationStrings } from '../lib/types.ts';

const withLocale = new Intl.Collator('en-US').compare;  // specify 'en-US' for stable sorting

// JSON
const geojsonSchemaJSON = await Bun.file('schema/geojson.json').json();
const featureSchemaJSON = await Bun.file('schema/feature.json').json();
const resourceSchemaJSON = await Bun.file('schema/resource.json').json();

const Validator = jsonschema.Validator;
const v = new Validator();
v.addSchema(geojsonSchemaJSON, 'http://json.schemastore.org/geojson.json');


const _tstrings: OciTranslationStrings = { _defaults: {}, _communities: {} };
let _defaults: OciDefaults = {};
let _features: GeoJSON.Feature[] = [];
let _resources: Record<string, OciResource> = {};

buildAll();

async function buildAll() {
  const START = '🏗   ' + styleText('yellow', 'Building json…');
  const END = '👍  ' + styleText('green', 'json built');
  console.log('');
  console.log(START);
  console.time(END);

  // Defaults
  _defaults = await collectDefaults();
  await Bun.write('./dist/json/defaults.json', stringify({ defaults: sortObject(_defaults) }) + '\n');

  // Features
  _features = await collectFeatures();
  const featureCollection: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: _features };
  await Bun.write('./dist/json/featureCollection.json', stringify(featureCollection, { maxLength: 9999 }) + '\n');
  const loco = new LocationConflation(featureCollection as unknown as LCFeatureCollection);

  // Resources
  _resources = await collectResources(loco);
  await Bun.write('./dist/json/resources.json', stringify({ resources: sortObject(_resources) }, { maxLength: 9999 }) + '\n');

  // Generate the combined file - a FeatureCollection with everything included.
  const combined = generateCombined(loco);
  await Bun.write('./dist/json/completeFeatureCollection.json', stringify(combined) + '\n');

  // Translations
  _tstrings._defaults = sortObject(_tstrings._defaults);
  _tstrings._communities = sortObject(_tstrings._communities);
  // Workaround for https://github.com/oven-sh/bun/issues/23501 - Bun's YAML.stringify adds trailing spaces
  const yaml = YAML.stringify({ en: sortObject(_tstrings) }, null, 2).replace(/ +$/gm, '');
  await Bun.write('./i18n/en.yaml', yaml);

  console.timeEnd(END);
}


//
// Gather default strings from `./src/defaults.json`
//
async function collectDefaults(): Promise<OciDefaults> {
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
async function collectFeatures(): Promise<GeoJSON.Feature[]> {
  const features: GeoJSON.Feature[] = [];
  const seen = new Map<string, string>();   // Map<id, filepath>
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
    } catch (jsonParseError: unknown) {
      const message = jsonParseError instanceof Error ? jsonParseError.message : String(jsonParseError);
      console.error(styleText('red', `Error - ${message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    let feature = geojsonPrecision(geojsonRewind(parsed, true), 5);
    const fc = feature.features;

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

    // validate that the feature has a suitable geometry
    if (feature.geometry?.type !== 'Polygon' && feature.geometry?.type !== 'MultiPolygon') {
      console.error(styleText('red', 'Error - Feature type must be "Polygon" or "MultiPolygon" in:'));
      console.error('  ' + styleText('yellow', filepath));
      process.exit(1);
    }
    if (!feature.geometry?.coordinates) {
      console.error(styleText('red', 'Error - Feature missing coordinates in:'));
      console.error('  ' + styleText('yellow', filepath));
      process.exit(1);
    }

    // Rebuild the feature with sorted/validated properties
    const cleanFeature: GeoJSON.Feature = {
      type: 'Feature',
      id: id,
      properties: feature.properties ?? {},
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry.coordinates
      }
    };

    validateFile(filepath, cleanFeature, featureSchemaJSON);
    await prettifyFile(filepath, cleanFeature, contents);

    if (seen.has(id)) {
      console.error(styleText('red', 'Error - Duplicate filenames: ') + styleText('yellow', id));
      console.error(styleText('yellow', '  ' + seen.get(id)));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }
    features.push(cleanFeature);
    seen.set(id, filepath);

    process.stdout.write(styleText('green', '✓'));
  }

  // sort features by id
  features.sort((a, b) => withLocale(String(a.id), String(b.id)));

  process.stdout.write(' ' + features.length + '\n');
  return features;
}


//
// Gather resource files from `./resources/**/*.json`
//
async function collectResources(loco: LocationConflation): Promise<Record<string, OciResource>> {
  const resources: Record<string, OciResource> = {};
  const seen = new Map<string, string>();   // Map<id, filepath>
  process.stdout.write('📦  Resources: ');

  const glob = new Glob('./resources/**/*');
  for (const filepath of glob.scanSync()) {
    if (!/\.json$/.test(filepath)) {
      console.error(styleText('red', `Error - file should have a .json extension:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    const contents = await Bun.file(filepath).text();
    let item: OciResource;
    try {
      item = JSON5.parse(contents);
    } catch (jsonParseError: unknown) {
      const message = jsonParseError instanceof Error ? jsonParseError.message : String(jsonParseError);
      console.error(styleText('red', `Error - ${message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    // Check locationSet
    item.locationSet = item.locationSet || {};
    try {
      const resolved = loco.resolveLocationSet(item.locationSet);
      if (!resolved || !resolved.feature.geometry?.coordinates.length || !resolved.feature.properties?.area) {
        throw new Error(`locationSet ${resolved?.id} resolves to an empty feature.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(styleText('red', `Error - ${message} in:`));
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

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(styleText('red', `Error - ${message} in:`));
      console.error(styleText('yellow', '  ' + filepath));
      process.exit(1);
    }

    // Clean and sort the properties for consistency, save them that way.
    const obj: Record<string, unknown> = {};
    if (item.id)       { obj.id = item.id; }
    if (item.type)     { obj.type = item.type; }
    if (item.account)  { obj.account = item.account; }

    const objLocationSet: Record<string, unknown> = {};
    if (item.locationSet.include)  { objLocationSet.include = item.locationSet.include; }
    if (item.locationSet.exclude)  { objLocationSet.exclude = item.locationSet.exclude; }
    obj.locationSet = objLocationSet;

    if (item.languageCodes)        { obj.languageCodes = item.languageCodes.sort(withLocale); }
    if (item.order !== undefined)  { obj.order = item.order; }

    obj.strings = {};

    // If this item has a "community name" string, generate `communityID` and store it.
    // https://github.com/osmlab/osm-community-index/issues/616
    const objStrings = obj.strings as Record<string, string>;
    if (item.strings.community) {
      const communityID = simplify(item.strings.community);
      if (!communityID) {
        console.error(styleText('red', `Error - Generated empty communityID in:`));
        console.error(styleText('yellow', '  ' + filepath));
        process.exit(1);
      }
      _tstrings._communities[communityID] = item.strings.community;
      objStrings.community = item.strings.community;
      objStrings.communityID = communityID;
    }

    if (item.strings.name)                 { objStrings.name = item.strings.name; }
    if (item.strings.description)          { objStrings.description = item.strings.description; }
    if (item.strings.extendedDescription)  { objStrings.extendedDescription = item.strings.extendedDescription; }
    if (item.strings.signupUrl)            { objStrings.signupUrl = item.strings.signupUrl; }
    if (item.strings.url)                  { objStrings.url = item.strings.url; }

    if (item.contacts)  { obj.contacts = item.contacts; }
    if (item.events)    { obj.events = item.events; }

    item = obj as unknown as OciResource;

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
    const translateStrings: Record<string, unknown> = {};
    if (item.strings.name)                 { translateStrings.name = item.strings.name; }
    if (item.strings.description)          { translateStrings.description = item.strings.description; }
    if (item.strings.extendedDescription)  { translateStrings.extendedDescription = item.strings.extendedDescription; }


    // Validate event dates and collect translation strings from upcoming events (where `i18n=true`)
    if (Array.isArray(item.events)) {
      const estrings: Record<string, unknown> = {};

      for (const event of item.events) {
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
function convertURLs(item: OciResource): void {
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
    matchUrl = url.match(/(?:twitter|x).com\/([\-A-Za-z0-9_.]+)\/?$/i);
  } else if (item.type === 'youtube') {
    matchUrl = url.match(/youtube.com\/channel\/([\-A-Za-z0-9_.]+)\/?$/i);
  }

  if (matchUrl) {
    item.account = matchUrl[1];
    delete item.strings.url;
  }
}


function validateFile(file: string, resource: unknown, schema: Schema): void {
  const validationErrors = v.validate(resource, schema).errors;
  if (validationErrors.length) {
    console.error(styleText('red', 'Error - Schema validation:'));
    console.error(styleText('yellow', '  ' + file + ': '));
    validationErrors.forEach(error => {
      if (error.property) {
        console.error(styleText('yellow', '  ' + error.property + ' ' + error.message));
      } else {
        console.error(styleText('yellow', '  ' + String(error)));
      }
    });
    process.exit(1);
  }
}


async function prettifyFile(file: string, object: unknown, contents: string): Promise<void> {
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
function generateCombined(loco: LocationConflation): GeoJSON.FeatureCollection {
  const keepFeatures: Record<string, GeoJSON.Feature> = {};

  Object.keys(_resources).forEach(resourceID => {
    const resource = _resources[resourceID];
    const feature = loco.resolveLocationSet(resource.locationSet)!.feature;
    const featureID = String(feature.id);

    let keepFeature = keepFeatures[featureID];
    if (!keepFeature) {
      keepFeature = structuredClone(feature);
      (keepFeature.properties as GeoJSON.GeoJsonProperties & { resources: Record<string, unknown> }).resources = {};
      keepFeatures[featureID] = keepFeature;
    }

    const item = structuredClone(resource);
    item.resolved = resolveStrings(item, _defaults) as unknown as Record<string, string | undefined>;

    (keepFeature.properties as GeoJSON.GeoJsonProperties & { resources: Record<string, unknown> }).resources[resourceID] = item;
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
