import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = process.cwd();
const sourceRoot = path.join(root, 'assets', 'source');
const fixtureDir = path.join(sourceRoot, '__pipeline-smoke-test__');
const fixture = path.join(fixtureDir, 'smoke-test.png');
const manifestPath = path.join(root, 'src', 'generated', 'image-manifest.json');
const publicOutput = path.join(root, 'public', 'images', 'optimized');

await fs.mkdir(fixtureDir, { recursive: true });
try {
  const buffer = await sharp({
    create: { width: 1600, height: 900, channels: 3, background: { r: 44, g: 66, b: 54 } },
  }).png().toBuffer();
  await fs.writeFile(fixture, buffer);
  execFileSync(process.execPath, ['scripts/optimize-images.mjs'], { cwd: root, stdio: 'inherit' });

  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const asset = manifest.assets['pipeline-smoke-test--smoke-test'];
  if (!asset) throw new Error('Optimizer did not register the synthetic source image.');
  if (asset.width !== 1600 || asset.height !== 900) throw new Error('Manifest dimensions do not match the source image.');
  if (asset.variants.avif.length !== 4 || asset.variants.webp.length !== 4) throw new Error('Expected four responsive AVIF and WebP variants.');
  for (const variant of [...asset.variants.avif, ...asset.variants.webp]) {
    const output = path.join(root, 'public', variant.src.slice(1));
    const metadata = await sharp(output).metadata();
    if (!metadata.width || !metadata.height || !metadata.format) throw new Error(`Invalid generated image: ${variant.src}`);
  }
  console.log('Image pipeline integration test passed: source ingestion, manifest, AVIF/WebP files and responsive variants verified.');
} finally {
  await fs.rm(fixtureDir, { recursive: true, force: true });
  execFileSync(process.execPath, ['scripts/optimize-images.mjs'], { cwd: root, stdio: 'inherit' });
  const cleanManifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  if (Object.keys(cleanManifest.assets).length !== 0) throw new Error('Smoke-test source remained in the generated manifest.');
  const generatedFiles = await fs.readdir(publicOutput);
  if (generatedFiles.some((file) => file.startsWith('pipeline-smoke-test'))) throw new Error('Smoke-test derivatives were not cleaned up.');
}
