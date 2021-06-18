var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// index.mjs
__export(exports, {
  resolveStrings: () => resolveStrings
});

// lib/simplify.js
var import_diacritics = __toModule(require("diacritics"));
function simplify(str) {
  if (typeof str !== "string")
    return "";
  return import_diacritics.default.remove(str.replace(/&/g, "and").replace(/İ/ig, "i").replace(/[\s\-=_!"#%'*{},.\/:;?\(\)\[\]@\\$\^*+<>«»~`’\u00a1\u00a7\u00b6\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u200b-\u200f\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30-\u2e39\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\ufeff\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]+/g, "").toLowerCase());
}

// lib/resolve_strings.js
function resolveStrings(item, defaults, localizerFn) {
  let itemStrings = Object.assign({}, item.strings);
  let defaultStrings = Object.assign({}, defaults[item.type]);
  const anyToken = new RegExp(/(\{\w+\})/, "gi");
  if (localizerFn) {
    if (itemStrings.community) {
      const communityID = simplify(itemStrings.community);
      itemStrings.community = localizerFn(`_communities.${communityID}`);
    }
    ["name", "description", "extendedDescription"].forEach((prop) => {
      if (defaultStrings[prop])
        defaultStrings[prop] = localizerFn(`_defaults.${item.type}.${prop}`);
      if (itemStrings[prop])
        itemStrings[prop] = localizerFn(`${item.id}.${prop}`);
    });
  }
  let replacements = {
    account: item.account,
    community: itemStrings.community,
    signupUrl: itemStrings.signupUrl,
    url: itemStrings.url
  };
  if (!replacements.signupUrl) {
    replacements.signupUrl = resolve(itemStrings.signupUrl || defaultStrings.signupUrl);
  }
  if (!replacements.url) {
    replacements.url = resolve(itemStrings.url || defaultStrings.url);
  }
  let resolved = {
    name: resolve(itemStrings.name || defaultStrings.name),
    url: resolve(itemStrings.url || defaultStrings.url),
    signupUrl: resolve(itemStrings.signupUrl || defaultStrings.signupUrl),
    description: resolve(itemStrings.description || defaultStrings.description),
    extendedDescription: resolve(itemStrings.extendedDescription || defaultStrings.extendedDescription)
  };
  resolved.nameHTML = linkify(resolved.url, resolved.name);
  resolved.urlHTML = linkify(resolved.url);
  resolved.signupUrlHTML = linkify(resolved.signupUrl);
  resolved.descriptionHTML = resolve(itemStrings.description || defaultStrings.description, true);
  resolved.extendedDescriptionHTML = resolve(itemStrings.extendedDescription || defaultStrings.extendedDescription, true);
  return resolved;
  function resolve(s, addLinks) {
    if (!s)
      return void 0;
    let result = s;
    for (let key in replacements) {
      const token = `{${key}}`;
      const regex = new RegExp(token, "g");
      if (regex.test(result)) {
        let replacement = replacements[key];
        if (!replacement) {
          throw new Error(`Cannot resolve token: ${token}`);
        } else {
          if (addLinks && (key === "signupUrl" || key === "url")) {
            replacement = linkify(replacement);
          }
          result = result.replace(regex, replacement);
        }
      }
    }
    const leftovers = result.match(anyToken);
    if (leftovers) {
      throw new Error(`Cannot resolve tokens: ${leftovers}`);
    }
    if (addLinks && item.type === "reddit") {
      result = result.replace(/(\/r\/\w+\/*)/i, (match) => linkify(resolved.url, match));
    }
    return result;
  }
  function linkify(url, text) {
    if (!url)
      return void 0;
    text = text || url;
    return `<a target="_blank" href="${url}">${text}</a>`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resolveStrings
});
//# sourceMappingURL=oci.cjs.map
