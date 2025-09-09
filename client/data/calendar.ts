export type Event = {
  name: string;
  when: string;
  where: string;
  source: string;
  lat?: number;
  lon?: number;
  months?: number[];
  dates?: string[];
};

export const EVENTS: Event[] = [
  {
    name: "Pang Lhabsol",
    when: "Aug–Sep (lunar calendar)",
    where: "Tsuklakhang Monastery, Gangtok",
    lat: 27.3314,
    lon: 88.614,
    source:
      "https://sikkimtourism.gov.in/Public/ExperienceSikkim/FairsAndFestivalDetails/FF20A071?type=Festival%2F1000",
  },
  {
    name: "Bumchu Festival",
    when: "Feb–Mar (lunar calendar)",
    where: "Tashiding Monastery",
    lat: 27.2581,
    lon: 88.2857,
    source: "https://en.wikipedia.org/wiki/Tashiding_Monastery",
  },
  {
    name: "Saga Dawa",
    when: "May–June (full moon)",
    where: "Tsuklakhang Monastery, Gangtok",
    lat: 27.3314,
    lon: 88.614,
    source: "https://en.wikipedia.org/wiki/Saga_Dawa",
  },
  {
    name: "Losoong / Namsoong (Sikkimese New Year)",
    when: "Dec (Tibetan 11th month)",
    where: "Phodong Monastery and across Sikkim",
    lat: 27.4334,
    lon: 88.5864,
    source: "https://en.wikipedia.org/wiki/Losoong_Festival",
  },
];

export const BOOKINGS = [
  {
    label: "Permits (PAP/RAP)",
    href: "https://sikkimtourism.gov.in/Public/TravellerEssentials/pap",
  },
  {
    label: "Registered Travel Agents",
    href: "https://sikkimtourism.gov.in/Public/TravellerEssentials/TravelAgents",
  },
  {
    label: "Accommodations",
    href: "https://sikkimtourism.gov.in/Public/TravellerEssentials/accomodations",
  },
];
