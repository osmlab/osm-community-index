const resolveStrings = require('../lib/resolve_strings.js');

const item = {
  id: 'talk-ru',
  type: 'mailinglist',
  account: 'talk-ru',
  strings: {community: 'OpenStreetMap Russia'}
};

const defaults = {
  'mailinglist': {
    name: '{account} Mailing List',
    description: 'The official mailing list for {community}',
    extendedDescription: 'Fun times for all at {url}',
    url: 'https://lists.openstreetmap.org/listinfo/{account}'
  }
};

describe('resolveStrings', () => {

  test('basic', () => {
    const resolved = resolveStrings(item, defaults);
    expect(resolved).toBeInstanceOf(Object);
    expect(resolved.name).toBe('talk-ru Mailing List');
    expect(resolved.url).toBe('https://lists.openstreetmap.org/listinfo/talk-ru');
    expect(resolved.description).toBe('The official mailing list for OpenStreetMap Russia');
    expect(resolved.extendedDescription).toBe('Fun times for all at https://lists.openstreetmap.org/listinfo/talk-ru');
  });

  test('localized', () => {
    const stringids = {
      '_communities.openstreetmaprussia': 'OpenStreetMap Россия',
      '_defaults.mailinglist.name': '{account} Список рассылки',
      '_defaults.mailinglist.description': 'Официальный список рассылки для {community}',
      '_defaults.mailinglist.extendedDescription': 'Время развлечений для всех на {url}'
    }
    const localizer = (id) => stringids[id];

    const resolved = resolveStrings(item, defaults, localizer);
    expect(resolved).toBeInstanceOf(Object);
    expect(resolved.name).toBe('talk-ru Список рассылки');
    expect(resolved.url).toBe('https://lists.openstreetmap.org/listinfo/talk-ru');
    expect(resolved.description).toBe('Официальный список рассылки для OpenStreetMap Россия');
    expect(resolved.extendedDescription).toBe('Время развлечений для всех на https://lists.openstreetmap.org/listinfo/talk-ru');
  });

  test('Throws if an expected replacement token cannot be resolved', () => {
    const missing = {
      id: 'talk-ru',
      type: 'mailinglist',
      // account: 'talk-ru',     // missing account!
      strings: {community: 'OpenStreetMap Russia'}
    };
    expect(() => resolveStrings(missing, defaults)).toThrow(/cannot resolve token:/i);
  });

  test('Throws if any extra replacement tokens remain unresolved', () => {
    const extra = {
      id: 'talk-ru',
      type: 'mailinglist',
      account: 'talk-ru',
      strings: {
        community: 'OpenStreetMap Russia',
        name: 'This name has {extra} {tokens}'
      }
    };
    expect(() => resolveStrings(extra, defaults)).toThrow(/cannot resolve tokens:/i);
  });

});
