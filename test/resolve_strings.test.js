import { describe, it } from 'bun:test';
import { strict as assert } from 'bun:assert';
import { resolveStrings } from '../src/oci.ts';


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


describe('resolveStrings', () => {

  it('basic', () => {
    const resolved = resolveStrings(item, defaults);
    assert.ok(resolved instanceof Object);

    assert.equal(resolved.name, 'Override Name');
    assert.equal(resolved.url, 'https://lists.openstreetmap.org/listinfo/talk-ru');
    assert.equal(resolved.signupUrl, undefined);
    assert.equal(resolved.description, 'The official mailing list for OpenStreetMap Russia');
    assert.equal(resolved.extendedDescription, 'Fun times for all at https://lists.openstreetmap.org/listinfo/talk-ru');

    assert.equal(resolved.nameHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">Override Name</a>');
    assert.equal(resolved.urlHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    assert.equal(resolved.signupUrlHTML, undefined);
    assert.equal(resolved.descriptionHTML, 'The official mailing list for OpenStreetMap Russia');
    assert.equal(resolved.extendedDescriptionHTML, 'Fun times for all at <a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
  });


  it('localized', () => {
    const stringids = {
      'talk-ru.name': 'переопределить имя',
      '_communities.openstreetmaprussia': 'OpenStreetMap Россия',
      '_defaults.mailinglist.name': '{account} Список рассылки',
      '_defaults.mailinglist.description': 'Официальный список рассылки для {community}',
      '_defaults.mailinglist.extendedDescription': 'Время развлечений для всех на {url}'
    };
    const localizer = (id) => stringids[id];

    const resolved = resolveStrings(item, defaults, localizer);
    assert.ok(resolved instanceof Object);

    assert.equal(resolved.name, 'переопределить имя');
    assert.equal(resolved.url, 'https://lists.openstreetmap.org/listinfo/talk-ru');
    assert.equal(resolved.signupUrl, undefined);
    assert.equal(resolved.description, 'Официальный список рассылки для OpenStreetMap Россия');
    assert.equal(resolved.extendedDescription, 'Время развлечений для всех на https://lists.openstreetmap.org/listinfo/talk-ru');

    assert.equal(resolved.nameHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">переопределить имя</a>');
    assert.equal(resolved.urlHTML, '<a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
    assert.equal(resolved.signupUrlHTML, undefined);
    assert.equal(resolved.descriptionHTML, 'Официальный список рассылки для OpenStreetMap Россия');
    assert.equal(resolved.extendedDescriptionHTML, 'Время развлечений для всех на <a target="_blank" href="https://lists.openstreetmap.org/listinfo/talk-ru">https://lists.openstreetmap.org/listinfo/talk-ru</a>');
  });


  it('Throws if an expected replacement token cannot be resolved', () => {
    const missing = {
      id: 'talk-ru',
      type: 'mailinglist',
      // account: 'talk-ru',     // missing account!
      strings: { community: 'OpenStreetMap Russia' }
    };

    assert.throws(() => resolveStrings(missing, defaults), /cannot resolve token:/i);
  });


  it('Throws if any extra replacement tokens remain unresolved', () => {
    const extra = {
      id: 'talk-ru',
      type: 'mailinglist',
      account: 'talk-ru',
      strings: {
        community: 'OpenStreetMap Russia',
        name: 'This name has {extra} {tokens}'
      }
    };

    assert.throws(() => resolveStrings(extra, defaults), /cannot resolve tokens:/i);
  });


  it('Linkify subreddits in description, extendedDescription', () => {
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
    assert.ok(resolved instanceof Object);
    assert.equal(resolved.descriptionHTML, '<a target="_blank" href="https://www.reddit.com/r/openstreetmap">/r/openstreetmap</a> is a great place to learn more about OpenStreetMap.');
    assert.equal(resolved.extendedDescriptionHTML, 'Fun times for all at <a target="_blank" href="https://www.reddit.com/r/openstreetmap">/r/openstreetmap</a>');
  });

});
