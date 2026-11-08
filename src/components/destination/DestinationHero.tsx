/** Full-bleed cover photo + title + quick-facts bar at the top of a guide. */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { ShowToDriverButton } from "@/components/ui/ShowToDriver";
import { DISTRICTS } from "@/data/districts";
import type { Destination } from "@/types/destination";
import { Badge, DifficultyBadge } from "@/components/ui/Badge";
import { bdt, cn, monthYear, usd } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { getT } from "@/i18n/server";

export async function DestinationHero({ d }: { d: Destination }) {
  const t = await getT();
  const budgetTier = d.budget.tiers.find((t) => t.id === "budget");
  const perDay = budgetTier ? Object.values(budgetTier.perPersonPerDay).reduce((a, b) => a + b, 0) : 0;

  const facts = [
    { icon: "🗓", label: t.guide.facts.bestTime, value: d.overview.bestTimeSummary },
    { icon: "⏱", label: t.guide.facts.idealStay, value: d.idealDuration },
    { icon: "📍", label: t.guide.facts.fromDhaka, value: d.howToReach.distanceFromDhaka },
    { icon: "💰", label: t.guide.facts.budgetFrom, value: fmt(t.guide.facts.perDay, { bdt: bdt(perDay), usd: usd(perDay) }) },
  ];

  return (
    <section className="relative">
      <div className={cn("relative overflow-hidden bg-gradient-to-br pt-28 pb-32 sm:min-h-[600px] sm:pt-32 sm:pb-40", d.coverGradient)}>
        {/* Above-the-fold photo: preload it so it paints immediately (LCP). */}
        <Image src={d.cover.src} alt={d.cover.alt} fill preload sizes="100vw" className="object-cover" />
        {/* Dark gradient from the bottom-left keeps the white headline readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={t.common.breadcrumb} className="text-sm text-white/80">
            <Link href="/" className="hover:text-white">{t.common.breadcrumbHome}</Link>
            <span className="mx-2">/</span>
            <Link href="/destinations" className="hover:text-white">{t.nav.destinations}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{d.name}</span>
          </nav>

          <div className="mt-10 flex flex-wrap gap-2">
            <DifficultyBadge level={d.difficulty} className="ring-0" />
            {d.tripTypes.map((x) => <Badge key={x} tone="light">{t.labels.tripType[x]}</Badge>)}
            <Badge tone="light">{fmt(t.labels.divisionSuffix, { name: t.labels.division[d.division] })}</Badge>
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-white drop-shadow sm:text-7xl">
            {d.name}
          </h1>
          <p className="mt-2 text-lg text-white/85">
            {d.localName} <span className="text-white/60">· {t.common.showToDriverHint}</span>
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">{d.tagline}</p>
          <ShowToDriverButton bnName={d.localName} bnDistrict={DISTRICTS.find((x) => d.district.startsWith(x.name))?.bn} name={d.name} className="mt-7" />
          <ShareButtons text={fmt(t.guide.shareText, { name: d.name })} className="mt-4" />
        </div>
        <PhotoCredit photo={d.cover} className="absolute right-4 bottom-24 text-white/75 sm:right-6 sm:bottom-28 lg:right-8" />
      </div>

      {/* Quick-facts bar overlapping the cover */}
      <div className="relative mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-jute shadow-xl ring-1 ring-jute lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                <span aria-hidden className="mr-1">{f.icon}</span>{f.label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold leading-snug text-ink sm:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-right text-xs text-muted">{fmt(t.common.infoVerified, { date: monthYear(d.lastVerified, t.labels.months) })}</p>
      </div>
    </section>
  );
}
