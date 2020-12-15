[![build](https://github.com/osmlab/osm-community-index/workflows/build/badge.svg)](https://github.com/osmlab/osm-community-index/actions?query=workflow%3A%22build%22)
[![npm version](https://badge.fury.io/js/osm-community-index.svg)](https://badge.fury.io/js/osm-community-index)


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

#### tl;dr

To add your community resource to the index:

* Add resource `.json` files under the `resources/` folder
  * Each file contains info about what the resource is (slack, forum, mailinglist, facebook, etc.)
  * Each file also contains info about which locations the resource is active. The locations can be country or region codes, points, or custom `.geojson` files in the `features/*` folder.
  * You can copy and change an existing file to get started.
* run `npm run test`
  * This will check the files for errors and make them pretty.
  * If you don't have Node installed, you can skip this step and we will do it for you.
* If there are no errors, submit a pull request.

:point_right: See [CONTRIBUTING.md](CONTRIBUTING.md) for full details about how to add a community resource to this index.


#### Source files

The source files for this index are stored in two kinds of files:

* Under `resources/` there are `.json` files to describe the community resources
* Under `features/` there are custom `.geojson` files


#### Distributed Files

Several files are published under `dist/`.  These are generated - do not edit them.

* `features.json` - A GeoJSON FeatureCollection containing _only_ the custom Features
* `resources.json` - A JSON object containing all the resources
* `combined.geojson` - A GeoJSON file containing a FeatureCollection of all Features, each with available resources included in a `resources` property.
* `img/*` - SVG logos for all the resource types


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
