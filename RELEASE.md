# Release Checklist

### Icons
This project bundles some icons from FontAwesome, corresponding to the types of
community resources.  Whenever the list of resource types changes:
- [ ] Edit `build_icons.js`
- [ ] npm run icons

### Update main branch, make sure tests pass
- [ ] git checkout main
- [ ] git pull origin
- [ ] npm install
- [ ] npm run test

### Update translations
- [ ] npm run txpull
- [ ] git add i18n/ && git commit -m 'npm run txpull'

### Update changelog, version, tag, then publish
- [ ] Update `CHANGELOG.md`
- [ ] Update version number in `package.json`
- [ ] npm run dist
- [ ] git add . && git commit -m 'vA.B.C'
- [ ] git tag vA.B.C
- [ ] git push origin main vA.B.C
- [ ] npm publish

Open https://github.com/osmlab/osm-community-index/tags
Click "Add Release Notes" and link to the CHANGELOG

### Purge cache (optional)

```bash
curl 'https://purge.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/completeFeatureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index/dist/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index/dist/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index/dist/resources.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5/dist/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5/dist/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5/dist/resources.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5.6/dist/defaults.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5.6/dist/featureCollection.min.json'
curl 'https://purge.jsdelivr.net/npm/osm-community-index@5.6/dist/resources.min.json'
```
