---
name: web-quality-audit
description: Audit website pages and components for usability, accessibility, responsive behavior, interaction quality, performance, and common interface defects. Use after implementation, before publishing, or when reviewing an existing page.
---

# Web Quality Audit

Run a practical review of the actual implementation. Report concrete findings with file/selector, severity, impact, and a recommended fix. Do not produce generic praise or a checklist dump.

## Review order
1. **Functional correctness** — navigation, links, forms, buttons, media controls, loading/error/empty states.
2. **Responsive behavior** — narrow phones, tablet, desktop; long text; image crops; safe areas; no accidental horizontal scrolling.
3. **Accessibility** — semantic structure, heading order, labels, keyboard access, visible focus, contrast, meaningful alt text, reduced motion.
4. **Interaction quality** — touch targets, hover/focus/active/disabled states, keyboard alternatives, no hover-only functionality.
5. **Visual craft** — hierarchy, typography, spacing, alignment, consistency, image art direction, intentional motion.
6. **Performance** — image dimensions and formats, lazy loading below the fold, font loading, layout shifts, excessive JavaScript, expensive animation.
7. **SEO and metadata** — title, description, canonical, social metadata, sitemap/robots where relevant, meaningful page content.

## Rules
- Use buttons for actions and links for navigation.
- Give icon-only controls accessible names.
- Never remove focus outlines without a clear replacement.
- Respect prefers-reduced-motion.
- Avoid transition: all; animate only necessary properties.
- Give images dimensions or an aspect ratio to prevent layout shift.
- Do not conceal horizontal overflow as a substitute for fixing the offending element.
- Test actual touch behavior, not only desktop emulation.
- Keep recommendations proportional: fix critical and high-impact issues before polish.

## Output
Group findings by severity:
- Critical: broken core task, inaccessible primary interaction, severe layout break.
- High: major responsive, navigation, accessibility, or performance issue.
- Medium: noticeable usability or visual inconsistency.
- Low: polish opportunity.

For each finding: location → observed behavior → why it matters → specific fix. Mark passed areas briefly. Explicitly state which browsers/devices were actually tested and which were not.

## External reference
Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
Use the source as a reference; this local skill is an independently written project checklist, not a copied distribution of Vercel's rules.
