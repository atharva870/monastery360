import { Link } from "react-router-dom";
import { useRef } from "react";
import { useParallax } from "@/hooks/use-parallax";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MONASTERIES } from "@/data/monasteries";
import { motion } from "framer-motion";

const IMAGES = {
  hero: "https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2F70aabd3d368942a3a98d8fc6f3a6f14d?format=webp&width=800",
  a: "https://images.pexels.com/photos/2408167/pexels-photo-2408167.jpeg?auto=compress&cs=tinysrgb&w=1200",
  b: "https://images.pexels.com/photos/5204433/pexels-photo-5204433.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export default function Index() {
  const heroRef = useRef<HTMLImageElement | null>(null);
  useParallax(heroRef, 0.12);
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Colorful monastic architecture detail in Gangtok, Sikkim"
            className="h-full w-full object-cover will-change-transform"
            loading="eager"
            ref={heroRef}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 mix-blend-overlay bg-pan-slow" />
          <div className="pattern-jaali absolute inset-0" aria-hidden="true" />
        </div>
        <div className="container flex min-h-[70vh] flex-col items-start justify-end py-24 sm:min-h-[80vh]">
          <motion.h1
            className="max-w-3xl font-serif text-4xl text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Digitize and Showcase the Monasteries of Sikkim
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-white/85"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          >
            A minimal, elegant archive celebrating sacred Himalayan
            heritage—built for travelers, researchers, and future generations.
          </motion.p>
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
          <motion.h2
            className="font-serif text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Featured Monasteries
          </motion.h2>
          <Link
            to="/explore"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[IMAGES.hero, IMAGES.a, IMAGES.b].map((src, i) => (
            <article
              key={src}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:ring-2 hover:ring-accent/30 hover-float"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={
                    i === 0
                      ? "Monastic architecture in Gangtok, Sikkim"
                      : i === 1
                        ? "Buddhist temple interior with vibrant art"
                        : "Ancient stupas in the mountains"
                  }
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-black/0" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg">
                  {i === 0
                    ? "Gangtok Monastic Detail"
                    : i === 1
                      ? "Temple Interior"
                      : "Mountain Stupas"}
                </h3>
                <p className="text-sm text-foreground/60">
                  {i === 0 ? "Gangtok, Sikkim" : "Himalayan Region"}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Highlights Carousel */}
      <section className="container py-10">
        <motion.h2
          className="mb-4 font-serif text-2xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Across Sikkim
        </motion.h2>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {MONASTERIES.slice(0, 10).map((m) => (
              <CarouselItem key={m.name} className="md:basis-1/2 lg:basis-1/3">
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm hover-float">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-black/0" />
                  </div>
                  <div className="p-3">
                    <p className="font-serif text-base">{m.name}</p>
                    <p className="text-xs text-foreground/60">{m.location}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-3 flex items-center justify-end gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="relative border-y bg-secondary py-16 md:py-20"
      >
        <div
          className="pattern-border absolute inset-x-0 top-0 h-2 opacity-80"
          aria-hidden="true"
        />
        <div className="container grid items-center gap-8 md:grid-cols-2">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Preservation Through Digitization
            </h2>
            <p className="mt-4 max-w-prose text-foreground/70">
              We document monasteries across Sikkim—architecture, thangkas,
              rituals, and oral histories—so their stories endure. Our approach
              is minimalist and respectful, focusing on clarity, accuracy, and
              beauty.
            </p>
            <p className="mt-3 max-w-prose text-foreground/70">
              The archive is openly accessible and designed for mobile first,
              enabling travelers and researchers to explore with ease.
            </p>
            <div className="mt-6 inline-flex items-center gap-4 rounded-xl border p-4 shadow-sm">
              <div className="text-3xl font-semibold">100+</div>
              <div className="text-sm text-foreground/60">
                Sites, artefacts, and oral accounts digitized (expanding)
              </div>
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
