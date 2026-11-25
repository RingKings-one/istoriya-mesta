import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve('dist');
const htmlFiles = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(absolute);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(absolute);
  }
}

await collect(outputDir);
const broken = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const anchors = html.matchAll(/<a\\b[^>]*\\bhref=["']([^"']+)["'][^>]*>/gi);

  for (const match of anchors) {
    const href = match[1].trim();
    if (!href || href.startsWith('#') || /^(?:[a-z][a-z0-9+.-]*:|\\/\\/)/i.test(href)) continue;

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(href, 'https://internal.test').pathname);
    } catch {
      broken.push({ file: path.relative(outputDir, file), href, reason: 'invalid URL' });
      continue;
    }

    const relative = pathname.replace(/^\\/+/, '');
    const candidates = pathname.endsWith('/')
      ? [path.join(outputDir, relative, 'index.html')]
      : [path.join(outputDir, relative), path.join(outputDir, relative, 'index.html')];

    let exists = false;
    for (const candidate of candidates) {
      try {
        const info = await stat(candidate);
        if (info.isFile()) { exists = true; break; }
      } catch {}
    }

    if (!exists) broken.push({ file: path.relative(outputDir, file), href, reason: 'target not found in dist' });
  }
}

if (broken.length) {
  console.error('Broken internal links:');
  for (const item of broken) console.error(`- ${item.file}: ${item.href} (${item.reason})`);
  process.exitCode = 1;
} else {
  console.log(`Internal link check passed: ${htmlFiles.length} HTML pages scanned.`);
}
