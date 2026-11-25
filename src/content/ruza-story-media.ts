import { ruzaMedia as photo } from './ruza-media';
import { postcard } from './ruza';

const postcardPhoto = { ...postcard, caption: 'Городок и земская читальня на открытке 1910-х. Из собрания Рузского краеведческого музея.' };

export const ruzaStoryImages = {
  'gorod-kotoryy-pomnit': { cover: photo.park, detail: photo.museum },
  'gorod-po-ulitsam': { cover: photo.street, detail: photo.archiveMap },
  'muzey-kotoryy-sobiraet-pamyat': { cover: photo.museum, detail: postcardPhoto },
  'mezhdu-vodoy-i-lesom': { cover: photo.parkView, detail: photo.river },
  'ruza-segodnya': { cover: photo.cityToday, detail: photo.cafeFacade },
};
