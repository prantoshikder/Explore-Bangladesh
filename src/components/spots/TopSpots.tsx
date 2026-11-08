"use client";

/**
 * "Top tourist spots" — two layouts:
 *  - variant="feature": magazine grid for the homepage (#1 and #2 big, 8 small)
 *  - variant="row": horizontal scroller for /explore, /destinations, My Trip
 * Every card links to the spot page and has a ❤️ save button.
 */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import type { TopSpot } from "@/data/spots/top";
import { SaveButton } from "@/components/ui/SaveButton";
import { cn } from "@/lib/format";
import { DISTRICTS } from "@/data/districts";
import { useLocale, useT } from "@/i18n/client";

/** District names stay English in the data; show the Bangla name on /bn pages. */
function useDistrictName() {
  const locale = useLocale();
  return (name: string) => (locale === "bn" ? (DISTRICTS.find((d) => d.name === name)?.bn ?? name) : name);
}

function Rank({ n, big }: { n: number; big?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "font-display leading-none font-semibold text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]",
        big ? "text-7xl sm:text-8xl" : "text-5xl",
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

function FeatureTile({ s, big }: { s: TopSpot; big: boolean }) {
  const t = useT();
  const district = useDistrictName();
  return (
    <li className={cn("group relative", big && "sm:col-span-2 lg:row-span-2")}>
      <Link href={`/spots/${s.slug}`} className="relative block h-full min-h-[260px] overflow-hidden rounded-[1.75rem] bg-brand-900">
        <Image
          src={s.photo.src}
          alt={s.photo.alt}
          fill
          sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
        <div className="absolute top-4 left-5">
          <Rank n={s.rank} big={big} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="text-xs font-semibold text-white/75">📍 {district(s.district)} · {t.labels.category[s.categories[0]]}</p>
          <h3 className={cn("mt-1 font-display font-semibold leading-tight", big ? "text-3xl sm:text-5xl" : "text-2xl")}>{s.name}</h3>
          <p className={cn("mt-2 text-sm text-white/85", big ? "max-w-md" : "line-clamp-2")}>{s.why}</p>
          {big && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-700 transition group-hover:bg-brand-50">
              {t.topSpots.seeHow} <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </Link>
      <SaveButton slug={s.slug} name={s.name} className="absolute top-4 right-4 z-10" />
    </li>
  );
}

function RowCard({ s }: { s: TopSpot }) {
  const district = useDistrictName();
  return (
    <li className="group relative w-64 shrink-0 snap-start sm:w-72">
      <Link href={`/spots/${s.slug}`} className="block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-jute transition group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={s.photo.src} alt={s.photo.alt} fill sizes="300px" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute top-3 left-4">
            <Rank n={s.rank} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="text-[0.7rem] font-semibold text-white/75">📍 {district(s.district)}</p>
            <h3 className="font-display text-xl font-semibold leading-tight">{s.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-white/85">{s.why}</p>
          </div>
        </div>
      </Link>
      <SaveButton slug={s.slug} name={s.name} className="absolute top-3 right-3 z-10" />
    </li>
  );
}

export function TopSpots({ spots, variant = "feature" }: { spots: TopSpot[]; variant?: "feature" | "row" }) {
  if (variant === "row") {
    return (
      <ol className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8">
        {spots.map((s) => <RowCard key={s.slug} s={s} />)}
      </ol>
    );
  }
  return (
    <ol className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {spots.map((s, i) => <FeatureTile key={s.slug} s={s} big={i < 2} />)}
    </ol>
  );
}
