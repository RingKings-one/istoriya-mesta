import { ruzaMedia as photo } from './ruza-media';
import { postcard } from './ruza';

const postcardPhoto = { ...postcard, caption: 'Городок и земская читальня на открытке 1910-х. Из собрания Рузского краеведческого музея.' };

export const ruzaStoryImages = {
  'gorod-kotoryy-pomnit': { cover: photo.park, details: [photo.museum, photo.museumFacade] },
  'gorod-po-ulitsam': { cover: photo.street, details: [photo.archiveMap, photo.pokrov] },
  'muzey-kotoryy-sobiraet-pamyat': { cover: photo.museumFacade, details: [postcardPhoto, photo.museum] },
  'mezhdu-vodoy-i-lesom': { cover: photo.parkView, details: [photo.river, photo.reservoir] },
  'ruza-segodnya': { cover: photo.wideCity, details: [photo.museumFacade, photo.sport] },
  'petrishchevo': { cover: photo.zoyaMuseum, details: [photo.zoyaMemorial, photo.zoyaHall] },
  'hramy-ruzskogo-kraya': { cover: photo.komlevo, details: [photo.pokrov, photo.gorbovo] },
};
