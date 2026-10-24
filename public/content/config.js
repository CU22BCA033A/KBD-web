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
    heroBackground: "storefront.jpg", // blurred photo behind the hero, under the banner-green tint ("" = plain green)
    hero: "hero-benne-dosa.jpg",      // the round plate-shaped frame at the top
    signature: "open-dosa-spiced.jpg", // next to "How a benne dosa is made"
    story: "storefront.jpg",           // next to "Our story"
    storyExtra: "khali-dosa-plate.jpg", // second photo under the storefront in "Our story"
    menuSide: "khali-dosa.jpg",        // tall photo beside the menu card (desktop)
    catering: "open-dosa.jpg",         // under the catering steps
    visit: "storefront.jpg",           // "Look for this board" photo in the Visit section
    faq: "benne-dosa-folded.jpg",      // beside the questions
    gallery: [
      { file: "open-dosa.jpg", alt: { en: "Open dosa with white butter and chutney on a banana leaf", kn: "ಬಾಳೆಎಲೆಯ ಮೇಲೆ ಬಿಳಿ ಬೆಣ್ಣೆ ಮತ್ತು ಚಟ್ನಿಯೊಂದಿಗೆ ಓಪನ್ ದೋಸೆ" } },
      { file: "khali-dosa-plate.jpg", alt: { en: "Khali dosa with coconut chutney and palya on a banana leaf", kn: "ಬಾಳೆಎಲೆಯ ಮೇಲೆ ಕಾಯಿ ಚಟ್ನಿ ಮತ್ತು ಪಲ್ಯದೊಂದಿಗೆ ಖಾಲಿ ದೋಸೆ" } },
      { file: "benne-dosa-folded.jpg", alt: { en: "Folded benne dosa with chutney and white butter", kn: "ಚಟ್ನಿ ಮತ್ತು ಬಿಳಿ ಬೆಣ್ಣೆಯೊಂದಿಗೆ ಮಡಿಸಿದ ಬೆಣ್ಣೆ ದೋಸೆ" } },
      { file: "khali-dosa.jpg", alt: { en: "Khali dosas with palya and chutney", kn: "ಪಲ್ಯ ಮತ್ತು ಚಟ್ನಿಯೊಂದಿಗೆ ಖಾಲಿ ದೋಸೆಗಳು" } }
    ]
  },
  // Set this only if you use photos you did not take (it is shown in the footer).
  photoCredit: "",

  // Credit line in the footer. "" hides it.
  credit: { text: "", url: "" },

  // Used only when the page is opened with ?pitch=1 (your owner preview card).
  pitchWhatsapp: "" // your own WhatsApp number, digits with 91
};
