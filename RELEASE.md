## Release Checklist

### Update Icons
This project bundles some icons from FontAwesome, corresponding to the types of
community resources.  Whenever the list of resource types changes:

```bash
# Edit `scripts/build_icons.js`
npm run icons
```


### Update changelog, version, tag, and publish

```bash
# Make sure your main branch is up to date and all tests pass
git checkout main
git pull origin
npm install
npm run test

# Update translations
npm run txpull
git add i18n/ && git commit -m 'npm run txpull'

# Pick a version, see https://semver.org/ - for example: 'A.B.C' or 'A.B.C-pre.D'
# Update version number in `package.json`
# Update CHANGELOG.md and docs as needed
export VERSION=vA.B.C-pre.D
npm run dist
git add . && git commit -m "$VERSION"
git tag "$VERSION"
git push origin main "$VERSION"
npm publish
```

Set as latest release on GitHub:
- Open https://github.com/osmlab/osm-community-index/blob/main/CHANGELOG.md and copy the URL to the new release
- Open https://github.com/osmlab/osm-community-index/tags and pick the new tag you just pushed
- There should be a link like "create a release from the tag", click that, and paste in the link to the changelog.


### Purge JSDelivr CDN cache
Include any URLs that anyone might request.

```bash
curl 'https://purge.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/completeFeatureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index/dist/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index/dist/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index/dist/resources.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5/dist/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5/dist/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5/dist/resources.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5.9/dist/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5.9/dist/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5.9/dist/resources.min.json'
```
