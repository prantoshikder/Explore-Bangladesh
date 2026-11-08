/**
 * "Where next?" — related destinations (same trip type or division) plus a
 * planning CTA. Keeps visitors on the site and strengthens internal linking for SEO.
 */
import Link from "@/components/i18n/Link";
import type { Destination } from "@/types/destination";
import { getAllSummaries } from "@/data/destinations";
import { getSpotsForGuide, toSpotCard } from "@/data/spots";
import { SpotCardView } from "@/components/spots/SpotCardView";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { fmt } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";

export async function RelatedSection({ d }: { d: Destination }) {
  const locale = await getLocale();
  const t = await getT();
  const others = getAllSummaries(locale).filter((s) => s.slug !== d.slug);
  const score = (s: (typeof others)[number]) =>
    (s.hasFullGuide ? 4 : 0) + s.tripTypes.filter((t) => d.tripTypes.includes(t)).length * 2 + (s.division === d.division ? 1 : 0);
  const related = [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
  const spots = getSpotsForGuide(d.slug, locale).map((x) => toSpotCard(x, locale));

  return (
    <section aria-labelledby="related-heading" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      {/* Individual spots covered by this guide */}
      {spots.length > 0 && (
        <div className="mb-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{fmt(t.guide.related.around, { name: d.name })}</h2>
            <Link href={`/explore?q=${encodeURIComponent(d.district.split(" (")[0])}`} className="text-sm font-semibold text-brand-600">{t.guide.related.exploreDistrict}</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {spots.map((s) => <SpotCardView key={s.slug} s={s} />)}
          </div>
        </div>
      )}

      {/* Planning CTA */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-10 text-white sm:px-12">
        <div aria-hidden className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-sun/80" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">{t.guide.related.cta}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{fmt(t.guide.related.ctaTitle, { name: d.name })}</h2>
            <p className="mt-2 text-brand-100">{t.guide.related.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/cost-calculator" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow hover:bg-brand-50">
              {t.guide.related.calc}
            </Link>
            <Link href="/transport-guide" className="rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/50 hover:bg-white/10">
              {t.guide.related.transport}
            </Link>
          </div>
        </div>
      </div>

      <h2 id="related-heading" className="mt-20 font-display text-3xl font-semibold tracking-tight">{fmt(t.guide.related.whereNext, { name: d.name })}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((s) => <DestinationCard key={s.slug} d={s} />)}
      </div>
    </section>
  );
}
