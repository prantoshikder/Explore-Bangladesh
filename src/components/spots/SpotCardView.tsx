"use client";

/**
 * Photo card for one tourist spot (used on /explore, My Trip and "more in this district").
 *
 *   ┌───────────────────────────┐
 *   │ ┌───────────────────────┐ │  inset photo with rounded corners
 *   │ │ 🏖️ Beach · City    ♡  │ │  category pill + save button
 *   │ │                       │ │
 *   │ │ 📍 Patenga, Chattogram│ │  glass location chip
 *   │ └───────────────────────┘ │
 *   │  Patenga Beach            │  name (+ Bangla name when it differs)
 *   │  City beach at the mouth… │  2-line summary
 *   │  ───────────────────────  │
 *   │  ● Easy   ⏱ 2–3 hours  (→)│  footer
 *   └───────────────────────────┘
 * Client component (reads the page language itself); usable from server and client components.
 */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import type { SpotCard } from "@/data/spots";
import type { SpotCategory } from "@/types/spot";
import { DifficultyBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/format";
import { SaveButton } from "@/components/ui/SaveButton";
import { DISTRICTS } from "@/data/districts";
import { useLocale, useT } from "@/i18n/client";

const CATEGORY_ICON: Record<SpotCategory, string> = {
  Beach: "🏖️",
  Island: "🏝️",
  Hills: "⛰️",
  Waterfall: "💧",
  Lake: "🛶",
  Forest: "🌳",
  River: "🌊",
  Wetland: "🌾",
  "Tea Garden": "🍃",
  Heritage: "🏛️",
  Religious: "🛕",
  Wildlife: "🐅",
  City: "🏙️",
};

export function SpotCardView({ s, className, priority = false }: { s: SpotCard; className?: string; priority?: boolean }) {
  const t = useT();
  const locale = useLocale();
  /* District names stay English in the data; show the Bangla name on /bn pages. */
  const district = locale === "bn" ? (DISTRICTS.find((d) => d.name === s.district)?.bn ?? s.district) : s.district;
  const [main, ...rest] = s.categories;
  /* On Bangla pages the name is usually the same as the Bangla local name — don't repeat it. */
  const squash = (x: string) => x.replace(/\s+/g, "");
  const showLocal = squash(s.localName) !== squash(s.name);

  return (
    <div className={cn("group relative h-full", className)}>
      <Link
        href={`/spots/${s.slug}`}
        className="flex h-full flex-col rounded-[1.75rem] bg-white p-2 shadow-sm ring-1 ring-jute/80 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-brand-900/10 group-hover:ring-brand-200"
      >
        {/* ---- Photo ---- */}
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem] bg-jute">
          <Image
            src={s.photo.src}
            alt={s.photo.alt}
            fill
            preload={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />

          {/* Category pill */}
          {main && (
            <span className="absolute top-3 left-3 inline-flex max-w-[70%] items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">
              <span aria-hidden>{CATEGORY_ICON[main]}</span>
              <span className="truncate">
                {t.labels.category[main]}
                {rest.length > 0 && <span className="font-medium text-muted"> · {rest.slice(0, 1).map((c) => t.labels.category[c])}</span>}
              </span>
            </span>
          )}

          {/* Location */}
          <p className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1 truncate rounded-full bg-black/35 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md">
            <span aria-hidden>📍</span>
            <span className="truncate">{s.upazila ? `${s.upazila}, ` : ""}{district}</span>
          </p>
        </div>

        {/* ---- Text ---- */}
        <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
          <h3 className="font-display text-[1.3rem] leading-snug font-semibold text-ink transition-colors group-hover:text-brand-700">{s.name}</h3>
          {showLocal && <p className="mt-0.5 text-sm text-muted">{s.localName}</p>}
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/70">{s.summary}</p>

          <div className="min-h-4 flex-1" />

          {/* ---- Footer ---- */}
          <div className="flex items-center gap-2 border-t border-dashed border-jute pt-3.5">
            <DifficultyBadge level={s.difficulty} className="shrink-0" />
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-muted" title={s.timeNeeded}>
              <span aria-hidden>⏱ </span>
              {s.timeNeeded}
            </span>
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition duration-300 group-hover:bg-brand-600 group-hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-rotate-45">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="sr-only">{t.common.seeFullDetails}</span>
          </div>
        </div>
      </Link>
      {/* Outside the link so it's a separate button (nested interactive elements are invalid) */}
      <SaveButton slug={s.slug} name={s.name} className="absolute top-5 right-5 z-10 transition group-hover:-translate-y-1" />
    </div>
  );
}
