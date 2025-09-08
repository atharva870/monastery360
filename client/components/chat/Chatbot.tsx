import { useEffect, useMemo, useRef, useState } from "react";
import { MONASTERIES, type Monastery } from "@/data/monasteries";
import { BOOKINGS, EVENTS } from "@/data/calendar";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function diceCoefficient(a: string, b: string) {
  const bigrams = (s: string) => {
    const n = s.length - 1;
    const set = new Map<string, number>();
    for (let i = 0; i < n; i++) {
      const bg = s.slice(i, i + 2);
      set.set(bg, (set.get(bg) || 0) + 1);
    }
    return set;
  };
  if (!a || !b) return 0;
  const A = bigrams(a);
  const B = bigrams(b);
  let overlap = 0;
  for (const [bg, countA] of A) {
    const countB = B.get(bg) || 0;
    overlap += Math.min(countA, countB);
  }
  const sizeA = Array.from(A.values()).reduce((x, y) => x + y, 0);
  const sizeB = Array.from(B.values()).reduce((x, y) => x + y, 0);
  return (2 * overlap) / (sizeA + sizeB || 1);
}

async function wikiSummary(title: string) {
  try {
    const safe = encodeURIComponent(title);
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${safe}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.extract) return data.extract as string;
    return null;
  } catch {
    return null;
  }
}

type Msg = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your Sikkim Monasteries guide. Ask about any monastery (history, location, directions, nearby), festivals, permits, or transport.",
    },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const names = useMemo(() => MONASTERIES.map((m) => m.name), []);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const answer = async (q: string) => {
    const nq = normalize(q);
    // Quick intents
    if (/how many|count|total/.test(nq)) {
      return `We currently list ${MONASTERIES.length} monasteries across Sikkim. Open Explore to browse or Map to view pins.`;
    }
    if (/festival|event|calendar/.test(nq)) {
      const items = EVENTS.map((e) => `${e.name} — ${e.when} · ${e.where}`).join("\n• ");
      return `Key festivals in Sikkim:\n• ${items}\nSee: /calendar`;
    }
    if (/permit|rap|pap|book|agent|accommodation|stay/.test(nq)) {
      const links = BOOKINGS.map((b) => `${b.label}: ${b.href}`).join("\n• ");
      return `Travel and permits:\n• ${links}`;
    }
    if (/gangtok|near me|nearest/.test(nq)) {
      const gangtok = { lat: 27.3314, lon: 88.6138 };
      const withD = MONASTERIES.map((m) => ({ m, d: dist(gangtok, m) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 5)
        .map(({ m, d }) => `${m.name} (${m.location}) — ${(d / 1000).toFixed(1)} km`)
        .join("\n• ");
      return `Closest to Gangtok:\n• ${withD}`;
    }

    // Fuzzy find a monastery by name
    let best: { m: Monastery; score: number } | null = null;
    for (const m of MONASTERIES) {
      const s = diceCoefficient(normalize(m.name), nq);
      if (!best || s > best.score) best = { m, score: s };
    }
    if (best && best.score > 0.2) {
      const m = best.m;
      let text = `${m.name} — ${m.location}. View on map: /map#${m.lat},${m.lon}.`;
      if (m.links?.[0]) {
        text += `\nReference: ${m.links[0].href}`;
      } else {
        const w = await wikiSummary(m.name);
        if (w) text += `\n${w}`;
      }
      return text;
    }

    // Fallback to Wikipedia search using the question as a title
    const w = await wikiSummary(q);
    if (w) return w;
    return "I couldn’t find that yet. Ask about a specific monastery, festival, or permits.";
  };

  function dist(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
    const R = 6371e3;
    const toRad = (x: number) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    const a = await answer(q);
    setMessages((m) => [...m, { role: "assistant", content: a }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {open && (
        <div
          className="mb-2 w-[min(92vw,380px)] overflow-hidden rounded-2xl border bg-background shadow-xl"
          role="dialog"
          aria-label="Sikkim Monasteries Chatbot"
        >
          <div className="flex items-center justify-between border-b p-3">
            <p className="font-serif">Sikkim Monasteries Chat</p>
            <button className="rounded-full border px-2 py-1 text-xs" onClick={() => setOpen(false)} aria-label="Close chat">
              Close
            </button>
          </div>
          <div ref={listRef} className="max-h-[50vh] space-y-3 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  {m.content.split("\n").map((line, j) => (
                    <p key={j} className="whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Rumtek, permits, festivals…"
              className="flex-1 rounded-full border bg-background px-3 py-2 text-sm"
              aria-label="Chat input"
            />
            <button className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground" aria-label="Send message">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat"
      >
        {open ? "Hide Chat" : "Ask Sikkim AI"}
      </button>
    </div>
  );
}
