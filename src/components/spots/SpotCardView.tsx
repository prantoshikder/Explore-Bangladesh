"use client";

/**
 * Photo card for one tourist spot (used on /explore and "more in this district").
 * Client component (reads the page language itself); usable from server and client components.
 */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import type { SpotCard } from "@/data/spots";
import { DifficultyBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/format";
import { SaveButton } from "@/components/ui/SaveButton";
import { DISTRICTS } from "@/data/districts";
import { useLocale, useT } from "@/i18n/client";

export function SpotCardView({ s, className, priority = false }: { s: SpotCard; className?: string; priority?: boolean }) {
  const t = useT();
  const locale = useLocale();
  /* District names stay English in the data; show the Bangla name on /bn pages. */
  const district = locale === "bn" ? (DISTRICTS.find((d) => d.name === s.district)?.bn ?? s.district) : s.district;
  return (
    <div className={cn("group relative h-full", className)}>
    <Link
      href={`/spots/${s.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-jute transition group-hover:-translate-y-1 group-hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-jute">
        <Image
          src={s.photo.src}
          alt={s.photo.alt}
          fill
          preload={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {s.categories.slice(0, 2).map((c) => (
            <span key={c} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/30 backdrop-blur">{t.labels.category[c]}</span>
          ))}
        </div>
        <p className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">📍 {s.upazila ? `${s.upazila}, ` : ""}{district}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight text-ink">{s.name}</h3>
          <DifficultyBadge level={s.difficulty} />
        </div>
        <p className="mt-0.5 text-sm text-muted">{s.localName}</p>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/75">{s.summary}</p>
        <span className="mt-4 text-sm font-semibold text-brand-600">
          {t.common.seeFullDetails} <span className="inline-block transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
      {/* Outside the link so it's a separate button (nested interactive elements are invalid) */}
      <SaveButton slug={s.slug} name={s.name} className="absolute top-3 right-3 z-10 transition group-hover:-translate-y-1" />
    </div>
  );
}
