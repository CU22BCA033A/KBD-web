# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Local Davangere regulars who come back for breakfast and evening tiffin.
- Travellers passing through Davangere who want the city's famous benne dosa and need to find the hotel fast.
- Students from the nearby colleges on Medical College Road (Bapuji Dental College is opposite).
- Families planning weddings, housewarmings, naming ceremonies and other events who want benne dosa catering.

Most visitors arrive on a phone, often from Google Maps or a shared WhatsApp link, in English or Kannada.

## Product Purpose
The website of Sri Guru Kottureshwara Butter Dosa Hotel (ಶ್ರೀ ಗುರು ಕೊಟ್ಟೂರೇಶ್ವರ ಬೆಣ್ಣೆ ದೋಸೆ ಹೋಟೆಲ್), a family hotel on Medical College Road, Davangere, serving wood-fired Davangere benne dosa.
Success means a visitor can, in a few taps:
1. order on WhatsApp,
2. send a catering enquiry,
3. see the menu and the food,
4. find and visit the hotel (open now, hours, directions, call).
All four goals were confirmed as important by the user.

## Positioning
A Davangere hotel serving the city's own dish, benne dosa, cooked on a wood-fired tava with white butter, carrying forward the local tradition (local accounts trace benne dosa to Chennamma's stall near a drama theatre, 1928). The hotel is devotionally named after Sri Guru Kottureshwara.

## Operating Context
- Bilingual: English and Kannada, switchable on every page.
- Ordering and catering happen on WhatsApp; the website collects nothing and stores nothing.
- The hotel's name board banner and logo are physical brand assets customers recognise on the street.

## Capabilities and Constraints
- Stack (existing): React 18, Framer Motion, Vite. Editable content lives in `public/content/` (config.js, i18n.js, menu.js, locations.js) and must stay editable without a rebuild.
- Pages: home, privacy, terms, refund and cancellation, cookies, custom 404.
- Features that must remain: language switch, dark mode, open-now status in India time, mobile quick-action bar, mobile menu, catering form with validation/review/success states, consent-gated Google map, FAQ, gallery with larger view, back-to-top, QR/share.
- Menu is exactly three items: Benne Dosa, Open Dosa, Khali Dosa. Prices not yet set ("Price at counter").
- Phone, WhatsApp and email are not yet provided; buttons that depend on them hide until set.
- Deploys from GitHub (CU22BCA033A/KBD-web) to Netlify via `netlify.toml`.

## Brand Commitments
- Name: "Sri Guru Kottureshwara Butter Dosa Hotel" (matches the name board).
- The name board banner was removed from the site at the owner's request (files kept in `public/assets/brand/`). The page green still matches it.
- Logo: `public/assets/logo.webp`, used in header, favicon and share image.
- Photos must be shown whole, never cropped, except the round hero frame and square menu thumbnails, which the user approved.
- User's standing design bans: no harsh gradients, pure white backgrounds, rainbow colours, drop shadows everywhere, three-cards-in-a-row, emoji, liquid glass, em dashes, Inter/Geist/Space Grotesk, coloured accent stripes, fake testimonials or metrics, bento grids, terminal windows, "it's not X, it's Y" copy, checkmark bullets, pricing tiers, soft rounded UI, purple and black, radial orbs, dot grids, sparkle icons, animated arrows, hover animation on everything, neon or basic pastel colours, cursor animation. Must have skeleton loaders, terms and privacy pages.

## Evidence on Hand
- Real photos in `public/assets/photos/`: benne-dosa-plate, benne-dosa-folded, benne-dosa-plates, open-dosa, open-dosa-spiced, khali-dosa, khali-dosa-plate, tava-dosas, storefront, hotel-front.
- No reviews, ratings, awards, customer counts or press. These must not be invented.
- Hours (public listings, to verify): 7:30 AM to 9:30 PM daily. Cost for two about ₹150 to ₹210 (to verify).

## Product Principles
1. Every primary action is one tap on a phone: WhatsApp order, catering, menu, directions.
2. The food and the hotel's own name board are the proof; show real photos, never stock or invented claims.
3. Kannada is a first-class language, not a translation afterthought.
4. Show only what is true and set; hide anything not yet provided rather than showing placeholders.

## Accessibility & Inclusion
WCAG AA contrast, keyboard navigation, visible focus, reduced-motion support, alt text in both languages, touch targets at least 44 px.
