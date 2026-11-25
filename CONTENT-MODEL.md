# Editorial content model

This project uses a small, typed editorial registry in `src/content/model.ts`. It is intentionally lightweight: no CMS, database, or new runtime dependency is required.

## Content types

- **City** — the umbrella chapter for a place (currently Ruza).
- **Story** — a reported or researched editorial piece.
- **Route** — a walk or route, with practical navigation data kept separate from its editorial introduction.
- **Place** — a specific venue or location (for example, a cafe).
- **Archive** — a collection or individual source material.

## Publication states

| Field | Meaning |
| --- | --- |
| `status: concept` | Page direction or editorial placeholder; not a finished content item. |
| `status: draft` | Copy is being prepared; do not imply publication readiness. |
| `status: review` | Editorial and factual review is in progress. |
| `status: published` | Approved for publication. |
| `factCheck` | Explicit factual verification state; independent of visual/design completion. |
| `sourceRefs` | IDs/URLs of sources supporting factual claims. |
| `imageStatus` | Distinguishes temporary mood imagery from selected/documented project photography. |

## Editorial rules

1. A beautiful layout is not evidence that a story is researched or ready to publish.
2. Never invent dates, names, addresses, coordinates, opening hours, local history, quotations, or photographer credits.
3. Route distances, duration, accessibility, directions and map points require field or reliable-source verification before publication.
4. A named venue must be confirmed before copy presents it as a real local business.
5. Every documentary image needs a known origin, usage permission/licence, caption context and appropriate credit. Temporary mood images must remain clearly disclosed.
6. Keep source references close to the material they support; record what each source verifies.
7. Use related-entry relationships to guide the reader from a city chapter to stories, routes, places and archive material without dead ends.

## Ready-to-publish checklist

- [ ] Editorial purpose and intended audience are clear.
- [ ] Names, dates, locations and factual claims have sources.
- [ ] Sources have been checked and recorded in `sourceRefs`.
- [ ] Quotes and personal stories have permission where required.
- [ ] Images are selected, documented and cleared for use.
- [ ] Captions describe the actual image and do not overclaim.
- [ ] Route/place practical details have been checked.
- [ ] Related links and the next reader action are intentional.
- [ ] Metadata, headings, alt text and mobile reading order are reviewed.

## Current project status

The current registry entries are **concept-level placeholders**. The Ruza chapter is the first editorial focus, but no local facts, specific businesses, documentary photography, or verified route data are asserted by this registry. Add real material only after research and user-selected photography are available.
