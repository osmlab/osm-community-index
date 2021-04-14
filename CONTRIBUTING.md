## Contributing

*If you don't understand the explanation below, feel free to [post an Issue](https://github.com/osmlab/osm-community-index/issues/new) to describe your community resources. That page contains some pointers to help you fill in all the info we  need. You do need [a Github account](https://github.com/join) to be able to post an Issue.*

There are 2 kinds of files in this project:

* Under `resources/` there are `.json` files to describe the community resources
* Under `features/` there are custom `.geojson` files

### tl;dr

To add your community resource to the index:

* Add resource `.json` files under the `resources/` folder
  * Each file contains info about what the resource is (slack, forum, mailinglist, facebook, etc.)
  * Each file also contains info about which locations the resource is active. The locations can be country or region codes, points, or custom `.geojson` files in the `features/*` folder.
  * You can copy and change an existing file to get started.
* run `npm install`
* run `npm run test`
  * This will check the files for errors and make them pretty.
  * If you don't have Node installed, you can skip this step and we will do it for you.
* If there are no errors, submit a pull request.


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
  "locationSet": { "include": ["us"] }
  "languageCodes": ["en"],
  "signupUrl": "https://slack.openstreetmap.us/",
  "url": "https://osmus.slack.com",
  "order": 4,
  "strings": {
    "name": "OpenStreetMap US Slack",
    "description": "All are welcome! Sign up at {signupUrl}",
    "extendedDescription": "OpenStreetMap is built by a community of mappers that..."
  },
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
* __`locationSet`__ - (required) Where the community resource is active (see below for details).
* __`type`__ - (required) Type of community resource (see below for list).
* __`url`__ - (required) A url link to visit the community resource
* __`signupUrl`__ - (optional) A url link to sign up for the community resource
* __`account`__ - (optional) String containing the account information (e.g. `talk-af`)
* __`languageCodes`__ - (optional) Array of [two letter](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) or [three letter](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) spoken by this community
* __`order`__ - (optional) When several resources with same geography are present, this adjusts the display order (default = 0, higher numbers display more prominently)
* __`strings`__ - (required) Text strings describing this resource (see below for details).
* __`contacts`__ - (optional) Contact information for people who are responsible for the resource (see below for details).
* __`events`__ - (optional) Upcoming events that the resource wants to promote (see below for details).


#### locationSet

Each resource must have a `locationSet` to define where the resource is active.

```js
"locationSet": {
  "include": [ Array of locations ],   // required
  "exclude": [ Array of locations ]    // optional
}
```

The "locations" can be any of the following:

- Strings recognized by the [country-coder library](https://github.com/ideditor/country-coder#readme).<br/>
  These include [ISO 3166-1 2 or 3 letter country codes](https://en.wikipedia.org/wiki/List_of_countries_by_United_Nations_geoscheme), [UN M.49 numeric codes](https://en.wikipedia.org/wiki/UN_M49), and supported Wikidata QIDs.<br/>
  _Examples: `"de"`, `"001"`, `"conus"`, `"gb-sct"`, `"Q620634"`_<br/>
  👉 A current list of supported codes can be found at <https://ideditor.codes>

- Filenames for custom `.geojson` features. If you want to use your own features, you need to add them under the `features/*` folder of this project (see [Features](#features) below for details)<br/>
  Each `Feature` must have an `id` that ends in `.geojson`.<br/>
  _Examples: `"de-hamburg.geojson"`, `"new_jersey.geojson"`_

- Circular areas defined as `[longitude, latitude, radius?]` Array.<br/>
  Radius is specified in kilometers and is optional. If not specified, it will default to a 25km radius.<br/>
  _Examples: `[8.67039, 49.41882]`, `[-88.3726, 39.4818, 32]`_

##### `locationSet` tips:
- The M49 code for the whole world is `"001"`
- A current list of supported codes can be found at <https://ideditor.codes>
- You can view examples and learn more about working with `locationSets` in the [@ideditor/location-conflation](https://github.com/ideditor/location-conflation/blob/main/README.md) project.
- You can test locationSets on this interactive map:  https://ideditor.github.io/location-conflation/


#### type

Each resource must have a `type`. The following values are supported:

Type | Icon | Description
:--- | :--- | :----------
 `aparat` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/aparat.svg"/> </sub> | An [Aparat](https://www.aparat.com/) video channel. `account` should contain the channel name.
 `discord` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/discord.svg"/> </sub> | A [Discord](https://discordapp.com/) chat server. `account` should contain the server name.
 `discourse` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/discourse.svg"/> </sub> | A [Discourse](https://www.discourse.org/) forum.
 `facebook` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/facebook.svg"/> </sub> | A [Facebook](https://facebook.com) group/account. `account` should contain the group/account name.
 `forum` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/forum.svg"/> </sub> | A generic web forum (e.g. a group on https://forum.openstreetmap.org/). For forums hosted on https://forum.openstreetmap.org, `account` should contain the numeric forum identifier.
 `github` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/github.svg"/> </sub> | A [GitHub](https://github.com) organization. `account` should contain the organization name.
 `gitlab` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/gitlab.svg"/> </sub> | A [GitLab](https://gitlab.com) organization. `account` should contain the organization name.
 `group` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/group.svg"/> </sub> | A generic non-OpenStreetMap local group with a `url` (e.g. [Maptime](http://maptime.io/) chapter).
 `irc` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/irc.svg"/> </sub> | An IRC channel.  `url` should be a clickable web join link, server details can go in `description`. `account` should contain the channel name (without leading '#').
 `mailinglist` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/mailinglist.svg"/> </sub> | A mailing list.  `url` should be a link to the listinfo page, e.g. `https://lists.openstreetmap.org/listinfo/talk-et`.  `account` should contain the mailing list name (e.g. 'talk-et').
 `matrix` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/matrix.svg"/> </sub> | A [Matrix](https://matrix.org/) chat, e.g. [Riot Chat](https://matrix.org/docs/projects/client/riot.html).
 `meetup` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/meetup.svg"/> </sub> | A [Meetup](https://www.meetup.com/) group. `account` should contain the group account name.
 `osm` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/osm.svg"/> </sub> | A url for an OpenStreetMap group.
 `osm-lc` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/osm-lc.svg"/> </sub> | A url for an official OpenStreetMap [Local Chapter](https://wiki.openstreetmap.org/wiki/Foundation/Local_Chapters).
 `reddit` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/reddit.svg"/> </sub> | A subreddit on [Reddit](http://reddit.com). `account` should contain the subreddit name (without leading '/r/').
 `slack` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/slack.svg"/> </sub> | A [Slack](https://slack.com) workspace. `url` should link to the workspace itself, and `signupUrl` can link to an inviter service (see example above).
 `telegram` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/telegram.svg"/> </sub> | A [Telegram](https://telegram.org/) channel/group. `account` should contain the channel/group name.
 `twitter` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/twitter.svg"/> </sub> | A [Twitter](https://twitter.com) account. `account` should contain account name (without leading '@').
 `url` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/url.svg"/> </sub> | A generic catchall for anything with a `url`.
 `wiki` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/wiki.svg"/> </sub> | An OpenStreetMap [wiki project page](https://wiki.openstreetmap.org/wiki/List_of_territory_based_projects)
 `xmpp` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/xmpp.svg"/> </sub> | An XMPP/Jabber channel.  `url` should be a clickable web join link, server details can go in `description`.
 `youthmappers` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/youthmappers.svg"/> </sub> | A [YouthMappers](https://www.youthmappers.org/) chapter.
 `youtube` | <sub><img width="20" src="https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/img/youtube.svg"/> </sub> | A [YouTube](https://youtube.com) channel. `account` should contain the channel name.


#### strings

The `strings` object contains text strings that describe the community resource.
Strings should be supplied in US English, and they will be sent to Transifex for translation to other languages.

* __`community`__ - (optional) Display name for the community (e.g. "OpenStreetMap Ethiopia")
* __`name`__ - (optional) Display name for this community resource (e.g. "OpenStreetMap Ethiopia on Facebook")
* __`description`__ - (optional) One line description of the community resource
* __`extendedDescription`__ - (optional) Longer description of the community resource

Also, all string properties support the following _replacement tokens_:

* __`{account}`__ - Will be replaced with the `account` value
(e.g. "The {account} mailing list" -> "The talk-et mailing list")
* __`{community}`__ - Will be replaced with the `community` value
(e.g. "{community} on Facebook" -> "OpenStreetMap Ethiopia on Facebook")
* __`{url}`__ - Will be replaced with the `url` value
(e.g. "Visit {url} to learn more" -> "Visit `http://example.com` to learn more ")
* __`{signupUrl}`__ - Will be replaced with the `signupUrl` value
(e.g. "Signup at {signupUrl}" -> "Sign up at `http://example.com` ")

Many resource types support _default string values_ found in [`defaults.json`](defaults.json), for example:
```js
"facebook": {
  "name": "{community} on Facebook",
  "description": "Join our community on Facebook"
},
"mailinglist": {
  "name": "{account} Mailing List",
  "description": "The official mailing list for {community}"
},
…
```

Although all string properties are optional, **each resource must be able to resolve a `name` and `description`**, either by specifying them directly or generating them from default values and replacement tokens.


#### contacts

Each community resource should have at least one contact person. This is optional.

* __`name`__ - (required) The contact person's name
* __`email`__ - (required) The contact person's email address


#### events

Resources may have upcoming events. These are optional.

* __`i18n`__ - (optional) if true, `name`, `description` and `where` will be translated
* __`id`__ - (required if `i18n=true`) A unique identifier for the event
* __`name`__ - (required) Name of the event
* __`description`__ - (required) One line description of the event
* __`where`__ - (required) Where the event is
* __`when`__ - (required) When the event is (Should be a string parseable by Date.parse, and assumed to be local time zone for the event)
* __`url`__ - (optional) A url link for the event


### Features

These are optional `*.geojson` files found under the `features/` folder. Each feature file contains a single GeoJSON `Feature` for a region where a community resource is active.

Feature files look like this:

```js
{
  "type": "Feature",
  "id": "boston_metro.geojson",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [...]
  }
}
```

Note:  A `FeatureCollection` containing a single `Feature` is ok too - the build script can handle this.

There are many online tools to create or modify these `.geojson` files.
Drawing a simple shape with [geojson.io](http://geojson.io) works great.


### Building

* Just `npm run test`
  * This will check the files for errors and make them pretty.


### Running locally ###

If you want to test the changes you've made, use this three simple steps:
1. In case it's not already installed `npm install http-server`
2. Create the folder `docs-local` in your directory (don't worry, it's in .gitignore)
3. Run `npm run local`

The latter will build the distribution files (`npm run dist`), execute a script to prepare the distribution files to run locally and then start the simple http-server, which by default listens on `http://localhost:8081`. You can now browse to that address and see your changes in action.


### Translations

All community resources automatically support localization of the
`name`, `description`, and `extendedDescription` text.  These fields
should be written in US English.


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
