const resolveStrings = require('../lib/resolve_strings.js');

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
    const item = {
      id: 'talk-ru',
      type: 'mailinglist',
      account: 'talk-ru',
      locationSet: {'include': ['ru']},
      strings: {community: 'OpenStreetMap Russia'}
    };

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

    const item = {
      id: 'talk-ru',
      type: 'mailinglist',
      account: 'talk-ru',
      locationSet: {'include': ['ru']},
      strings: {community: 'OpenStreetMap Russia'}
    };

    const resolved = resolveStrings(item, defaults, localizer);
    expect(resolved).toBeInstanceOf(Object);
    expect(resolved.name).toBe('talk-ru Список рассылки');
    expect(resolved.url).toBe('https://lists.openstreetmap.org/listinfo/talk-ru');
    expect(resolved.description).toBe('Официальный список рассылки для OpenStreetMap Россия');
    expect(resolved.extendedDescription).toBe('Время развлечений для всех на https://lists.openstreetmap.org/listinfo/talk-ru');
  });

});
