# Astro security migration experiment

Baseline: a437b35806ae0fd5a49e479d9bb6acb40fb75f55. Never merge automatically.

Official guides: https://v6.docs.astro.build/en/guides/upgrade-to/v6/ and https://docs.astro.build/en/guides/upgrade-to/v7/.

Astro 6: Node >=22.12, Vite 7, Zod 4, Shiki 4, content collection compatibility and script/style ordering. Astro 7: Vite 8, stricter Rust compiler, markdown processor, reserved fetch.ts, transition internals removed, JSX whitespace default. Preserve compressHTML:true. No server adapter or custom Vite configuration declared. Verify markup, CSS cascade, content imports, routing and image rendering rather than assuming compatibility.

Baseline audit: critical Astro; high nested Sharp, Zod, Zod-to-ts; low esbuild. Static output may reduce runtime exposure but not build-time risk. Exact advisory IDs and resolved versions require real npm audit JSON and npm ls --all. package-lock.json was unavailable at baseline; reproducibility requires a generated and reviewed lockfile before adoption.

Acceptance: Node runtime compatible with actual package engines; npm install; npm ls --all; npm audit JSON (no unresolved critical/high without explicit review); image encoder test; local image rendering test (9 routes, 24 images); clean build; internal links; comparison of all routes at 320, 390, 768, 1440 widths, no horizontal overflow, keyboard and reduced motion, image focal points and CLS; Netlify preview for exact commit. Browser/iOS checks remain pending until measured. No forced audit fix.

Rollback: retain existing PR #2 and baseline preview unchanged. Experiment targets feature branch only. No production or access settings changes.
