// External
import colors from 'colors/safe.js';
import fs from 'node:fs';
import glob from 'glob';
import JSON5 from 'json5';
import jsonschema from 'jsonschema';
import LocationConflation from '@ideditor/location-conflation';
import localeCompare from 'locale-compare';
import path from 'node:path';
import geojsonArea from '@mapbox/geojson-area';
import geojsonBounds from 'geojson-bounds';
import geojsonPrecision from 'geojson-precision';
import geojsonRewind from '@mapbox/geojson-rewind';
import stringify from '@aitodotai/json-stringify-pretty-compact';
import YAML from 'js-yaml';

const withLocale = localeCompare('en-US');

// Internal
import { resolveStrings } from '../lib/resolve_strings.js';
import { sortObject } from '../lib/sort_object.js';
import { simplify } from '../lib/simplify.js';
import { writeFileWithMeta } from '../lib/write_file_with_meta.js';

// JSON
import geojsonSchemaJSON from '../schema/geojson.json';
import featureSchemaJSON from '../schema/feature.json';
import resourceSchemaJSON from '../schema/resource.json';

const Validator = jsonschema.Validator;
let v = new Validator();
v.addSchema(geojsonSchemaJSON, 'http://json.schemastore.org/geojson.json');


let _tstrings = { _defaults: {}, _communities: {} };
let _defaults = {};
let _features = {};
let _resources = {};
buildAll();


function buildAll() {
  const START = '🏗   ' + colors.yellow('Building data...');
  const END = '👍  ' + colors.green('data built');

  console.log('');
  console.log(START);
  console.time(END);

  // Defaults
  _defaults = collectDefaults();

  // Features
  _features = collectFeatures();
  const featureCollection = { type: 'FeatureCollection', features: _features };
  writeFileWithMeta('dist/featureCollection.json', stringify(featureCollection, { maxLength: 9999 }) + '\n');

  // Resources
  _resources = collectResources(featureCollection);
  writeFileWithMeta('dist/resources.json', stringify({ resources: sortObject(_resources) }, { maxLength: 9999 }) + '\n');

  // Translations
  _tstrings._defaults = sortObject(_tstrings._defaults);
  _tstrings._communities = sortObject(_tstrings._communities);
  fs.writeFileSync('i18n/en.yaml', YAML.dump({ en: sortObject(_tstrings) }, { lineWidth: -1 }) );

  console.timeEnd(END);
}


//
// Gather default strings from `defaults.json`
//
function collectDefaults() {
  process.stdout.write('📦  Defaults: ');

  let contents = fs.readFileSync('./defaults.json', 'utf8');
  let defaults;
  try {
    defaults = JSON5.parse(contents).defaults;
  } catch (jsonParseError) {
    console.error(colors.red(`Error - ${jsonParseError.message} in:`));
    console.error('  ' + colors.yellow('./defaults.json'));
    process.exit(1);
  }

  Object.keys(defaults).forEach(k => _tstrings._defaults[k] = defaults[k]);

  process.stdout.write(colors.green('✓') + ' 1\n');
  return defaults;
}


//
// Gather feature files from `/features/**/*.geojson`
//
function collectFeatures() {
  let features = [];
  let files = {};
  process.stdout.write('📦  Features: ');

  glob.sync('./features/**/*', { nodir: true }).forEach(file => {
    if (!/\.geojson$/.test(file)) {
      console.error(colors.red(`Error - file should have a .geojson extension:`));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }

    const contents = fs.readFileSync(file, 'utf8');
    let parsed;
    try {
      parsed = JSON5.parse(contents);
    } catch (jsonParseError) {
      console.error(colors.red(`Error - ${jsonParseError.message} in:`));
      console.error('  ' + colors.yellow(file));
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
      console.warn(colors.yellow(`Warning - GeoJSON feature for small area (${area} km²).  Consider circular include location instead: [${lon}, ${lat}]`));
      console.warn('  ' + colors.yellow(file));
    }

    // use the filename as the feature.id
    const id = path.basename(file).toLowerCase();
    feature.id = id;

    // sort properties
    let obj = {};
    if (feature.type)       { obj.type = feature.type; }
    if (feature.id)         { obj.id = feature.id; }
    if (feature.properties) { obj.properties = feature.properties; }
    if (feature.geometry)   { obj.geometry = feature.geometry; }
    feature = obj;

    validateFile(file, feature, featureSchemaJSON);
    prettifyFile(file, feature, contents);

    if (files[id]) {
      console.error(colors.red('Error - Duplicate filenames: ') + colors.yellow(id));
      console.error('  ' + colors.yellow(files[id]));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }
    features.push(feature);
    files[id] = file;

    process.stdout.write(colors.green('✓'));
  });

  process.stdout.write(' ' + Object.keys(files).length + '\n');

  return features;
}


//
// Gather resource files from `/resources/**/*.json`
//
function collectResources(featureCollection) {
  let resources = {};
  let files = {};
  const loco = new LocationConflation(featureCollection);
  process.stdout.write('📦  Resources: ');

  glob.sync('./resources/**/*.json', { nodir: true }).forEach(file => {
    if (!/\.json$/.test(file)) {
      console.error(colors.red(`Error - file should have a .json extension:`));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }

    let contents = fs.readFileSync(file, 'utf8');
    let item;
    try {
      item = JSON5.parse(contents);
    } catch (jsonParseError) {
      console.error(colors.red(`Error - ${jsonParseError.message} in:`));
      console.error('  ' + colors.yellow(file));
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
      console.error(colors.red(`Error - ${err.message} in:`));
      console.error('  ' + colors.yellow(file));
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
      console.error(colors.red(`Error - ${err.message} in:`));
      console.error('  ' + colors.yellow(file));
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

    if (item.languageCodes)  { obj.languageCodes = item.languageCodes.sort(withLocale); }
    if (item.order)          { obj.order = item.order; }

    obj.strings = {};
    if (item.strings.community)            { obj.strings.community = item.strings.community; }
    if (item.strings.name)                 { obj.strings.name = item.strings.name; }
    if (item.strings.description)          { obj.strings.description = item.strings.description; }
    if (item.strings.extendedDescription)  { obj.strings.extendedDescription = item.strings.extendedDescription; }
    if (item.strings.signupUrl)            { obj.strings.signupUrl = item.strings.signupUrl; }
    if (item.strings.url)                  { obj.strings.url = item.strings.url; }

    // obj.resolved = resolvedStrings;

    if (item.contacts)  { obj.contacts = item.contacts; }
    if (item.events)    { obj.events = item.events; }

    item = obj;

    validateFile(file, item, resourceSchemaJSON);
    prettifyFile(file, item, contents);

    const itemID = item.id;
    if (files[itemID]) {
      console.error(colors.red('Error - Duplicate resource id: ') + colors.yellow(itemID));
      console.error('  ' + colors.yellow(files[itemID]));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }

    resources[itemID] = item;
    files[itemID] = file;

    // Collect translation strings for this resource
    let translateStrings = {};

    if (item.strings.community) {
      const communityID = simplify(item.strings.community);
      _tstrings._communities[communityID] = item.strings.community;
    }
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
          console.error(colors.red('Error - Bad date: ') + colors.yellow(event.when));
          console.error('  ' + colors.yellow(file));
          process.exit(1);
        }

        if (!event.i18n) continue;

        if (estrings[event.id]) {
          console.error(colors.red('Error - Duplicate event id: ') + colors.yellow(event.id));
          console.error('  ' + colors.yellow(file));
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

    process.stdout.write(colors.green('✓'));
  });

  process.stdout.write(' ' + Object.keys(files).length + '\n');

  return resources;
}


function convertURLs(item) {
  const url = item.strings && item.strings.url;
  if (!url) return;

  let matchUrl;

  if (item.type === 'aparat') {
    matchUrl = url.match(/aparat.com\/([\-A-Za-z0-9_.]+)\/?$/i);
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
  } else if (item.type === 'twitter') {
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
    console.error(colors.red('Error - Schema validation:'));
    console.error('  ' + colors.yellow(file + ': '));
    validationErrors.forEach(error => {
      if (error.property) {
        console.error('  ' + colors.yellow(error.property + ' ' + error.message));
      } else {
        console.error('  ' + colors.yellow(error));
      }
    });
    process.exit(1);
  }
}


function prettifyFile(file, object, contents) {
  const pretty = stringify(object, { maxLength: 70 }) + '\n';
  if (pretty !== contents) {
    fs.writeFileSync(file, pretty);
  }
}
