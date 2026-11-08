"use client";

/**
 * Card used in the homepage carousel and the /destinations grid.
 * The cover photo is optimised by next/image (responsive sizes, lazy loading);
 * the gradient sits underneath as a placeholder while the photo loads.
 */
import Image from "next/image";
import Link from "next/link";
import type { DestinationSummary } from "@/types/destination";
import { Badge, DifficultyBadge } from "./Badge";
import { cn } from "@/lib/format";
import { SHOW_INLINE_CREDITS } from "./PhotoCredit";
import { useT } from "@/i18n/client";

export function DestinationCard({ d, className }: { d: DestinationSummary; className?: string }) {
  const t = useT();
  const body = (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-jute transition",
        "hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      <div className={cn("relative h-52 overflow-hidden bg-gradient-to-br", d.coverGradient)}>
        <Image
          src={d.cover.src}
          alt={d.cover.alt}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 31vw, (min-width: 640px) 45vw, 82vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        {/* Gradient keeps the white badges readable on bright photos */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/50" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {d.tripTypes.map((tt) => (
            <Badge key={tt} tone="light">{t.labels.tripType[tt]}</Badge>
          ))}
        </div>
        {!d.hasFullGuide && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {t.common.seePlaces}
          </span>
        )}
        <span className={cn("absolute right-3 bottom-3 max-w-[60%] truncate text-right text-[0.65rem] text-white/80", !SHOW_INLINE_CREDITS && "hidden")} title={`${t.common.photo}: ${d.cover.credit.author}, ${d.cover.credit.license}`}>
          📷 {d.cover.credit.author}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight text-ink">{d.name}</h3>
          <DifficultyBadge level={d.difficulty} />
        </div>
        <p className="mt-0.5 text-sm text-muted">{d.localName} · {t.labels.division[d.division]}</p>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/80">{d.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-jute pt-3 text-xs text-muted">
          <span>🗓 {d.idealDuration}</span>
          {d.hasFullGuide ? (
            <span className="font-semibold text-brand-600 group-hover:underline">{t.common.readGuide} →</span>
          ) : (
            <span className="font-semibold text-brand-600 group-hover:underline">{t.common.seePlaces} →</span>
          )}
        </div>
      </div>
    </article>
  );

  // No full guide yet → send people to the spot search for that place rather than a dead card
  return (
    <Link href={d.hasFullGuide ? `/destinations/${d.slug}` : `/explore?q=${encodeURIComponent(d.name.split(" (")[0])}`} className="block h-full">
      {body}
    </Link>
  );
}
