[![npm version](https://badge.fury.io/js/osm-community-index.svg)](https://badge.fury.io/js/osm-community-index)
[![Build Status](https://travis-ci.org/osmlab/osm-community-index.svg?branch=master)](https://travis-ci.org/osmlab/osm-community-index)
[![Greenkeeper badge](https://badges.greenkeeper.io/osmlab/osm-community-index.svg)](https://greenkeeper.io/)

## osm-community-index


:speech_balloon: An index of local community resources for OpenStreetMap.

### What is it?

This project is a list of resources for local users of OpenStreetMap.

"Resources" can be links to forums, meetups, Slack groups, IRC channels,
mailing lists, and so on.  Anything that mappers, especially beginners,
might find interesting or helpful.


### About the index

The source files for this index are stored in two kinds of files:

#### Features

These are `*.geojson` files found under the `features/` folder.
Each feature file contains a single GeoJSON `Feature` for an area where a
resource is active.

Each feature must have a unique `id` attribute, for example `usa_full`.

```js
{
  "type": "Feature",
  "id": "usa_full"
  "properties": null,
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [
      ...
    ]
  }
}
```

#### Resources

These are `*.json` files found under the `resources/` folder.
Each resource file contains a single JSON object with information about
the community resource.

Each resource must have a unique `id` property.
The `featureId` property links the resource to a single feature.

```js
{
  "id": "OSM-US-Slack",
  "featureId": "usa_full",
  "type": "slack",
  "countryCode": "us",
  "name": "OpenStreetMap US Slack",
  "description": "All are welcome! Sign up at {signupUrl}",
  "signupUrl": "https://osmus-slack.herokuapp.com/",
  "url": "https://osmus.slack.com",
  "contacts": [
    {"name" : "Barney Rubble", "email" : "b@rubble.com"}
  ]
}
```


### Contributing

#### Prerequisites

* [Node.js](https://nodejs.org/) version 4 or newer
* [`git`](https://www.atlassian.com/git/tutorials/install-git/) for your platform

#### Installing

* Clone this project, for example:
  `git clone git@github.com:osmlab/osm-community-index.git`
* `cd` into the project folder,
* Run `npm install` to install libraries

#### Building

* Just `npm run build`
* These files will be generated:
  * `/dist/features.json`
  * `/dist/features.min.json`
  * `/dist/resources.json`
  * `/dist/resources.min.json`


### Translations

All community resources automatically support localization of the
`name`, `description`, and `extendedDescription` text.  These fields
should be written in US English.

The description field also supports the following replacement tokens:
* `{signupUrl}` - Will be replaced with the `signupURL`

If a resource includes events, you can choose whether to write the
`name`, `description`, and `where` fields in your local language, or
write in US English and add `"i18n": true` to allow translation of these
values (useful for events with a wider audience).

```js
{
  "id": "OSM-US-Slack",
  "name": "OpenStreetMap US Slack",
  ...
  "events": [
    {
      "id": "sotmus2017",
      "i18n": true,
      "name": "State of the Map US 2017",
      "description": "Join the OpenStreetMap community at State of the Map US in Boulder, Colorado.",
      "where": "Boulder, Colorado, USA",
      "when": "2017-10-20",
      "url": "https://2017.stateofthemap.us/"
    }
}
```

Translations are managed using the
[Transifex](https://www.transifex.com/projects/p/id-editor/) platform.
After signing up, you can go to [iD's project page](https://www.transifex.com/projects/p/id-editor/),
select a language and click **Translate** to start translating.

The translation strings for this project are located in a resource called
[**community**](https://www.transifex.com/openstreetmap/id-editor/community/).

#### Working with translation files

To work with translation files,
[install the Transifex Client](https://docs.transifex.com/client/introduction) software.

The Transifex Client uses a file
[`~/.transifex.rc`](https://docs.transifex.com/client/client-configuration#-transifexrc)
to store your username and password.

Note that you can also use a
[Transifex API Token](https://docs.transifex.com/api/introduction#authentication)
in place of your username and password.  In this usage, the username is `api`
and the password is the generated API token.

Once you have installed the client and setup the `~/.transifex.rc` file, you can
use the following commands:

* `tx push -s`  - upload latest source `/i18n/en.yaml` file to Transifex
* `tx pull -a`  - download latest translation files to `/i18n/<lang>.yaml`

For convenience you can also run these commands as `npm run txpush` or `npm run txpull`.
