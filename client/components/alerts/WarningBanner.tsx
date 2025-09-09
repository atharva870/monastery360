import { useEffect, useMemo, useState } from "react";

export type AlertItem = {
  type: "heat" | "cold" | "wind" | "rain" | "quake";
  message: string;
  severity: "info" | "warning" | "danger";
};

const SIKKIM_BOUNDS = { minLat: 26.5, maxLat: 28.5, minLon: 87.0, maxLon: 89.9 };

export default function WarningBanner() {
  const gangtok = useMemo(() => ({ lat: 27.3314, lon: 88.614 }), []);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    let alive = true;

    async function fetchWeatherAlerts() {
      try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${gangtok.lat}&longitude=${gangtok.lon}&current_weather=true&hourly=precipitation&forecast_days=1`;
        const r = await fetch(weatherUrl);
        const j = await r.json();
        const out: AlertItem[] = [];
        const temp: number | undefined = j?.current_weather?.temperature;
        const wind: number | undefined = j?.current_weather?.windspeed;
        const hours: number[] | undefined = j?.hourly?.precipitation;
        if (typeof temp === "number") {
          if (temp >= 30) out.push({ type: "heat", message: `Heat alert in Gangtok: ${temp.toFixed(0)}°C`, severity: "warning" });
          if (temp <= 3) out.push({ type: "cold", message: `Cold alert in Gangtok: ${temp.toFixed(0)}°C`, severity: "warning" });
        }
        if (typeof wind === "number" && wind >= 40) {
          out.push({ type: "wind", message: `Strong winds: ${wind.toFixed(0)} km/h`, severity: "warning" });
        }
        if (Array.isArray(hours)) {
          const heavy = hours.slice(0, 6).some((v) => (typeof v === "number" ? v : 0) >= 4);
          if (heavy) out.push({ type: "rain", message: "Heavy rain expected in next hours", severity: "warning" });
        }
        return out;
      } catch {
        return [] as AlertItem[];
      }
    }

    async function fetchQuakeAlerts() {
      try {
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=${SIKKIM_BOUNDS.minLat}&maxlatitude=${SIKKIM_BOUNDS.maxLat}&minlongitude=${SIKKIM_BOUNDS.minLon}&maxlongitude=${SIKKIM_BOUNDS.maxLon}&starttime=${since}&minmagnitude=3`;
        const r = await fetch(url);
        const j = await r.json();
        const feats = Array.isArray(j?.features) ? j.features : [];
        const out: AlertItem[] = [];
        for (const f of feats) {
          const m = f?.properties?.mag as number | undefined;
          const place = f?.properties?.place as string | undefined;
          if (typeof m === "number" && m >= 4) {
            out.push({ type: "quake", message: `Recent earthquake M${m.toFixed(1)}${place ? ` near ${place}` : " in region"}`, severity: m >= 5 ? "danger" : "warning" });
          }
        }
        return out;
      } catch {
        return [] as AlertItem[];
      }
    }

    async function run() {
      const [w, q] = await Promise.all([fetchWeatherAlerts(), fetchQuakeAlerts()]);
      if (!alive) return;
      const merged = [...w, ...q];
      setAlerts(merged);
    }

    run();
    const id = setInterval(run, 30 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [gangtok.lat, gangtok.lon]);

  if (!alerts.length) return null;

  const color = (s: AlertItem["severity"]) =>
    s === "danger" ? "bg-red-600 border-red-700" : s === "warning" ? "bg-amber-500 border-amber-600" : "bg-blue-600 border-blue-700";

  return (
    <div className="sticky top-16 z-40 w-full">
      <div className={`border-b ${color(alerts.some((a) => a.severity === "danger") ? "danger" : alerts[0].severity)} text-white`}>
        <div className="container flex flex-wrap items-center gap-2 py-2 text-sm">
          {alerts.map((a, i) => (
            <span key={i} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${color(a.severity)} shadow-sm`}>
              {a.type === "heat" && <span aria-hidden>🔥</span>}
              {a.type === "cold" && <span aria-hidden>❄️</span>}
              {a.type === "wind" && <span aria-hidden>💨</span>}
              {a.type === "rain" && <span aria-hidden>🌧️</span>}
              {a.type === "quake" && <span aria-hidden>🌐</span>}
              <span>{a.message}</span>
            </span>
          ))}
          <span className="ml-auto text-xs/none opacity-90">Advisories update every 30 min</span>
        </div>
      </div>
    </div>
  );
}
