
## osm-community-index

:speech_balloon: An index of local community resources for OpenStreetMap.

### What is it?

This project is a list of resources for local users of OpenStreetMap.

"Resources" can be links to forums, meetups, Slack groups, IRC channels,
mailing lists, and so on.  Anything that mappers, especially beginners,
might find interesting or helpful.

### About the index

Each community resource is defined in a `.geojson` file containing information
about the resource along with the bounding geometry where it applies.

#### Prerequisites

* [Node.js](https://nodejs.org/) version 4 or newer
* [`git`](https://www.atlassian.com/git/tutorials/install-git/) for your platform

#### Building

* Just `npm run build`
* These files will be generated:
  * `/dist/community.json`
  * `/dist/community.min.json`

