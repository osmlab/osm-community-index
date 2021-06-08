import colors from 'colors/safe.js';
import fs from 'node:fs';
import glob from 'glob';
import JSON5 from 'json5';
import LocationConflation from '@ideditor/location-conflation';
import shell from 'shelljs';
import stringify from '@aitodotai/json-stringify-pretty-compact';

import { resolveStrings } from '../lib/resolve_strings.js';
import { writeFileWithMeta } from '../lib/write_file_with_meta.js';

const featureCollection = JSON.parse(fs.readFileSync('./dist/featureCollection.json', 'utf8'));
const resources = JSON.parse(fs.readFileSync('./dist/resources.json', 'utf8')).resources;
const defaults = JSON.parse(fs.readFileSync('./defaults.json', 'utf8'));

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
  writeFileWithMeta(`dist/defaults.json`, stringify(defaults) + '\n');
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
    item.resolved = resolveStrings(item, defaults.defaults);

    keepFeature.properties.resources[resourceID] = item;
  });

  return { type: 'FeatureCollection', features: Object.values(keepFeatures) };
}
