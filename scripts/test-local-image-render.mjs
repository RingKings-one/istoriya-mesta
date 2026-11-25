import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'assets', 'source', '__local-image-render-smoke-test__');
const source = path.join(sourceDir, 'smoke.png');
const dataPath = path.join(root, 'src', 'data.ts');
const originalData = await fs.readFile(dataPath, 'utf8');
const testKey = 'local-image-render-smoke-test--smoke';
const patchedData = originalData.replace("localKey: 'ruza--ruza-river-panorama'", `localKey: '${testKey}'`);
const dist = path.join(root, 'dist');
const publicOutput = path.join(root, 'public', 'images', 'optimized');
const manifestPath = path.join(root, 'src', 'generated', 'image-manifest.json');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

if (patchedData === originalData) throw new Error('Could not map the isolated smoke-test asset to the Hero image.');
await fs.mkdir(sourceDir, { recursive: true });
try {
  const fixture = await sharp({
    create: { width: 1600, height: 900, channels: 3, background: { r: 46, g: 70, b: 58 } },
  }).png().toBuffer();
  await fs.writeFile(source, fixture);
  await fs.writeFile(dataPath, patchedData);
  execFileSync(npm, ['run', 'build'], { cwd: root, stdio: 'inherit' });

  const htmlFiles = [];
  async function collectHtml(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) await collectHtml(absolute);
      else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(absolute);
    }
  }
  await collectHtml(dist);

  let imageCount = 0;
  for (const file of htmlFiles) {
    const html = await fs.readFile(file, 'utf8');
    const images = [...html.matchAll(/<img\\b[^>]*>/g)].map((match) => match[0]);
    const pictures = [...html.matchAll(/<picture\\b[^>]*>[\\s\\S]*?<\\/picture>/g)].map((match) => match[0]);
    for (const picture of pictures) if (picture.includes('srcset=') && !picture.includes('sizes=')) throw new Error(`Picture srcset missing sizes in ${file}`);
    const outsidePictures = html.replace(/<picture\\b[^>]*>[\\s\\S]*?<\\/picture>/g, '').match(/<img\\b/g);
    if (outsidePictures?.length) throw new Error(`Raw image element outside EditorialImage picture in ${file}`);
    for (const image of images) {
      if (!(image.includes(' alt ') || image.includes(' alt=') || image.endsWith(' alt>'))) throw new Error(`Image missing alt attribute in ${file}: ${image}`);
      for (const attribute of ['loading=', 'decoding=']) {
        if (!image.includes(attribute)) throw new Error(`Image missing ${attribute} in ${file}: ${image}`);
      }
      imageCount += 1;
    }
    if ((html.match(/fetchpriority="high"/g) ?? []).length > 1) throw new Error(`More than one high-priority image on ${file}`);
  }

  const home = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  if (!home.includes('type="image/avif"') || !home.includes('type="image/webp"')) throw new Error('Local hero AVIF/WebP sources were not rendered.');
  if (!home.includes('width="1600"') || !home.includes('height="900"')) throw new Error('Local hero intrinsic dimensions were not rendered.');
  if (!home.includes('images.unsplash.com')) throw new Error('Original CDN fallback was not retained for older browsers.');
  if (!home.includes(`${testKey}-480.avif`)) throw new Error('Responsive AVIF srcset is missing expected local candidates.');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  if (!manifest.assets[testKey]) throw new Error('Build-time image manifest is missing the local smoke-test asset.');
  const files = await fs.readdir(publicOutput);
  if (!files.some((name) => name.endsWith('.avif')) || !files.some((name) => name.endsWith('.webp'))) throw new Error('Optimized AVIF/WebP outputs are missing.');
  console.log(`Local image rendering test passed: ${htmlFiles.length} pages, ${imageCount} image elements, AVIF/WebP sources, CDN fallback, intrinsic dimensions and responsive srcset verified.`);
} finally {
  await fs.rm(source, { force: true });
  await fs.rm(sourceDir, { recursive: true, force: true });
  await fs.writeFile(dataPath, originalData);
  execFileSync(process.execPath, ['scripts/optimize-images.mjs'], { cwd: root, stdio: 'inherit' });
}
