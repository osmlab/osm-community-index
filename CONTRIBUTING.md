## Contributing

*If you don't understand the explanation below, feel free to [post an Issue](https://github.com/osmlab/osm-community-index/issues/new) to describe your community resources. That page contains some pointers to help you fill in all the info we  need. You do need [a Github account](https://github.com/join) to be able to post an Issue.*

There are 2 kinds of files in this project:

* Under `resources/` there are `.json` files to describe the community resources
* Under `features/` there are `.geojson` files to describe the areas where the communities are active

##### tl;dr

To add your community resource:

* (required) Add a **resource** `.json` file under `resources/` folder
  * This contains info about what the resource is (slack, forum, mailinglist, facebook, etc.)
  * You can just copy and change an existing one
  * Each resource needs an `includeLocations` property to say where it is active.
* (optional) Add a **feature** `.geojson` file under `features/` folder
  * This is a boundary around where the resource is active
  * You can use [geojson.io](http://geojson.io) or other tools to create these.
* `npm run test`
  * This will build and check for errors and make the files pretty


### Installing

* Clone this project, for example:
  `git clone git@github.com:osmlab/osm-community-index.git`
* `cd` into the project folder,
* Run `npm install` to install libraries


### Resources

These are `*.json` files found under the `resources/` folder.
Each resource file contains a single JSON object with information about the community resource.

Resource files look like this:

```js
{
  "id": "OSM-US-slack",
  "type": "slack",
  "includeLocations": ["us"],
  "countryCodes": ["us"],
  "languageCodes": ["en"],
  "name": "OpenStreetMap US Slack",
  "description": "All are welcome! Sign up at {signupUrl}",
  "extendedDescription": "OpenStreetMap is built by a community of mappers that..."
  "signupUrl": "https://slack.openstreetmap.us/",
  "url": "https://osmus.slack.com",
  "order": 4,
  "contacts": [
    {
      "name" : "Barney Rubble",
      "email" : "b@rubble.com"
    }
  ],
  "events": [
    {
      "id": "sotmus2019",
      "i18n": true,
      "name": "State of the Map US 2019",
      "description": "Join the OpenStreetMap community at State of the Map US in Minneapolis, Minnesota.",
      "where": "Minneapolis, Minnesota",
      "when": "2019-sep-05",
      "url": "https://2019.stateofthemap.us/"
    }
  ]
}
```

Here are the properties that a resource file can contain:

* __`id`__ - (required) A unique identifier for the resource.
* __`type`__ - (required) Type of community resource (see below for list).
* __`includeLocations`__ - (required) Array of locations where the resource is active.  May contain any of these:
  * Strings recognized by the [country-coder library](https://github.com/ideditor/country-coder#readme). These should be [ISO 3166-1 2 or 3 letter country codes or UN M.49 numeric codes](https://en.wikipedia.org/wiki/List_of_countries_by_United_Nations_geoscheme).<br/>_Example: `"de"`_
  * Filenames for `.geojson` files saved under the `/features` folder<br/>_Example: `"de-hamburg.geojson"`_
  * Points as `[longitude, latitude]` coordinate pairs.  A 25km radius circle will be computed around the point.<br/>_Example: `[8.67039, 49.41882]`_
* __`excludeLocations`__ - (optional) Array of locations to exclude from `includeLocations` (specified in the same format):
* __`name`__ - (required) Display name for this community resource
(in English, will be sent to Transifex for translation to other languages)
* __`description`__ - (required) One line description of the community resource
(in English, will be sent to Transifex for translation to other languages)
* __`extendedDescription`__ - (optional) Longer description of the community resource
(in English, will be sent to Transifex for translation to other languages)
* __`url`__ - (required) A url link to visit the community resource
* __`signupUrl`__ - (optional) A url link to sign up for the community resource
* __`countryCodes`__ - (optional) Array of [two letter country codes](https://en.wikipedia.org/wiki/List_of_countries_by_United_Nations_geoscheme) where the community is active
* __`languageCodes`__ - (optional) Array of [two letter](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) or [three letter](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) spoken by this community
* __`order`__ - (optional) When several resources with same geography are present, this adjusts the display order (default = 0, higher numbers display more prominently)


Each resource must have a `type`. The following values are supported:

Type | Icon | Description
:--- | :--- | :----------
 `aparat` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/aparat.svg"/> </sub> | An [Aparat](https://www.aparat.com/) video channel.
 `discord` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/discord.svg"/> </sub> | A [Discord](https://discordapp.com/) chat channel.
 `discourse` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/discourse.svg"/> </sub> | A [Discourse](https://www.discourse.org/) forum.
 `facebook` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/facebook.svg"/> </sub> | A [Facebook](https://facebook.com) group.
 `forum` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/forum.svg"/> </sub> | A generic web forum (e.g. a group on https://forum.openstreetmap.org/).
 `github` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/github.svg"/> </sub> | A [GitHub](https://github.com) organization or repository.
 `group` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/group.svg"/> </sub> | A generic non-OpenStreetMap local group with a `url` (e.g. [Maptime](http://maptime.io/) chapter).
 `irc` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/irc.svg"/> </sub> | An IRC channel.  `url` should be a clickable web join link, server details can go in `description`.
 `mailinglist` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/mailinglist.svg"/> </sub> | A mailing list.  `url` should be a link to the listinfo page, e.g. `https://lists.openstreetmap.org/listinfo/talk-us`.
 `matrix` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/matrix.svg"/> </sub> | A [Matrix](https://matrix.org/) chat, e.g. [Riot Chat](https://matrix.org/docs/projects/client/riot.html).
 `meetup` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/meetup.svg"/> </sub> | A [Meetup](https://www.meetup.com/) group.
 `osm` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/osm.svg"/> </sub> | A url for an OpenStreetMap group.
 `osm-lc` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/osm-lc.svg"/> </sub> | A url for an official OpenStreetMap [Local Chapter](https://wiki.openstreetmap.org/wiki/Foundation/Local_Chapters).
 `reddit` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/reddit.svg"/> </sub> | A subreddit on [Reddit](http://reddit.com).
 `slack` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/slack.svg"/> </sub> | A [Slack](https://slack.com) workspace. `url` should link to the workspace itself, and `signupUrl` can link to an inviter service (see example above).
 `telegram` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/telegram.svg"/> </sub> | A [Telegram](https://telegram.org/) channel.
 `twitter` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/twitter.svg"/> </sub> | A [Twitter](https://twitter.com) account.
 `url` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/url.svg"/> </sub> | A generic catchall for anything with a `url`.
 `wiki` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/wiki.svg"/> </sub> | An OpenStreetMap [wiki project page](https://wiki.openstreetmap.org/wiki/List_of_territory_based_projects)
 `youthmappers` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/youthmappers.svg"/> </sub> | A [YouthMappers](https://www.youthmappers.org/) chapter.
 `youtube` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@master/dist/img/youtube.svg"/> </sub> | A [YouTube](https://youtube.com) channel.

Each community resource should have at least one contact person. This is optional:

* __`name`__ - (required) The contact person's name
* __`email`__ - (required) The contact person's email address

Resources may have events. These are optional.

* __`i18n`__ - (optional) if true, `name`, `description` and `where` will be translated
* __`id`__ - (required if `i18n=true`) A unique identifier for the event
* __`name`__ - (required) Name of the event
* __`description`__ - (required) One line description of the event
* __`where`__ - (required) Where the event is
* __`when`__ - (required) When the event is (Should be a string parseable by Date.parse, and assumed to be local time zone for the event)
* __`url`__ - (optional) A url link for the event


### Features

These are `*.geojson` files found under the `features/` folder. Each feature file contains a single GeoJSON `Feature` for a region where a community resource is active.

Feature files look like this:

```js
{
  "type": "Feature",
  "id": "boston_metro",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [...]
  }
}
```

Note:  A `FeatureCollection` containing a single `Feature` is ok too - the build script can handle this.

There are many online tools to create or modify these `.geojson` files. A workflow could be:

1. Create the shape with [geojson.io](http://geojson.io) from scratch.

or

1. Generate a precise file with the [Polygon creation](http://polygons.openstreetmap.fr/) from an OSM Relation.
1. Simplify the file with [Mapshaper](http://mapshaper.org/). Beware that the simplification probably cuts some border areas.
1. So load the file in [geojson.io](http://geojson.io) and include the border areas again and perhaps reduce the point count further. It is probably better to have the feature a bit larger than missing an area.


### Building

* Just `npm run test`
  * This will check the files for errors and make them pretty.


### Translations

All community resources automatically support localization of the
`name`, `description`, and `extendedDescription` text.  These fields
should be written in US English.

The `description` and `extendedDescription` properties support the following
replacement tokens:

* __`{url}`__ - Will be replaced with the `url`
* __`{signupUrl}`__ - Will be replaced with the `signupUrl`

For example: "Sign up at {signupUrl}".

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
      "id": "sotmus2019",
      "i18n": true,
      "name": "State of the Map US 2019",
      "description": "Join the OpenStreetMap community at State of the Map US in Minneapolis, Minnesota.",
      "where": "Minneapolis, Minnesota",
      "when": "2019-sep-05",
      "url": "https://2019.stateofthemap.us/"
    }
}
```

Translations are managed using the
[Transifex](https://www.transifex.com/projects/p/id-editor/) platform.
After signing up, you can go to [iD's project page](https://www.transifex.com/projects/p/id-editor/),
select a language and click **Translate** to start translating.

The translation strings for this project are located in a resource called
[**community**](https://www.transifex.com/openstreetmap/id-editor/community/).


#### For maintainers

Transifex will automatically fetch the source file from this repository daily.
We need to manually pull down and check in the translation files whenever we
make a new release (see [RELEASE.md](RELEASE.md)).

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
