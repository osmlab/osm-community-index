/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const CountryCoder = require('country-coder');
const Validator = require('jsonschema').Validator;
const shell = require('shelljs');
const prettyStringify = require('json-stringify-pretty-compact');
const YAML = require('js-yaml');

const calcArea = require('@mapbox/geojson-area');
const precision = require('geojson-precision');
const rewind = require('geojson-rewind');

const geojsonSchema = require('./schema/geojson.json');
const featureSchema = require('./schema/feature.json');
const resourceSchema = require('./schema/resource.json');

let v = new Validator();
v.addSchema(geojsonSchema, 'http://json.schemastore.org/geojson.json');

buildAll();


function buildAll() {
  console.log('building data');
  console.time(colors.green('data built'));

  // Start clean
  shell.rm('-f', ['dist/*.json', 'dist/*.js', 'i18n/en.yaml']);

  let tstrings = {};   // translation strings
  const features = generateFeatures();
  const resources = generateResources(tstrings, features);
  // const combined = generateCombined(features, resources);

  // Save individual data files
  // fs.writeFileSync('dist/combined.geojson', prettyStringify(combined) );
  // fs.writeFileSync('dist/combined.min.geojson', JSON.stringify(combined) );
  fs.writeFileSync('dist/features.json', prettyStringify({ features: features }, { maxLength: 9999 }));
  fs.writeFileSync('dist/features.min.json', JSON.stringify({ features: features }) );
  fs.writeFileSync('dist/resources.json', prettyStringify({ resources: resources }, { maxLength: 9999 }));
  fs.writeFileSync('dist/resources.min.json', JSON.stringify({ resources: resources }) );
  fs.writeFileSync('i18n/en.yaml', YAML.safeDump({ en: tstrings }, { lineWidth: -1 }) );

  console.timeEnd(colors.green('data built'));
}


function generateFeatures() {
  let features = {};
  let files = {};
  process.stdout.write('Features:');

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

    // calculate area and set a property for it
    let props = feature.properties || {};
    let area = calcArea.geometry(feature.geometry) / 1e6;   // m² to km²
    props.area = Number(area.toFixed(2));
    feature.properties = props;

    // use the filename as the feature.id
    const id = path.basename(file, '.geojson').toLowerCase();
    feature.id = id;

    // sort keys
    let obj = {};
    if (feature.type) { obj.type = feature.type; }
    if (feature.id) { obj.id = feature.id; }
    if (feature.properties) { obj.properties = feature.properties; }
    if (feature.geometry) { obj.geometry = feature.geometry; }
    feature = obj;

    validateFile(file, feature, featureSchema);
    prettifyFile(file, feature, contents);

    if (files[id]) {
      console.error(colors.red('Error - Duplicate filenames: ') + colors.yellow(id));
      console.error('  ' + colors.yellow(files[id]));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }
    features[id] = feature;
    files[id] = file;

    process.stdout.write(colors.green('✓'));
  });

  process.stdout.write(Object.keys(files).length + '\n');

  return features;
}


function generateResources(tstrings, features) {
  let resources = {};
  let files = {};
  process.stdout.write('Resources:');

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

    // sort keys
    let obj = {};
    if (resource.id) { obj.id = resource.id; }
    if (resource.type) { obj.type = resource.type; }
    if (resource.includeLocations) { obj.includeLocations = resource.includeLocations; }
    if (resource.excludeLocations) { obj.excludeLocations = resource.excludeLocations; }
    if (resource.countryCodes) { obj.countryCodes = resource.countryCodes.sort(); }
    if (resource.languageCodes) { obj.languageCodes = resource.languageCodes.sort(); }
    if (resource.name) { obj.name = resource.name; }
    if (resource.description) { obj.description = resource.description; }
    if (resource.extendedDescription) { obj.extendedDescription = resource.extendedDescription }
    if (resource.url) { obj.url = resource.url; }
    if (resource.signupUrl) { obj.signupUrl = resource.signupUrl; }
    if (resource.contacts) { obj.contacts = resource.contacts; }
    if (resource.order) { obj.order = resource.order; }
    if (resource.events) { obj.events = resource.events; }
    resource = obj;

    validateFile(file, resource, resourceSchema);
    prettifyFile(file, resource, contents);

    let resourceId = resource.id;
    if (files[resourceId]) {
      console.error(colors.red('Error - Duplicate resource id: ') + colors.yellow(resourceId));
      console.error('  ' + colors.yellow(files[resourceId]));
      console.error('  ' + colors.yellow(file));
      process.exit(1);
    }

    if (resource.includeLocations) {
      validateLocations(resource.includeLocations, file, features);
    }
    if (resource.excludeLocations) {
      validateLocations(resource.excludeLocations, file, features);
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

  process.stdout.write(Object.keys(files).length + '\n');

  return resources;
}


function validateLocations(locations, file, features) {
  locations.forEach(location => {
    if (Array.isArray(location)) {   // a [lon,lat] coordinate pair?
      if (location.length === 2 && Number.isFinite(location[0]) && Number.isFinite(location[1]) &&
        location[0] >= -180 && location[0] <= 180 && location[1] >= -90 && location[1] <= 90
      ) {
        console.log('  Lon,Lat: ' + colors.yellow(location));
      } else {
        console.error(colors.red('Error - Invalid location: ') + colors.yellow(location));
        console.error('  ' + colors.yellow(file));
        process.exit(1);
      }

    } else if (/^\S+\.geojson$/i.test(location)) {   // a .geojson filename?
      let featureId = location.replace('.geojson', '');
      if (features[featureId]) {
        console.log('  GeoJSON: ' + colors.yellow(location));
      } else {
        console.error(colors.red('Error - Invalid location: ') + colors.yellow(location));
        console.error('  ' + colors.yellow(file));
        process.exit(1);
      }

    } else {    // a country-coder string?
      let ccmatch = CountryCoder.feature(location);
      if (ccmatch) {
        console.log('  Country Coder: ' + colors.yellow(ccmatch.properties.nameEn));
      } else {
        console.error(colors.red('Error - Invalid location: ') + colors.yellow(location));
        console.error('  ' + colors.yellow(file));
        process.exit(1);
      }
    }
  });
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


function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}


// Generate a combined GeoJSON FeatureCollection
// containing all the features w/ resources stored in properties
//
// {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       id: 'ghana',
//       geometry: { ... },
//       properties: {
//         'area': 297118.3,
//         'resources': {
//           'osm-gh-facebook': { ... },
//           'osm-gh-twitter': { ... },
//           'talk-gh': { ... }
//         }
//       }
//     }, {
//       type: 'Feature',
//       id: 'madagascar',
//       geometry: { ... },
//       properties: {
//         'area': 964945.85,
//         'resources': {
//           'osm-mg-facebook': { ... },
//           'osm-mg-twitter': { ... },
//           'talk-mg': { ... }
//         }
//       }
//     },
//     ...
//   ]
// }
//
//
function generateCombined(features, resources) {
  let keepFeatures = {};
  Object.keys(resources).forEach(resourceId => {
    const resource = resources[resourceId];
    const featureId = resource.featureId;
    if (!featureId) return;  // note: this will exclude worldwide resources

    const origFeature = features[featureId];
    if (!origFeature) return;

    let keepFeature = keepFeatures[featureId];
    if (!keepFeature) {
      keepFeature = deepClone(origFeature);
      keepFeature.properties.resources = {};
      keepFeatures[featureId] = keepFeature;
    }

    keepFeature.properties.resources[resourceId] = deepClone(resource);
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
