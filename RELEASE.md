## Release Checklist

#### Update version, docs, tag, and publish
- [ ] git checkout master
- [ ] npm install
- [ ] Update CHANGELOG
- [ ] Update version number in `package.json`
- [ ] git add .
- [ ] git commit -m 'vA.B.C'
- [ ] git tag vA.B.C
- [ ] git push origin master vA.B.C
- [ ] npm publish
