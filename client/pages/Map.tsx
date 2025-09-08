import { useEffect, useRef } from "react";

const places = [
  {
    name: "Rumtek Monastery",
    lat: 27.3177,
    lon: 88.619,
    info: "Seat of the Karmapa lineage near Gangtok.",
    directions: "https://www.google.com/maps/dir/?api=1&destination=27.3177,88.619",
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Rumtek_Monastery" },
      { label: "Nearby: Namgyal Institute of Tibetology", href: "https://namgyalinstitutesikkim.org/" },
    ],
  },
  {
    name: "Pemayangtse Monastery",
    lat: 27.3019,
    lon: 88.2345,
    info: "17th-century monastery near Pelling with panoramic views.",
    directions: "https://www.google.com/maps/dir/?api=1&destination=27.3019,88.2345",
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Pemayangtse_Monastery" },
      { label: "360° Panorama", href: "https://www.360cities.net/en/image/pemayangste-monastery-in-sikkim" },
    ],
  },
  {
    name: "Tashiding Monastery",
    lat: 27.2581,
    lon: 88.2857,
    info: "Famous for the annual Bumchu festival.",
    directions: "https://www.google.com/maps/dir/?api=1&destination=27.2581,88.2857",
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Tashiding_Monastery" },
    ],
  },
  {
    name: "Enchey Monastery",
    lat: 27.3406,
    lon: 88.6273,
    info: "Prominent 19th-century monastery in Gangtok.",
    directions: "https://www.google.com/maps/dir/?api=1&destination=27.3406,88.6273",
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Enchey_Monastery" },
    ],
  },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS via CDN only once
    const existing = document.querySelector<HTMLScriptElement>("script[data-leaflet]");
    const ensureLeaflet = async () => {
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
        await new Promise((r) => setTimeout(r, 0));
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.setAttribute("data-leaflet", "true");
        document.body.appendChild(script);
        await new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });
      }
    };

    ensureLeaflet().then(() => {
      // @ts-ignore
      const L = (window as any).L;
      if (!L || !mapRef.current) return;
      const map = L.map(mapRef.current).setView([27.35, 88.45], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      places.forEach((p) => {
        const m = L.marker([p.lat, p.lon]).addTo(map);
        const links = p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noreferrer" class="underline">${l.label}</a>`).join(" · ");
        m.bindPopup(`<strong>${p.name}</strong><br/>${p.info}<br/><a href="${p.directions}" target="_blank" rel="noreferrer">Get Directions</a><br/>${links}`);
      });
    });
  }, []);

  return (
    <div className="container py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl">Interactive Map</h1>
        <p className="mt-2 max-w-prose text-foreground/70">
          Geo-tagged monasteries with directions and references. Tiles by OpenStreetMap.
        </p>
      </header>
      <div
        ref={mapRef}
        className="h-[60vh] w-full overflow-hidden rounded-xl border"
        role="application"
        aria-label="Map of monasteries in Sikkim"
      />
    </div>
  );
}
