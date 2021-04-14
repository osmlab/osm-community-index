
// Resolves string token replacements, throw error if any are unresolvable
module.exports = (item, defaults) => {
  const itemStrings = item.strings || {};
  const defaultStrings = defaults[item.type] || {};

  let replacements = {
    account: item.account,
    community: itemStrings.community,
    signupUrl: itemStrings.signupUrl,
    url: itemStrings.url
  };

  // resolve URLs first (which may refer to {account})
  if (!replacements.signupUrl)  { replacements.signupUrl = resolve(itemStrings.signupUrl || defaultStrings.signupUrl); }
  if (!replacements.url)        { replacements.url = resolve(itemStrings.url || defaultStrings.url); }

  const resolved = {
    name:                resolve(itemStrings.name || defaultStrings.name),
    description:         resolve(itemStrings.description || defaultStrings.description),
    extendedDescription: resolve(itemStrings.extendedDescription || defaultStrings.extendedDescription),
    signupUrl:           resolve(itemStrings.signupUrl || defaultStrings.signupUrl),
    url:                 resolve(itemStrings.url || defaultStrings.url)
  };

  return resolved;


  function resolve(s) {
    if (!s) return undefined;
    let result = s;

    for (let key in replacements) {
      const token = `{${key}}`;
      const regex = new RegExp(token, 'g');
      if (regex.test(result)) {
        const val = replacements[key];
        if (!val) {
          throw new Error(`Cannot resolve ${token}`);
        } else {
          result = result.replace(regex, val);
        }
      }
    }
    return result;
  }
};
