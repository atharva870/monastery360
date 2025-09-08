import { useMemo, useState } from "react";

type Item = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  source: string;
};

const DATA: Item[] = [
  {
    title: "Namgyal Institute of Tibetology (Museum)",
    description:
      "Museum and libraries preserving Himalayan Buddhist art and manuscripts in Gangtok.",
    url: "https://namgyalinstitutesikkim.org/museum/",
    tags: ["museum", "gangtok", "manuscripts", "art"],
    source: "namgyalinstitutesikkim.org",
  },
  {
    title: "Endangered Archives Programme – Royal Archives of Sikkim (EAP880)",
    description:
      "Digitised royal archives of Sikkim (1875–1975) with documents in English, Devanagari, Tibetan, and Lepcha.",
    url: "https://eap.bl.uk/project/EAP880",
    tags: ["archives", "documents", "history"],
    source: "eap.bl.uk (British Library)",
  },
  {
    title: "Lotsawa House – Sikkim texts",
    description:
      "Translations of prayers, songs, and guides related to Sikkim’s Buddhist heritage.",
    url: "https://www.lotsawahouse.org/topics/sikkim/",
    tags: ["texts", "translations", "literature"],
    source: "lotsawahouse.org",
  },
  {
    title: "BDRC – Programs (Buddhist Digital Resource Center)",
    description:
      "Global Buddhist digitization projects; useful gateway to Tibetan resources.",
    url: "https://www.bdrc.io/programs",
    tags: ["manuscripts", "tibetan", "global"],
    source: "bdrc.io",
  },
];

export default function Archives() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(DATA.flatMap((i) => i.tags))).sort(),
    [],
  );

  const results = useMemo(() => {
    const query = q.toLowerCase().trim();
    return DATA.filter((i) => {
      const matchesQuery =
        !query ||
        `${i.title} ${i.description} ${i.tags.join(" ")}`
          .toLowerCase()
          .includes(query);
      const matchesTag = !tag || i.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [q, tag]);

  return (
    <div className="container py-12">
      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl">Digital Archives</h1>
        <p className="mt-2 max-w-prose text-foreground/70">
          Curated links to real digitisation projects and collections. Search
          and filter to explore manuscripts, murals, and documents.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search (semantic tags included)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full max-w-md rounded-md border bg-background px-3 py-2 text-sm"
          aria-label="Search archives"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag(null)}
            className={`rounded-full border px-3 py-1 text-sm ${!tag ? "bg-primary text-primary-foreground" : "bg-background"}`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-3 py-1 text-sm ${tag === t ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {results.map((i) => (
          <li key={i.url} className="rounded-xl border p-4">
            <h2 className="font-serif text-xl">
              <a
                href={i.url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {i.title}
              </a>
            </h2>
            <p className="mt-1 text-sm text-foreground/70">{i.description}</p>
            <p className="mt-2 text-xs text-foreground/60">
              Source: {i.source}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {i.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2 py-0.5 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
