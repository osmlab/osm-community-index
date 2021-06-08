import colors from 'colors/safe.js';
import fs from 'node:fs';

import fontawesome from '@fortawesome/fontawesome-svg-core';
import {
  faAt, faComments, faKeyboard, faLink, faUsers
} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord, faDiscourse, faFacebook, faGithub, faGitlab,
  faMeetup, faReddit, faSlack, faTelegram, faTwitter, faYoutube
} from '@fortawesome/free-brands-svg-icons';

buildAll();

function buildAll() {
  const faIconMap = {
    discord: faDiscord,
    discourse: faDiscourse,
    facebook: faFacebook,
    forum: faComments,
    github: faGithub,
    gitlab: faGitlab,
    group: faUsers,
    irc: faKeyboard,
    mailinglist: faAt,
    matrix: faComments,
    meetup: faMeetup,
    reddit: faReddit,
    slack: faSlack,
    telegram: faTelegram,
    twitter: faTwitter,
    url: faLink,
    xmpp: faKeyboard,
    youtube: faYoutube
  };

  const START = '🏗   ' + colors.yellow('Building icons...');
  const END = '👍  ' + colors.green('icons built');

  console.log('');
  console.log(START);
  console.time(END);

  for (let key in faIconMap) {
    const val = faIconMap[key];
    const file = `dist/img/${key}.svg`;
    console.log(colors.yellow(file));
    fs.writeFileSync(file, fontawesome.icon(val).html);
  }

  console.timeEnd(END);
}
