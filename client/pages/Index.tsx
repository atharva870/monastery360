import { Link } from "react-router-dom";

const IMAGES = {
  hero:
    "https://images.pexels.com/photos/30719637/pexels-photo-30719637.jpeg?auto=compress&cs=tinysrgb&w=1600",
  a:
    "https://images.pexels.com/photos/2408167/pexels-photo-2408167.jpeg?auto=compress&cs=tinysrgb&w=1200",
  b:
    "https://images.pexels.com/photos/5204433/pexels-photo-5204433.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Colorful monastic architecture detail in Gangtok, Sikkim"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 mix-blend-overlay" />
        </div>
        <div className="container flex min-h-[70vh] flex-col items-start justify-end py-24 sm:min-h-[80vh]">
          <h1 className="max-w-3xl font-serif text-4xl text-white sm:text-5xl md:text-6xl">
            Digitize and Showcase the Monasteries of Sikkim
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            A minimal, elegant archive celebrating sacred Himalayan heritage—built for travelers, researchers, and future generations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/explore"
              className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-110"
            >
              Explore Monasteries
            </Link>
            <a
              href="#mission"
              className="rounded-full border border-primary/60 bg-background/20 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur transition hover:bg-background/40"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Featured Monasteries</h2>
          <Link to="/explore" className="text-sm text-foreground/70 hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[IMAGES.hero, IMAGES.a, IMAGES.b].map((src, i) => (
            <article key={src} className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:ring-2 hover:ring-accent/30">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={i === 0 ? "Monastic architecture in Gangtok, Sikkim" : i === 1 ? "Buddhist temple interior with vibrant art" : "Ancient stupas in the mountains"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-black/0" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg">{i === 0 ? "Gangtok Monastic Detail" : i === 1 ? "Temple Interior" : "Mountain Stupas"}</h3>
                <p className="text-sm text-foreground/60">{i === 0 ? "Gangtok, Sikkim" : "Himalayan Region"}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="relative border-y bg-secondary py-16 md:py-20">
        <div className="container grid items-center gap-8 md:grid-cols-2">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Preservation Through Digitization</h2>
            <p className="mt-4 max-w-prose text-foreground/70">
              We document monasteries across Sikkim—architecture, thangkas, rituals, and oral histories—so their stories endure. Our approach is minimalist and respectful, focusing on clarity, accuracy, and beauty.
            </p>
            <p className="mt-3 max-w-prose text-foreground/70">
              The archive is openly accessible and designed for mobile first, enabling travelers and researchers to explore with ease.
            </p>
            <div className="mt-6 inline-flex items-center gap-4 rounded-xl border p-4 shadow-sm">
              <div className="text-3xl font-semibold">100+</div>
              <div className="text-sm text-foreground/60">Sites, artefacts, and oral accounts digitized (expanding)</div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={IMAGES.a}
              alt="Buddhist temple interior"
              className="aspect-[4/3] w-full rounded-lg object-cover"
              loading="lazy"
            />
            <img
              src={IMAGES.b}
              alt="Mountain stupas"
              className="aspect-[4/3] w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
