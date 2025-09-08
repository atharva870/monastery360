import { useEffect, useRef, useState } from "react";

const tours = [
  {
    title: "Pemayangtse Monastery 360°",
    src: "https://www.360cities.net/en/image/pemayangste-monastery-in-sikkim",
    embed: "https://www.360cities.net/embed_iframe#pano=pemayangste-monastery-in-sikkim&view=0.00,0.00,70.0,0.00",
    credit: "360cities",
    langText: {
      en: "Explore Pemayangtse Monastery, founded in the 17th century near Pelling. Rotate the view and zoom in to see the ornate windows and prayer halls.",
      hi: "17वीं सदी में पेलिंग के पास स्थापित पेमायांग्त्से मठ का अन्वेषण करें। दृश्य को घुमाएँ और प्रार्थना कक्षों को नज़दीक से देखें।",
    },
  },
  {
    title: "Tibetan Temple Interior 360°",
    src: "https://www.360cities.net/en/image/interior-tibetan-temple-in-india",
    embed: "https://www.360cities.net/embed_iframe#pano=interior-tibetan-temple-in-india&view=0.00,0.00,70.0,0.00",
    credit: "360cities",
    langText: {
      en: "Rotate inside a richly decorated Tibetan Buddhist temple interior in India—experience the art and ambiance similar to Sikkim’s monasteries.",
      hi: "भारत में तिब्बती बौद्ध मंदिर के सुसज्जित आंतरिक भाग का 360° अनुभव करें—सिक्किम के मठों जैसी कला और माहौल।",
    },
  },
];

export default function Tours() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [lang, setLang] = useState<"en" | "hi">("en");
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

  const speak = (text: string) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="container py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Virtual Tours</h1>
          <p className="mt-2 max-w-prose text-foreground/70">
            360° panoramas and narrated walkthroughs of Sikkim’s monasteries using real sources.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="lang" className="text-sm text-foreground/70">Language</label>
          <select
            id="lang"
            className="rounded-md border bg-background px-2 py-1 text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            aria-label="Narration language"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <button
            className="rounded-md border px-3 py-1 text-sm"
            onClick={() => window.speechSynthesis.cancel()}
            aria-label="Stop narration"
          >
            Stop
          </button>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {tours.map((t) => (
          <section key={t.title} className="overflow-hidden rounded-xl border">
            <div className="relative aspect-video w-full bg-black">
              {t.embed === "youtube" ? (
                <iframe
                  src={t.src}
                  title={t.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <iframe
                  src={t.embed}
                  title={t.title}
                  className="h-full w-full"
                  allow="fullscreen; vr"
                />
              )}
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <h2 className="font-serif text-xl">{t.title}</h2>
                <p className="text-sm text-foreground/60">Source: {t.credit}</p>
              </div>
              <button
                className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
                onClick={() => speak(t.langText[lang])}
                aria-label={`Play narration for ${t.title}`}
              >
                Play narration
              </button>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-6 text-xs text-foreground/60">
        Credits: 360Cities panoramas and public YouTube walkthroughs. Captions can be auto-translated in player settings.
      </p>
    </div>
  );
}
