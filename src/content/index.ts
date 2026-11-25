import type { CityProfile } from './model';

export type EditorialPageKey = 'cities' | 'ruza' | 'stories' | 'routes' | 'cafe' | 'archive';

export const ruzaProfile: CityProfile = {
  slug: 'ruza',
  title: 'Руза',
  regionLabel: 'Московская область',
  status: 'verified',
  summary: 'На высоком берегу реки сохранились валы старого укрепления. В центре можно прочитать регулярный план XVIII века, а на площади Партизан заглянуть в музей, который собирает городскую память с 1906 года.',
  plannedPillars: ['Городская среда', 'Люди и повседневность', 'Память и источники', 'Прогулки и маршруты'],
};

/**
 * Contextual reading paths. Each page lists destinations that are not already
 * the primary links in its main content, so the footer path adds a real next step
 * instead of repeating the same cards or index rows.
 */
export const pageJourneys: Record<EditorialPageKey, Array<{
  href: string;
  title: string;
  note: string;
}>> = {
  cities: [
    { href: '/stories/', title: 'Истории', note: 'Увидеть город через сюжеты и человеческие детали' },
    { href: '/archive/', title: 'Архив', note: 'Познакомиться с материалами и источниками проекта' },
  ],
  ruza: [
    { href: '/cafe/', title: 'Кофейня', note: 'Открыть тему повседневных встреч и городских ритуалов' },
    { href: '/cities/', title: 'Атлас городов', note: 'Вернуться к карте проекта и его будущим главам' },
  ],
  stories: [
    { href: '/cities/ruza/', title: 'Глава о Рузе', note: 'Вернуться к общему портрету места' },
    { href: '/cities/', title: 'Атлас городов', note: 'Посмотреть первую главу атласа' },
  ],
  routes: [
    { href: '/stories/', title: 'Истории', note: 'Узнать, какие сюжеты скрываются за деталями' },
    { href: '/archive/', title: 'Архив', note: 'Исследовать материалы и визуальные следы' },
    { href: '/cafe/', title: 'Кофейня', note: 'Предусмотреть паузу в неспешном знакомстве с местом' },
  ],
  cafe: [
    { href: '/stories/', title: 'Истории', note: 'Люди, встречи и повседневные ритуалы' },
    { href: '/routes/', title: 'Маршруты', note: 'Продолжить знакомство с местом в движении' },
  ],
  archive: [
    { href: '/cafe/', title: 'Кофейня', note: 'Посмотреть на повседневную жизнь через пространство встреч' },
    { href: '/cities/', title: 'Атлас городов', note: 'Собрать отдельные материалы в контекст города' },
  ],
};
