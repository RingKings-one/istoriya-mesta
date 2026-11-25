# Website Toolkit

A compact, project-specific set of agent instructions and references for "История места". This is not a second AI system or a new approval process.

## How to use
- Read the root `AGENTS.md` for project constraints and working behavior.
- Skills live in `.agents/skills/` and are loaded only when relevant to the task.
- Use official documentation for version-sensitive APIs.
- Do not install every library up front. Add runtime dependencies only when the confirmed stack and a concrete feature require them.

## Included skills
- `anti-slop-design` — avoid generic AI-generated interfaces while preserving the approved brand direction.
- `frontend-design` — art direction, typography, composition, and deliberate visual choices.
- `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-performance` — official GSAP authoring guidance.
- `web-quality-audit` — project audit checklist, informed by public interface guidelines.
- `browser-testing` — browser and responsive testing with Playwright.

## External references
- Anti-Slop Design (MIT): https://github.com/Ferousco-dev/anti-slop-design
- Anthropic Frontend Design Skill (Apache-2.0): https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Official GSAP AI Skills (MIT): https://github.com/greensock/gsap-skills
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- Playwright (Apache-2.0): https://github.com/microsoft/playwright

## Important status
The repository currently contains only the GitHub connector test artifact, not the website source or a confirmed build configuration. Therefore no framework-specific skill or package installation is enabled yet. Confirm the actual project files before adding Astro, React, GSAP, Playwright, or other runtime dependencies.
