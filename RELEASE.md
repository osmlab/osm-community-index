## Release Checklist

### Icons
This project bundles some icons from FontAwesome, corresponding to the types of
community resources.  Whenever the list of resource types changes:
- [ ] Edit `build_icons.js`
- [ ] npm run icons

### Update master branch, tag and publish
- [ ] git checkout master
- [ ] npm install
- [ ] npm run test
- [ ] npm run dist
- [ ] npm run txpull
- [ ] git add . && git commit -m 'npm run txpull'
- [ ] Update `CHANGELOG.md`
- [ ] Update version number in `package.json`
- [ ] git add . && git commit -m 'vA.B.C'
- [ ] git tag vA.B.C
- [ ] git push origin master vA.B.C
- [ ] npm publish

### Update release branch  (legacy - maybe stop doing this?)
- [ ] git checkout release
- [ ] git merge master
- [ ] git push origin release

Open https://github.com/osmlab/osm-community-index/tags
Click "Add Release Notes" and link to the CHANGELOG
