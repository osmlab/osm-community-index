/* DATA */
import { features } from './dist/features.json';
import { resources } from './dist/resources.json';

/* CODE */
import locationToFeature from './lib/locationToFeature.js';
import isValidLocation from './lib/isValidLocation.js';

export {
  features, resources,
  locationToFeature, isValidLocation
};
