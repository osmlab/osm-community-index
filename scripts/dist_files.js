// External
import fs from 'node:fs';
import JSON5 from 'json5';
import LocationConflation from '@rapideditor/location-conflation';
import shell from 'shelljs';
import stringify from '@aitodotai/json-stringify-pretty-compact';
import { styleText } from 'node:util';

// Internal
import { resolveStrings } from '../lib/resolve_strings.js';
import { writeFileWithMeta } from '../lib/write_file_with_meta.js';

// JSON
const featureCollectionJSON = JSON5.parse(fs.readFileSync('dist/featureCollection.json', 'utf8'));
const resourcesJSON = JSON5.parse(fs.readFileSync('dist/resources.json', 'utf8'));
const defaultsJSON = JSON5.parse(fs.readFileSync('defaults.json', 'utf8'));

const resources = resourcesJSON.resources;
const defaults = defaultsJSON.defaults;

buildAll();


function buildAll() {
  const START = '🏗   ' + styleText('yellow', 'Building dist…');
  const END = '👍  ' + styleText('green', 'dist built');

  console.log('');
  console.log(START);
  console.time(END);

  // Refresh some files already in `/dist`, update metadata to match version
  refreshMeta('resources.json');
  refreshMeta('featureCollection.json');

  // Save individual data files
  const combined = generateCombined();
  writeFileWithMeta(`dist/defaults.json`, stringify(defaultsJSON) + '\n');
  writeFileWithMeta('dist/completeFeatureCollection.json', stringify(combined) + '\n');

  // minify all .json files under dist/
  shell.rm('-f', ['dist/*.min.json']);  // start clean
  for (const file of fs.globSync('dist/**/*.json')) {
    const minFile = file.replace('.json', '.min.json');
    minifySync(file, minFile);
  }

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
    console.error(styleText('red', `Error - ${err.message} minifying:`));
    console.error(styleText('yellow', '  ' + inPath));
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
function generateCombined() {
  let keepFeatures = {};
  const loco = new LocationConflation(featureCollectionJSON);

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
