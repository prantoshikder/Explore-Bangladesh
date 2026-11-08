"use client";

/**
 * /explore — search tourist spots by district, division, place or category.
 *
 *  - Results update instantly as you type; the URL (?q=) updates shortly after,
 *    so searches can be shared and the back button works.
 *  - Autocomplete suggestions (↑ ↓ Enter Esc). Picking a district shows all its
 *    spots; picking a spot opens its detail page.
 *  - Category chips filter the current results.
 *  - With no query, shows a "browse by district" photo grid.
 */
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { District } from "@/data/districts";
import type { SpotCard } from "@/data/spots";
import type { Photo } from "@/types/destination";
import type { SpotCategory } from "@/types/spot";
import { normalize, searchSpots, suggest } from "@/lib/spot-search";
import { SpotCardView } from "./SpotCardView";
import { TopSpots } from "./TopSpots";
import type { TopSpot } from "@/data/spots/top";
import { cn } from "@/lib/format";

interface CoveredDistrict {
  name: string;
  bn: string;
  division: string;
  count: number;
  photo: Photo;
}

const TRY = ["Sylhet", "Cox's Bazar", "Bandarban", "Dhaka", "সিলেট", "waterfall", "Chattogram"];

function Grid({ items }: { items: SpotCard[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((s) => <SpotCardView key={s.slug} s={s} />)}
    </div>
  );
}

function GroupHeading({ title, sub, count }: { title: string; sub?: string; count: number }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-jute pb-4">
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">{title}</h2>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
        {count} place{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}

export function SpotExplorer({ spots, districts, covered, topSpots = [] }: { spots: SpotCard[]; districts: District[]; covered: CoveredDistrict[]; topSpots?: TopSpot[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const listId = useId();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const [category, setCategory] = useState<SpotCategory | "All">("All");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Press "/" anywhere on the page to jump to the search box */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || t?.closest("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Keep the URL in sync (debounced) */
  useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim();
      const next = q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname;
      router.replace(next, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query, pathname, router]);

  /* Reset the category filter whenever the query changes */
  const [lastQuery, setLastQuery] = useState(query);
  if (lastQuery !== query) {
    setLastQuery(query);
    setCategory("All");
    setActive(-1);
  }

  const result = useMemo(() => searchSpots(query, spots, districts), [query, spots, districts]);
  const suggestions = useMemo(() => suggest(query, spots, districts), [query, spots, districts]);
  const showSuggest = focused && suggestions.length > 0;

  const divisionSpots = result.division ? spots.filter((s) => s.division === result.division) : [];
  const allShown = [...result.districts.flatMap((d) => d.spots), ...divisionSpots, ...result.spots];
  const categories = Array.from(new Set(allShown.flatMap((s) => s.categories)));
  const byCat = (list: SpotCard[]) => (category === "All" ? list : list.filter((s) => s.categories.includes(category)));
  const total = new Set(allShown.map((s) => s.slug)).size;
  const hasQuery = query.trim().length > 0;
  // Very short Latin queries ("sy") are still being typed — show suggestions, not "no results"
  const norm = normalize(query);
  const tooShort = hasQuery && norm.length < 3 && !/[\u0980-\u09ff]/.test(norm);
  const empty = result.districts.length === 0 && !result.division && result.spots.length === 0;
  const nothing = hasQuery && !tooShort && empty;

  const pick = (i: number) => {
    const s = suggestions[i];
    if (!s) return;
    if (s.href) router.push(s.href);
    else setQuery(s.value);
    setFocused(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggest) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(suggestions.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(-1, a - 1)); }
    else if (e.key === "Enter") { if (active >= 0) { e.preventDefault(); pick(active); } else setFocused(false); }
    else if (e.key === "Escape") setFocused(false);
  };

  return (
    <div>
      {/* ================= Search box ================= */}
      <div className="relative z-30 mx-auto max-w-3xl">
        <form
          role="search"
          onSubmit={(e) => { e.preventDefault(); setFocused(false); inputRef.current?.blur(); }}
          className="flex items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-2xl shadow-brand-900/15 ring-1 ring-jute focus-within:ring-2 focus-within:ring-brand-500"
        >
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-brand-600"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setFocused(true); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            onKeyDown={onKeyDown}
            placeholder="Type a district or place, e.g. Sylhet or Jaflong"
            aria-label="Search by district or place"
            role="combobox"
            aria-expanded={showSuggest}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
            className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink placeholder:text-muted focus:outline-none sm:text-lg"
          />
          {!query && (
            <kbd className="hidden shrink-0 rounded-md bg-sand px-2 py-1 font-mono text-xs text-muted ring-1 ring-jute sm:block" title="Press / to search">/</kbd>
          )}
          {query && (
            <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear search" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-sand">
              ✕
            </button>
          )}
          <button type="submit" className="shrink-0 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Search
          </button>
        </form>

        {/* Suggestions */}
        {showSuggest && (
          <ul id={listId} role="listbox" className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl bg-white p-2 shadow-2xl shadow-brand-900/15 ring-1 ring-jute">
            {suggestions.map((s, i) => (
              <li
                key={`${s.type}-${s.label}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onPointerDown={(e) => e.preventDefault()}
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(i)}
                className={cn("flex cursor-pointer items-center gap-3 rounded-2xl p-2.5", i === active && "bg-brand-50")}
              >
                {s.image ? (
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl"><Image src={s.image} alt="" fill sizes="44px" className="object-cover" /></span>
                ) : (
                  <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sand text-lg">📍</span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">{s.label}</span>
                  <span className="block truncate text-xs text-muted">{s.sub}</span>
                </span>
                <span className="text-xs font-semibold text-brand-600">{s.type === "district" ? "District" : "Place"}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Quick tries */}
        <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
          <span>Try:</span>
          {TRY.map((t) => (
            <button key={t} type="button" onClick={() => setQuery(t)} className="rounded-full bg-white px-3 py-1 font-medium text-ink/80 ring-1 ring-jute transition hover:bg-brand-600 hover:text-white">
              {t}
            </button>
          ))}
        </p>
      </div>

      {/* ================= Browse (no query) ================= */}
      {!hasQuery && topSpots.length > 0 && (
        <section className="mt-16">
          <GroupHeading title="Top 10 must-see spots" sub="Not sure where to start? Begin with the places visitors love most." count={topSpots.length} />
          <TopSpots spots={topSpots} variant="row" />
        </section>
      )}

      {!hasQuery && (
        <section className="mt-16">
          <GroupHeading title="Browse by district" sub="Tap a district to see every place worth visiting there." count={spots.length} />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {covered.map((d) => (
              <li key={d.name}>
                <button type="button" onClick={() => { setQuery(d.name); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left">
                  <Image src={d.photo.src} alt="" fill sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <span className="block text-xs font-semibold text-white/75">{d.division}</span>
                    <span className="block font-display text-2xl font-semibold leading-tight">{d.name}</span>
                    <span className="mt-1 block text-xs text-white/85">{d.bn} · {d.count} place{d.count > 1 ? "s" : ""}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= Results ================= */}
      {tooShort && empty && (
        <p className="mt-14 text-center text-sm text-muted">Keep typing… (at least 3 letters)</p>
      )}

      {hasQuery && !nothing && !(tooShort && empty) && (
        <div className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted" aria-live="polite">
              <strong className="text-ink">{total}</strong> place{total === 1 ? "" : "s"} for &ldquo;{query.trim()}&rdquo;
            </p>
            {categories.length > 1 && (
              <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Filter by type">
                {(["All", ...categories] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                    className={cn("shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition", category === c ? "bg-brand-600 text-white" : "bg-white text-ink/75 ring-1 ring-jute hover:bg-jute")}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 space-y-16">
            {result.districts.map(({ district, spots: list }) => (
              <section key={district.name}>
                <GroupHeading title={`Places to visit in ${district.name}`} sub={`${district.bn} · ${district.division} Division`} count={list.length} />
                {list.length ? (
                  byCat(list).length ? <Grid items={byCat(list)} /> : <p className="text-sm text-muted">No {category.toLowerCase()} spots in {district.name}.</p>
                ) : (
                  <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-jute">
                    <p className="text-3xl">🧭</p>
                    <p className="mt-2 font-semibold">We haven&apos;t added places in {district.name} yet</p>
                    <p className="mt-1 text-sm text-muted">New districts are added regularly. Meanwhile, try one of these:</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {covered.filter((c) => c.division === district.division).concat(covered.filter((c) => c.division !== district.division)).slice(0, 6).map((c) => (
                        <button key={c.name} type="button" onClick={() => setQuery(c.name)} className="rounded-full bg-sand px-3 py-1.5 text-sm font-semibold ring-1 ring-jute hover:bg-brand-600 hover:text-white">
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {result.division && (
              <section>
                <GroupHeading title={`${result.division} Division`} sub="Every district we cover in this division" count={divisionSpots.length} />
                <div className="space-y-12">
                  {Array.from(new Set(divisionSpots.map((s) => s.district))).map((dName) => {
                    const list = byCat(divisionSpots.filter((s) => s.district === dName));
                    return list.length ? (
                      <div key={dName}>
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-600">
                          <span aria-hidden className="h-px w-6 bg-brand-600" /> {dName}
                        </h3>
                        <Grid items={list} />
                      </div>
                    ) : null;
                  })}
                </div>
              </section>
            )}

            {result.spots.length > 0 && byCat(result.spots).length > 0 && (
              <section>
                <GroupHeading title={result.districts.length || result.division ? "Other matching places" : "Matching places"} count={byCat(result.spots).length} />
                <Grid items={byCat(result.spots)} />
              </section>
            )}
          </div>
        </div>
      )}

      {nothing && (
        <div className="mx-auto mt-14 max-w-xl rounded-3xl bg-white p-10 text-center ring-1 ring-jute">
          <p className="text-4xl">🔎</p>
          <p className="mt-3 font-display text-2xl font-semibold">No places found for &ldquo;{query.trim()}&rdquo;</p>
          <p className="mt-2 text-sm text-muted">Check the spelling, or pick one of the districts we cover:</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {covered.map((c) => (
              <button key={c.name} type="button" onClick={() => setQuery(c.name)} className="rounded-full bg-sand px-3 py-1.5 text-sm font-semibold ring-1 ring-jute hover:bg-brand-600 hover:text-white">
                {c.name}
              </button>
            ))}
          </div>
          <Link href="/destinations" className="mt-6 inline-block text-sm font-semibold text-brand-600 underline underline-offset-4">Or browse the full destination guides</Link>
        </div>
      )}
    </div>
  );
}
