const test = require('tap').test;
const oci = require('../.');

const featuresJSON = require('../dist/features.json');
const resourcesJSON = require('../dist/resources.json');


test('dist/features.json', t => {
  t.test('is an object', t => {
    t.type(featuresJSON, 'object');
    t.end();
  });
  t.test('has a features property', t => {
    t.true(featuresJSON.hasOwnProperty('features'));
    t.end();
  });
  t.end();
});


test('dist/resources.json', t => {
  t.test('is an object', t => {
    t.type(resourcesJSON, 'object');
    t.end();
  });
  t.test('has a resources property', t => {
    t.true(resourcesJSON.hasOwnProperty('resources'));
    t.end();
  });
  t.end();
});


test('index.js', t => {
  t.test('exports all features', t => {
    t.deepEqual(oci.features, featuresJSON.features);
    t.end();
  });
  t.test('exports all resources', t => {
    t.deepEqual(oci.resources, resourcesJSON.resources);
    t.end();
  });
  t.end();
});
