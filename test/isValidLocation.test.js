const test = require('tap').test;
const oci = require('../.');


test('isValidLocation', t => {

  t.test('points', t => {
    t.test('a valid [lon,lat] coordinate pair returns true', t => {
      t.true(oci.isValidLocation([0, 0]));
      t.true(oci.isValidLocation([-180, -90]));
      t.true(oci.isValidLocation([-180, 90]));
      t.true(oci.isValidLocation([180, -90]));
      t.true(oci.isValidLocation([180, 90]));
      t.end();
    });
    t.test('an invalid [lon,lat] coordinate pair returns false', t => {
      t.false(oci.isValidLocation([]));
      t.false(oci.isValidLocation(['a']));
      t.false(oci.isValidLocation([0]));
      t.false(oci.isValidLocation([0, 0, 0]));
      t.false(oci.isValidLocation([-181, -90]));
      t.false(oci.isValidLocation([-180, 91]));
      t.false(oci.isValidLocation([181, -90]));
      t.false(oci.isValidLocation([180, 91]));
      t.end();
    });
    t.end();
  });


  t.test('`.geojson` filenames', t => {
    t.test('a valid `.geojson` filename in this project returns true', t => {
      t.true(oci.isValidLocation('philly_metro.geojson', oci.features));
      t.end();
    });
    t.test('an invalid `.geojson` filename in this project returns false', t => {
      t.false(oci.isValidLocation('philly_metro.geojson'));        // no features to check it against
      t.false(oci.isValidLocation('philly_metro', oci.features));  // missing .geojson
      t.false(oci.isValidLocation('fake.geojson', oci.features));  // fake filename
      t.end();
    });
    t.end();
  });


  t.test('country coder feature identifiers', t => {
    t.test('a valid country coder feature identifier returns true', t => {
      t.true(oci.isValidLocation('GB'));
      t.true(oci.isValidLocation('gb'));
      t.true(oci.isValidLocation('GBR'));
      t.true(oci.isValidLocation('gbr'));
      t.true(oci.isValidLocation('826'));
      t.true(oci.isValidLocation(826));
      t.true(oci.isValidLocation('Q145'));
      t.true(oci.isValidLocation('🇬🇧'));
      t.true(oci.isValidLocation('united kingdom'));
      t.end();
    });
    t.test('an invalid country coder feature identifier returns false', t => {
      t.false(oci.isValidLocation(''));
      t.false(oci.isValidLocation('false'));
      t.false(oci.isValidLocation('null'));
      t.end();
    });
    t.end();
  });

  t.end();
});
