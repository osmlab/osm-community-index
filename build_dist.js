/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');
const LocationConflation = require('@ideditor/location-conflation');
const prettyStringify = require('json-stringify-pretty-compact');
const shell = require('shelljs');

const featureCollection = require('./dist/features.json');
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
    'dist/features.min.json',
    'dist/resources.min.json'
  ]);

  const combined = generateCombined(resources, featureCollection);

  // Save individual data files
  fs.writeFileSync('dist/combined.geojson', prettyStringify(combined) );
  fs.writeFileSync('dist/combined.min.geojson', JSON.stringify(combined) );
  fs.writeFileSync('dist/features.min.json', JSON.stringify(featureCollection) );
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
//       id: 'GH',
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
//       id: 'MG',
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
function generateCombined(resources, featureCollection) {
  let keepFeatures = {};
  const loco = new LocationConflation(featureCollection);

  Object.keys(resources).forEach(resourceId => {
    const resource = resources[resourceId];
    const feature = loco.resolveLocationSet(resource.locationSet);

    let keepFeature = keepFeatures[feature.id];
    if (!keepFeature) {
      keepFeature = deepClone(feature);
      keepFeature.properties.resources = {};
      keepFeatures[feature.id] = keepFeature;
    }

    keepFeature.properties.resources[resourceId] = deepClone(resource);
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
