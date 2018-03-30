[![npm version](https://badge.fury.io/js/osm-community-index.svg)](https://badge.fury.io/js/osm-community-index)
[![Build Status](https://travis-ci.org/osmlab/osm-community-index.svg?branch=master)](https://travis-ci.org/osmlab/osm-community-index)
[![Greenkeeper badge](https://badges.greenkeeper.io/osmlab/osm-community-index.svg)](https://greenkeeper.io/)

## osm-community-index


:speech_balloon: An index of community resources for OpenStreetMap.

### What is it?

This project is a list of resources for users of OpenStreetMap.

"Resources" can be links to forums, meetups, Slack groups, IRC channels,
mailing lists, and so on.  Anything that mappers, especially beginners,
might find interesting or helpful.


### About the index

The source files for this index are stored in two kinds of files:

* Under `features/` there are `.geojson` files to describe the areas where the communities are active
* Under `resources/` there are `.json` files to describe the community resources

:point_right: See [CONTRIBUTING.md](CONTRIBUTING.md) for info about how to add your
community resource to this index.

##### tl;dr

* Add a **feature** `.geojson` file under `features/` folder
  * This is a boundary around where the resource is active
  * You can use [geojson.io](http://geojson.io) to create these
* Add a **resource** `.json` file under `resources/` folder
  * This contains info about what the resource is (slack, forum, mailinglist, facebook, etc.)
  * You can just copy and change an existing one
  * Several resources can share the same `.geojson` feature
* `npm run test`
  * This will build and check for errors and make the files pretty

#### Prerequisites

* [Node.js](https://nodejs.org/) version 4 or newer
* [`git`](https://www.atlassian.com/git/tutorials/install-git/) for your platform

#### Installing

* Clone this project, for example:
  `git clone git@github.com:osmlab/osm-community-index.git`
* `cd` into the project folder,
* Run `npm install` to install libraries

#### Building

* Just `npm run test`
  * This will check the files for errors and make them pretty.


