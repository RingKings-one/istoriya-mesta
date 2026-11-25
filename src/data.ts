// Temporary editorial imagery. These are mood references, not documentary photographs of Ruza.
const riverTown = 'https://images.unsplash.com/photo-1738679468457-79fd4636d996?auto=format&fit=crop&w=2200&q=82';
const cafeInterior = 'https://images.unsplash.com/photo-1770515927749-33442eabf462?auto=format&fit=crop&w=1800&q=82';
const historicStreet = 'https://images.unsplash.com/photo-1624793412356-927326a6d9a9?auto=format&fit=crop&w=1800&q=82';
const coffeeAndBook = 'https://images.unsplash.com/photo/1504812036248-733753e0d165?auto=format&fit=crop&w=1400&q=82';
const archiveDesk = 'https://images.unsplash.com/photo-1653491951587-282e99d6c1e5?auto=format&fit=crop&w=1600&q=82';
const forestPath = 'https://images.unsplash.com/photo-1635746146715-0cc45dfa3bc2?auto=format&fit=crop&w=1600&q=82';

export const nav = [
  { label: 'Города', href: '/cities/' },
  { label: 'Истории', href: '/stories/' },
  { label: 'Кофейня', href: '/cafe/' },
  { label: 'Маршруты', href: '/routes/' },
  { label: 'Архив', href: '/archive/' },
];

export const images = {
  hero: riverTown,
  cafe: cafeInterior,
  river: riverTown,
  street: historicStreet,
  coffee: coffeeAndBook,
  archive: archiveDesk,
  museum: archiveDesk,
  map: archiveDesk,
  forest: forestPath,
  church: historicStreet,
  building: historicStreet,
  gazebo: forestPath,
  dock: riverTown,
  books: archiveDesk,
  camera: archiveDesk,
};

/**
 * Generate responsive Unsplash CDN candidates from the canonical asset URL.
 * Keep the image role stable; the browser chooses the smallest suitable width.
 */
export const imageSrcSet = (url: string) =>
  [640, 960, 1440, 2200]
    .map((width) => `${url.replace(/([?&])w=\\d+/, `$1w=${width}`)} ${width}w`)
    .join(', ');
