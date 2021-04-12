const colors = require('colors/safe');
const fs = require('fs');
const LocationConflation = require('@ideditor/location-conflation');
const resolveStrings = require('../lib/resolve_strings.js');
const shell = require('shelljs');
const stringify = require('@aitodotai/json-stringify-pretty-compact');

const featureCollection = require('../dist/featureCollection.json');
const resources = require('../dist/resources.json').resources;
const defaults = require('../defaults.json');

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

    let item = deepClone(resource);
    let resolvedStrings = resolveStrings(item, defaults);
    if (resolvedStrings.name)                 { item.name = resolvedStrings.name; }
    if (resolvedStrings.description)          { item.description = resolvedStrings.description; }
    if (resolvedStrings.extendedDescription)  { item.extendedDescription = resolvedStrings.extendedDescription; }

    keepFeature.properties.resources[resourceID] = item;
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
