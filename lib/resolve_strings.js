const simplify = require('./simplify.js');

//
// `resolveStrings`
// Resolves the text strings for a given community index item
//
// Arguments
//   `item`:  Object containing the community index item
//   `defaults`: Object containing the community index default strings
//   `localizerFn?`: optional function we will call do the localization.
//      This function should be like the iD `t` function that accepts a `stringID`
// Returns
//   An Object containing all the resolved strings
//
module.exports = (item, defaults, localizerFn) => {
  let itemStrings = Object.assign({}, item.strings);             // shallow clone
  let defaultStrings = Object.assign({}, defaults[item.type]);   // shallow clone
  const anyToken = new RegExp(/(\{\w+\})/, 'gi');

  // pre-localize the item and default strings
  if (localizerFn) {
    if (itemStrings.community) {
      const communityID = simplify(itemStrings.community);
      itemStrings.community = localizerFn(`_communities.${communityID}`);
    }
    ['name', 'description', 'extendedDescription'].forEach(prop => {
      if (defaultStrings[prop])  defaultStrings[prop] = localizerFn(`_defaults.${item.type}.${prop}`);
      if (itemStrings[prop])     itemStrings[prop]    = localizerFn(`${item.id}.${prop}`);
    });
  }

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
          throw new Error(`Cannot resolve token: ${token}`);
        } else {
          result = result.replace(regex, val);
        }
      }
    }

    // There shouldn't be any leftover tokens in a resolved string
    const leftovers = result.match(anyToken);
    if (leftovers) {
      throw new Error(`Cannot resolve tokens: ${leftovers}`);
    }

    return result;
  }
};
