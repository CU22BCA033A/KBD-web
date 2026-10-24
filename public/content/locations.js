/* =============================================================
   BRANCHES. One entry per branch. Set active: false to hide one.
   The first active branch is the main one (map, Directions buttons, Google listing).
   TODO-VERIFY: ask the owner which branches are officially his.
   ============================================================= */
window.LOCATIONS = [
  {
    id: "davangere-main",
    active: true,
    name: { en: "Davangere, Medical College Road", kn: "ದಾವಣಗೆರೆ, ಮೆಡಿಕಲ್ ಕಾಲೇಜು ರಸ್ತೆ" },
    address: {
      en: "Medical College Road, MCC B Block, Kuvempu Nagar, opposite Bapuji Dental College, Davangere, Karnataka 577004",
      kn: "ಮೆಡಿಕಲ್ ಕಾಲೇಜು ರಸ್ತೆ, ಎಂಸಿಸಿ ಬಿ ಬ್ಲಾಕ್, ಕುವೆಂಪು ನಗರ, ಬಾಪೂಜಿ ಡೆಂಟಲ್ ಕಾಲೇಜು ಎದುರು, ದಾವಣಗೆರೆ, ಕರ್ನಾಟಕ 577004"
    },
    street: "Medical College Road, MCC B Block, Kuvempu Nagar", locality: "Davangere", postalCode: "577004",
    // What Google Maps should search for. Exact "latitude,longitude" is even better. TODO-VERIFY
    mapsQuery: "Sri Guru Kottureshwara Benne Dosa, Medical College Road, Davangere",
    phone: "" // "" = use the main phone number from config.js
  },
  {
    id: "davangere-ss-layout",
    active: false, // TODO-VERIFY: seen on one listing only. Confirm, then set to true.
    name: { en: "Davangere, S S Layout", kn: "ದಾವಣಗೆರೆ, ಎಸ್ ಎಸ್ ಲೇಔಟ್" },
    address: { en: "S S Layout, Davangere, Karnataka", kn: "ಎಸ್ ಎಸ್ ಲೇಔಟ್, ದಾವಣಗೆರೆ, ಕರ್ನಾಟಕ" },
    street: "S S Layout", locality: "Davangere", postalCode: "",
    mapsQuery: "Sri Guru Kottureshwara Benne Dosa, S S Layout, Davangere",
    phone: ""
  }
];
