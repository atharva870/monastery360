export type Monastery = {
  name: string;
  location: string;
  lat: number;
  lon: number;
  image: string;
  links?: { label: string; href: string }[];
};

const img = {
  rumtek: "https://commons.wikimedia.org/wiki/Special:FilePath/Rumtek_Monastery_NEW.jpg?width=1200",
  pemayangtse: "https://commons.wikimedia.org/wiki/Special:FilePath/The_pemayangtse_monastery_-_west_sikkim.jpg?width=1200",
  tashiding: "https://commons.wikimedia.org/wiki/Special:FilePath/Tashiding_Monastery.jpg?width=1200",
  enchey: "https://commons.wikimedia.org/wiki/Special:FilePath/Enchey Monastery in Gangtok district, East Sikkim 17.jpg?width=1200",
  ralang: "https://commons.wikimedia.org/wiki/Special:FilePath/Ralang_Monastery, Sikkim, India.jpg?width=1200",
  phodong: "https://commons.wikimedia.org/wiki/Special:FilePath/Phodong_monastery_-_north_sikkim.jpg?width=1200",
  phensang: "https://commons.wikimedia.org/wiki/Special:FilePath/Phensong_Monastery.jpg?width=1200",
  dubdi: "https://commons.wikimedia.org/wiki/Special:FilePath/The_dubdi_monastery.jpg?width=1200",
  sangaChoeling: "https://commons.wikimedia.org/wiki/Special:FilePath/Entrance_to_Sanga-Choeling_Monastery.jpg?width=1200",
  tsuklakhang: "https://commons.wikimedia.org/wiki/Special:FilePath/Tsuklakhang_Monastery.jpg?width=1200",
  ranka: "https://commons.wikimedia.org/wiki/Special:FilePath/Ranka_Monastry.jpg?width=1200",
  lachen: "https://commons.wikimedia.org/wiki/Special:FilePath/Lachen_Monastery_Gompa.jpg?width=1200",
  lachung: "https://commons.wikimedia.org/wiki/Special:FilePath/Lachung Monastery, Sikkim India.jpg?width=1200",
  ngadak: "https://commons.wikimedia.org/wiki/Special:FilePath/Ngadak_Thupten_Shedup_Dhargey_Choeling_Monastery, Namchi, district_of_South_Sikkim_01.jpg?width=1200",
  kartok: "https://commons.wikimedia.org/wiki/Special:FilePath/Kartok_gumpa_-_yuksam.jpg?width=1200",
};

export const MONASTERIES: Monastery[] = [
  {
    name: "Rumtek Monastery",
    location: "Rumtek, East Sikkim",
    lat: 27.3177,
    lon: 88.619,
    image: img.rumtek,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Rumtek_Monastery",
      },
    ],
  },
  {
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    lat: 27.3019,
    lon: 88.2345,
    image: img.pemayangtse,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Pemayangtse_Monastery",
      },
    ],
  },
  {
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    lat: 27.2581,
    lon: 88.2857,
    image: img.tashiding,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Tashiding_Monastery",
      },
    ],
  },
  {
    name: "Enchey Monastery",
    location: "Gangtok, East Sikkim",
    lat: 27.3406,
    lon: 88.6273,
    image: img.enchey,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Enchey_Monastery",
      },
    ],
  },
  {
    name: "Ralang (Palchen Choeling)",
    location: "Ralong, South Sikkim",
    lat: 27.1835,
    lon: 88.365,
    image: img.ralang,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Ralang_Monastery",
      },
    ],
  },
  {
    name: "Old Ralang Monastery",
    location: "Ralang, South Sikkim",
    lat: 27.185,
    lon: 88.368,
    image: img.arch,
  },
  {
    name: "Phodong Monastery",
    location: "North Sikkim",
    lat: 27.4334,
    lon: 88.5864,
    image: img.phodong,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Phodong_Monastery",
      },
    ],
  },
  {
    name: "Phensang Monastery",
    location: "North Sikkim",
    lat: 27.4119,
    lon: 88.5736,
    image: img.phensang,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Phensang_Monastery",
      },
    ],
  },
  {
    name: "Labrang Monastery",
    location: "Near Phodong, North Sikkim",
    lat: 27.4374,
    lon: 88.5866,
    image: img.arch,
  },
  {
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    lat: 27.3782,
    lon: 88.2572,
    image: img.dubdi,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Dubdi_Monastery",
      },
    ],
  },
  {
    name: "Sangachoeling Monastery",
    location: "Near Pelling, West Sikkim",
    lat: 27.3014,
    lon: 88.2368,
    image: img.sangaChoeling,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Sanga_Choling_Monastery",
      },
    ],
  },
  {
    name: "Tholung (Tulung) Monastery",
    location: "Dzongu, North Sikkim",
    lat: 27.585,
    lon: 88.43,
    image: img.arch,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Tholung_Monastery",
      },
    ],
  },
  {
    name: "Lachen Monastery",
    location: "Lachen, North Sikkim",
    lat: 27.7168,
    lon: 88.557,
    image: img.lachen,
  },
  {
    name: "Lachung Monastery",
    location: "Lachung, North Sikkim",
    lat: 27.6886,
    lon: 88.7416,
    image: img.lachung,
  },
  {
    name: "Rinchenpong Monastery",
    location: "Rinchenpong, West Sikkim",
    lat: 27.3189,
    lon: 88.2463,
    image: img.arch,
  },
  {
    name: "Hee Gyathang Monastery",
    location: "Dzongu, North Sikkim",
    lat: 27.5586,
    lon: 88.5011,
    image: img.stupas,
  },
  {
    name: "Tsuklakhang Monastery",
    location: "Gangtok, East Sikkim",
    lat: 27.3314,
    lon: 88.614,
    image: img.tsuklakhang,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Tsuklakhang_Monastery",
      },
    ],
  },
  {
    name: "Lingdum (Ranka) Monastery",
    location: "Ranka, East Sikkim",
    lat: 27.313,
    lon: 88.673,
    image: img.ranka,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Ranka_Monastery",
      },
    ],
  },
  {
    name: "Ngadak Monastery",
    location: "Namchi, South Sikkim",
    lat: 27.1609,
    lon: 88.3639,
    image: img.ngadak,
  },
  {
    name: "Kartok Monastery",
    location: "Yuksom, West Sikkim",
    lat: 27.3002,
    lon: 88.2612,
    image: img.kartok,
  },
  {
    name: "Gonjang Monastery",
    location: "Near Tadong, East Sikkim",
    lat: 27.361,
    lon: 88.592,
    image: img.arch,
  },
  {
    name: "Kewzing Bon Monastery (Dungdrak)",
    location: "Kewzing, South Sikkim",
    lat: 27.1801,
    lon: 88.3604,
    image: img.stupas,
  },
  {
    name: "Phamrong Monastery",
    location: "Near Yuksom, West Sikkim",
    lat: 27.38,
    lon: 88.28,
    image: img.arch,
  },
  {
    name: "Yangthang Monastery",
    location: "West Sikkim",
    lat: 27.33,
    lon: 88.23,
    image: img.arch,
  },
];

export default MONASTERIES;
