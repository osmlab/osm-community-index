# Decisions

## Type-aware linting: not yet (November 2026)

oxlint runs without type information: `.oxlintrc.json` uses the syntax-only `typescript` plugin, which matches what the old ESLint setup did (typescript-eslint `recommended`, not `recommendedTypeChecked`). Type-aware rules (`no-unsafe-*`, `no-floating-promises`, `no-unnecessary-condition`, …) would need the `oxlint-tsgolint` package and `oxlint --type-aware`.

A one-off type-aware run during the TypeScript 7 upgrade found about 40 values typed `any` that came from `Bun.file().json()` and `JSON5.parse()`, three un-awaited promises, and a build crash on multi-feature FeatureCollections. All of these are fixed. On the clean code it costs almost nothing (lint stays under 0.2 s).

Held off for now because:
- It isn't part of the shared agent-practices setup, and adopting it in one project would drift from the others. If we want it, add it there for every project, or as an occasional audit step in `/checkup`.
- It adds a native dependency that has to track the TypeScript version, and oxlint's type-aware support was still a preview when last checked.

Revisit if hidden `any` values creep back in, or once agent-practices adopts it.
