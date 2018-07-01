/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');

const fontawesome = require('@fortawesome/fontawesome');
const faAt = require('@fortawesome/fontawesome-free-solid/faAt');
const faComments = require('@fortawesome/fontawesome-free-solid/faComments');
const faDiscord = require('@fortawesome/fontawesome-free-brands/faDiscord');
const faDiscourse = require('@fortawesome/fontawesome-free-brands/faDiscourse');
const faFacebook = require('@fortawesome/fontawesome-free-brands/faFacebook');
const faGithub = require('@fortawesome/fontawesome-free-brands/faGithub');
const faKeyboard = require('@fortawesome/fontawesome-free-solid/faKeyboard');
const faMeetup = require('@fortawesome/fontawesome-free-brands/faMeetup');
const faReddit = require('@fortawesome/fontawesome-free-brands/faReddit');
const faSlack = require('@fortawesome/fontawesome-free-brands/faSlack');
const faTelegram = require('@fortawesome/fontawesome-free-brands/faTelegram');
const faTwitter = require('@fortawesome/fontawesome-free-brands/faTwitter');
const faUsers = require('@fortawesome/fontawesome-free-solid/faUsers');

buildAll();

function buildAll() {
    var iconMap = {
        discord: faDiscord,
        discourse: faDiscourse,
        facebook: faFacebook,
        forum: faComments,
        github: faGithub,
        group: faUsers,
        irc: faKeyboard,
        mailinglist: faAt,
        matrix: faComments,
        meetup: faMeetup,
        reddit: faReddit,
        slack: faSlack,
        telegram: faTelegram,
        twitter: faTwitter
    };

    console.log('building icons');
    console.time(colors.green('icons built'));

    for (var key in iconMap) {
        var val = iconMap[key];
        var file = 'dist/img/' + key + '.svg';
        console.log(colors.yellow(file));
        fs.writeFileSync(file, fontawesome.icon(val).html);
    }

    console.timeEnd(colors.green('icons built'));
}

