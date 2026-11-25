# Temporary image sources

All images below are **temporary editorial placeholders** served from the Unsplash image CDN. They are not documentary photographs of Ruza, the project cafe, or any local object. The exact CDN asset IDs are recorded here so each visual can be replaced without changing the page structure.

Creator attribution and the original capture location have **not** been independently verified for these exact CDN asset IDs. To avoid misattribution, this project does not currently name photographers or claim specific locations. The images are used only to test visual direction and layout.

| Site role | CDN asset | Status |
| --- | --- | --- |
| Hero / river / Ruza feature | [photo-1738679468457-79fd4636d996](https://images.unsplash.com/photo-1738679468457-79fd4636d996?auto=format&fit=crop&w=2200&q=82) | Browser load verified |
| Cafe interior | [photo-1770515927749-33442eabf462](https://images.unsplash.com/photo-1770515927749-33442eabf462?auto=format&fit=crop&w=1800&q=82) | Browser load verified |
| Historic street / city cards | [photo-1624793412356-927326a6d9a9](https://images.unsplash.com/photo-1624793412356-927326a6d9a9?auto=format&fit=crop&w=1800&q=82) | Browser load verified |
| Archive / coffee spread / books | [photo-1653491951587-282e99d6c1e5](https://images.unsplash.com/photo-1653491951587-282e99d6c1e5?auto=format&fit=crop&w=1600&q=82) | Browser load verified; travel still life |
| Forest / walking route | [photo-1635746146715-0cc45dfa3bc2](https://images.unsplash.com/photo-1635746146715-0cc45dfa3bc2?auto=format&fit=crop&w=1600&q=82) | Pending browser verification |

The role-to-page mapping and replacement priority are maintained in `ASSET-MAP.md`. The local AVIF/WebP build process is documented in `ASSET-PIPELINE.md`.

## Replacement rule

- Never present these images as photographs of Ruza, local landmarks, or the actual cafe.
- Keep image roles in `src/data.ts` stable when replacing assets so the layout does not need to be rebuilt.
- Before production, replace the remote placeholders with selected project photography, optimized and stored locally in `public/images/`.
- Re-check image focal points separately for desktop and mobile crops.
- Add verified photographer attribution if the final selected license or source requires it.

## Документальные изображения

| Файл на сайте | Источник и права | Размещение |
| --- | --- | --- |
| `/images/ruza-museum-postcard.webp` | [Карточка Wikimedia Commons](https://commons.wikimedia.org/w/index.php?oldid=1242342758), Public Domain Mark 1.0. Музейная коллекция ОФ 5944, фототипия Шереръ, Набгольцъ и Кº, скан Александра Артемёнкова. Совпадающая копия в папке Dropbox, см. ASSET-MAP.md. | Архив, история музея, превью архива на главной и в главе о Рузе. |

## Фотографии и документы выпуска «Руза пешком»

Кофейня — восемь фотографий из подборки пользователя, отобранные для сайта по его запросу. В репозитории хранятся оптимизированные производные. См. точные имена в ASSET-MAP.md.

Две архивные копии из Dropbox визуально сопоставлены с карточками [«Воскресенский собор» 1910–1914](https://pastvu.com/p/158060) и [«Вид города» 1900–1910](https://pastvu.com/p/143316). Авторство исходных дореволюционных снимков не установлено. Для сайта взяты предоставленные пользователем копии. Оборот открытки и опубликованный проект плана 1784 года добавлены из открытой коллекции Commons.

Кредиты и лицензии для остальных кадров хранятся в `src/content/ruza-media.json` и выводятся на странице `/credits/`. Для изображений с CC BY-SA производные распространяются по лицензии оригинала. Преобразования — уменьшение размера, WebP и отображаемый кроп.

## Расширенный выпуск о Рузе и округе

Новый общий вид Рузы подготовлен из полноразмерного оригинала, для небольших экранов есть отдельный файл 840 px. Для четырёх кадров кофейни заново сделаны веб-копии из исходников Dropbox без уменьшения размеров. Цветовая настройка первого экрана кофейни и кадра с двумя чашками применяется только при отображении.

Фотографии Петрищева, окрестных храмов, водохранилища и современных объектов Рузы имеют пофайловую атрибуцию в `src/content/ruza-media.json`. Фотография памятника в Петрищеве датирована 1950-ми годами и относится к послевоенной мемориализации. В разделе о войне упомянуты снимки музейного фонда и карточка РГБ 1948 года. Их изображения в сборку не копировались.
