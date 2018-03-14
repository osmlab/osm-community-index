const test = require('tap').test;
const oci = require('../.');

const featuresJSON = require('../dist/features.json');
const resourcesJSON = require('../dist/resources.json');


test('dist/features.json', function(t) {

    t.test('is an object', function(t) {
        t.type(featuresJSON, 'object');
        t.end();
    });

    t.test('has a features property', function(t) {
        t.true(featuresJSON.hasOwnProperty('features'));
        t.end();
    });

    t.end();
});

test('dist/resources.json', function(t) {

    t.test('is an object', function(t) {
        t.type(resourcesJSON, 'object');
        t.end();
    });

    t.test('has a resources property', function(t) {
        t.true(resourcesJSON.hasOwnProperty('resources'));
        t.end();
    });

    t.end();
});

test('index.js', function(t) {

    t.test('exports all features', function(t) {
        t.deepEqual(oci.features, featuresJSON.features);
        t.end();
    });

    t.test('exports all resources', function(t) {
        t.deepEqual(oci.resources, resourcesJSON.resources);
        t.end();
    });

    t.end();
});
