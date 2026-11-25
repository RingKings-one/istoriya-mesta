# Editorial content system

This document is the publishing contract for «История места». The site is an editorial atlas, not a directory filled to look complete. A page may remain in research while its visual structure is ready.

## 1. Content types

The TypeScript contracts live in `src/content/model.ts`.

| Type | Purpose | Required editorial evidence |
| --- | --- | --- |
| City profile | A chapter that gives a place its wider context | Reliable sources, reviewed narrative, verified local imagery |
| Story | A standalone human, historical or observational narrative | Author/source, clear chronology where relevant, fact-check and image provenance |
| Route | A walk that can be followed in the real world | Field-checked stops, safe/usable path, verified coordinates and practical details |
| Place | A real venue or point of interest | Confirmed identity, address/location, current details and permission/credit where needed |
| Archive item | A photograph, document, map, object or recording | Provenance, creator if known, date if known, rights/usage status |

Optional facts must stay absent until verified. Do not fill unknown distance, duration, opening hours, coordinates, dates or names with estimates presented as facts.

## 2. Publication states

- `planned` — the subject is part of the editorial plan; research has not been completed.
- `researching` — sources or field material are being gathered; do not present the record as a finished guide.
- `verified` — factual checks, source review, image provenance and page QA are complete.
- `published` — approved for public release.

The first Ruza chapter currently has the state `researching`. This is an honest description of the work in progress, not a claim that the city research is complete.

## 3. Source and fact-check rules

1. Separate direct observation, sourced fact, editorial interpretation and unverified hypothesis.
2. Every non-obvious historical or geographical claim needs a source attached to the record.
3. Prefer primary sources and authoritative local or institutional sources; record access dates for changeable information.
4. For conflicting sources, preserve the disagreement in editorial notes instead of silently choosing a convenient version.
5. Never invent quotations, names, dates, addresses, opening hours, route metrics or coordinates.
6. A route is not ready to be described as navigable until its stops and practical details have been checked in the field.

## 4. Image and archive rules

Every asset has a role, alt text, a status and a provenance trail.

- `placeholder` — temporary mood image only. Never identify it as Ruza, a real local venue or a historical object.
- `selected` — chosen project image; usage rights, source and location still need review.
- `verified` — source, rights/credit, subject and intended crop have been checked.

For meaningful images, alt text describes the actual image and its editorial purpose. Decorative images use empty alt text. Do not write a factual caption from an unverified visual. Temporary Unsplash assets remain disclosed and are tracked in `ASSET-SOURCES.md` and `ASSET-MAP.md`; replace them with user-selected project photography before production. Original project files belong in `assets/source/`; the local AVIF/WebP build pipeline and publishing rules are documented in `ASSET-PIPELINE.md`.

## 5. Page roles and reading journeys

- Home: establish the editorial promise, introduce the first chapter and offer clear entry points.
- Cities: explain the atlas and lead into an individual city chapter.
- City chapter: connect atmosphere to stories, routes and source material.
- Stories: present authored narratives and lead back to their place, evidence and related walks.
- Routes: turn context into a real-world experience; practical details appear only after field verification.
- Cafe/place: portray a specific real place only after its identity and details are confirmed.
- Archive: make source material discoverable and connect it to the stories and places it supports.
- Credits: disclose temporary assets and final image credits.

Contextual next steps are defined centrally in `src/content/index.ts` and rendered by `EditorialPath.astro`. Keep links useful and specific: a destination should deepen the current subject, not merely repeat the global navigation.

## 6. Ready-to-publish checklist

- [ ] Record has a stable ID, slug, title, dek and city relationship.
- [ ] Editorial status is accurate.
- [ ] Claims, dates, names and locations are sourced and reviewed.
- [ ] Quotations are exact and attributed.
- [ ] Image provenance, rights and credit are recorded.
- [ ] Alt text reflects the actual selected image.
- [ ] Route/place details are field-checked where applicable.
- [ ] Related links lead to relevant pages and no placeholder destination is presented as a finished resource.
- [ ] Desktop, narrow mobile, keyboard navigation and reduced-motion behavior are checked.
- [ ] Metadata and social preview describe the actual published content.

## 7. Current content readiness

The current site is a designed editorial framework. The Ruza chapter, story index, route concept, cafe page and archive are not yet a verified collection of local reporting. The existing copy is intentionally framed as a project introduction or editorial intention. Real local stories, route data, venue information and documentary photographs remain inputs for a later content-production pass.
