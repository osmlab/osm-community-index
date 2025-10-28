## Release Checklist

#### Update Icons
This project bundles some icons from FontAwesome, corresponding to the types of
community resources.  Whenever the list of resource types changes:

```bash
# Edit `./scripts/icons.ts` if needed
bun run icons
```

#### Update version, tag, and publish

```bash
# Make sure your main branch is up to date and all tests pass
git checkout main
git pull origin
bun install
bun run all

# Update translations
bun run txpull
git add i18n/ && git commit -m 'bun run txpull'

# Pick a version, see https://semver.org/ - for example: 'A.B.C' or 'A.B.C-pre.D'
# Update version number in `package.json`
# Update CHANGELOG.md

export VERSION=vA.B.C-pre.D
git add . && git commit -m "$VERSION"
git tag "$VERSION"
git push origin main "$VERSION"
bun publish
```

Set as latest release on GitHub:
- Open https://github.com/osmlab/osm-community-index/blob/main/CHANGELOG.md and copy the URL to the new release
- Open https://github.com/osmlab/osm-community-index/tags and pick the new tag you just pushed
- There should be a link like "create a release from the tag", click that, and paste in the link to the changelog.


### Purge JSDelivr CDN cache
Include any URLs that anyone might request.

```bash
curl 'https://purge.jsdelivr.net/npm/osm-community-index@latest/dist/json/completeFeatureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@latest/dist/json/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@latest/dist/json/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@latest/dist/json/resources.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6/dist/json/completeFeatureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6/dist/json/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6/dist/json/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6/dist/json/resources.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6.0/dist/json/completeFeatureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6.0/dist/json/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6.0/dist/json/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@6.0/dist/json/resources.min.json'
```
