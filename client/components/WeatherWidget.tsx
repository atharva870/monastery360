import { useEffect, useMemo, useState } from "react";

// Simple, keyless weather using Open-Meteo for Gangtok (approx Tsuklakhang)
// https://open-meteo.com/
// We intentionally keep this lightweight and cache for a short period.

type Current = {
  temperature: number | null;
  windspeed: number | null;
};

export default function WeatherWidget({ className = "" }: { className?: string }) {
  const gangtok = useMemo(() => ({ lat: 27.3314, lon: 88.614 }), []);
  const [data, setData] = useState<Current>({ temperature: null, windspeed: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${gangtok.lat}&longitude=${gangtok.lon}&current_weather=true`;
    fetch(url, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        const t = j?.current_weather?.temperature ?? null;
        const w = j?.current_weather?.windspeed ?? null;
        setData({ temperature: typeof t === "number" ? t : null, windspeed: typeof w === "number" ? w : null });
      })
      .catch(() => void 0)
      .finally(() => alive && setLoading(false));
    const id = setInterval(() => {
      fetch(url)
        .then((r) => r.json())
        .then((j) => {
          if (!alive) return;
          const t = j?.current_weather?.temperature ?? null;
          const w = j?.current_weather?.windspeed ?? null;
          setData({ temperature: typeof t === "number" ? t : null, windspeed: typeof w === "number" ? w : null });
        })
        .catch(() => void 0);
    }, 30 * 60 * 1000);
    return () => {
      alive = false;
      ctrl.abort();
      clearInterval(id);
    };
  }, [gangtok.lat, gangtok.lon]);

  if (loading) {
    return (
      <div className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white ${className}`} aria-live="polite">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white/70" />
        Weather
      </div>
    );
  }

  const t = data.temperature;
  const w = data.windspeed;

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white ${className}`} aria-label="Current weather in Gangtok">
      <span aria-hidden>☁️</span>
      {typeof t === "number" ? `${t.toFixed(0)}°C` : "--"}
      <span className="opacity-80">·</span>
      <span aria-hidden>🌬️</span>
      {typeof w === "number" ? `${w.toFixed(0)} km/h` : "--"}
      <span className="opacity-80">·</span>
      Gangtok
    </div>
  );
}
