import { test } from 'tap';
import { resolveStrings } from '../index.mjs';

const item = {
  id: 'talk-ru',
  type: 'mailinglist',
  account: 'talk-ru',
  strings: {
    name: 'Override Name',
    community: 'OpenStreetMap Russia'
  }
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


test('resolveStrings', t => {

  t.test('basic', t => {
    const resolved = resolveStrings(item, defaults);
    t.type(resolved, 'object');

    t.equal(resolved.name, 'Override Name');
    t.equal(resolved.url, 'https://lists.openstreetmap.org/listinfo/talk-ru');
    t.equal(resolved.signupUrl, undefined);
    t.equal(resolved.description, 'The official mailing list for OpenStreetMap Russia');
    t.equal(resolved.extendedDescription, 'Fun times for all at https://lists.openstreetmap.org/listinfo/talk-ru');

    t.equal(resolved.nameHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">Override Name</a>');
    t.equal(resolved.urlHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    t.equal(resolved.signupUrlHTML, undefined);
    t.equal(resolved.descriptionHTML, 'The official mailing list for OpenStreetMap Russia');
    t.equal(resolved.extendedDescriptionHTML, 'Fun times for all at <a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    t.end();
  });


  t.test('localized', t => {
    const stringids = {
      'talk-ru.name': 'переопределить имя',
      '_communities.openstreetmaprussia': 'OpenStreetMap Россия',
      '_defaults.mailinglist.name': '{account} Список рассылки',
      '_defaults.mailinglist.description': 'Официальный список рассылки для {community}',
      '_defaults.mailinglist.extendedDescription': 'Время развлечений для всех на {url}'
    };
    const localizer = (id) => stringids[id];

    const resolved = resolveStrings(item, defaults, localizer);
    t.type(resolved, 'object');

    t.equal(resolved.name, 'переопределить имя');
    t.equal(resolved.url, 'https://lists.openstreetmap.org/listinfo/talk-ru');
    t.equal(resolved.signupUrl, undefined);
    t.equal(resolved.description, 'Официальный список рассылки для OpenStreetMap Россия');
    t.equal(resolved.extendedDescription, 'Время развлечений для всех на https://lists.openstreetmap.org/listinfo/talk-ru');

    t.equal(resolved.nameHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">переопределить имя</a>');
    t.equal(resolved.urlHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    t.equal(resolved.signupUrlHTML, undefined);
    t.equal(resolved.descriptionHTML, 'Официальный список рассылки для OpenStreetMap Россия');
    t.equal(resolved.extendedDescriptionHTML, 'Время развлечений для всех на <a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    t.end();
  });


  t.test('Throws if an expected replacement token cannot be resolved', t => {
    const missing = {
      id: 'talk-ru',
      type: 'mailinglist',
      // account: 'talk-ru',     // missing account!
      strings: { community: 'OpenStreetMap Russia' }
    };

    t.throws(() => resolveStrings(missing, defaults), /cannot resolve token:/i);
    t.end();
  });


  t.test('Throws if any extra replacement tokens remain unresolved', t => {
    const extra = {
      id: 'talk-ru',
      type: 'mailinglist',
      account: 'talk-ru',
      strings: {
        community: 'OpenStreetMap Russia',
        name: 'This name has {extra} {tokens}'
      }
    };

    t.throws(() => resolveStrings(extra, defaults), /cannot resolve tokens:/i);
    t.end();
  });


  t.test('Linkify subreddits in description, extendedDescription', t => {
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
    t.type(resolved, 'object');
    t.equal(resolved.descriptionHTML, '<a target="_blank" href="https://www.reddit.com/r/openstreetmap">/r/openstreetmap</a> is a great place to learn more about OpenStreetMap.');
    t.equal(resolved.extendedDescriptionHTML, 'Fun times for all at <a target="_blank" href="https://www.reddit.com/r/openstreetmap">/r/openstreetmap</a>');
    t.end();
  });

  t.end();
});
