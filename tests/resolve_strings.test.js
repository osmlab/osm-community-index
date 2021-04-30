const resolveStrings = require('../lib/resolve_strings.js');

const item = {
  id: 'talk-ru',
  type: 'mailinglist',
  account: 'talk-ru',
  strings: {community: 'OpenStreetMap Russia'}
};

const defaults = {
  mailinglist: {
    name: '{account} Mailing List',
    description: 'The official mailing list for {community}',
    extendedDescription: 'Fun times for all at {url}',
    url: 'https://lists.openstreetmap.org/listinfo/{account}'
  },
  reddit: {
    name: '{community} on Reddit',
    url: 'https://www.reddit.com/r/{account}'
  }
};


describe('resolveStrings', () => {

  test('basic', () => {
    const resolved = resolveStrings(item, defaults);
    expect(resolved).toBeInstanceOf(Object);

    expect(resolved.name).toBe('talk-ru Mailing List');
    expect(resolved.url).toBe('https://lists.openstreetmap.org/listinfo/talk-ru');
    expect(resolved.signupUrl).toBeUndefined();
    expect(resolved.description).toBe('The official mailing list for OpenStreetMap Russia');
    expect(resolved.extendedDescription).toBe('Fun times for all at https://lists.openstreetmap.org/listinfo/talk-ru');

    expect(resolved.nameHTML).toBe('<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">talk-ru Mailing List</a>');
    expect(resolved.urlHTML).toBe('<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    expect(resolved.signupUrlHTML).toBeUndefined();
    expect(resolved.descriptionHTML).toBe('The official mailing list for OpenStreetMap Russia');
    expect(resolved.extendedDescriptionHTML).toBe('Fun times for all at <a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
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
    expect(resolved.signupUrl).toBeUndefined();
    expect(resolved.description).toBe('Официальный список рассылки для OpenStreetMap Россия');
    expect(resolved.extendedDescription).toBe('Время развлечений для всех на https://lists.openstreetmap.org/listinfo/talk-ru');

    expect(resolved.nameHTML).toBe('<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">talk-ru Список рассылки</a>');
    expect(resolved.urlHTML).toBe('<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    expect(resolved.signupUrlHTML).toBeUndefined();
    expect(resolved.descriptionHTML).toBe('Официальный список рассылки для OpenStreetMap Россия');
    expect(resolved.extendedDescriptionHTML).toBe('Время развлечений для всех на <a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
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


  test('Linkify subreddits in description, extendedDescription', () => {
    const subreddit = {
      id: 'OSM-Reddit',
      type: 'reddit',
      account: 'openstreetmap',
      strings: {
        community: 'OpenStreetMap',
        description: '/r/{account} is a great place to learn more about OpenStreetMap.',
        extendedDescription: 'Fun times for all at /r/{account}'
      }
    };

    const resolved = resolveStrings(subreddit, defaults);
    expect(resolved).toBeInstanceOf(Object);
    expect(resolved.descriptionHTML).toBe('<a target="_blank" href="https://www.reddit.com/r/openstreetmap">/r/openstreetmap</a> is a great place to learn more about OpenStreetMap.');
    expect(resolved.extendedDescriptionHTML).toBe('Fun times for all at <a target="_blank" href="https://www.reddit.com/r/openstreetmap">/r/openstreetmap</a>');
  });

});
