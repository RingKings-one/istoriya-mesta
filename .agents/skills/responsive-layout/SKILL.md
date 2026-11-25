---
name: responsive-layout
description: Build and diagnose responsive website layouts across mobile, tablet, and desktop, with special attention to touch devices, iOS Safari, horizontal overflow, and scroll stability.
---

# Responsive Layout

## Core approach
- Start from content and constraints; use CSS Grid/Flexbox and fluid sizing rather than JS measurement.
- Design mobile intentionally rather than shrinking desktop composition.
- Use minmax(), min-width: 0, max-width: 100%, clamp(), and intrinsic sizing deliberately.
- Check long words, headings, buttons, navigation, media, and nested flex/grid children.
- Account for safe-area insets when using edge-to-edge layouts.
- Keep native vertical scrolling unless a demonstrated requirement calls for custom scrolling.

## Horizontal overflow diagnosis
1. Reproduce at the narrow viewport.
2. Find the actual overflowing element (including transformed elements, fixed canvases, wide media, and 100vw plus padding).
3. Inspect computed width, min-width, margins, transforms, and positioned descendants.
4. Fix the source; do not reflexively apply overflow-x: hidden to the whole document.
5. Re-test while scrolling, rotating, opening menus, and after fonts/images load.

## Motion and scrolling
- Avoid scroll hijacking and scroll-linked effects that interfere with native touch scrolling.
- If a pinned or scrubbed sequence is justified, test on real touch hardware and provide a reduced-motion/fallback path.
- Avoid fixed backgrounds and large transforms that create unexpected viewport width.
- Respect prefers-reduced-motion.

## Acceptance checks
- No horizontal page movement on ordinary vertical scroll.
- No clipped navigation, CTA, headings, or focus rings.
- No overlap with notches/home indicators.
- Touch targets are usable.
- Layout remains stable after images and fonts load.
