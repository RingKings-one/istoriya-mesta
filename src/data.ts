import manifest from './generated/image-manifest.json';

// Temporary editorial imagery. These are mood references, not documentary photographs of Ruza.
// Keep these stable IDs/roles when replacing mood visuals with user-selected project photography.
export const imageAssets = {
  riverTown: { id: 'mood-river-town', src: 'https://images.unsplash.com/photo-1738679468457-79fd4636d996?auto=format&fit=crop&w=2200&q=82', status: 'placeholder', roles: ['hero', 'river', 'ruza-feature', 'dock'], maxWidth: 2200, localKey: 'ruza--ruza-river-panorama', focalPoint: 'center 54%' },
  cafeInterior: { id: 'mood-cafe-interior', src: 'https://images.unsplash.com/photo-1770515927749-33442eabf462?auto=format&fit=crop&w=1800&q=82', status: 'placeholder', roles: ['cafe-interior'], maxWidth: 1800, localKey: 'cafe--cafe-interior-window', focalPoint: '68% center' },
  historicStreet: { id: 'mood-historic-street', src: 'https://images.unsplash.com/photo-1624793412356-927326a6d9a9?auto=format&fit=crop&w=1800&q=82', status: 'placeholder', roles: ['street', 'city-atmosphere', 'church', 'building', 'camera'], maxWidth: 1800, localKey: 'ruza--ruza-street-detail-01', focalPoint: '58% center' },
  coffeeAndBook: { id: 'mood-coffee-book', src: 'https://images.unsplash.com/photo-1653491951587-282e99d6c1e5?auto=format&fit=crop&w=1400&q=82', status: 'placeholder', roles: ['coffee', 'books'], maxWidth: 1400, localKey: 'cafe--coffee-and-book-still-life', focalPoint: 'center' },
  archiveDesk: { id: 'mood-archive-desk', src: 'https://images.unsplash.com/photo-1653491951587-282e99d6c1e5?auto=format&fit=crop&w=1599&q=82', status: 'placeholder', roles: ['archive', 'museum'], maxWidth: 1600, localKey: 'archive--archive-desk-detail', focalPoint: 'center 42%' },
  forestPath: { id: 'mood-forest-path', src: 'https://images.unsplash.com/photo-1635746146715-0cc45dfa3bc2?auto=format&fit=crop&w=1600&q=82', status: 'placeholder', roles: ['map', 'forest', 'gazebo', 'route-atmosphere'], maxWidth: 1600, localKey: 'ruza--ruza-forest-path', focalPoint: '56% center' },
} as const;

const localAssets: Record<string, unknown> = manifest.assets;

export const hasLocalImage = (src: string) => Object.values(imageAssets).some(
  (asset) => asset.src === src && Object.hasOwn(localAssets, asset.localKey),
);

export const isPlaceholderImage = (src: string) => Object.values(imageAssets).some(
  (asset) => asset.src === src,
) && !hasLocalImage(src);

export const nav = [
  { label: 'Кофейня', href: '/cafe/' },
  { label: 'Города', href: '/cities/' },
  { label: 'Истории', href: '/stories/' },
  { label: 'Маршруты', href: '/routes/' },
  { label: 'Архив', href: '/archive/' },
];

// Public-facing aliases keep page markup independent from the underlying asset source.
export const images = {
  hero: imageAssets.riverTown.src, cafe: imageAssets.cafeInterior.src, river: imageAssets.riverTown.src,
  street: imageAssets.historicStreet.src, coffee: imageAssets.coffeeAndBook.src,
  archive: imageAssets.archiveDesk.src, museum: imageAssets.archiveDesk.src,
  map: imageAssets.forestPath.src, forest: imageAssets.forestPath.src,
  church: imageAssets.historicStreet.src, building: imageAssets.historicStreet.src,
  gazebo: imageAssets.forestPath.src, dock: imageAssets.riverTown.src,
  books: imageAssets.coffeeAndBook.src, camera: imageAssets.historicStreet.src,
};

/** Responsive candidates for temporary Unsplash CDN images.
 * Local project photographs are processed by scripts/optimize-images.mjs.
 */
export const imageSrcSet = (url: string) => {
  const maxWidth = Number(url.match(/[?&]w=(\d+)/)?.[1] ?? 2200);
  const widths = [480, 640, 960, 1440].filter((width) => width < maxWidth);
  widths.push(maxWidth);
  return [...new Set(widths)].map((width) => `${url.replace(/([?&])w=\d+/, `$1w=${width}`)} ${width}w`).join(', ');
};
