import localeCompare from 'locale-compare';
const withLocale = localeCompare('en-US');

// Returns an object with sorted keys and sorted values.
// (This is useful for file diffing)
export function sortObject(obj: Record<string, any>): Record<string, any> {
  if (!obj) return null;

  const sorted = {};
  const keys = Object.keys(obj).sort(withLocale);
  for (const k of keys) {
    const v = obj[k];
    sorted[k] = Array.isArray(v) ? v.sort(withLocale) : v;
  }

  return sorted;
}
