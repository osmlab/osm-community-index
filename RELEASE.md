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
- [ ] git add . && git commit -m 'npm run txpull'

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
