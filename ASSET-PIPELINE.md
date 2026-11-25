# Local image pipeline

## Purpose

Project photography is stored with the repository, optimized during the build, and served from the site's own origin. Production image delivery will not depend on a third-party image CDN once selected project photographs replace the temporary visuals.

## Folder contract

- `assets/source/` — original photographs supplied/selected for the project. This directory is not published as a public URL.
- `public/images/optimized/` — generated build output, excluded from Git. Do not edit or commit generated files by hand; CI and deployment regenerate them from `assets/source/`.
- `public/images/optimized/manifest.json` — generated dimensions, aspect ratios, format variants, widths and byte sizes.
- Stable role aliases remain in `src/data.ts`; page composition should not depend on arbitrary filenames.

Example source structure:

```text
assets/source/
  ruza/
    ruza-river-panorama.jpg
    ruza-street-detail-01.jpg
  cafe/
    cafe-interior-window.jpg
  archive/
    archive-postcard-front.tif
```

Generated keys are derived from relative paths, e.g. `ruza--ruza-river-panorama`. The stable `localKey` in `src/data.ts` must match this key. Keep source filenames stable after wiring an asset into page data. The shared `EditorialImage.astro` component reads `src/generated/image-manifest.json` and emits AVIF/WebP `<source>` candidates automatically when a matching local key exists; otherwise it preserves the current Unsplash URL and responsive CDN `srcset`.

## Generated variants

The build generates AVIF and WebP at widths up to 480, 768, 1200, 1600 and 2200 pixels, plus the source's native width when it is not already represented. A variant wider than the original is never created. EXIF orientation is applied; metadata is not copied into public derivatives. AVIF uses quality 55 / effort 5 and WebP quality 78 / effort 5 as initial balanced defaults, to be calibrated against supplied photography.

Run manually with `npm run images:optimize`. The same command runs automatically before `npm run build`. If no source images have been added, the build succeeds and writes an empty manifest. This is intentional: the pipeline is ready without inventing or downloading replacement photography.

## Serving rules

- Prefer AVIF, provide WebP as the next source, and retain an appropriate fallback.
- Set `sizes` to the actual rendered layout width; do not use `100vw` for every card or column.
- Use `fetchpriority="high"` only for the true above-the-fold hero/LCP image. Lazy-load below-the-fold images.
- Preserve intrinsic aspect ratio or explicit dimensions to reduce layout shift.
- Set focal position per placement with CSS/object-position; do not create arbitrary crops before reviewing desktop and mobile composition.
- Decorative images use `alt=""`. Meaningful images need concise alt text describing what is actually visible, not what the page wishes it depicted.
- Placeholder → selected → verified requires provenance and rights review, not merely file conversion.

## Image quality and rights gate

Before a real image enters the published asset set, record source, creator/credit (or unknown), usage permission/license, subject/location (only if verified), capture date (only if known), editorial role, alt text and crop review in `ASSET-MAP.md` / `ASSET-SOURCES.md`. Do not strip the provenance record when metadata is stripped from the public derivative.

## Technical implementation

The optimizer uses `sharp` as a development-only build tool. It recursively scans supported raster formats, rejects duplicate generated keys, clears only its own generated output folder, and emits a JSON manifest. Original files under `assets/source/` are never modified or deleted.
