import chalk from 'chalk';
import fs from 'node:fs';

// This script will update _only_ the FontAwesome icons in `dist/img/*.svg`
// There are other icons in that folder that are not Font Awesome icons,
// (e.g. osm, youthmappers, fediverse) - this script won't touch them.

const toCopy = {
  bluesky: 'brands/bluesky.svg',
  discord: 'brands/discord.svg',
  discourse: 'brands/discourse.svg',
  facebook: 'brands/square-facebook.svg',
  forum: 'solid/comments.svg',
  github: 'brands/square-github.svg',
  gitlab: 'brands/square-gitlab.svg',
  group: 'solid/users.svg',
  irc: 'solid/keyboard.svg',
  instagram: 'brands/square-instagram.svg',
  linkedin: 'brands/square-linkedin.svg',
  mailinglist: 'solid/at.svg',
  mastodon: 'brands/mastodon.svg',
  matrix: 'solid/comments.svg',
  meetup: 'brands/meetup.svg',
  newsletter: 'solid/newspaper.svg',
  reddit: 'brands/square-reddit.svg',
  signal: 'brands/signal-messenger.svg',
  slack: 'brands/slack.svg',
  telegram: 'brands/telegram.svg',
  threads: 'brands/square-threads.svg',
  tiktok: 'brands/tiktok.svg',
  url: 'solid/link.svg',
  youtube: 'brands/square-youtube.svg',
  x: 'brands/square-x-twitter.svg',
  zulip: 'solid/comments.svg'
};

const START = '🏗   ' + chalk.yellow('Building icons...');
const END = '👍  ' + chalk.green('icons built');

console.log('');
console.log(START);
console.time(END);

for (const [key, file] of Object.entries(toCopy)) {
  // copy and remove the comments
  const src = fs.readFileSync(`node_modules/@fortawesome/fontawesome-free/svgs/${file}`, 'utf8');
  fs.writeFileSync(`dist/img/${key}.svg`, src.replace(/<!--[\s\S\n]*?-->/g, ''));
  console.log(chalk.yellow(`${key}.svg`));
}

console.timeEnd(END);
