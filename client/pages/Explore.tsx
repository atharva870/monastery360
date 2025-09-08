import { useMemo } from "react";

const images = [
  {
    src: "https://images.pexels.com/photos/30719637/pexels-photo-30719637.jpeg",
    alt: "Traditional Buddhist architecture detail in Gangtok, Sikkim",
    title: "Gangtok Monastic Detail",
    location: "Gangtok, Sikkim",
  },
  {
    src: "https://images.pexels.com/photos/2408167/pexels-photo-2408167.jpeg",
    alt: "Buddhist temple interior with monks in prayer",
    title: "Temple Interior",
    location: "Himalayan Region",
  },
  {
    src: "https://images.pexels.com/photos/5204433/pexels-photo-5204433.jpeg",
    alt: "Ancient stupas set against dramatic mountains",
    title: "Stupas in the Mountains",
    location: "Himalayan Region",
  },
];

export default function Explore() {
  const featured = useMemo(() => images, []);

  return (
    <div>
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl">Explore</h1>
            <p className="mt-2 max-w-prose text-foreground/70">
              A growing catalog of monasteries and sacred sites. Filtered, searchable, and beautifully documented—coming soon.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <article key={item.src} className="group overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={`${item.src}?auto=compress&cs=tinysrgb&w=1200`}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-black/0" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.location}</p>
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
