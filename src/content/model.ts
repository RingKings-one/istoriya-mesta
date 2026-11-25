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
