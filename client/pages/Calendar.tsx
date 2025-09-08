const EVENTS = [
  {
    name: "Pang Lhabsol",
    when: "Aug–Sep (lunar calendar)",
    where: "Tsuklakhang Monastery, Gangtok",
    source: "https://sikkimtourism.gov.in/Public/ExperienceSikkim/FairsAndFestivalDetails/FF20A071?type=Festival%2F1000",
  },
  {
    name: "Bumchu Festival",
    when: "Feb–Mar (lunar calendar)",
    where: "Tashiding Monastery",
    source: "https://en.wikipedia.org/wiki/Tashiding_Monastery",
  },
  {
    name: "Losoong / Namsoong (Sikkimese New Year)",
    when: "Dec (Tibetan 11th month)",
    where: "Across Sikkim",
    source: "https://en.wikipedia.org/wiki/Losoong_Festival",
  },
];

const BOOKINGS = [
  { label: "Permits (PAP/RAP)", href: "https://sikkimtourism.gov.in/Public/TravellerEssentials/pap" },
  { label: "Registered Travel Agents", href: "https://sikkimtourism.gov.in/Public/TravellerEssentials/TravelAgents" },
  { label: "Accommodations", href: "https://sikkimtourism.gov.in/Public/TravellerEssentials/accomodations" },
];

export default function Calendar() {
  return (
    <div className="container py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl">Cultural Calendar</h1>
        <p className="mt-2 max-w-prose text-foreground/70">Major monastic festivals and rituals in Sikkim with authoritative sources.</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {EVENTS.map((e) => (
          <li key={e.name} className="rounded-xl border p-4">
            <h2 className="font-serif text-xl">{e.name}</h2>
            <p className="text-sm text-foreground/70">{e.when} · {e.where}</p>
            <a className="mt-2 inline-block text-sm underline" href={e.source} target="_blank" rel="noreferrer">Source</a>
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Plan & Book</h2>
        <p className="mt-1 text-sm text-foreground/70">Use official Sikkim Tourism resources for permits, agents, and stays.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {BOOKINGS.map((b) => (
            <a key={b.href} href={b.href} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-sm underline-offset-4 hover:underline">
              {b.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
