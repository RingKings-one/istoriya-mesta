import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'istoriya-image-pipeline-'));
try {
  const source = path.join(tempDir, 'synthetic-source.png');
  const buffer = await sharp({
    create: { width: 1600, height: 900, channels: 3, background: { r: 44, g: 66, b: 54 } },
  }).png().toBuffer();
  await fs.writeFile(source, buffer);

  for (const width of [480, 768, 1200, 1600]) {
    const pipeline = () => sharp(source).resize({ width, withoutEnlargement: true });
    const avif = await pipeline().avif({ quality: 55, effort: 5 }).toBuffer();
    const webp = await pipeline().webp({ quality: 78, effort: 5 }).toBuffer();
    const [avifMeta, webpMeta] = await Promise.all([sharp(avif).metadata(), sharp(webp).metadata()]);
    if (avifMeta.format !== 'heif' || webpMeta.format !== 'webp') throw new Error('AVIF/WebP encoder returned an unexpected format.');
    if (avifMeta.width !== width || webpMeta.width !== width) throw new Error(`Unexpected output width for ${width}px variant.`);
    if (!avif.length || !webp.length) throw new Error('An optimized output is empty.');
  }
  console.log('Image pipeline codec test passed: AVIF + WebP, 480/768/1200/1600px, dimensions verified.');
} finally {
  await fs.rm(tempDir, { recursive: true, force: true });
}
