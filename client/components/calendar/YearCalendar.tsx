import { useMemo, useState } from "react";
import type { Event } from "@/data/calendar";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

function classNames(...a: (string | false | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

export default function YearCalendar({ events }: { events: Event[] }) {
  const now = new Date();
  const [year] = useState(now.getFullYear());

  // Map exact-date events to month/day lookup
  const dateMap = useMemo(() => {
    const m = new Map<number, Map<number, Event[]>>();
    for (const ev of events) {
      if (!ev.dates) continue;
      for (const iso of ev.dates) {
        const d = new Date(iso);
        if (isNaN(d.getTime()) || d.getFullYear() !== year) continue;
        const mon = d.getMonth();
        const day = d.getDate();
        if (!m.has(mon)) m.set(mon, new Map());
        const inner = m.get(mon)!;
        if (!inner.has(day)) inner.set(day, []);
        inner.get(day)!.push(ev);
      }
    }
    return m;
  }, [events, year]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-2xl">{year} Festivals Calendar</h2>
        <div className="text-xs text-foreground/60">
          Lunar-date festivals are shown on relevant months
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MONTHS.map((label, month) => {
          const total = daysInMonth(year, month);
          const start = firstWeekday(year, month);
          const cells = Array.from({ length: start + total }, (_, i) =>
            i < start ? null : i - start + 1,
          );
          const pinned = events.filter((ev) => ev.months?.includes(month));
          return (
            <section
              key={label}
              className="rounded-xl border bg-card p-3 shadow-sm"
            >
              <header className="mb-2 flex items-center justify-between">
                <h3 className="font-serif text-lg">{label}</h3>
                {pinned.length > 0 && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent-foreground">
                    {pinned.length} festival{pinned.length > 1 ? "s" : ""}
                  </span>
                )}
              </header>
              {pinned.length > 0 && (
                <ul className="mb-2 space-y-1">
                  {pinned.map((e) => (
                    <li
                      key={e.name}
                      className={classNames(
                        "text-xs",
                        e.main ? "text-red-600" : "text-foreground/80",
                      )}
                    >
                      • <span className="font-medium">{e.name}</span>{" "}
                      <span className={e.main ? "opacity-80" : "opacity-70"}>
                        ({e.when})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {"SMTWTFS".split("").map((d) => (
                  <div key={d} className="py-1 text-foreground/60">
                    {d}
                  </div>
                ))}
                {cells.map((day, i) => {
                  const exact = day && dateMap.get(month)?.get(day);
                  return (
                    <div
                      key={i}
                      className={classNames(
                        "aspect-square rounded-md border bg-background",
                        day ? "" : "opacity-0",
                      )}
                      title={exact?.map((e) => e.name).join(", ")}
                    >
                      {day && (
                        <div className="relative h-full w-full p-1">
                          <div
                            className={classNames(
                              "text-[11px]",
                              exact && exact.length > 0
                                ? exact.some((e) => e.main)
                                  ? "font-bold text-red-700"
                                  : "font-bold text-red-600"
                                : "text-foreground/70",
                            )}
                          >
                            {day}
                          </div>
                          {exact && exact.length > 0 && (
                            <div className="absolute bottom-1 left-1 right-1 flex flex-wrap gap-1">
                              {exact.map((e) => (
                                <span
                                  key={e.name}
                                  className={classNames(
                                    "h-1.5 w-1.5 rounded-full",
                                    e.main ? "bg-red-500" : "bg-accent",
                                  )}
                                  aria-hidden
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <div className="mt-3 text-xs text-foreground/60">
        • Dots mark festivals with exact dates when provided. Others appear as
        month pins with their lunar timing noted.
      </div>
    </div>
  );
}
