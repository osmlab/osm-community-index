/* eslint-disable no-console */
const colors = require('colors/safe');
const fs = require('fs');

const fontawesome = require('@fortawesome/fontawesome');
const faAt = require('@fortawesome/fontawesome-free-solid/faAt');
const faComments = require('@fortawesome/fontawesome-free-solid/faComments');
const faFacebook = require('@fortawesome/fontawesome-free-brands/faFacebook');
const faMeetup = require('@fortawesome/fontawesome-free-brands/faMeetup');
const faReddit = require('@fortawesome/fontawesome-free-brands/faReddit');
const faSlack = require('@fortawesome/fontawesome-free-brands/faSlack');
const faTelegram = require('@fortawesome/fontawesome-free-brands/faTelegram');
const faTwitter = require('@fortawesome/fontawesome-free-brands/faTwitter');
const faUsers = require('@fortawesome/fontawesome-free-solid/faUsers');

buildAll();

function buildAll() {
    var iconMap = {
        facebook: faFacebook,
        forum: faComments,
        group: faUsers,
        mailinglist: faAt,
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

