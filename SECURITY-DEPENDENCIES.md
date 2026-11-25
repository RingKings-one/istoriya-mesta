# Dependency security review — 2026-11-25

## Current result

The CI audit is retained as a diagnostic step; it does not fail the build merely because npm reports advisories. The report lists each package, severity, affected range, dependency path and npm's suggested fix.

Latest detailed audit before the local-image rendering test:
- 1 critical: `astro` at `node_modules/astro`.
- 3 high: nested `sharp` at `node_modules/astro/node_modules/sharp`, `zod` at `node_modules/zod`, and `zod-to-ts` at `node_modules/zod-to-ts`.
- 1 low: `esbuild` at `node_modules/esbuild`.

## Safe change made

The project's direct build-time image processor was upgraded from `sharp ^0.34.5` to `sharp ^0.35.5`. The optimizer uses a narrow API surface (`rotate`, `metadata`, `resize`, `avif`, `webp`, `toFile`); the complete source-ingestion test and the AVIF/WebP rendering integration test are used to verify this project usage after the upgrade. The nested vulnerable Sharp copy bundled under Astro remains a separate dependency path and is still reported by npm audit.

## Why Astro was not force-upgraded

The repository deliberately remains on Astro 5. npm audit's suggested remediation is Astro 7.4.13, which is a major-version migration, not a patch-level update. The official Astro package currently publishes 7.4.13 as the latest release, and Astro maintains explicit major-version upgrade guidance. A blind major update would change the framework foundation while this PR is still establishing and verifying the site. It was therefore not applied in this stage.

The remaining Astro, nested Sharp, Zod, Zod-to-ts and esbuild advisories are not marked as resolved. Some advisories concern server, image-service or rendering paths that this static-output site may not exercise, but the package audit still reports them and this document does not claim they are harmless or unreachable.

## Next safe remediation

Run a dedicated Astro 5 → 7 migration on a separate, reviewable change set:
1. Read the official v6 and v7 upgrade guides and changelogs.
2. Upgrade the framework and related transitive dependencies together.
3. Re-run the static build, all nine routes, link checks, image pipeline tests and browser/iOS QA.
4. Re-run `npm audit` and verify the actual dependency tree before calling the issue resolved.

Do not use `npm audit fix --force` as an unattended maintenance command.
