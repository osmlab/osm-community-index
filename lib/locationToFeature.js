const CountryCoder = require('country-coder');
const circleToPolygon = require('circle-to-polygon');


function locationToFeature(location, features) {
  features = features || {};

  if (Array.isArray(location)) {   // a [lon,lat] coordinate pair?
    if (location.length === 2 && Number.isFinite(location[0]) && Number.isFinite(location[1]) &&
      location[0] >= -180 && location[0] <= 180 && location[1] >= -90 && location[1] <= 90
    ) {
      const RADIUS = 25000;  // meters
      const EDGES = 10;
      const AREA = Math.PI * RADIUS * RADIUS / 1e6;     // m² to km²
      const feature = {
        type: 'Feature',
        properties: { area: AREA },
        geometry: circleToPolygon(location, RADIUS, EDGES) };
      return { type: 'point', feature: feature };
    } else {
      return null;
    }

  } else if (/^\S+\.geojson$/i.test(location)) {   // a .geojson filename?
    let featureId = location.replace('.geojson', '');
    if (features[featureId]) {
      return { type: 'geojson', feature: features[featureId] };
    } else {
      return null;
    }

  } else {    // a country-coder string?
    if (location === '001') {    // waitfor https://github.com/ideditor/country-coder/issues/14
      const world = {
        type: 'Feature',
        properties: {
          m49: '001',
          wikidata: 'Q2',
          nameEn: 'World',
          id:  '001',
          area: 510072000
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]]]
        }
      }
      return { type: 'countrycoder', feature: world }
    }
    let ccmatch = CountryCoder.aggregateFeature(location);
    if (ccmatch) {
      return { type: 'countrycoder', feature: ccmatch };
    } else {
      return null;
    }
  }
}

module.exports = locationToFeature;
