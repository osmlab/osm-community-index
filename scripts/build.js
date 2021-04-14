const calcArea = require('@mapbox/geojson-area');
const colors = require('colors/safe');
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

const resolveStrings = require('../lib/resolve_strings.js');
const sortObject = require('../lib/sort_object.js');
const simplify = require('../lib/simplify.js');

const geojsonSchema = require('../schema/geojson.json');
const featureSchema = require('../schema/feature.json');
const resourceSchema = require('../schema/resource.json');

let v = new Validator();
v.addSchema(geojsonSchema, 'http://json.schemastore.org/geojson.json');

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
  fs.writeFileSync('dist/resources.json', stringify({ resources: sortObject(_resources) }, { maxLength: 9999 }) + '\n');

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
    defaults = JSON5.parse(contents);
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
    let resolvedStrings;
    try {
      resolvedStrings = resolveStrings(item, _defaults);

      if (!resolvedStrings.name)         { throw new Error('Cannot resolve a value for name'); }
      if (!resolvedStrings.description)  { throw new Error('Cannot resolve a value for description'); }
      if (!resolvedStrings.url)          { throw new Error('Cannot resolve a value for url'); }
    } catch (e) {
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

    obj.resolved = resolvedStrings;

    if (item.contacts)  { obj.contacts = item.contacts; }
    if (item.events)    { obj.events = item.events; }

    item = obj;

    validateFile(file, item, resourceSchema);
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
