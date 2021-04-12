const withLocale = require('locale-compare')('en-US');

// Returns an object with sorted keys and sorted values.
// (This is useful for file diffing)
module.exports = (obj) => {
  if (!obj) return null;

  let sorted = {};
  Object.keys(obj).sort(withLocale).forEach(k => {
    sorted[k] = Array.isArray(obj[k]) ? obj[k].sort(withLocale) : obj[k];
  });

  return sorted;
};
