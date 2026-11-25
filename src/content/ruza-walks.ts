import { ruzaSources, yandexPlace } from './ruza';
import { ruzaMedia as photo } from './ruza-media';
import type { PlacePhoto } from './ruza-media';

interface Stop {
  id: string;
  title: string;
  address: string;
  walk: string;
  look: string;
  map: string;
  photo: PlacePhoto;
  story?: { href: string; label: string };
}

interface Walk {
  id: string;
  title: string;
  lead: string;
  cover: PlacePhoto;
  stops: Stop[];
  includesPark?: boolean;
}

const cafe: Stop = {
  id: 'federativnaya',
  title: 'Кофейня «История места»',
  address: 'Федеративная улица, 7',
  walk: 'Встретьтесь у кофейни. Если берёте кофе с собой, откройте следующую точку до выхода и держите курс к площади Партизан.',
  look: 'Внутри найдите настенную карту с надписью «Руза 1328». С неё можно начать знакомство с городом ещё за чашкой кофе.',
  map: ruzaSources.cafe.url,
  photo: photo.cafeFacade,
  story: { href: '/cafe/', label: 'Заглянуть внутрь кофейни' },
};

const square: Stop = {
  id: 'ploshchad',
  title: 'Площадь Партизан',
  address: 'Бывшая Торговая площадь',
  walk: 'На площади остановитесь у края, откуда видны фасады и подход к собору. Собор будет следующей точкой прогулки.',
  look: 'Посмотрите, как улицы подходят к площади. Контур старого торгового центра до сих пор можно прочитать по застройке.',
  map: yandexPlace('площадь Партизан'),
  photo: photo.square,
  story: { href: '/stories/gorod-po-ulitsam/', label: 'Как менялись площадь и улицы' },
};

const cathedral: Stop = {
  id: 'sobor',
  title: 'Воскресенский собор',
  address: 'Площадь Партизан, 21',
  walk: 'Подойдите к собору со стороны площади. После него оставайтесь в центре и направляйтесь к дому № 14, где находится музей.',
  look: 'Отойдите на несколько шагов, чтобы рассмотреть силуэт собора вместе с окружающими зданиями.',
  map: yandexPlace('площадь Партизан, 21'),
  photo: photo.cathedral,
};

const museum: Stop = {
  id: 'muzey',
  title: 'Краеведческий музей',
  address: 'Площадь Партизан, 14',
  walk: 'Загляните в музей, если он открыт. Здесь заканчивается короткая прогулка. В длинном маршруте дальше нужно открыть точку парка на Красноармейской.',
  look: 'В музее можно увидеть макет укрепления. А в архиве атласа — открытку с первым зданием музея у реки.',
  map: yandexPlace('Рузский краеведческий музей, площадь Партизан, 14'),
  photo: photo.museum,
  story: { href: '/stories/muzey-kotoryy-sobiraet-pamyat/', label: 'История музея и старой читальни' },
};

const park: Stop = {
  id: 'gorodok',
  title: 'Городок',
  address: 'Красноармейская улица, 1',
  walk: 'Если парк открыт, продолжите прогулку от музея до входа на Красноармейской. Держитесь открытых дорожек и сверяйтесь с указателями на месте.',
  look: 'Присмотритесь к перепаду высоты и изгибу реки. С Городка открывается вид в сторону Дмитриевского храма.',
  map: yandexPlace('парк Городок, Красноармейская улица, 1'),
  photo: photo.parkView,
  story: { href: '/stories/mezhdu-vodoy-i-lesom/', label: 'Как река определила характер города' },
};

export const ruzaWalks: Walk[] = [
  {
    id: 'ruza-za-den',
    title: 'Пройти Рузу за один день',
    lead: 'От первого кофе на Федеративной до вида с Городка. По пути — площадь, собор и музей.',
    cover: photo.parkView,
    stops: [cafe, square, cathedral, museum, park],
    includesPark: true,
  },
  {
    id: 'staraya-ruza',
    title: 'Площадь и старые улицы',
    lead: 'Короткая прогулка по центру. Четыре остановки и время, чтобы рассмотреть фасады и зайти в музей.',
    cover: photo.street,
    stops: [cafe, square, cathedral, museum],
  },
];
