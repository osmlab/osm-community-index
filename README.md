
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
  "description": "Sign up at {url}",
  "url": "https://osmus-slack.herokuapp.com/",
  "contacts": [
    {
      "name" : "Barney Rubble",
      "email" : "b@rubble.com"
    }
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

