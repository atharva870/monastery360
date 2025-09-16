import { useMemo } from "react";
import { MONASTERIES } from "@/data/monasteries";
import { KBDOCS } from "@/data/kb";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Explore() {
  const items = useMemo(() => MONASTERIES, []);

  return (
    <div>
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl">Explore</h1>
            <p className="mt-2 max-w-prose text-foreground/70">
              Discover Sikkim’s monasteries. Click any card for a quick summary
              and view on the map.
            </p>
          </div>
        </div>

        <div className="-mx-4 mb-8 overflow-x-auto px-4">
          <div className="flex snap-x snap-mandatory gap-4">
            {items.slice(0, 12).map((m) => (
              <Dialog key={m.name}>
                <DialogTrigger asChild>
                  <button className="snap-start shrink-0 w-72 ui-card text-left">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
                    </div>
                    <div className="p-3">
                      <p className="font-serif">{m.name}</p>
                      <p className="text-xs text-foreground/60">{m.location}</p>
                    </div>
                  </button>
                </DialogTrigger>
                <MonasteryDialog name={m.name} />
              </Dialog>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <Dialog key={m.name}>
              <DialogTrigger asChild>
                <article className="ui-card group cursor-pointer">
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
                      <span className="btn btn-primary btn-sm">Quick summary</span>
                      <Link
                        to={`/map#${m.lat},${m.lon}`}
                        className="btn btn-outline btn-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on Map
                      </Link>
                    </div>
                  </div>
                </article>
              </DialogTrigger>
              <MonasteryDialog name={m.name} />
            </Dialog>
          ))}
        </div>
      </section>
      <section className="border-t bg-secondary/40 py-14">
        <div className="container">
          <p className="text-sm text-foreground/70">
            Looking for a specific monastery or want to contribute photos and
            oral histories? Reach out and we’ll add it to the archive.
          </p>
        </div>
      </section>
    </div>
  );
}

function MonasteryDialog({ name }: { name: string }) {
  const kb = KBDOCS[name];
  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle className="font-serif text-xl">{name}</DialogTitle>
        <DialogDescription>
          {kb?.summary || "Summary not available."}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2 text-sm">
        {kb?.founded && (
          <p>
            <span className="font-medium">Founded:</span> {kb.founded}
          </p>
        )}
        {kb?.tradition && (
          <p>
            <span className="font-medium">Tradition:</span> {kb.tradition}
          </p>
        )}
        {kb?.festivals && kb.festivals.length > 0 && (
          <p>
            <span className="font-medium">Festivals:</span> {kb.festivals.join(", ")}
          </p>
        )}
        {kb?.highlights && kb.highlights.length > 0 && (
          <p>
            <span className="font-medium">Highlights:</span> {kb.highlights.join(", ")}
          </p>
        )}
        {kb?.tips && kb.tips.length > 0 && (
          <p>
            <span className="font-medium">Tips:</span> {kb.tips.join("; ")}
          </p>
        )}
      </div>
    </DialogContent>
  );
}
