# Editorial content model

The project uses a lightweight TypeScript content contract in `src/content/model.ts`. It describes the fields required for researched stories, routes, places and archive materials without adding a CMS, database or runtime dependency.

## Content types

- **CityProfile** — the umbrella city chapter and its editorial pillars.
- **StoryRecord** — a researched story with sections, author/date metadata when known, and source references.
- **RouteRecord** — a route with optional distance, duration, difficulty, start point, stops and field-check date. Navigation data stays separate from the editorial introduction.
- **PlaceRecord** — a real venue/location with optional address, coordinates, hours, contact and field-check date.
- **ArchiveRecord** — a photograph, document, map, object or recording with provenance.
- **EditorialAsset** — an image or media asset with role, alt text, credit, origin/location verification and an explicit status.

## Editorial states

| Status | Meaning |
| --- | --- |
| `planned` | Editorial direction only; not ready to publish. |
| `researching` | Research or field collection is underway. |
| `verified` | Relevant factual claims and source details have been checked. |
| `published` | Approved for publication after editorial, factual and asset checks. |

Asset states are `placeholder`, `selected` and `verified`. A visually selected image is not automatically a documented or location-verified image.

## Editorial rules

1. A polished layout is not evidence that a story is researched or ready to publish.
2. Never invent dates, names, addresses, coordinates, opening hours, local history, quotations, route details or photographer credits.
3. Route distance, duration, accessibility, directions, stops and map points require field or reliable-source verification before publication.
4. A named venue must be confirmed before copy presents it as a real local business.
5. Documentary images need known origin, usage permission/licence, caption context and appropriate credit. Temporary mood visuals must remain clearly disclosed.
6. Record source references close to the material they support; note what each source verifies.
7. Use the contextual related-links registry in `src/content/model.ts` to guide readers between city, story, route, place and archive sections.

## Ready-to-publish checklist

- [ ] Editorial purpose and intended audience are clear.
- [ ] Names, dates, locations and factual claims have sources.
- [ ] Sources have been checked and recorded in the record's `sources`.
- [ ] Quotes and personal stories have permission where required.
- [ ] Images are selected, documented and cleared for use; credits are accurate.
- [ ] Captions describe the actual image and do not overclaim.
- [ ] Route/place practical details have been checked in the field or against reliable sources.
- [ ] Related links and the next reader action are intentional.
- [ ] Metadata, headings, alt text and mobile reading order are reviewed.

## Current project status

The current site pages and related-link summaries are **planned editorial destinations**, not completed articles. The Ruza chapter is the first focus, but the registry does not assert specific local history, named businesses, documentary photography or verified route data. Add real material only after research and the user's selected photography are available.
