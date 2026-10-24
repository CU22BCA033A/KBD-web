# Sri Guru Kottureshwara Butter Dosa Hotel: website

ಶ್ರೀ ಗುರು ಕೊಟ್ಟೂರೇಶ್ವರ ಬೆಣ್ಣೆ ದೋಸೆ ಹೋಟೆಲ್, ದಾವಣಗೆರೆ

A two-language (English and Kannada) website for the hotel on Medical College Road, Davangere.
Built with React, Framer Motion and Vite, styled with the UI UX Pro restaurant rules, in the colours of the
hotel's logo and name board.

## Folders
| Path | What it is |
|---|---|
| `dist/` | The finished website, ready to upload. |
| `public/content/` | Editable content: phone, hours, menu, all English and Kannada text. |
| `public/assets/` | Logo, banner pictures, photos, icons, share image. |
| `src/` | The design and code (React components and styles). |

## Put it online
**Easiest:** go to app.netlify.com/drop and drag the `dist` folder onto the page.

**Automatic from GitHub:** in Netlify choose "Import from Git", pick this repository, and Netlify reads
`netlify.toml` (build `npm run build`, publish `dist`). Every push then updates the live site.

Then connect the custom domain in Netlify (Domain management, Add a domain). HTTPS turns on by itself.
Replace `https://www.example.com` in `public/sitemap.xml` and `public/robots.txt`, and set `siteUrl`
in `public/content/config.js`.

## Everyday edits (no coding)
Edit the files in `public/content/` with any text editor, change only the text inside the quotes:

| To change | Edit |
|---|---|
| Phone, WhatsApp, email, hours, FSSAI, social links, logo, photos | `config.js` |
| Dishes, prices, dish photos | `menu.js` |
| Branches and addresses | `locations.js` |
| Any wording, in English or Kannada | `i18n.js` |

Anything left as `""` is hidden, so the site never shows a broken button.
If the site deploys from GitHub, just commit the change. If you upload by hand, run `npm run build`
first, or make the same edit in `dist/content/` and upload `dist`.

### Photos
Photos live in `public/assets/photos/`: `benne-dosa.jpg`, `open-dosa.jpg`, `khali-dosa.jpg`,
`storefront.jpg`. Replace a file with a sharper photo of the same name and it updates everywhere.
To add more, put the file there and write its name in `config.js` (for example in `gallery`).
`tools/compress_photos.py` shrinks photos for the web.

## Developers
```
npm install
npm run dev      # preview at http://localhost:5173
npm run build    # writes the finished site to dist/
```
The content files in `public/content/` load as plain scripts before the app, so they can be edited
after building without touching the code.

## Before launch: confirm with the owner
- [ ] Phone, WhatsApp and email (Call and WhatsApp buttons appear once filled in)
- [ ] Opening hours, cost for two, fully vegetarian
- [ ] Menu: Benne Dosa, Open Dosa, Khali Dosa, with prices
- [ ] Exact Google Maps location
- [ ] Kannada proofreading, and that the 1928 Chennamma story is fine as "local history"
- [ ] FSSAI number, and the name of the person who handles privacy requests
- [ ] The catering terms in the refund policy; have a local lawyer review all four policies
- [ ] Permission for any photo the owner did not take; larger, sharper photos if possible
- [ ] Domain connected, `siteUrl`, sitemap and robots updated

## Design notes
- The top name board recreates the hotel's banner in code (teal sunburst, framed deity photos,
  Kannada and English lettering) so it stays sharp and fits phones. The Kannada spelling on the
  banner artwork had slips, which are corrected here.
- The rest of the site follows a heritage hotel style: cream paper, banana-leaf green, sharp edges,
  hairline rules, no shadows or gradients, colour-only hover, short animations that switch off for
  visitors who prefer reduced motion, skeleton loaders while photos and the map load.
- Pages: home, privacy, terms, refund and cancellation, cookies, and a custom 404.
- No tracking or analytics. The Google map loads only after the visitor allows it.

## Licences
Fonts (Playfair Display, Karla, Noto Serif/Sans Kannada, Baloo Tamma 2, Comic Neue): SIL Open Font License.
React, Framer Motion, Vite: MIT. QR code library: MIT (Kazuhiko Arase).
Logo, banner and photos belong to the hotel.
