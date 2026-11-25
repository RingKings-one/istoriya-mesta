/**
 * Editorial content contracts.
 *
 * These types describe what a publishable record must carry. They deliberately
 * keep factual and location fields optional until they have been verified.
 */
export type EditorialStatus = 'planned' | 'researching' | 'verified' | 'published';
export type AssetStatus = 'placeholder' | 'selected' | 'verified';

export interface SourceReference {
  label: string;
  url: string;
  accessedAt?: string;
  note?: string;
}

export interface EditorialAsset {
  role: string;
  src: string;
  alt: string;
  status: AssetStatus;
  credit?: string;
  locationVerified: boolean;
}

export interface EditorialRecord {
  id: string;
  slug: string;
  title: string;
  dek: string;
  status: EditorialStatus;
  citySlug: string;
  updatedAt?: string;
  sources: SourceReference[];
  assets: EditorialAsset[];
}

export interface StoryRecord extends EditorialRecord {
  type: 'story';
  author?: string;
  publishedAt?: string;
  readingMinutes?: number;
  sections: Array<{ heading: string; body: string }>;
}

export interface RouteStop {
  title: string;
  note: string;
  coordinates?: { latitude: number; longitude: number };
  locationSource?: SourceReference;
}

export interface RouteRecord extends EditorialRecord {
  type: 'route';
  distanceKm?: number;
  durationMinutes?: number;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  startsAt?: string;
  stops: RouteStop[];
  fieldCheckedAt?: string;
}

export interface PlaceRecord extends EditorialRecord {
  type: 'place';
  address?: string;
  coordinates?: { latitude: number; longitude: number };
  openingHours?: string;
  contact?: string;
  fieldCheckedAt?: string;
}

export interface ArchiveRecord extends EditorialRecord {
  type: 'archive';
  materialType: 'photograph' | 'document' | 'map' | 'object' | 'recording';
  creator?: string;
  creationDate?: string;
  provenance: SourceReference[];
}

export interface CityProfile {
  slug: string;
  title: string;
  regionLabel: string;
  status: EditorialStatus;
  summary: string;
  plannedPillars: string[];
}


/** Navigation summaries for contextual discovery between editorial sections.
 * These are page-level destinations, not claims that the linked content is published.
 */
export interface RelatedEditorialLink {
  id: string;
  title: string;
  href: string;
  excerpt: string;
  status: EditorialStatus;
}

const relatedContent: Record<string, RelatedEditorialLink> = {
  ruza: {
    id: 'ruza', title: 'Руза', href: '/cities/ruza/',
    excerpt: 'Первая глава атласа — портрет места, который будет собираться из проверенных материалов.',
    status: 'planned',
  },
  stories: {
    id: 'stories', title: 'Истории', href: '/stories/',
    excerpt: 'Редакционный журнал о среде, людях и повседневных деталях.',
    status: 'planned',
  },
  routes: {
    id: 'routes', title: 'Маршруты', href: '/routes/',
    excerpt: 'Идеи прогулок; практические параметры появятся после проверки на месте.',
    status: 'planned',
  },
  cafe: {
    id: 'cafe', title: 'Кофейня', href: '/cafe/',
    excerpt: 'Портрет пространства встреч — конкретное место и его детали ещё предстоит подтвердить.',
    status: 'planned',
  },
  archive: {
    id: 'archive', title: 'Архив', href: '/archive/',
    excerpt: 'Будущая коллекция фотографий, карт, документов и свидетельств с указанием происхождения.',
    status: 'planned',
  },
};

const relatedByPage: Record<string, string[]> = {
  ruza: ['stories', 'routes', 'archive', 'cafe'],
  stories: ['archive', 'routes', 'cafe', 'ruza'],
  routes: ['ruza', 'stories', 'cafe'],
  cafe: ['ruza', 'stories', 'routes'],
  archive: ['stories', 'routes', 'ruza'],
  cities: ['ruza', 'stories', 'archive'],
};

export function getRelatedEntries(pageId: string): RelatedEditorialLink[] {
  return (relatedByPage[pageId] ?? [])
    .map((id) => relatedContent[id])
    .filter((entry): entry is RelatedEditorialLink => Boolean(entry));
}
