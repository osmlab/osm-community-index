const CountryCoder = require('@ideditor/country-coder');


function isValidLocation(location, features) {
  features = features || {};

  if (Array.isArray(location)) {   // a [lon,lat] coordinate pair?
    return !!(
      location.length === 2 && Number.isFinite(location[0]) && Number.isFinite(location[1]) &&
      location[0] >= -180 && location[0] <= 180 && location[1] >= -90 && location[1] <= 90
    );

  } else if (/^\S+\.geojson$/i.test(location)) {   // a .geojson filename?
    let featureId = location.replace('.geojson', '');
    return !!features[featureId];

  } else {    // a country-coder string?
    let ccmatch = CountryCoder.feature(location);
    return !!ccmatch;
  }
}

module.exports = isValidLocation;