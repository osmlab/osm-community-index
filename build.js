/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');
const glob = require('glob');
const precision = require('geojson-precision');
const rewind = require('geojson-rewind');
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
    shell.rm('-f', ['dist/*.json', 'dist/*.js', 'i18n/en.yaml']);

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
    var files = {};
    glob.sync(__dirname + '/features/**/*.geojson').forEach(function(file) {
        var contents = fs.readFileSync(file, 'utf8');
        var feature = precision(rewind(JSON.parse(contents), true), 5);
        validateFile(file, feature, featureSchema);
        prettifyFile(file, feature, contents);

        var id = feature.id;
        if (files[id]) {
            console.error(colors.red('Error - Duplicate feature id: ') + colors.yellow(id));
            console.error('  ' + colors.yellow(files[id]));
            console.error('  ' + colors.yellow(file));
            process.exit(1);
        }
        features[id] = feature;
        files[id] = file;
    });

    return features;
}

function generateResources(tstrings) {
    var resources = {};
    var files = {};
    glob.sync(__dirname + '/resources/**/*.json').forEach(function(file) {
        var contents = fs.readFileSync(file, 'utf8');
        var resource = JSON.parse(contents);
        validateFile(file, resource, resourceSchema);
        prettifyFile(file, resource, contents);

        var id = resource.id;
        if (files[id]) {
            console.error(colors.red('Error - Duplicate resource id: ') + colors.yellow(id));
            console.error('  ' + colors.yellow(files[id]));
            console.error('  ' + colors.yellow(file));
            process.exit(1);
        }
        resources[id] = resource;
        files[id] = file;

        // collect translation strings for this resource
        tstrings[id] = {
            name: resource.name,
            description: resource.description
        };

        if (resource.extendedDescription) {
            tstrings[id].extendedDescription = resource.extendedDescription;
        }

        // Validate event dates and collect strings from upcoming events (where `i18n=true`)
        if (resource.events) {
            var estrings = {};

            for (var i = 0; i < resource.events.length; i++) {
                var event = resource.events[i];

                // check date
                var d = new Date(event.when);
                if (isNaN(d.getTime())) {
                    console.error(colors.red('Error - Bad date: ') + colors.yellow(event.when));
                    console.error('  ' + colors.yellow(file));
                    process.exit(1);
                }

                if (!event.i18n) continue;

                if (estrings[event.id]) {
                    console.error(colors.red('Error - Duplicate event id: ') + colors.yellow(event.id));
                    console.error('  ' + colors.yellow(file));
                    process.exit(1);
                }

                estrings[event.id] = {
                    name: event.name,
                    description: event.description,
                    where: event.where
                };
            }

            if (Object.keys(estrings).length) {
                tstrings[id].events = estrings;
            }
        }
    });

    return resources;
}

function validateFile(file, resource, schema) {
    var validationErrors = v.validate(resource, schema).errors;
    if (validationErrors.length) {
        console.error(colors.red('Error - Schema validation:'));
        console.error('  ' + colors.yellow(file + ': '));
        validationErrors.forEach(function(error) {
            if (error.property) {
                console.error('  ' + colors.yellow(error.property + ' ' + error.message));
            } else {
                console.error('  ' + colors.yellow(error));
            }
        });
        process.exit(1);
    }
}

function prettifyFile(file, object, contents) {
    var pretty = prettyStringify(object);
    if (pretty !== contents) {
        fs.writeFileSync(file, pretty);
    }
}

