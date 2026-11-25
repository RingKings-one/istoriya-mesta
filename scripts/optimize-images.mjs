import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceRoot = path.join(root, 'assets', 'source');
const outputRoot = path.join(root, 'public', 'images', 'optimized');
const manifestPath = path.join(outputRoot, 'manifest.json');
const sourceManifestPath = path.join(root, 'src', 'generated', 'image-manifest.json');
const supported = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.avif']);
const targetWidths = [480, 768, 1200, 1600, 2200];

async function collectFiles(directory) {
  let entries;
  try { entries = await fs.readdir(directory, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolute));
    else if (entry.isFile() && supported.has(path.extname(entry.name).toLowerCase())) files.push(absolute);
  }
  return files.sort();
}

function assetKey(file) {
  return path.relative(sourceRoot, file).replace(/\.[^.]+$/, '')
    .split(path.sep)
    .map((part) => part.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    .filter(Boolean).join('--');
}

await fs.mkdir(path.dirname(outputRoot), { recursive: true });
await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });
await fs.mkdir(path.dirname(sourceManifestPath), { recursive: true });
const files = await collectFiles(sourceRoot);
const manifest = { version: 1, assets: {} };
const seen = new Set();

for (const file of files) {
  const key = assetKey(file);
  if (!key) throw new Error(`Could not derive a stable asset key for ${file}`);
  if (seen.has(key)) throw new Error(`Duplicate asset key "${key}". Rename one source file or folder.`);
  seen.add(key);
  const metadata = await sharp(file, { failOn: 'error' }).rotate().metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Missing image dimensions: ${file}`);
  const swapsDimensions = [5, 6, 7, 8].includes(metadata.orientation);
  const orientedWidth = swapsDimensions ? metadata.height : metadata.width;
  const orientedHeight = swapsDimensions ? metadata.width : metadata.height;
  const widths = [...new Set([...targetWidths.filter((width) => width < orientedWidth), orientedWidth])].sort((a,b) => a-b);
  const variants = { avif: [], webp: [] };
  for (const width of widths) {
    const base = path.join(outputRoot, `${key}-${width}`);
    const pipeline = () => sharp(file, { failOn: 'error' }).rotate().resize({ width, withoutEnlargement: true });
    const [avifInfo, webpInfo] = await Promise.all([
      pipeline().avif({ quality: 55, effort: 5, chromaSubsampling: '4:2:0' }).toFile(`${base}.avif`),
      pipeline().webp({ quality: 78, effort: 5 }).toFile(`${base}.webp`),
    ]);
    variants.avif.push({ width: avifInfo.width, src: `/images/optimized/${key}-${width}.avif`, bytes: avifInfo.size });
    variants.webp.push({ width: webpInfo.width, src: `/images/optimized/${key}-${width}.webp`, bytes: webpInfo.size });
  }
  manifest.assets[key] = {
    source: path.relative(root, file).split(path.sep).join('/'),
    width: orientedWidth, height: orientedHeight,
    aspectRatio: Number((orientedWidth / orientedHeight).toFixed(4)), variants,
  };
  console.log(`Optimized ${key}: ${widths.join(', ')}px`);
}
await Promise.all([
  fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`),
  fs.writeFile(sourceManifestPath, `${JSON.stringify(manifest, null, 2)}\n`),
]);
console.log(files.length ? `Image pipeline complete: ${files.length} source image(s), AVIF + WebP variants written.` : 'Image pipeline ready: no source photographs yet; empty manifest written. Add originals under assets/source/.');
