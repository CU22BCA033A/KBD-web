# Photos

Only real photos of this hotel and its food go here. No stock or AI images.

## How to add or change a photo
1. Copy the photo into this folder, for example `hero.jpg`.
2. Open `js/config.js` and type the file name in the matching slot:
   `hero: "hero.jpg"`.
3. To change it later, replace the file with a new photo of the same name.

A slot left as `""` is hidden, and the page layout adjusts by itself.

Keep each photo under about 300 KB. Run `python tools/compress_photos.py`,
or use squoosh.app in a browser.

## Photo slots
| Slot in config.js | What to shoot | Shape |
|---|---|---|
| `photos.hero` | A benne dosa on a steel plate with palya and chutney, from above or at a 45 degree angle, in daylight | Landscape 4:3 |
| `photos.signature` | Close-up of butter melting on a dosa on the tava | Portrait 4:5 |
| `photos.story` | The storefront with the name board, or the cook at the wood-fired tava | Portrait 4:5 |
| `photos.gallery` | The wood fire, flipping dosas, chutney bowls, the counter, a busy morning | Landscape 4:3 |
| `photo` in `js/menu.js` | One photo of each dish | Square |

## Tips for good phone photos
- Shoot near a window or outdoors, never with the flash.
- Wipe the plate rim and the lens.
- Hold the phone steady and tap on the food to focus.
- Ask before showing customers' faces.
