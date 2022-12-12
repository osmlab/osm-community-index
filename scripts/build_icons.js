import chalk from 'chalk';
import fs from 'node:fs';
import { icon } from '@fortawesome/fontawesome-svg-core';

import {
  faAt, faComment, faComments, faKeyboard, faLink, faNewspaper, faUsers
} from '@fortawesome/free-solid-svg-icons';

import {
  faDiscord, faDiscourse, faFacebook, faGithub, faGitlab, faLinkedin,
  faMastodon, faMeetup, faReddit, faSlack, faTelegram, faTwitter, faYoutube
} from '@fortawesome/free-brands-svg-icons';

const toBuild = {
  discord: faDiscord,
  discourse: faDiscourse,
  facebook: faFacebook,
  forum: faComments,
  github: faGithub,
  gitlab: faGitlab,
  group: faUsers,
  irc: faKeyboard,
  linkedin: faLinkedin,
  mailinglist: faAt,
  mastodon: faMastodon,
  matrix: faComments,
  meetup: faMeetup,
  newsletter: faNewspaper,
  reddit: faReddit,
  signal: faComment,
  slack: faSlack,
  telegram: faTelegram,
  twitter: faTwitter,
  url: faLink,
  youtube: faYoutube
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
