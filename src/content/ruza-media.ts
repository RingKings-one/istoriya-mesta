import catalogue from './ruza-media.json';

export interface PlacePhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit?: { author: string; source: string; license: string; licenseUrl: string };
}

export const ruzaMedia = catalogue satisfies Record<string, PlacePhoto>;
export const documentaryCredits = Object.values(ruzaMedia).filter(
  (item): item is PlacePhoto & Required<Pick<PlacePhoto, 'credit'>> => 'credit' in item,
);
