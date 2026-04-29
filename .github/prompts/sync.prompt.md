---
description: Sync scaffold files in this project against the canonical agent-practices repo
argument-hint: additional optional context
---

You are doing a scaffold sync against the canonical source repo: **https://github.com/rapideditor/agent-practices**

For each file discovered in the canonical `templates/` directory, fetch it, compare it to the local version, and **create or update the local file** — substituting any source-specific details with this project's equivalent. The goal is to carry the source's structure and generic content forward while keeping this project's identity intact.

If the user provided additional context with the prompt, treat it as an extra constraint or scope hint (e.g. "only sync prompts", "force-update CONTRIBUTING.md").

## Setup

Before doing anything else:
1. Read this project's `package.json` (or equivalent manifest) to learn: project name, description, repo URL, license, author(s), and language/runtime.
2. The canonical raw content base URL is: `https://raw.githubusercontent.com/rapideditor/agent-practices/main`

---

## How to find files to sync

Fetch the repository file tree to discover what needs syncing:
```
https://api.github.com/repos/rapideditor/agent-practices/git/trees/main?recursive=1
```
Filter to items where `type` is `blob` and `path` starts with `templates/`. Strip the `templates/` prefix to get the destination path in this project.

**This file listing is the complete manifest** — no hardcoded list needed. When new files are added to `templates/` in the canonical repo, they'll be picked up automatically on the next `/sync`.

---

## Version and metadata checking

Each sync-able file carries a trailing comment at the end of the file.  The comment starts with the string 'sync:',
followed by attributes:
- `version`: version number, as an increasing integer
- `source`: canonical source URL (which points back here to this repo)
- `instructions`: optional instructions to apply when syncing the file

Treat a target file with a missing metadata comment as version `0`.

**Skip the file if the local version is equal to or greater than the canonical version.** Only update when the canonical version is strictly higher.

---

## Steps

For each file discovered in the manifest:

1. Fetch the raw canonical content from `{raw_base_url}/templates/{file_path}`
2. Check whether the file exists locally at `{file_path}`
3. Version check (see above) — skip if local is already at canonical version. If proceeding, note any `instructions` field in the canonical file's trailing comment.
4. Identify all source-specific values: repo name, org, URLs, package names, author names, version numbers, tool names — anything that belongs to the canonical project rather than the template structure
5. Replace each source-specific value with the corresponding value from this project (from `package.json` or existing local files)
6. Create or update the local file with the adapted content, following any `instructions` from the canonical file

Finally, after all files have been processed, perform these project hygiene checks:

1. If the project has a `LICENSE.md`, flag if the copyright year looks stale (some projects use a year range).
2. If the project has a `package.json`, make sure the "license" and "repository" fields are correct.

---

## How to report

After processing all files, produce a summary table:

| File | Status | Notes |
|------|--------|-------|
| `.github/prompts/commit.prompt.md` | ✅ In sync / 🔄 Updated / ✨ Created / ⏭️ Skipped | … |
| … | … | … |

For each **🔄 Updated** or **✨ Created** file: briefly describe what was substituted or what structural changes were adopted.

For **⏭️ Skipped** files: one line explaining why (e.g. "already at canonical version" or "CHANGELOG already exists").

For files that were **✅ In sync**: one line is enough.

<!-- sync:
version=1
source=https://github.com/rapideditor/agent-practices/blob/main/templates/.github/prompts/sync.prompt.md
-->
