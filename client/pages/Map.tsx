import { useEffect, useRef } from "react";
import { MONASTERIES } from "@/data/monasteries";
import { EVENTS } from "@/data/calendar";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS via CDN only once
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-leaflet]",
    );
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
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const markers: any[] = [];
      MONASTERIES.forEach((p) => {
        const m = L.marker([p.lat, p.lon]).addTo(map);
        const wiki = (p.links || [])
          .map(
            (l) =>
              `<a href="${l.href}" target="_blank" rel="noreferrer" class="underline">${l.label}</a>`,
          )
          .join(" · ");
        const directions = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`;
        m.bindPopup(
          `<strong>${p.name}</strong><br/>${p.location}<br/><a href="${directions}" target="_blank" rel="noreferrer">Get Directions</a>${wiki ? `<br/>${wiki}` : ""}`,
        );
        m.bindTooltip(
          `<div><strong>${p.name}</strong><br/><span class="label-sub">${p.location}</span></div>`,
          { permanent: true, direction: "top", offset: [0, -10], className: "map-label" },
        );
        markers.push({ m, p });
      });

      // Festivals layer
      (EVENTS || []).filter((e) => typeof (e as any).lat === "number" && typeof (e as any).lon === "number").forEach((e) => {
        const lat = (e as any).lat as number;
        const lon = (e as any).lon as number;
        const c = L.circleMarker([lat, lon], { radius: 8, color: "#a21caf", fillColor: "#a21caf", fillOpacity: 0.85 });
        c.addTo(map);
        const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
        c.bindPopup(`<strong>Festival: ${e.name}</strong><br/>${e.when} · ${e.where}<br/><a href="${e.source}" target="_blank" rel="noreferrer">Source</a><br/><a href="${directions}" target="_blank" rel="noreferrer">Get Directions</a>`);
      });

      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const [latStr, lonStr] = hash.split(",");
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);
        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
          map.setView([lat, lon], 12);
          const found = markers.find(
            ({ p }) =>
              Math.abs(p.lat - lat) < 0.01 && Math.abs(p.lon - lon) < 0.01,
          );
          if (found) found.m.openPopup();
        }
      }
    });
  }, []);

  return (
    <div className="container py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl">Interactive Map</h1>
        <p className="mt-2 max-w-prose text-foreground/70">
          Geo-tagged monasteries with directions and references. Tiles by
          OpenStreetMap.
        </p>
      </header>
      <div
        ref={mapRef}
        className="h-[60vh] w-full overflow-hidden rounded-xl border"
        role="application"
        aria-label="Map of monasteries in Sikkim"
      />

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="font-serif text-xl">Transport & Tourism</h2>
          <p className="mt-1 text-sm text-foreground/70">
            Plan travel with official resources:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>
              <a
                className="underline"
                href="https://utcdemo.uk.gov.in/starbus/Sikkim/Home.aspx"
                target="_blank"
                rel="noreferrer"
              >
                Sikkim Nationalised Transport (SNT) Online Services
              </a>
            </li>
            <li>
              <a
                className="underline"
                href="https://www.redbus.in/online-booking/sikkim-nationalised-transport-snt"
                target="_blank"
                rel="noreferrer"
              >
                SNT tickets on redBus
              </a>
            </li>
            <li>
              <a
                className="underline"
                href="https://sikkimtourism.gov.in/Public/TravellerEssentials/pap"
                target="_blank"
                rel="noreferrer"
              >
                Tourist Permits (PAP/RAP)
              </a>
            </li>
            <li>
              <a
                className="underline"
                href="https://sikkimtourism.gov.in/Public/TravellerEssentials/TravelAgents"
                target="_blank"
                rel="noreferrer"
              >
                Registered Travel Agents
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="font-serif text-xl">Tips</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground/70">
            <li>Use Get Directions on each marker for driving routes.</li>
            <li>
              Network weak? Enable offline mode in Audio Guide and preload the
              Explore page.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
