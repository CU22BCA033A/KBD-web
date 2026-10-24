/* =============================================================
   MENU. Edit names, descriptions, prices and photos here.
   price: rupees as a number (e.g. 70), or null to show "Price at counter".
   photo: file name in /assets/photos/ (e.g. "benne-dosa-folded.jpg"), a full https link, or "" for none.
   To add a dish later, copy one block (from { to },) and change it.
   TODO-VERIFY: prices and descriptions with the owner before launch.
   ============================================================= */
window.MENU = [
  {
    id: "benne-dosa", category: "dosa", signature: true, price: null, photo: "benne-dosa-folded.jpg",
    name: { en: "Benne Dosa", kn: "ಬೆಣ್ಣೆ ದೋಸೆ" },
    desc: { en: "The dosa Davangere is known for. Crisp and golden, folded and topped with a spoon of white butter, served with chutney.",
            kn: "ದಾವಣಗೆರೆ ಹೆಸರಾದ ದೋಸೆ. ಗರಿಗರಿಯಾದ ಬಂಗಾರದ ದೋಸೆ, ಮೇಲೆ ಒಂದು ಚಮಚ ಬಿಳಿ ಬೆಣ್ಣೆ, ಜೊತೆಗೆ ಚಟ್ನಿ." }
  },
  {
    id: "open-dosa", category: "dosa", price: null, photo: "open-dosa.jpg",
    name: { en: "Open Dosa", kn: "ಓಪನ್ ದೋಸೆ" },
    desc: { en: "Served open with lacy, crisp edges, white butter and chutney on top.",
            kn: "ಜಾಲರಿಯಂತಹ ಗರಿಗರಿ ಅಂಚಿನ ತೆರೆದ ದೋಸೆ, ಮೇಲೆ ಬಿಳಿ ಬೆಣ್ಣೆ ಮತ್ತು ಚಟ್ನಿ." }
  },
  {
    id: "khali-dosa", category: "dosa", price: null, photo: "khali-dosa-plate.jpg",
    name: { en: "Khali Dosa", kn: "ಖಾಲಿ ದೋಸೆ" },
    desc: { en: "Soft, spongy dosas made without butter or oil, served with potato palya and coconut chutney.",
            kn: "ಬೆಣ್ಣೆ, ಎಣ್ಣೆ ಇಲ್ಲದ ಮೃದುವಾದ ದೋಸೆ, ಆಲೂಗಡ್ಡೆ ಪಲ್ಯ ಮತ್ತು ಕಾಯಿ ಚಟ್ನಿಯೊಂದಿಗೆ." }
  }
];
