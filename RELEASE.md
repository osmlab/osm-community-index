# Release Checklist

## Before releasing, does the project build cleanly?

```bash
# Make sure your main branch is up to date and all tests pass
git checkout main
git pull origin
bun install
bun run all
```

## Update translations

```bash
bun run txpull
git add i18n/ && git commit -m 'bun run txpull'
```

## Update Icons

This project bundles some icons from FontAwesome, corresponding to the types of
community resources.  Whenever the list of resource types changes:

```bash
# Edit `./scripts/icons.ts` if needed
bun run icons
```

## Prepare the release

Pick a version, see https://semver.org/ - for example: 'A.B.C' or 'A.B.C-pre.D'

Optionally, use the `/release` prompt in Copilot Chat — it will:
- Validate the version number
- Identify commits since the last release and look up PR numbers
- Update `CHANGELOG.md` with a new entry
- Bump the version in `package.json`

(or perform these steps manually)

## Tag and publish

```bash
export VERSION=vA.B.C-pre.D
git add . && git commit -m "$VERSION"
git tag "$VERSION"
git push origin main "$VERSION"
npm login    # if needed, session tokens last 2 hours
bun publish
```

Set as latest release on GitHub:
- Open https://github.com/osmlab/osm-community-index/blob/main/CHANGELOG.md and copy the URL to the new release
- Open https://github.com/osmlab/osm-community-index/tags and pick the new tag you just pushed
- There should be a link like "create a release from the tag", click that, and paste in the link to the changelog.

<!-- sync:
version=1
source=https://github.com/rapideditor/agent-practices/blob/main/templates/RELEASE.md
instructions="Create if missing, substituting the project name and repo details for this project; never overwrite the details of an existing release checklist."
-->
