import chalk from 'chalk';
import fs from 'node:fs';
import { icon } from '@fortawesome/fontawesome-svg-core';

// This script will update _only_ the FontAwesome icons in `dist/img/*.svg`
// There are other icons in that folder that are not Font Awesome icons,
// (e.g. osm, youthmappers, fediverse) - this script won't touch them.

import {
  faAt, faComment, faComments, faKeyboard, faLink, faNewspaper, faUsers
} from '@fortawesome/free-solid-svg-icons';

import {
  faBluesky, faDiscord, faDiscourse, faLinkedin, faMastodon, faMeetup, faSlack, faSignalMessenger,
  faTiktok, faSquareFacebook, faSquareGithub, faSquareGitlab, faSquareInstagram, faSquareReddit,
  faSquareThreads, faSquareXTwitter, faSquareYoutube, faTelegram,
} from '@fortawesome/free-brands-svg-icons';


const toBuild = {
  bluesky: faBluesky,
  discord: faDiscord,
  discourse: faDiscourse,
  facebook: faSquareFacebook,
  forum: faComments,
  github: faSquareGithub,
  gitlab: faSquareGitlab,
  group: faUsers,
  irc: faKeyboard,
  instagram: faSquareInstagram,
  linkedin: faLinkedin,
  mailinglist: faAt,
  mastodon: faMastodon,
  matrix: faComments,
  meetup: faMeetup,
  newsletter: faNewspaper,
  reddit: faSquareReddit,
  signal: faSignalMessenger,
  slack: faSlack,
  telegram: faTelegram,
  threads: faSquareThreads,
  telegram: faTelegram,
  tiktok: faTiktok,
  url: faLink,
  youtube: faSquareYoutube,
  x: faSquareXTwitter,
  zulip: faComments
};

const START = '🏗   ' + chalk.yellow('Building icons...');
const END = '👍  ' + chalk.green('icons built');

console.log('');
console.log(START);
console.time(END);

for (const [key, value] of Object.entries(toBuild)) {
  const file = `dist/img/${key}.svg`;
  console.log(chalk.yellow(file));

  // console.log( JSON.stringify(icon(value).html[0], null, 2) );
  fs.writeFileSync(file, icon(value).html[0]);
}

console.timeEnd(END);
