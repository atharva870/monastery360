import { MONASTERIES } from "@/data/monasteries";

export type MonasteryInfo = {
  summary: string;
  founded?: string;
  tradition?: string;
  festivals?: string[];
  highlights?: string[];
  tips?: string[];
};

// Local factual summaries to enable offline Q&A without external links.
export const KBDOCS: Record<string, MonasteryInfo> = {
  "Rumtek Monastery": {
    summary:
      "The principal seat-in-exile of the Karmapa (Kagyu school). The complex includes the Dharma Chakra Centre, main shrine hall, golden stupa and a monastic college.",
    founded: "16th century; rebuilt in the 1960s",
    tradition: "Karma Kagyu",
    festivals: ["Losar", "Kagyed", "Drupchen rituals"],
    highlights: [
      "Main prayer hall with intricate woodwork",
      "Kora around the complex",
      "Black Hat ceremonies on select dates",
    ],
    tips: [
      "Located ~24 km from Gangtok near Rumtek village",
      "Dress modestly; remove hats in shrine",
    ],
  },
  "Pemayangtse Monastery": {
    summary:
      "A premier Nyingma monastery near Pelling, renowned for its serene setting and the wooden 'Zangdok Palri' model on the top floor museum.",
    founded: "17th century (circa 1705)",
    tradition: "Nyingma",
    festivals: ["Cham mask dances during Losar"],
    highlights: ["Panoramic Kanchenjunga views", "Zangdok Palri model"],
    tips: ["Combine with Rabdentse ruins and Sangachoeling"],
  },
  "Tashiding Monastery": {
    summary:
      "One of Sikkim’s most sacred monasteries, famous for the annual Bumchu ceremony where the water level in a sacred vase is read as an omen.",
    founded: "17th century",
    tradition: "Nyingma",
    festivals: ["Bumchu (Feb–Mar)"],
    highlights: [
      "Chortens and holy inscriptions",
      "Hilltop setting between Rathong and Rangeet rivers",
    ],
  },
  "Enchey Monastery": {
    summary:
      "A 19th‑century monastery overlooking Gangtok, associated with Lama Druptob Karpo. Known for Pang Lhabsol celebrations and Cham dances.",
    founded: "1909 (present structure)",
    tradition: "Nyingma",
    festivals: ["Pang Lhabsol", "Chaam dances"],
    tips: ["Close to Gangtok town; morning prayers are peaceful"],
  },
  "Ralang (Palchen Choeling)": {
    summary:
      "Large Kagyu monastery complex near Ravangla, with impressive assembly hall and murals.",
    tradition: "Kagyu",
    festivals: ["Pang Lhabsol", "Lhabab Duchen"],
  },
  "Old Ralang Monastery": {
    summary:
      "Historic monastery near the newer Ralang complex; holds traditional rituals and festivals.",
    tradition: "Kagyu",
  },
  "Phodong Monastery": {
    summary:
      "Important Kagyu monastery in North Sikkim with elegant murals and annual mask dances.",
    tradition: "Kagyu",
  },
  "Phensang Monastery": {
    summary:
      "Large monastery north of Gangtok famed for the Phensang Tse Chu cham festival.",
    tradition: "Nyingma",
  },
  "Labrang Monastery": {
    summary:
      "Smaller but significant monastery near Phodong with traditional architecture.",
  },
  "Dubdi Monastery": {
    summary:
      "Often cited as Sikkim’s oldest (1701), established soon after the consecration of the first Chogyal at Yuksom.",
    founded: "1701",
    tradition: "Nyingma",
  },
  "Sangachoeling Monastery": {
    summary:
      "Among the oldest monasteries (1697) above Pelling; accessible via a forested trail with ridge‑top views.",
    founded: "1697",
    tradition: "Nyingma",
  },
  "Tholung (Tulung) Monastery": {
    summary:
      "Remote site in Dzongu that safeguarded relics and scriptures; occasional public display during special rituals.",
    tradition: "Nyingma",
  },
  "Lachen Monastery": {
    summary:
      "Monastery serving the Lachen community in North Sikkim; gateway to Gurudongmar region.",
  },
  "Lachung Monastery": {
    summary:
      "Picturesque gompa of Lachung village; base for Yumthang valley excursions.",
  },
  "Rinchenpong Monastery": {
    summary:
      "Hilltop monastery with a rare statue of Ati Buddha and views toward Kanchenjunga.",
  },
  "Hee Gyathang Monastery": {
    summary:
      "Monastery in the protected Dzongu region, homeland of the Lepcha people.",
  },
  "Tsuklakhang Monastery": {
    summary:
      "The royal chapel within the former palace complex at Gangtok; venue for major state rituals.",
  },
  "Lingdum (Ranka) Monastery": {
    summary:
      "Modern Kagyu monastery with a vast courtyard and photogenic colonnades east of Gangtok.",
    founded: "Late 20th century",
    tradition: "Kagyu",
  },
  "Ngadak Monastery": {
    summary:
      "Historic site near Namchi; name means 'promise'—visitors traditionally tie a cloth for good fortune.",
  },
  "Kartok Monastery": {
    summary: "Small monastery near the scenic Kartok Lake at Yuksom.",
  },
  "Gonjang Monastery": {
    summary:
      "Contemporary monastery and institute near Tadong focusing on Buddhist studies and culture.",
  },
  "Kewzing Bon Monastery (Dungdrak)": {
    summary:
      "A rare Bon tradition monastery near Kewzing representing pre‑Buddhist Tibetan religion.",
    tradition: "Bon",
  },
  "Phamrong Monastery": {
    summary:
      "Monastery near West Sikkim’s Phamrong area, often visited with nearby waterfalls and trails.",
  },
  "Yangthang Monastery": {
    summary: "Local monastery in West Sikkim serving surrounding villages.",
  },
};

export const GENERAL_KB = {
  permits:
    "Some areas in North and East Sikkim require permits. Indian nationals may need a Protected Area Permit (PAP) for zones like Tsomgo or North Sikkim; foreign nationals require a Restricted Area Permit (RAP). Permits are typically arranged through registered travel agents or tourism offices. Carry ID and multiple photos; rules can change seasonally.",
  transport:
    "Public buses (SNT) and shared jeeps connect major towns with Gangtok, Pelling, Namchi and Mangan. Roads are mountainous—plan buffer time. Private taxis are the most flexible for monastery circuits.",
  etiquette:
    "Dress modestly, remove hats inside shrines, walk clockwise around stupas (kora), and avoid flash photography where prohibited. Mornings are best for prayer sessions.",
  festivals:
    "Important observances include Pang Lhabsol (Aug–Sep), Bumchu at Tashiding (Feb–Mar), and Losoong/Namsoong (Dec). Dates follow the lunar calendar and vary annually.",
};

// Helper to list all known monastery names
export const KB_NAMES = Object.keys(KBDOCS);

// Ensure dataset covers items listed in MONASTERIES (fallback summaries for missing ones)
for (const m of MONASTERIES) {
  if (!KBDOCS[m.name]) {
    KBDOCS[m.name] = {
      summary: `${m.name} — located at ${m.location}.`,
    };
  }
}
