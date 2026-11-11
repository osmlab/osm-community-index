---
name: release
description: Prepare a new release (CHANGELOG, version bump)
disable-model-invocation: true
argument-hint: version number, for example: `A.B.C` or `A.B.C-pre.D`
---

You are preparing a release for this repo. The new release version is the argument the user passed when invoking this skill (e.g. `/release 1.2.3`), written as `VERSION` below. If no version was provided, ask the user for it and stop.

Do the following steps in order:

1. **Confirm the version** — the new release version is `VERSION`. Read `package.json` to verify this is a valid bump from the current version.
   - The version must follow semver format, for example: `A.B.C` or `A.B.C-pre.D`
   - It must be strictly greater than the current version in `package.json`
   - If either check fails, stop immediately and explain the problem clearly — do not proceed with any further steps.

2. **Identify commits since the last release** by running:
   ```
   git log --oneline
   ```
   Find the commit that corresponds to the previous release (look for the version bump or a release tag) and note all commits after it.

3. **Look up PR numbers** — read the repo URL from `package.json` (the `"repository"` field or `"bugs.url"` field) to determine `{owner}` and `{repo}`, then fetch the closed PRs list:
   ```
   https://github.com/{owner}/{repo}/pulls?q=is%3Apr+is%3Aclosed
   ```
   Match each commit to its PR number. PR titles listed there are authoritative — prefer them over raw commit messages.

4. **Update `CHANGELOG.md`** — insert a new section immediately above the previous release heading. Follow the existing format exactly:
   - Header: `# VERSION`
   - Date: `##### YYYY-MMM-DD` (use today's date)
   - Bullet points for each user-visible change (features, fixes, improvements)
   - For bug/fix commits, write a plain bullet
   - Internal/dev-only commits (CI config, agent setup, etc.) can be omitted or grouped into a single terse bullet
   - Add reference links at the bottom of the section:
     - PR links: `[#NNN]: https://github.com/{owner}/{repo}/issues/NNN`

5. **Update `package.json`** — set `"version"` to `"VERSION"`.
