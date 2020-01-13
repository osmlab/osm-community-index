/* eslint-disable no-console */
const calcArea = require('@mapbox/geojson-area');
const colors = require('colors/safe');
const fs = require('fs');
const glob = require('glob');
const LocationConflation = require('@ideditor/location-conflation');
const path = require('path');
const precision = require('geojson-precision');
const prettyStringify = require('json-stringify-pretty-compact');
const rewind = require('geojson-rewind');
const shell = require('shelljs');
const Validator = require('jsonschema').Validator;
const YAML = require('js-yaml');

const geojsonSchema = require('./schema/geojson.json');
const featureSchema = require('./schema/feature.json');
const resourceSchema = require('./schema/resource.json');

let v = new Validator();
v.addSchema(geojsonSchema, 'http://json.schemastore.org/geojson.json');

buildAll();


function buildAll() {
  const START = '🏗   ' + colors.yellow('Building data...');
  const END = '👍  ' + colors.green('data built');

  console.log('');
  console.log(START);
  console.time(END);

  // Start clean
  shell.rm('-f', [
    'dist/features.json',
    'dist/resources.json',
    'i18n/en.yaml'
  ]);

  // Features
  let tstrings = {};   // translation strings
  const features = collectFeatures();
  const featureCollection = { type: 'FeatureCollection', features: features };
  fs.writeFileSync('dist/features.json', prettyStringify(featureCollection, { maxLength: 9999 }));

  // Resources
  const resources = collectResources(tstrings, featureCollection);
  fs.writeFileSync('dist/resources.json', prettyStringify({ resources: sort(resources) }, { maxLength: 9999 }));
  fs.writeFileSync('i18n/en.yaml', YAML.safeDump({ en: sort(tstrings) }, { lineWidth: -1 }) );

  console.timeEnd(END);
}


function collectFeatures() {
  let features = [];
  let files = {};
  process.stdout.write('📦  Features: ');

  glob.sync(__dirname + '/features/**/*.geojson').forEach(file => {
    const contents = fs.readFileSync(file, 'utf8');
    let parsed;
    try {
      parsed = JSON.parse(contents);
    } catch (jsonParseError) {
      console.error(colors.red('Error - ' + jsonParseError.message + ' in:'));
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
      console.warn(colors.yellow('Warning - small area (' + area + ' km²).  Use a point `includeLocation` instead.'));
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


function collectResources(tstrings, featureCollection) {
  let resources = {};
  let files = {};
  const loco = new LocationConflation(featureCollection);
  process.stdout.write('📦  Resources: ');

  glob.sync(__dirname + '/resources/**/*.json').forEach(file => {
    let contents = fs.readFileSync(file, 'utf8');

    let resource;
    try {
      resource = JSON.parse(contents);
    } catch (jsonParseError) {
      console.error(colors.red('Error - ' + jsonParseError.message + ' in:'));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }

    // sort properties and array values
    let obj = {};
    if (resource.id)                  { obj.id = resource.id; }
    if (resource.type)                { obj.type = resource.type; }
    if (resource.includeLocations)    { obj.includeLocations = resource.includeLocations; }
    if (resource.excludeLocations)    { obj.excludeLocations = resource.excludeLocations; }
    if (resource.countryCodes)        { obj.countryCodes = resource.countryCodes.sort(); }
    if (resource.languageCodes)       { obj.languageCodes = resource.languageCodes.sort(); }
    if (resource.name)                { obj.name = resource.name; }
    if (resource.description)         { obj.description = resource.description; }
    if (resource.extendedDescription) { obj.extendedDescription = resource.extendedDescription; }
    if (resource.url)                 { obj.url = resource.url; }
    if (resource.signupUrl)           { obj.signupUrl = resource.signupUrl; }
    if (resource.contacts)            { obj.contacts = resource.contacts; }
    if (resource.order)               { obj.order = resource.order; }
    if (resource.events)              { obj.events = resource.events; }
    resource = obj;

    validateFile(file, resource, resourceSchema);

    (resource.includeLocations || []).forEach(location => {
      if (!loco.isValidLocation(location)) {
        console.error(colors.red('Error - Invalid include location: ') + colors.yellow(location));
        console.error('  ' + colors.yellow(file));
        process.exit(1);
      }
    });

    (resource.excludeLocations || []).forEach(location => {
      if (!loco.isValidLocation(location)) {
        console.error(colors.red('Error - Invalid exclude location: ') + colors.yellow(location));
        console.error('  ' + colors.yellow(file));
        process.exit(1);
      }
    });

    prettifyFile(file, resource, contents);

    let resourceId = resource.id;
    if (files[resourceId]) {
      console.error(colors.red('Error - Duplicate resource id: ') + colors.yellow(resourceId));
      console.error('  ' + colors.yellow(files[resourceId]));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }

    resources[resourceId] = resource;
    files[resourceId] = file;

    // collect translation strings for this resource
    tstrings[resourceId] = {
      name: resource.name,
      description: resource.description
    };

    if (resource.extendedDescription) {
      tstrings[resourceId].extendedDescription = resource.extendedDescription;
    }

    // Validate event dates and collect strings from upcoming events (where `i18n=true`)
    if (resource.events) {
      let estrings = {};

      for (let i = 0; i < resource.events.length; i++) {
        let event = resource.events[i];

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
        tstrings[resourceId].events = estrings;
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
  const pretty = prettyStringify(object, { maxLength: 100 });
  if (pretty !== contents) {
    fs.writeFileSync(file, pretty);
  }
}


// Returns an object with sorted keys and sorted values.
// (This is useful for file diffing)
function sort(obj) {
  let sorted = {};
  Object.keys(obj).sort().forEach(k => {
    sorted[k] = Array.isArray(obj[k]) ? obj[k].sort() : obj[k];
  });
  return sorted;
}
