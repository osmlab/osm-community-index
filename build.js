/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');
const glob = require('glob');
const Validator = require('jsonschema').Validator;
const shell = require('shelljs');
const prettyStringify = require('json-stringify-pretty-compact');
const YAML = require('js-yaml');

const geojsonSchema = require('./schema/geojson.json');
const featureSchema = require('./schema/feature.json');
const resourceSchema = require('./schema/resource.json');

var v = new Validator();
v.addSchema(geojsonSchema, 'http://json.schemastore.org/geojson.json');

buildAll();


function buildAll() {
    console.log('building data');
    console.time(colors.green('data built'));

    // Start clean
    shell.rm('-f', ['dist/*', 'i18n/en.yaml']);

    var tstrings = {};   // translation strings
    var features = generateFeatures();
    var resources = generateResources(tstrings);

    // Save individual data files
    fs.writeFileSync('dist/features.json', prettyStringify({ features: features }) );
    fs.writeFileSync('dist/features.min.json', JSON.stringify({ features: features }) );
    fs.writeFileSync('dist/resources.json', prettyStringify({ resources: resources }) );
    fs.writeFileSync('dist/resources.min.json', JSON.stringify({ resources: resources }) );
    fs.writeFileSync('i18n/en.yaml', YAML.safeDump({ en: tstrings }, { lineWidth: -1 }) );

    console.timeEnd(colors.green('data built'));
}


function generateFeatures() {
    var features = {};
    glob.sync(__dirname + '/features/**/*.geojson').forEach(function(file) {
        var feature = JSON.parse(fs.readFileSync(file, 'utf8'));
        validateFile(file, feature, featureSchema);

        var id = feature.properties.id;
        features[id] = feature;
    });

    return features;
}

function generateResources(tstrings) {
    var resources = {};
    glob.sync(__dirname + '/resources/**/*.json').forEach(function(file) {
        var resource = JSON.parse(fs.readFileSync(file, 'utf8'));
        validateFile(file, resource, resourceSchema);

        var id = resource.id;
        resources[id] = resource;
        tstrings[id] = {
            name: resource.name,
            description: resource.description
        };
    });

    return resources;
}

function validateFile(file, resource, schema) {
    var validationErrors = v.validate(resource, schema).errors;
    if (validationErrors.length) {
        console.error(colors.red('Validation Error:'));
        console.error(file + ': ');
        validationErrors.forEach(function(error) {
            if (error.property) {
                console.error(error.property + ' ' + error.message);
            } else {
                console.error(error);
            }
        });
        process.exit(1);
    }
}

