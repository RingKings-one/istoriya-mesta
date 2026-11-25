import type { RouteStop, SourceReference, StoryRecord } from './model';

export const ruzaSources = {
  history: { label: 'Администрация округа · История Рузы', url: 'https://ruzaregion.ru/okrug/istoriya' },
  plan: { label: 'Генеральный план округа · Историческая планировка Рузы', url: 'https://ruzaregion.ru/upload/docs/grad_dejat/generalnyy-plan-ruzskogo-municipal-nogo-okruga/materialy-po-obosnovaniyu-v-tekstovoy-forme-ruzskiy-go-tom-3-kniga.pdf' },
  park: { label: 'Парк «Городок» · Режим работы', url: 'https://parki-ruza.ru/' },
  museum: { label: 'Рузский краеведческий музей · Культура.РФ', url: 'https://www.culture.ru/institutes/24571/ruzskii-kraevedcheskii-muzei' },
  streetNames: { label: 'Администрация округа · Исторические названия улиц', url: 'https://ruzaregion.ru/news/kartina_dnya/6305' },
  buildings: { label: 'Рузский музей · Историческая застройка города', url: 'https://old.ruzamuseum.ru/news/istoricheskaya-zastroyka-goroda-ruzy' },
  photographs: { label: 'История Рузы в фотографиях · Администрация округа', url: 'https://ruzaregion.ru/news/kartina_dnya/20986' },
  exhibition: { label: 'Рузский музей · Снимки середины XX века', url: 'https://old.ruzamuseum.ru/news/retro-fotovystavka-otkryta-v-ruzskom-kraevedcheskom-muzee' },
  memory: { label: 'Музейная экспозиция об освобождении Рузского края', url: 'https://ruzaregion.ru/news/cultruza/62682' },
  maleevo: { label: 'Рузский музей · Усадьба Малеевка', url: 'https://old.ruzamuseum.ru/news/istoriya-ruzy-v-fotografiyah-usadba-maleevka-0' },
  calendar: { label: 'Рузский музей · Краеведческий календарь', url: 'https://old.ruzamuseum.ru/news/kraevedcheskiy-kalendar' },
  cathedral: { label: 'Рузское благочиние · Адреса храмов', url: 'https://ruzskoye.cerkov.ru/xramy/' },
  cafe: { label: 'Кофейня «История места» · Яндекс Карты', url: 'https://yandex.ru/maps/org/istoriya_mesta/6649903981/' },
  postcard: { label: 'Карточка открытки на Wikimedia Commons', url: 'https://commons.wikimedia.org/w/index.php?oldid=1242342758' },
} satisfies Record<string, SourceReference>;

export const postcard = {
  src: '/images/ruza-museum-postcard.webp',
  alt: 'Здание земской библиотеки с музеем на берегу реки Рузы на старой открытке',
  width: 1280,
  height: 799,
  title: 'Вид на музей с Городка',
  date: '1910-е годы',
  credit: 'Фототипия Шереръ, Набгольцъ и Кº. Коллекция Рузского краеведческого музея, ОФ 5944. Скан Александра Артемёнкова.',
  rights: 'Public Domain Mark 1.0',
  rightsUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
};

const storyDrafts = [
  {
    slug: 'gorod-kotoryy-pomnit',
    title: 'Руза — город, который помнит',
    dek: 'Земляные валы Городка и память на площади Партизан.',
    sources: [ruzaSources.history, ruzaSources.park, ruzaSources.plan, ruzaSources.memory],
    sections: [
      { heading: 'Город на высоком берегу', body: 'Отсчёт истории города здесь ведут от 1328 года — одной из датировок грамоты Ивана Калиты, в которой упоминается Руза. Место старого укрепления сохранилось в рельефе. На Городке земляные валы помогают увидеть, как высокий берег и склоны защищали город.' },
      { heading: 'Имена на площади', body: 'У городской памяти есть и другое место — мемориал на площади Партизан. На его плитах высечены имена ружан, не вернувшихся с войны. Фотографии города и окрестностей военного времени хранятся в фондах краеведческого музея.' },
    ],
    related: { label: 'Маршрут по историческому центру', href: '/routes/#ruza-za-den' },
  },
  {
    slug: 'gorod-po-ulitsam',
    title: 'Город, который можно прочитать по улицам',
    dek: 'Как старый план, собор и деревянные дома помогают увидеть устройство Рузы.',
    sources: [ruzaSources.history, ruzaSources.plan, ruzaSources.buildings, ruzaSources.streetNames, ruzaSources.cathedral],
    sections: [
      { heading: 'От Торговой площади', body: 'У площади Партизан было другое имя — Торговая. На регулярном плане 1784 года здесь уже читается рисунок прямых улиц и кварталов. Если начать прогулку у Воскресенского собора и пройти вдоль площади, этот рисунок можно увидеть в масштабе нескольких шагов.' },
      { heading: 'Как менялись названия', body: 'Для двух центральных улиц краеведы и рабочая группа восстановили исторические названия: Революционная была Никольской, а Социалистическая — Покровской. На соседних улицах сохранились и другие ориентиры старой Рузы, в том числе Покровская церковь и Дмитриевский храм.' },
      { heading: 'Два деревянных дома', body: 'На Социалистической улице сохранился особняк, известный как дом Чёрной барыни. В истории округа его относят к провинциальному ампиру. У дома Леонтьева другая биография. Деревянный особняк в стиле модерн изготовили в Выборге и привезли в Рузу в 1908 году.' },
    ],
    related: { label: 'Прогулка по площади и старым улицам', href: '/routes/#staraya-ruza' },
  },
  {
    slug: 'muzey-kotoryy-sobiraet-pamyat',
    title: 'Музей, который собирает память',
    dek: 'От земской читальни до коллекции городских фотографий.',
    sources: [ruzaSources.museum, ruzaSources.postcard, ruzaSources.photographs, ruzaSources.exhibition],
    sections: [
      { heading: 'Музей при читальне', body: 'В 1906 году местные учителя и краеведы открыли музей при библиотеке-читальне. На открытке 1910-х годов видно здание на берегу реки. Сегодня музей занимает двухэтажный дом на площади Партизан, 14.' },
      { heading: 'Город в объективе', body: 'Основой музейного проекта «История Рузы в фотографиях» стали снимки краеведа Льва Соколова и участников фотокружка Рузского дома пионеров. В кадр попали жители, улицы, храмы и повседневные сцены. По таким снимкам можно проследить, как менялось место, знакомое по сегодняшней прогулке.' },
    ],
    related: { label: 'Посмотреть открытку в архиве', href: '/archive/#postcard' },
  },
  {
    slug: 'mezhdu-vodoy-i-lesom',
    title: 'Город между водой и лесом',
    dek: 'Речной изгиб и высокий берег, с которого начиналась Руза.',
    sources: [ruzaSources.history, ruzaSources.park, ruzaSources.postcard],
    sections: [
      { heading: 'Берег, который определил место', body: 'На Городке особенно заметен перепад высоты между старым укреплением и рекой. Поворот русла виден и на открытке с земской библиотекой. Если рассматривать открытку как часть пейзажа, легко заметить, как близко стояли друг к другу берег, библиотека и место для прогулок.' },
      { heading: 'Прогулка с видом', body: 'Когда парк открыт, выделите время на видовые точки у Городка. Сверьтесь с картой и режимом работы парка перед выходом. За литературным продолжением этой истории стоит обратиться к Старой Рузе и Малеевке — это уже отдельная поездка за город.' },
    ],
    related: { label: 'История Старой Рузы и Малеевки', href: '/stories/#literaturnye-okrestnosti' },
  },
  {
    slug: 'ruza-segodnya',
    title: 'Руза сегодня',
    dek: 'Площадь, музей и кофейня как три точки одной прогулки.',
    sources: [ruzaSources.cafe, ruzaSources.museum, ruzaSources.cathedral],
    sections: [
      { heading: 'Одна площадь, разные поводы зайти', body: 'На площади Партизан рядом находятся музей и Воскресенский собор. Прогулка здесь меняется с простым выбором: задержаться у фасадов, зайти на выставку или дать себе время рассмотреть площадь целиком.' },
      { heading: 'Кофе на Федеративной', body: 'Кофейня «История места» находится на Федеративной улице, 7. Отсюда удобно начать знакомство с центром или вернуться после музея. На странице кофейни есть точка на карте и ссылка на городской маршрут.' },
    ],
    related: { label: 'Кофейня на Федеративной', href: '/cafe/' },
  },
];

export const ruzaStories = storyDrafts.map((story) => ({
  ...story,
  id: `ruza-${story.slug}`,
  type: 'story',
  status: 'verified',
  citySlug: 'ruza',
  assets: [],
} satisfies StoryRecord & { related: { label: string; href: string } }));

export const literaryNotes = [
  { name: 'Михаил Пришвин', note: 'Жил в Старой Рузе.', source: ruzaSources.calendar },
  { name: 'Анна Ахматова, Самуил Маршак и Булат Окуджава', note: 'Музей называет их среди гостей Дома творчества писателей в Малеевке.', source: ruzaSources.maleevo },
];

export const yandexPlace = (query: string) => `https://yandex.ru/maps/?text=${encodeURIComponent(`Руза, ${query}`)}`;

type WalkStop = RouteStop & { map: string; story?: string };
const stops = {
  cafe: { title: 'Кофейня «История места»', note: 'Федеративная улица, 7. Точка встречи перед прогулкой.', map: ruzaSources.cafe.url, story: '/cafe/' },
  square: { title: 'Площадь Партизан', note: 'Бывшая Торговая площадь. Рассмотрите фасады по периметру и мемориал.', map: yandexPlace('площадь Партизан'), story: '/stories/gorod-po-ulitsam/' },
  cathedral: { title: 'Воскресенский собор', note: 'Площадь Партизан, 21. Осмотрите собор со стороны площади.', map: yandexPlace('площадь Партизан, 21') },
  museum: { title: 'Рузский краеведческий музей', note: 'Площадь Партизан, 14. Сверьте расписание выставок перед прогулкой.', map: yandexPlace('площадь Партизан, 14'), story: '/stories/muzey-kotoryy-sobiraet-pamyat/' },
  park: { title: 'Парк «Городок»', note: 'Красноармейская улица, 1. При открытом парке завершите прогулку у старых валов и речного вида.', map: yandexPlace('парк Городок'), story: '/stories/mezhdu-vodoy-i-lesom/' },
} satisfies Record<string, WalkStop>;

export const ruzaWalks: { id: string; title: string; dek: string; stops: WalkStop[] }[] = [
  {
    id: 'ruza-za-den',
    title: 'Пройти Рузу за один день',
    dek: 'От кофейни через бывшую Торговую площадь и музей к высокому берегу реки.',
    stops: [stops.cafe, stops.square, stops.cathedral, stops.museum, stops.park],
  },
  {
    id: 'staraya-ruza',
    title: 'Площадь и старые улицы',
    dek: 'Короткая прогулка по центру с остановками у собора и музея. Подходит и в дни, когда Городок закрыт.',
    stops: [stops.cafe, stops.square, stops.cathedral, stops.museum],
  },
];
