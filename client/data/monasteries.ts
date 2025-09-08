export type Monastery = {
  name: string;
  location: string;
  lat: number;
  lon: number;
  image: string;
  links?: { label: string; href: string }[];
};

const img = {
  arch: "https://images.pexels.com/photos/30719637/pexels-photo-30719637.jpeg?auto=compress&cs=tinysrgb&w=1200",
  interior:
    "https://images.pexels.com/photos/2408167/pexels-photo-2408167.jpeg?auto=compress&cs=tinysrgb&w=1200",
  stupas:
    "https://images.pexels.com/photos/5204433/pexels-photo-5204433.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export const MONASTERIES: Monastery[] = [
  {
    name: "Rumtek Monastery",
    location: "Rumtek, East Sikkim",
    lat: 27.3177,
    lon: 88.619,
    image: img.arch,
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
    image: img.interior,
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
    image: img.stupas,
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
    image: img.arch,
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Enchey_Monastery",
      },
    ],
  },
  {
    name: "Ralang (Palchen Choeling)",
    location: "Ralang, South Sikkim",
    lat: 27.1835,
    lon: 88.365,
    image: img.interior,
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
    image: img.arch,
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
    image: img.stupas,
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
    image: img.arch,
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
    image: img.stupas,
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
    image: img.interior,
  },
  {
    name: "Lachung Monastery",
    location: "Lachung, North Sikkim",
    lat: 27.6886,
    lon: 88.7416,
    image: img.arch,
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
    image: img.interior,
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
    image: img.arch,
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
    image: img.arch,
  },
  {
    name: "Kartok Monastery",
    location: "Yuksom, West Sikkim",
    lat: 27.3002,
    lon: 88.2612,
    image: img.stupas,
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
