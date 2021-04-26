const colors = require('colors/safe');
const fs = require('fs');
const glob = require('glob');
const JSON5 = require('json5');
const LocationConflation = require('@ideditor/location-conflation');
const resolveStrings = require('../lib/resolve_strings.js');
const shell = require('shelljs');
const stringify = require('@aitodotai/json-stringify-pretty-compact');
const writeFileWithMeta = require('../lib/write_file_with_meta.js');

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

  // Refresh some files already in `/dist`, update metadata to match version
  refreshMeta('resources.json');
  refreshMeta('featureCollection.json');

  // Save individual data files
  writeFileWithMeta('dist/completeFeatureCollection.json', stringify(combined) + '\n');

  // minify all .json files under dist/
  glob.sync(`dist/**/*.json`).forEach(file => {
    const minFile = file.replace('.json', '.min.json');
    minifySync(file, minFile);
  });

  console.timeEnd(END);
}


function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}


// `refreshMeta()`
// updates the metadata in an existing file in `/dist`
function refreshMeta(filename) {
  const contents = fs.readFileSync(`dist/${filename}`, 'utf8');
  let json = JSON5.parse(contents);
  delete json._meta;

  writeFileWithMeta(`dist/${filename}`, stringify(json, { maxLength: 9999 }) + '\n');
}


// `minifySync()`
// minifies a file
function minifySync(inPath, outPath) {
  try {
    const contents = fs.readFileSync(inPath, 'utf8');
    const minified = JSON.stringify(JSON5.parse(contents));
    fs.writeFileSync(outPath, minified);
  } catch (err) {
    console.error(colors.red(`Error - ${err.message} minifying:`));
    console.error('  ' + colors.yellow(inPath));
    process.exit(1);
  }
}


// `generateCombined()`
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
    item.resolved = resolveStrings(item, defaults);

    keepFeature.properties.resources[resourceID] = item;
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
