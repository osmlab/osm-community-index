import chalk from 'chalk';
import fs from 'node:fs';
import { icon } from '@fortawesome/fontawesome-svg-core';

import {
  faAt, faComment, faComments, faKeyboard, faLink, faNewspaper, faUsers
} from '@fortawesome/free-solid-svg-icons';

import {
  faDiscord, faDiscourse, faLinkedin, faMastodon, faMeetup, faSlack,
  faSquareFacebook, faSquareGithub, faSquareGitlab, faSquareReddit,
  faSquareThreads, faSquareXTwitter, faSquareYoutube, faTelegram,
} from '@fortawesome/free-brands-svg-icons';

const toBuild = {
  discord: faDiscord,
  discourse: faDiscourse,
  facebook: faSquareFacebook,
  forum: faComments,
  github: faSquareGithub,
  gitlab: faSquareGitlab,
  group: faUsers,
  irc: faKeyboard,
  linkedin: faLinkedin,
  mailinglist: faAt,
  mastodon: faMastodon,
  matrix: faComments,
  meetup: faMeetup,
  newsletter: faNewspaper,
  reddit: faSquareReddit,
  signal: faComment,
  slack: faSlack,
  telegram: faTelegram,
  threads: faSquareThreads,
  twitter: faSquareXTwitter,
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
