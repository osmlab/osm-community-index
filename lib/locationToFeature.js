const CountryCoder = require('country-coder');

const calcArea = require('@mapbox/geojson-area');
const circleToPolygon = require('circle-to-polygon');
const precision = require('geojson-precision');


function locationToFeature(location, features) {
  features = features || {};

  // a [lon,lat] coordinate pair?
  if (Array.isArray(location)) {
    if (location.length === 2 && Number.isFinite(location[0]) && Number.isFinite(location[1]) &&
      location[0] >= -180 && location[0] <= 180 && location[1] >= -90 && location[1] <= 90
    ) {
      const RADIUS = 25000;  // meters
      const EDGES = 10;
      const id = location.toString();
      const area = Math.PI * RADIUS * RADIUS / 1e6;     // m² to km²

      let feature = {
        type: 'Feature',
        id: id,
        properties: {
          id: id,
          area: Number(area.toFixed(2))
        },
        geometry: circleToPolygon(location, RADIUS, EDGES)
      };
      return { type: 'point', feature: precision(feature, 3) };
    } else {
      return null;
    }

   // a .geojson filename?
   } else if (/^\S+\.geojson$/i.test(location)) {
    let featureId = location.replace('.geojson', '');
    let feature = features[featureId];

    if (feature) {
      feature.properties = feature.properties || {};
      if (!feature.properties.area) {                          // ensure area property
        let area = calcArea.geometry(feature.geometry) / 1e6;  // m² to km²
        feature.properties.area = Number(area.toFixed(2));
      }
      return { type: 'geojson', feature: feature };
    } else {
      return null;
    }

  // a country-coder string?
  } else {
    if (location === '001') {    // waitfor https://github.com/ideditor/country-coder/issues/14
      const world = {
        type: 'Feature',
        id: '001',
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

    } else {
      let feature = CountryCoder.aggregateFeature(location);
      if (feature) {
        feature.properties = feature.properties || {};
        if (!feature.properties.area) {                            // ensure area property
          const area = calcArea.geometry(feature.geometry) / 1e6;  // m² to km²
          feature.properties.area = Number(area.toFixed(2));
        }
        return { type: 'countrycoder', feature: feature };
      } else {
        return null;
      }
    }
  }
}

module.exports = locationToFeature;
