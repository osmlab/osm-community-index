## Contributing

*If you don't understand the explanation below, feel free to [post an Issue](https://github.com/osmlab/osm-community-index/issues/new) to describe your community resources. That page contains some pointers to help you fill in all the info we  need. You do need [a Github account](https://github.com/join) to be able to post an Issue.*

There are 2 kinds of files in this project:

* Under `features/` there are `.geojson` files to describe the areas where the communities are active
* Under `resources/` there are `.json` files to describe the community resources

##### tl;dr

To add your community resource:

* Add a **feature** `.geojson` file under `features/` folder
  * This is a boundary around where the resource is active
  * You can use [geojson.io](http://geojson.io) to create these
* Add a **resource** `.json` file under `resources/` folder
  * This contains info about what the resource is (slack, forum, mailinglist, facebook, etc.)
  * You can just copy and change an existing one
  * Several resources can share the same `.geojson` feature
* `npm run test`
  * This will build and check for errors and make the files pretty


### Features

These are `*.geojson` files found under the `features/` folder.
Each feature file contains a single GeoJSON `Feature` for an area where a
community resource is active.

Feature files look like this:

```js
{
  "type": "Feature",
  "id": "usa_full",
  "properties": {},
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [
      ...
    ]
  }
}
```

You can use a site like [geojson.io](http://geojson.io) to create or modify these `.geojson` files.

Each feature must have a unique `id` property, for example `usa_full`.


### Resources

These are `*.json` files found under the `resources/` folder.
Each resource file contains a single JSON object with information about
the community resource.

Resource files look like this:

```js
{
  "id": "OSM-US-slack",
  "featureId": "usa_full",
  "type": "slack",
  "countryCodes": ["us"],
  "languageCodes": ["en"],
  "name": "OpenStreetMap US Slack",
  "description": "All are welcome! Sign up at {signupUrl}",
  "extendedDescription": "OpenStreetMap is built by a community of mappers that..."
  "signupUrl": "https://osmus-slack.herokuapp.com/",
  "url": "https://osmus.slack.com",
  "contacts": [
    {
      "name" : "Barney Rubble",
      "email" : "b@rubble.com"
    }
  ],
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
  ]
}
```

Here are the properties that a resource file can contain:

* __`id`__ - (required) A unique identifier for the resource
* __`featureId`__ - (optional) A unique identifier for the feature. This `featureId` matches
the resource to a .geojson feature. If null, this is a global resource.
* __`type`__ - (required) Type of community resource. The following types are supported:
  * "discord"
  * "discourse"
  * "facebook"
  * "forum" - For example, on forum.openstreetmap.org
  * "group" - Generic catchall for anything with a `url` (such as a local OSM chapter page)
  * "irc" - `url` should be a clickable web join link, server details can go in `description`
  * "mailinglist" - `url` should be a link to the listinfo page, e.g. `https://lists.openstreetmap.org/listinfo/talk-us`
  * "matrix" - e.g. [Riot Chat](https://matrix.org/docs/projects/client/riot.html)
  * "meetup"
  * "reddit"
  * "slack" - `url` should link to the Slack itself, and `signupUrl` can link to an inviter service (see example above)
  * "telegram"
  * "twitter"
* __`name`__ - (required) Display name for this community resource
* __`description`__ - (required) One line description of the community resource
* __`extendedDescription`__ - (optional) Longer description of the community resource
* __`url`__ - (required) A url link to visit the community resource
* __`signupUrl`__ - (optional) A url link to sign up for the community resource
* __`countryCodes`__ - (optional) Array of [two letter country codes](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes)
where the community is active
* __`languageCodes`__ - (optional) Array of [two letter](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) or [three letter](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) spoken by this community

Each community resource must have at least one contact person:

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
