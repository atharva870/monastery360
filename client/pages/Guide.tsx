import { useEffect, useMemo, useRef, useState } from "react";

const MONASTERIES = [
  { name: "Rumtek Monastery", lat: 27.3177, lon: 88.619, text: "You are near Rumtek Monastery, the seat of the Karmapa lineage. The main shrine features intricate woodwork and vibrant murals." },
  { name: "Pemayangtse Monastery", lat: 27.3019, lon: 88.2345, text: "Pemayangtse Monastery overlooks Pelling. Do not miss the wooden masterpiece 'Zangdok Palri' inside the top floor museum." },
];

function haversine(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371e3;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function Guide() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [lang, setLang] = useState("en");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const onVoicesChanged = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      const preferred = voicesRef.current.find((v) => v.lang.toLowerCase().startsWith(lang));
      setVoice(preferred || voicesRef.current[0] || null);
    };
    onVoicesChanged();
    window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
  }, [lang]);

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.geolocation) {
      setStatus("Geolocation unavailable");
      return;
    }
    setStatus("Listening for location...");
    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const nearest = MONASTERIES.map((m) => ({ m, d: haversine(here, m) }))
          .sort((a, b) => a.d - b.d)[0];
        if (nearest && nearest.d < 1000) {
          const utter = new SpeechSynthesisUtterance(nearest.m.text);
          utter.lang = lang;
          if (voice) utter.voice = voice;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
          setStatus(`Playing guide for ${nearest.m.name}`);
        } else {
          setStatus("No sites nearby (within 1 km)");
        }
      },
      (err) => setStatus(err.message),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 },
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, [enabled, lang, voice]);

  const offlineSupported = useMemo(() => "serviceWorker" in navigator, []);

  const enableOffline = async () => {
    if (!offlineSupported) return;
    try {
      await navigator.serviceWorker.register("/sw.js");
      setStatus("Offline assets cached (if supported)");
    } catch (e) {
      setStatus("Failed to register offline service worker");
    }
  };

  return (
    <div className="container py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Smart Audio Guide</h1>
          <p className="mt-2 max-w-prose text-foreground/70">
            Location-based narration using your device’s GPS and the browser’s speech engine. Works offline when cached.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="lang" className="text-sm text-foreground/70">Language</label>
          <select id="lang" className="rounded-md border bg-background px-2 py-1 text-sm" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground" onClick={() => setEnabled((v) => !v)} aria-pressed={enabled}>
          {enabled ? "Disable" : "Enable"} location guide
        </button>
        {offlineSupported && (
          <button className="rounded-full border px-4 py-2 text-sm" onClick={enableOffline}>
            Enable offline mode
          </button>
        )}
        <button className="rounded-full border px-4 py-2 text-sm" onClick={() => window.speechSynthesis.cancel()}>
          Stop audio
        </button>
        <p className="text-sm text-foreground/70" role="status" aria-live="polite">{status}</p>
      </div>

      <section className="mt-8 rounded-xl border p-4">
        <h2 className="font-serif text-xl">How it works</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-foreground/70">
          <li>We compare your GPS position to nearby monasteries (within 1 km) and play a short narration.</li>
          <li>No personal data is uploaded; all processing runs on-device.</li>
          <li>Offline mode caches pages and images so guides continue to work with limited connectivity.</li>
        </ul>
      </section>
    </div>
  );
}
