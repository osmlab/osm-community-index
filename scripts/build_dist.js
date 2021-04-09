const colors = require('colors/safe');
const fs = require('fs');
const LocationConflation = require('@ideditor/location-conflation');
const shell = require('shelljs');
const stringify = require('@aitodotai/json-stringify-pretty-compact');

const featureCollection = require('../dist/featureCollection.json');
const resources = require('../dist/resources.json').resources;

buildAll();


function buildAll() {
  const START = '🏗   ' + colors.yellow('Building dist…');
  const END = '👍  ' + colors.green('dist built');

  console.log('');
  console.log(START);
  console.time(END);

  // Start clean
  shell.rm('-f', [
    'dist/completeFeatureCollection*',
    'dist/*.min.json'
  ]);

  const combined = generateCombined(resources, featureCollection);

  // Save individual data files
  fs.writeFileSync('dist/completeFeatureCollection.json', stringify(combined) + '\n');
  fs.writeFileSync('dist/completeFeatureCollection.min.json', JSON.stringify(combined) );
  fs.writeFileSync('dist/featureCollection.min.json', JSON.stringify(featureCollection) );
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
function generateCombined(resources, featureCollection) {
  let keepFeatures = {};
  const loco = new LocationConflation(featureCollection);

  Object.keys(resources).forEach(resourceID => {
    const resource = resources[resourceID];
    const feature = loco.resolveLocationSet(resource.locationSet).feature;

    let keepFeature = keepFeatures[feature.id];
    if (!keepFeature) {
      keepFeature = deepClone(feature);
      keepFeature.properties.resources = {};
      keepFeatures[feature.id] = keepFeature;
    }

    let res = deepClone(resource);

    // resolve strings
    if (res.strings.name) {
      res.name = res.strings.name;
    }
    if (res.strings.description) {
      res.description = res.strings.description;
    }
    if (res.strings.extendedDescription) {
      res.extendedDescription = res.strings.extendedDescription;
    }

    keepFeature.properties.resources[resourceID] = res;
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
