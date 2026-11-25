# Temporary image sources

These images are approved **temporary editorial placeholders** for layout and art-direction work. None of them documents Ruza or any place in the project. Replace them with the user's selected local photography before production launch.

All six images are served from Unsplash's image CDN and are marked free to use under the Unsplash License on their source pages. Creator attribution is recorded here for traceability.

| Site role | Creator | Photograph / source | Depicted location or subject |
| --- | --- | --- | --- |
| Hero / river / Ruza feature / route card | [Marie Volkert / Reiseblog Worldonabudget](https://www.worldonabudget.de/) | [A river running through a small town surrounded by mountains](https://unsplash.com/photos/a-river-running-through-a-small-town-surrounded-by-mountains-2re291-BjaU) | Berat, Albania — atmospheric reference only |
| Cafe interior | Mavi Atlas | [Interior of a cafe with graffiti and bookshelves](https://unsplash.com/photos/interior-of-a-cafe-with-graffiti-and-bookshelves--oOkWRitZb0) | Ankara, Türkiye |
| Historic street / city cards | Franz Michael Schneeberger | [A narrow cobblestone street in an old European city](https://unsplash.com/photos/a-narrow-cobblestone-street-in-an-old-european-city-SDVBWRK0nLs) | Steyr, Austria |
| Coffee / book | Esra Afşar | [Coffee, snacks, and a book create a cozy café scene](https://unsplash.com/photos/coffee-snacks-and-a-book-create-a-cozy-cafe-scene-rvToqALnyiM) | Istanbul, Türkiye |
| Archive / map / camera / books | Anirudh | [A map, camera, notebook, and other items on a table](https://unsplash.com/photos/a-map-camera-notebook-and-other-items-on-a-table-7DuSUrYyXNs) | Editorial still life |
| Forest / walking route | Adrian Newell | [A forest trail with sunlight through the trees](https://unsplash.com/pt-br/fotografias/uma-trilha-na-floresta-com-o-sol-brilhando-atraves-das-arvores-EltEl0XJyWM) | Forest atmosphere reference |

## Replacement rule

- Do not describe these images as photographs of Ruza, local landmarks, or the actual cafe.
- Keep image paths/data roles stable when replacing assets so the layout does not need to be rebuilt.
- When final local images are selected, download and optimize them into the repository (prefer AVIF/WebP with sensible JPEG fallback if needed), update `src/data.ts`, and remove temporary remote URLs.
- Re-check image focal points separately for desktop and mobile crops.
