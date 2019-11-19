/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');
const locationToFeature = require('./lib/locationToFeature.js');
const prettyStringify = require('json-stringify-pretty-compact');
const shell = require('shelljs');

const features = require('./dist/features.json').features;
const resources = require('./dist/resources.json').resources;


buildAll();


function buildAll() {
  const START = '🏗   ' + colors.yellow('Building dist...');
  const END = '👍  ' + colors.green('dist built');

  console.log('');
  console.log(START);
  console.time(END);

  // Start clean
  shell.rm('-f', [
    'dist/combined.geojson',
    'dist/combined.min.geojson',
    'dist/features.min.geojson',
    'dist/resources.min.geojson'
  ]);

  const combined = generateCombined(features, resources);

  // Save individual data files
  fs.writeFileSync('dist/combined.geojson', prettyStringify(combined) );
  fs.writeFileSync('dist/combined.min.geojson', JSON.stringify(combined) );
  fs.writeFileSync('dist/features.min.json', JSON.stringify({ features: features }) );
  fs.writeFileSync('dist/resources.min.json', JSON.stringify({ resources: resources }) );

  console.timeEnd(END);
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
function generateCombined(features, resources) {
  let keepFeatures = {};

  Object.keys(resources).forEach(resourceId => {
    const resource = resources[resourceId];

    resource.includeLocations.forEach(location => {
      const featureId = location.toString();
      let keepFeature = keepFeatures[featureId];
      if (!keepFeature) {
        const origFeature = locationToFeature(location, features).feature;
        keepFeature = deepClone(origFeature);
        keepFeature.properties.resources = {};
        keepFeatures[featureId] = keepFeature;
      }

      keepFeature.properties.resources[resourceId] = deepClone(resource);
    });
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
