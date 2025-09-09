import { BOOKINGS, EVENTS } from "@/data/calendar";
import YearCalendar from "@/components/calendar/YearCalendar";

export default function Calendar() {
  return (
    <div className="container py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl">Cultural Calendar</h1>
        <p className="mt-2 max-w-prose text-foreground/70">
          A full 365‑day view with monastic festivals pinned. Lunar festivals are shown in their months; exact dates vary annually.
        </p>
      </header>

      <YearCalendar events={EVENTS} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Festival Details</h2>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <li key={e.name} className="rounded-xl border p-4">
              <h3 className="font-serif text-xl">{e.name}</h3>
              <p className="text-sm text-foreground/70">{e.when} · {e.where}</p>
              <a className="mt-2 inline-block text-sm underline" href={e.source} target="_blank" rel="noreferrer">Source</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Plan & Book</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Use official Sikkim Tourism resources for permits, agents, and stays.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {BOOKINGS.map((b) => (
            <a
              key={b.href}
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border px-4 py-2 text-sm underline-offset-4 hover:underline"
            >
              {b.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
