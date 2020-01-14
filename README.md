[![npm version](https://badge.fury.io/js/osm-community-index.svg)](https://badge.fury.io/js/osm-community-index)
[![Build Status](https://travis-ci.org/osmlab/osm-community-index.svg?branch=master)](https://travis-ci.org/osmlab/osm-community-index)
[![Greenkeeper badge](https://badges.greenkeeper.io/osmlab/osm-community-index.svg)](https://greenkeeper.io/)

## osm-community-index

:speech_balloon: An index of community resources for OpenStreetMap.

* View the map of OpenStreetMap communities: https://openstreetmap.community
* Or search and filter the community resources: https://community.osm.be/


### What is it?

This project is a list of resources for users of OpenStreetMap.

"Resources" can be links to forums, meetups, Slack groups, IRC channels,
mailing lists, and so on.  Anything that mappers, especially beginners,
might find interesting or helpful.


### About the index

#### Source files
The source files for this index are stored in two kinds of files:

* Under `resources/` there are `.json` files to describe the community resources
* Under `features/` there are `.geojson` files to describe the areas where the communities are active

:point_right: See [CONTRIBUTING.md](CONTRIBUTING.md) for info about how to add your
community resource to this index.


#### Distributed Files

Several files are published under `dist/`

* `features.json` - An object containing all the features
* `resources.json` - An object containing all the resources
* `combined.geojson` - A GeoJSON file containing a FeatureCollection of all Features, each with available resources included in a `resources` property.
* `index.js` - a commonjs module which exports the `features` and `resources` objects


##### tl;dr

* (required) Add a **resource** `.json` file under `resources/` folder
  * This contains info about what the resource is (slack, forum, mailinglist, facebook, etc.)
  * You can just copy and change an existing one
  * Each resource needs an `includeLocations` property to define where it is active.
* (optional) Add a **feature** `.geojson` file under `features/` folder
  * This is a boundary around where the resource is active
  * You can use [geojson.io](http://geojson.io) or other tools to create these.
* `npm run test`
  * This will build and check for errors and make the files pretty


#### Prerequisites

* [Node.js](https://nodejs.org/) version 10 or newer
* [`git`](https://www.atlassian.com/git/tutorials/install-git/) for your platform


#### Installing

* Clone this project, for example:
  `git clone git@github.com:osmlab/osm-community-index.git`
* `cd` into the project folder,
* Run `npm install` to install libraries


#### Building

* Just `npm run test`
  * This will check the files for errors and make them pretty.


### License

osm-community-index is available under the [ISC License](https://opensource.org/licenses/ISC).
See the [LICENSE.md](LICENSE.md) file for more details.

This project also bundles some icons from [FontAwesome](https://fontawesome.com/).
The icons are licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
