/* eslint-disable no-console */
const fs = require('fs');
const glob = require('glob');
const Validator = require('jsonschema').Validator;
const path = require('path');
const shell = require('shelljs');
const YAML = require('js-yaml');
const colors = require('colors/safe');

const geojsonSchema = require('./schema/geojson.json');
const resourceSchema = require('./schema/schema.json');

var v = new Validator();
v.addSchema(geojsonSchema, 'http://json.schemastore.org/geojson.json');

buildAll();


function buildAll() {
    console.log('building data');
    console.time(colors.green('data built'));

    // Start clean
    shell.rm('-f', ['dist/*', 'i18n/en.yaml']);

    var tstrings = {};   // translation strings
    var resources = generateResources(tstrings);

    // Save individual data files
    fs.writeFileSync(
        'dist/community.json',
        JSON.stringify({ communities: resources }, null, 4)
    );

    fs.writeFileSync(
        'dist/community.min.json',
        JSON.stringify({ communities: resources })
    );

    fs.writeFileSync(
        'i18n/en.yaml',
        YAML.safeDump({ en: tstrings }, { lineWidth: -1 })
    );

    console.timeEnd(colors.green('data built'));
}


function generateResources(tstrings) {
    var resources = {};
    glob.sync(__dirname + '/sources/**/*.geojson').forEach(function(file) {
        var resource = JSON.parse(fs.readFileSync(file, 'utf8'));
        validateResource(file, resource);

        var id = resource.properties.id;
        resources[id] = resource;
        tstrings[id] = {
            name: resource.properties.name,
            description: resource.properties.description
        };
    });

    return resources;
}

function validateResource(file, resource) {
    var validationErrors = v.validate(resource, resourceSchema).errors;
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

