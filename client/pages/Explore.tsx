import { useMemo } from "react";
import { MONASTERIES } from "@/data/monasteries";
import { Link } from "react-router-dom";

export default function Explore() {
  const items = useMemo(() => MONASTERIES, []);

  return (
    <div>
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl">Explore</h1>
            <p className="mt-2 max-w-prose text-foreground/70">
              Discover Sikkim’s monasteries. Open any site on the map to plan your route.
            </p>
          </div>
        </div>

        <div className="-mx-4 mb-8 overflow-x-auto px-4">
          <div className="flex snap-x snap-mandatory gap-4">
            {items.slice(0, 12).map((m) => (
              <div key={m.name} className="snap-start shrink-0 w-72 overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
                </div>
                <div className="p-3">
                  <p className="font-serif">{m.name}</p>
                  <p className="text-xs text-foreground/60">{m.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <article key={m.name} className="group overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={m.image}
                  alt={`${m.name} in ${m.location}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-black/0" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg">{m.name}</h3>
                <p className="text-sm text-foreground/60">{m.location}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    to={`/map#${m.lat},${m.lon}`}
                    className="rounded-full border px-3 py-1 text-sm"
                  >
                    View on Map
                  </Link>
                  {m.links?.[0] && (
                    <a
                      href={m.links[0].href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border px-3 py-1 text-sm"
                    >
                      Reference
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t bg-secondary/40 py-14">
        <div className="container">
          <p className="text-sm text-foreground/70">
            Looking for a specific monastery or want to contribute photos and oral histories? Reach out and we’ll add it to the archive.
          </p>
        </div>
      </section>
    </div>
  );
}
