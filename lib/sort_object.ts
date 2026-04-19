const withLocale = new Intl.Collator('en-US').compare;  // specify 'en-US' for stable sorting

/**
 * Returns a shallow copy of an object with its keys sorted and any array values sorted.
 * This is useful for producing deterministic JSON output for file diffing.
 *
 * @param   obj - The input object to sort
 * @returns A new object with sorted keys and sorted array values, or `null` if the input is falsy.
 */
export function sortObject<T extends object>(obj: T): T;
export function sortObject<T extends Record<string, unknown>>(obj: T): T | null {
  if (!obj) return null;

  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(obj).sort(withLocale);
  for (const k of keys) {
    const v = obj[k];
    sorted[k] = Array.isArray(v) ? v.sort(withLocale) : v;
  }

  return sorted as T;
}
