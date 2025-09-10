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
  hero: "https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2F70aabd3d368942a3a98d8fc6f3a6f14d?format=webp&width=1600",
  a: "https://images.pexels.com/photos/2408167/pexels-photo-2408167.jpeg?auto=compress&cs=tinysrgb&w=1200",
  b: "https://images.pexels.com/photos/5204433/pexels-photo-5204433.jpeg?auto=compress&cs=tinysrgb&w=1200",
  c: "https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2F49ed2424ee7c4ca7a613ecc2cec3b311?format=webp&width=800",
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
            alt="Young monks seated at a monastery in Sikkim"
            className="h-full w-full object-cover will-change-transform"
            loading="eager"
            ref={heroRef}
            style={{ objectPosition: "center 75%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 mix-blend-overlay bg-pan-slow" />
          <div className="pattern-jaali absolute inset-0 opacity-20" aria-hidden="true" />
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
            heritage built for travelers, researchers, and future generations.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/explore"
              className="btn btn-primary"
            >
              Explore Monasteries
            </Link>
            <a
              href="#mission"
              className="btn btn-outline"
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
          {[IMAGES.hero, IMAGES.a, IMAGES.b, IMAGES.c].map((src, i) => (
            <article
              key={src}
              className="ui-card group hover-float"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={
                    i === 0
                      ? "Monastic architecture in Gangtok, Sikkim"
                      : i === 1
                        ? "Buddhist temple interior with vibrant art"
                        : i === 2
                          ? "Ancient stupas in the mountains"
                          : "Young monks seated at a monastery in Sikkim (square crop)"
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
                      : i === 2
                        ? "Mountain Stupas"
                        : "Novice Monks"}
                </h3>
                <p className="text-sm text-foreground/60">
                  {i === 0 ? "Gangtok, Sikkim" : i === 3 ? "Sikkim" : "Himalayan Region"}
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
                <div className="ui-card hover-float">
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
              We document monasteries across Sikkim architecture, thangkas,
              rituals, and oral histories so their stories endure. Our approach
              is minimalist and respectful, focusing on clarity, accuracy, and
              beauty.
            </p>
            <p className="mt-3 max-w-prose text-foreground/70">
              The archive is openly accessible and designed for mobile first,
              enabling travelers and researchers to explore with ease.
            </p>
            <p className="mt-3 max-w-prose text-foreground/70">
              Our mission is to protect the ancient monasteries of Sikkim, the irreplaceable custodians of its unique Vajrayana Buddhist heritage. These sacred structures, housing priceless artifacts and centuries of tradition, face threats from time, climate, and seismic activity. We are committed to their holistic preservation through careful structural restoration using traditional methods, digital archiving of sacred texts and art, and supporting the monastic communities in their stewardship. By uniting conservation experts, local monks, and global supporters, we work to ensure these active centers of faith and culture are not lost. Our goal is to safeguard these serene sanctuaries so they may continue as thriving spiritual beacons for generations to come.
            </p>
            <div className="mt-6 inline-flex items-center gap-4 rounded-xl border p-4 shadow-sm">
              <div className="text-3xl font-semibold">100+</div>
              <div className="text-sm text-foreground/60">
                Sites, artefacts, and oral accounts digitized (expanding)
              </div>
            </div>
          </div>
          <div className="grid items-stretch gap-5 sm:grid-cols-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2F0a8d64d293924739b2c4625dd6bfcc13?format=webp&width=800"
              alt="Monastery courtyard with monks playing"
              className="aspect-[16/9] w-full rounded-xl object-cover shadow-md sm:col-span-2"
              loading="lazy"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2F224dca7a0f084a929dd9fc9eb717b773?format=webp&width=800"
              alt="Young monk in playful stance at monastery"
              className="aspect-[5/4] w-full rounded-xl object-cover shadow-md"
              loading="lazy"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2Ffe2148542ff6473885a4c58dc36cc48b?format=webp&width=800"
              alt="Monastery with wildflowers and mountains"
              className="aspect-[5/4] w-full rounded-xl object-cover shadow-md"
              loading="lazy"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2F0dea1711404d440eb5482d7ec3e0d748?format=webp&width=800"
              alt="Prayer wheels with colorful flags"
              className="aspect-[5/4] w-full rounded-xl object-cover shadow-md"
              loading="lazy"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb9a7106ecdaa444b8efc312ae06c585e%2Ffbcc3d8169224c2389fefec3129878c5?format=webp&width=800"
              alt="Buddha Park, Ravangla with grand statue"
              className="aspect-[5/4] w-full rounded-xl object-cover shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
