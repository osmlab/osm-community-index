import { simplify } from './simplify.js';

//
// `resolveStrings`
// Resolves the text strings for a given community index item
//
// Arguments
//   `item`:  Object containing the community index item
//   `defaults`: Object containing the community index default strings
//   `localizerFn?`: optional function we will call to do the localization.
//      This function should be like the iD `t()` function that
//      accepts a `stringID` and returns a localized string
//
// Returns
//   An Object containing all the resolved strings:
//   {
//     name:                     'talk-ru Mailing List',
//     url:                      'https://lists.openstreetmap.org/listinfo/talk-ru',
//     signupUrl:                'https://example.url/signup',
//     description:              'A one line description',
//     extendedDescription:      'Extended description',
//     nameHTML:                 '<a href="the url">the name</a>',
//     urlHTML:                  '<a href="the url">the url</a>',
//     signupUrlHTML:            '<a href="the signupUrl">the signupUrl</a>',
//     descriptionHTML:          the description, with urls and signupUrls linkified,
//     extendedDescriptionHTML:  the extendedDescription with urls and signupUrls linkified
//   }
//
export function resolveStrings(item, defaults, localizerFn) {
  const itemStrings = Object.assign({}, item.strings);             // shallow clone
  const defaultStrings = Object.assign({}, defaults[item.type]);   // shallow clone
  const anyToken = new RegExp(/(\{\w+\})/, 'gi');

  // Pre-localize the item and default strings
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

  const replacements = {
    account: item.account,
    community: itemStrings.community,
    signupUrl: itemStrings.signupUrl,
    url: itemStrings.url
  };

  // Resolve URLs first (which may refer to {account})
  if (!replacements.signupUrl)  { replacements.signupUrl = resolve(itemStrings.signupUrl || defaultStrings.signupUrl); }
  if (!replacements.url)        { replacements.url = resolve(itemStrings.url || defaultStrings.url); }

  const resolved = {
    name:                resolve(itemStrings.name || defaultStrings.name),
    url:                 resolve(itemStrings.url || defaultStrings.url),
    signupUrl:           resolve(itemStrings.signupUrl || defaultStrings.signupUrl),
    description:         resolve(itemStrings.description || defaultStrings.description),
    extendedDescription: resolve(itemStrings.extendedDescription || defaultStrings.extendedDescription)
  };

  // Generate linkified strings
  resolved.nameHTML = linkify(resolved.url, resolved.name);
  resolved.urlHTML = linkify(resolved.url);
  resolved.signupUrlHTML = linkify(resolved.signupUrl);
  resolved.descriptionHTML = resolve((itemStrings.description || defaultStrings.description), true);
  resolved.extendedDescriptionHTML = resolve((itemStrings.extendedDescription || defaultStrings.extendedDescription), true);

  return resolved;


  function resolve(s, addLinks) {
    if (!s) return undefined;
    let result = s;

    for (let key in replacements) {
      const token = `{${key}}`;
      const regex = new RegExp(token, 'g');
      if (regex.test(result)) {
        let replacement = replacements[key];
        if (!replacement) {
          throw new Error(`Cannot resolve token: ${token}`);
        } else {
          if (addLinks && (key === 'signupUrl' || key === 'url')) {
            replacement = linkify(replacement);
          }
          result = result.replace(regex, replacement);
        }
      }
    }

    // There shouldn't be any leftover tokens in a resolved string
    const leftovers = result.match(anyToken);
    if (leftovers) {
      throw new Error(`Cannot resolve tokens: ${leftovers}`);
    }

    // Linkify subreddits like `/r/openstreetmap`
    // https://github.com/osmlab/osm-community-index/issues/82
    // https://github.com/openstreetmap/iD/issues/4997
    if (addLinks && item.type === 'reddit') {
      result = result.replace(/(\/r\/\w+\/*)/i, match => linkify(resolved.url, match));
    }

    return result;
  }

  function linkify(url, text) {
    if (!url) return undefined;
    text = text || url;
    return `<a target="_blank" href="${url}">${text}</a>`;
  }
}
