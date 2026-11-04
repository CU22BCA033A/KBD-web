# Design: the tiffin-room counter board

The site is the hotel's painted counter board. It uses the hotel's name board colours
(the board itself is no longer shown on the site): the same bottle green, with chalk and turmeric
lettering. Working sections (how it's made, visit, policy pages) sit on a brushed-steel counter;
catering is a turmeric painted notice.

## Colour (tokens in `src/styles.css` `:root`)
| Token | Value | Role |
|---|---|---|
| `--board` | #02432B | Main field. Exact bottom-edge colour of the name board banner. |
| `--board-deep` | #012E1D | Header, footer, menu board, gallery, today strip |
| `--board-lift` | #0A5638 | Hover line on the board, skeletons |
| `--chalk` | #F3EFE2 | Text and frames on the board |
| `--chalk-soft` | #BFD3C3 | Secondary text on the board |
| `--turmeric` | #F2B21B | Primary action, second-language headings, rules, prices |
| `--kumkum` | #C62A1F | "House special" tag, closed dot. Sparingly. |
| `--steel` / `--steel-2` | #DADDD6 / #E9EBE5 | Steel counter sections, form, cookie notice |
| `--steel-ink` / `--steel-soft` | #1F2A24 / #46524B | Text on steel |
Dark theme redefines only the steel tokens (the board is already dark). All text pairs meet WCAG AA.

## Type
- Display Latin: **Teko** 500/600 (Indian Type Foundry, condensed signage). Headings, dish names, buttons, nav.
- Display Kannada: **Baloo Tamma 2** 700.
- Text: **Hind** 400/500/600 and **Noto Sans Kannada**.
- All self-hosted in `src/fonts/` (SIL Open Font License).
- Headings are bilingual (`BoardTitle`): the visitor's language large, the other language in turmeric beneath, like the name board.

## Shape and material
- Square corners everywhere. Only round things are round: the steel thali rim around the hero photo, the step numbers, the WhatsApp float.
- Painted frames: 2px chalk border plus a 2px turmeric inner outline (menu board); 2px rules and dotted leaders.
- No shadows, no gradients (the name board banner is the one exception, as artwork), no glass.

## Components
- **Buttons**: plaques. `btn-gold` (turmeric, primary), `btn-chalk` (outlined on board), `btn-primary` (board green on steel), `btn-line` (outlined on steel). Hover changes colour only.
- **Menu board**: one framed board; each dish line = square photo, name, dotted leader, price, other-language name, description, veg mark, order plaque.
- **Today strip**: open-now status, hours, address, directions, copy.

## Motion
- Focal moment, on load: the hero headline is sign-painted left to right (clip-path wipe), the other-language line
  follows, then the text and buttons settle; the plate photo is set down onto the counter with a slight turn.
- Menu: the board paints in top-down on first view, then the dish lines are written onto it one by one.
- Signature interaction: the dish line under the pointer or focus lights up (board-lift ground, turmeric name).
- Feedback: buttons press in 1px when tapped; language and theme switches cross-fade (View Transitions).
- The "Open now" dot pulses three times, then stops.
- Skeleton pulse while photos, map and QR load.
- Reduced motion: every movement becomes a short fade; no wipes, slides or presses.

## Type tuning
- `font-synthesis: none` (no faked bold or italic, important for Kannada).
- Light text on the green gets slightly more line height (1.68) and tracking; steel sections use 1.6.
- `text-wrap: balance` on headings, `pretty` on paragraphs; tabular numbers for prices, hours and steps.

## Photos
Shown whole, uncropped. Exceptions approved by the owner: round hero plate, square menu thumbnails, blurred hero background.

## Rules from the owner (binding)
See PRODUCT.md, Brand Commitments: no em dashes, no pure white, no fake reviews or metrics, no eyebrow labels, no emoji, no Inter/Geist/Space Grotesk, no hover animation on everything.
