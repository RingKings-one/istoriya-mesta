import type { CityProfile } from './model';

export type EditorialPageKey = 'cities' | 'ruza' | 'stories' | 'routes' | 'cafe' | 'archive';

export const ruzaProfile: CityProfile = {
  slug: 'ruza',
  title: 'Руза',
  regionLabel: 'Московская область',
  status: 'researching',
  summary: 'Первая глава атласа. Редакционный портрет будет собран из проверенных материалов, наблюдений и фотографий проекта.',
  plannedPillars: ['Городская среда', 'Люди и повседневность', 'Память и источники', 'Прогулки и маршруты'],
};

/**
 * Contextual reading paths. Each destination answers the question:
 * "Where can I go next to understand this place from another angle?"
 */
export const pageJourneys: Record<EditorialPageKey, Array<{
  href: string;
  title: string;
  note: string;
}>> = {
  cities: [
    { href: '/cities/ruza/', title: 'Руза', note: 'Первая глава атласа и отправная точка исследования' },
  ],
  ruza: [
    { href: '/stories/', title: 'Истории', note: 'Люди, память и детали повседневной жизни' },
    { href: '/routes/', title: 'Маршруты', note: 'Увидеть пространство в движении' },
    { href: '/archive/', title: 'Архив', note: 'Материалы и источники, из которых складывается портрет' },
  ],
  stories: [
    { href: '/cities/ruza/', title: 'Глава о Рузе', note: 'Вернуться к общему портрету места' },
    { href: '/archive/', title: 'Архив', note: 'Посмотреть на свидетельства и визуальные материалы' },
    { href: '/routes/', title: 'Маршруты', note: 'Продолжить знакомство с городом через прогулку' },
  ],
  routes: [
    { href: '/cities/ruza/', title: 'Глава о Рузе', note: 'Понять контекст места перед прогулкой' },
    { href: '/stories/', title: 'Истории', note: 'Узнать, какие сюжеты скрываются за деталями' },
    { href: '/archive/', title: 'Архив', note: 'Исследовать материалы и визуальные следы' },
  ],
  cafe: [
    { href: '/cities/ruza/', title: 'Глава о Рузе', note: 'Кофейное пространство как часть портрета города' },
    { href: '/stories/', title: 'Истории', note: 'Люди, встречи и повседневные ритуалы' },
    { href: '/routes/', title: 'Маршруты', note: 'Встроить паузу в неспешное знакомство с местом' },
  ],
  archive: [
    { href: '/cities/ruza/', title: 'Глава о Рузе', note: 'Собрать материалы в общий контекст города' },
    { href: '/stories/', title: 'Истории', note: 'Увидеть человеческий смысл за источниками' },
    { href: '/routes/', title: 'Маршруты', note: 'Связать пространство и его свидетельства' },
  ],
};
