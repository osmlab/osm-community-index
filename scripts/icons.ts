import { styleText } from 'bun:util';

// This script will update _only_ the FontAwesome icons in `dist/img/*.svg`
// There are other icons in that folder that are not Font Awesome icons,
// (e.g. osm, youthmappers, fediverse) - this script won't touch them.

const toCopy = {
  bluesky: 'brands/bluesky',
  discord: 'brands/discord',
  discourse: 'brands/discourse',
  facebook: 'brands/square-facebook',
  forum: 'solid/comments',
  github: 'brands/square-github',
  gitlab: 'brands/square-gitlab',
  group: 'solid/users',
  irc: 'solid/keyboard',
  instagram: 'brands/square-instagram',
  linkedin: 'brands/square-linkedin',
  mailinglist: 'solid/at',
  mastodon: 'brands/mastodon',
  matrix: 'solid/comments',
  meetup: 'brands/meetup',
  newsletter: 'solid/newspaper',
  reddit: 'brands/square-reddit',
  signal: 'brands/signal-messenger',
  slack: 'brands/slack',
  telegram: 'brands/telegram',
  threads: 'brands/square-threads',
  tiktok: 'brands/tiktok',
  url: 'solid/link',
  youtube: 'brands/square-youtube',
  x: 'brands/square-x-twitter',
  zulip: 'solid/comments'
};

const START = '🏗   ' + styleText('yellow', 'Building icons…');
const END = '👍  ' + styleText('green', 'icons built');

console.log('');
console.log(START);
console.time(END);

for (const [key, path] of Object.entries(toCopy)) {
  // copy and remove the comments
  const contents = await Bun.file(`node_modules/@fortawesome/fontawesome-free/svgs/${path}.svg`).text();
  Bun.write(`dist/img/${key}.svg`, contents.replace(/<!--[\s\S\n]*?-->/g, ''));
  console.log(styleText('yellow', `${key}.svg`));
}

console.timeEnd(END);
