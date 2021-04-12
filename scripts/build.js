const calcArea = require('@mapbox/geojson-area');
const colors = require('colors/safe');
const diacritics = require('diacritics');
const fs = require('fs');
const glob = require('glob');
const JSON5 = require('json5');
const LocationConflation = require('@ideditor/location-conflation');
const path = require('path');
const precision = require('geojson-precision');
const rewind = require('geojson-rewind');
const shell = require('shelljs');
const stringify = require('@aitodotai/json-stringify-pretty-compact');
const Validator = require('jsonschema').Validator;
const withLocale = require('locale-compare')('en-US');
const YAML = require('js-yaml');

const geojsonSchema = require('../schema/geojson.json');
const featureSchema = require('../schema/feature.json');
const resourceSchema = require('../schema/resource.json');

let v = new Validator();
v.addSchema(geojsonSchema, 'http://json.schemastore.org/geojson.json');

let _tstrings = {};
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

  // Start clean
  shell.rm('-f', [
    'dist/featureCollection.json',
    'dist/resources.json',
    'i18n/en.yaml'
  ]);

  // Defaults
  _defaults = collectDefaults();

  // Features
  _features = collectFeatures();
  const featureCollection = { type: 'FeatureCollection', features: _features };
  fs.writeFileSync('dist/featureCollection.json', stringify(featureCollection, { maxLength: 9999 }) + '\n');

  // Resources
  _resources = collectResources(featureCollection);
  fs.writeFileSync('dist/resources.json', stringify({ resources: sort(_resources) }, { maxLength: 9999 }) + '\n');
  fs.writeFileSync('i18n/en.yaml', YAML.dump({ en: sort(_tstrings) }, { lineWidth: -1 }) );

  console.timeEnd(END);
}


//
// Gather default strings from `defaults.json`
//
function collectDefaults() {
// Let's not translate these just yet - re: #30
// _tstrings._defaults = {};
  process.stdout.write('📦  Defaults: ');

  let contents = fs.readFileSync('./defaults.json', 'utf8');
  let defaults;
  try {
    defaults = JSON5.parse(contents);
  } catch (jsonParseError) {
    console.error(colors.red(`Error - ${jsonParseError.message} in:`));
    console.error('  ' + colors.yellow('./defaults.json'));
    process.exit(1);
  }

// Let's not translate these just yet - re: #30
// Object.keys(defaults).forEach(k => _tstrings._defaults[k] = defaults[k]);

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

    let feature = precision(rewind(parsed, true), 5);
    let fc = feature.features;

    // A FeatureCollection with a single feature inside (geojson.io likes to make these).
    if (feature.type === 'FeatureCollection' && Array.isArray(fc) && fc.length === 1) {
      feature = fc[0];
    }

    // warn if this feature is so small it would better be represented as a point.
    let area = calcArea.geometry(feature.geometry) / 1e6;   // m² to km²
    area = Number(area.toFixed(2));
    if (area < 2000) {
      console.warn(colors.yellow(`Warning - small area (${area} km²).  Use a point 'includeLocation' instead.`));
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

    validateFile(file, feature, featureSchema);
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

    // sort properties and array values
    let obj = {};
    if (item.id)    { obj.id = item.id; }
    if (item.type)  { obj.type = item.type; }

    item.locationSet = item.locationSet || {};
    obj.locationSet = {};
    if (item.locationSet.include) { obj.locationSet.include = item.locationSet.include; }
    if (item.locationSet.exclude) { obj.locationSet.exclude = item.locationSet.exclude; }

    if (item.languageCodes)       { obj.languageCodes = item.languageCodes.sort(withLocale); }
    if (item.url)                 { obj.url = item.url; }
    if (item.signupUrl)           { obj.signupUrl = item.signupUrl; }
    if (item.account)             { obj.account = item.account; }
    if (item.order)               { obj.order = item.order; }

    item.strings = item.strings || {};
    obj.strings = {};
    if (item.strings.community)           { obj.strings.community = item.strings.community; }
    if (item.strings.name)                { obj.strings.name = item.strings.name; }
    if (item.strings.description)         { obj.strings.description = item.strings.description; }
    if (item.strings.extendedDescription) { obj.strings.extendedDescription = item.strings.extendedDescription; }

    if (item.contacts)  { obj.contacts = item.contacts; }
    if (item.events)    { obj.events = item.events; }

    item = obj;

    validateFile(file, item, resourceSchema);

    // check locationSet
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

    // collect translation strings for this resource
    _tstrings[itemID] = {
      name: item.strings.name,
      description: item.strings.description
    };

    if (item.strings.extendedDescription) {
      _tstrings[itemID].extendedDescription = item.strings.extendedDescription;
    }

    // Validate event dates and collect strings from upcoming events (where `i18n=true`)
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
        _tstrings[itemID].events = estrings;
      }
    }

    process.stdout.write(colors.green('✓'));
  });

  process.stdout.write(' ' + Object.keys(files).length + '\n');

  return resources;
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


// Returns an object with sorted keys and sorted values.
// (This is useful for file diffing)
function sort(obj) {
  if (!obj) return null;

  let sorted = {};
  Object.keys(obj).sort(withLocale).forEach(k => {
    sorted[k] = Array.isArray(obj[k]) ? obj[k].sort(withLocale) : obj[k];
  });
  return sorted;
}

// Returns a string with diacritics, spaces, punctuation removed
function simiplify(str) {
  if (typeof str !== 'string') return '';
  return diacritics.remove(
    str
      .replace(/&/g, 'and')
      .replace(/İ/ig, 'i')
      .replace(/[\s\-=_!"#%'*{},.\/:;?\(\)\[\]@\\$\^*+<>«»~`’\u00a1\u00a7\u00b6\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u200b-\u200f\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30-\u2e39\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\ufeff\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]+/g,'')
      .toLowerCase()
  );
};
