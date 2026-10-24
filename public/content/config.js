/* =============================================================
   SITE SETTINGS: the one file to edit for contact details,
   hours, photos and logo.
   Anything left empty ("") is simply hidden on the website,
   so the site never shows a broken button or placeholder text.
   Lines marked TODO-VERIFY must be confirmed with the owner.
   ============================================================= */
window.SITE = {
  name: "Sri Guru Kottureshwara Butter Dosa Hotel",
  shortName: "Sri Guru Kottureshwara",
  nameKn: "ಶ್ರೀ ಗುರು ಕೊಟ್ಟೂರೇಶ್ವರ ಬೆಣ್ಣೆ ದೋಸೆ ಹೋಟೆಲ್", // TODO-VERIFY spelling with owner

  // Full web address after you connect the custom domain (used for the QR code and Google).
  siteUrl: "", // TODO-VERIFY e.g. "https://www.kottureshwarabennedosa.in/"

  // Contact. Leave "" to hide.
  phone: "",     // TODO-VERIFY e.g. "+91 98450 12345"  (shown and used for tap-to-call)
  whatsapp: "",  // TODO-VERIFY digits only with 91, e.g. "919845012345"
  email: "",     // TODO-VERIFY e.g. "hello@yourdomain.in"

  // Opening hours in India time. 24-hour "HH:MM". Sunday first.
  // Write null for a day the hotel is closed.
  hours: [ // TODO-VERIFY (public listings show 7:30 AM to 9:30 PM, every day)
    { open: "07:30", close: "21:30" }, // Sunday
    { open: "07:30", close: "21:30" }, // Monday
    { open: "07:30", close: "21:30" }, // Tuesday
    { open: "07:30", close: "21:30" }, // Wednesday
    { open: "07:30", close: "21:30" }, // Thursday
    { open: "07:30", close: "21:30" }, // Friday
    { open: "07:30", close: "21:30" }  // Saturday
  ],
  timezone: "Asia/Kolkata",

  costForTwo: "₹150 to ₹210", // TODO-VERIFY  ("" hides it)
  pureVeg: true,              // TODO-VERIFY  shows the vegetarian mark and "Pure vegetarian"

  // Legal and business details shown in the footer and policy pages. "" hides a line.
  business: {
    ownerOrManager: "",  // TODO-VERIFY name for privacy requests, e.g. "K. Shivakumar (Proprietor)"
    fssai: "",           // TODO-VERIFY 14-digit FSSAI licence number
    gstin: ""            // optional
  },
  policiesLastUpdated: "2026-10-24", // change when you edit a policy page

  social: {
    instagram: "", // full link, e.g. "https://instagram.com/yourhandle"
    facebook: ""
  },

  /* LOGO
     Put the owner's logo file in /assets/ and write its path here, e.g. "assets/logo.png".
     Leave "" to use the text logo. */
  logo: "assets/logo.webp",

  /* PHOTOS
     1. Copy the photo into /assets/photos/
     2. Type its file name below, e.g. hero: "hero.jpg"
     To change a photo later, replace the file with a new one of the same name.
     A slot with "" is hidden, and the layout adjusts by itself.
     Keep photos under 300 KB: see README, "Adding photos". */
  photos: {
    heroBackground: "", // optional photo behind the headline, under a tint ("" = none)
    hero: "open-dosa.jpg",            // inside the arch
    signature: "khali-dosa.jpg",      // next to "How a benne dosa is made"
    story: "storefront.jpg",          // next to "Our story"
    gallery: [
      // Add more real photos here when available, e.g.
      // { file: "gallery-01.jpg", alt: { en: "The wood fire under the tava", kn: "ಕಾವಲಿಯ ಕೆಳಗಿನ ಸೌದೆ ಬೆಂಕಿ" } },
    ]
  },
  // Set this only if you use photos you did not take (it is shown in the footer).
  photoCredit: "",

  // Credit line in the footer. "" hides it.
  credit: { text: "", url: "" },

  // Used only when the page is opened with ?pitch=1 (your owner preview card).
  pitchWhatsapp: "" // your own WhatsApp number, digits with 91
};
