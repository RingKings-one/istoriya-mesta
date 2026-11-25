---
name: browser-testing
description: Plan and run browser-based functional, responsive, and visual checks with Playwright. Use when validating pages, interactions, breakpoints, screenshots, or regressions before deployment.
---

# Browser Testing

Use Playwright when the repository has a runnable application and test environment. Do not claim tests passed unless they were actually run.

## First inspect
- Read package scripts and existing test configuration.
- Reuse the installed test runner and project conventions.
- If Playwright is absent, recommend/install it only when a real browser-test task is ready and a local execution environment is available.
- Do not add a second test framework if an adequate one already exists.

## Minimum site checks
- Page loads without console errors or failed critical requests.
- Main navigation and primary CTA work.
- Forms validate and show success/error states.
- No horizontal overflow at common mobile widths.
- Layout remains stable while scrolling vertically.
- Images load and maintain their intended aspect ratios.
- Keyboard navigation and visible focus work.
- Reduced-motion preference does not leave content hidden or unusable.

## Viewports and browsers
- Test representative narrow mobile, standard mobile, tablet, and desktop widths.
- Use WebKit for Safari-oriented checks where available. Playwright WebKit is useful, but it is not a guarantee of identical behavior to real iOS Safari; confirm critical touch/scroll behavior on a physical iPhone when possible.
- Check orientation changes and safe-area behavior when the layout uses full-bleed content.

## Evidence
Capture screenshots for meaningful breakpoints and attach traces/screenshots to failures where supported. Report browser, viewport, test command, result, and limitations. Avoid arbitrary sleeps; wait for meaningful UI conditions.

## External references
- Playwright docs: https://playwright.dev/docs/intro
- Playwright browser projects: https://playwright.dev/docs/browsers
