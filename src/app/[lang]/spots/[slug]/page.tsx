/**
 * Tourist spot detail page — one template for every spot.
 * Prerendered for all spots via generateStaticParams.
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import { PhotoPageSkeleton } from "@/components/ui/PageSkeleton";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { getAllSpots, getSpotBySlug, getSpotPhoto, getSpotsByDistrict, toSpotCard } from "@/data/spots";
import { getDestinationBySlug } from "@/data/destinations";
import { SpotCardView } from "@/components/spots/SpotCardView";
import { DifficultyBadge, Badge } from "@/components/ui/Badge";
import { ModeChip } from "@/components/ui/ModeChip";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { SaveButton } from "@/components/ui/SaveButton";
import { ShowToDriverButton } from "@/components/ui/ShowToDriver";
import { DISTRICTS } from "@/data/districts";
import { pageMetadata } from "@/lib/seo";
import { getLocale, getT } from "@/i18n/server";
import { fmt, localizePath, LOCALE_META, type Locale } from "@/i18n/config";
import { absoluteUrl, jsonLd } from "@/lib/site";

export function generateStaticParams() {
  return getAllSpots().map((s) => ({ slug: s.slug }));
}

/** District name in the page language (spot.district is the English canonical key). */
function districtName(district: string, locale: Locale): string {
  return locale === "bn" ? (DISTRICTS.find((d) => d.name === district)?.bn ?? district) : district;
}

export async function generateMetadata(props: PageProps<"/[lang]/spots/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await getLocale();
  const t = await getT();
  const s = getSpotBySlug(slug, locale);
  if (!s) return { title: t.meta.notFound, robots: { index: false } };
  const district = districtName(s.district, locale);
  const en = getSpotBySlug(slug, "en") ?? s;
  return pageMetadata({
    title: fmt(t.meta.spotTitle, { name: s.name, district }),
    description: fmt(t.meta.spotDescription, { summary: s.summary, name: s.name, district }),
    path: `/spots/${s.slug}`,
    locale,
    ogType: "article",
    // English search phrases stay English; the Bangla names are added for Bangla searches
    keywords: [`${en.name}`, `${en.name} ${en.district}`, `how to go to ${en.name}`, `${en.name} entry fee`, `places to visit in ${en.district}`, s.localName, ...(locale === "bn" ? [`${s.name} ${district}`] : [])],
  });
}

/** Everything that depends on the URL `slug` — rendered inside <Suspense> (see default export). */
async function SpotContent({ params }: { params: PageProps<"/[lang]/spots/[slug]">["params"] }) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getT();
  const s = getSpotBySlug(slug, locale);
  if (!s) notFound();
  const district = districtName(s.district, locale);
  const lp = (path: string) => localizePath(locale, path);

  const photo = getSpotPhoto(s, locale);
  const guide = s.guideSlug ? getDestinationBySlug(s.guideSlug, locale) : undefined;
  const more = getSpotsByDistrict(s.district, locale).filter((x) => x.slug !== s.slug).map((x) => toSpotCard(x, locale));
  const url = absoluteUrl(lp(`/spots/${s.slug}`));
  const exploreDistrict = `/explore?q=${encodeURIComponent(district)}`;
  const mapSrc = `https://www.google.com/maps?q=${s.map.lat},${s.map.lng}&z=13&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${s.map.lat},${s.map.lng}`;

  const facts = [
    { icon: "🗓", label: t.spot.facts.bestTime, value: s.bestTime },
    { icon: "⏱", label: t.spot.facts.timeNeeded, value: s.timeNeeded },
    { icon: "🎟", label: t.spot.facts.entryFee, value: s.entryFee },
    { icon: "🕘", label: t.spot.facts.openingHours, value: s.openingHours },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        "@id": `${url}#place`,
        name: s.name,
        alternateName: s.localName,
        description: s.description.join(" "),
        url,
        inLanguage: LOCALE_META[locale].htmlLang,
        image: absoluteUrl(photo.src),
        touristType: s.categories.map((c) => t.labels.category[c]),
        isAccessibleForFree: /^free/i.test(getSpotBySlug(slug, "en")?.entryFee ?? s.entryFee),
        geo: { "@type": "GeoCoordinates", latitude: s.map.lat, longitude: s.map.lng },
        address: { "@type": "PostalAddress", addressLocality: s.upazila ?? district, addressRegion: `${district}, ${fmt(t.labels.divisionSuffix, { name: t.labels.division[s.division] })}`, addressCountry: "BD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.common.breadcrumbHome, item: absoluteUrl(lp("/")) },
          { "@type": "ListItem", position: 2, name: t.nav.explore, item: absoluteUrl(lp("/explore")) },
          { "@type": "ListItem", position: 3, name: district, item: absoluteUrl(lp(exploreDistrict)) },
          { "@type": "ListItem", position: 4, name: s.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />

      {/* ---------------- Hero ---------------- */}
      <section className="relative">
        <div className="relative overflow-hidden bg-brand-900 pt-28 pb-32 sm:min-h-[620px] sm:pt-32 sm:pb-40">
          <Image src={photo.src} alt={photo.alt} fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label={t.common.breadcrumb} className="text-sm text-white/80">
              <Link href="/" className="hover:text-white">{t.common.breadcrumbHome}</Link>
              <span className="mx-2">/</span>
              <Link href="/explore" className="hover:text-white">{t.nav.explore}</Link>
              <span className="mx-2">/</span>
              <Link href={exploreDistrict} className="hover:text-white">{district}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{s.name}</span>
            </nav>
            <div className="mt-10 flex flex-wrap gap-2">
              <DifficultyBadge level={s.difficulty} className="ring-0" />
              {s.categories.map((c) => <Badge key={c} tone="light">{t.labels.category[c]}</Badge>)}
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-tight text-white drop-shadow sm:text-7xl">{s.name}</h1>
            <p className="mt-2 text-lg text-white/85">
              {s.localName} <span className="text-white/60">· {t.common.showToDriverHint}</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-white/90">
              <span aria-hidden>📍</span>
              {fmt(t.spot.location, { place: s.upazila ? `${s.upazila}, ${district}` : district, division: t.labels.division[s.division] })}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">{s.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <ShowToDriverButton bnName={s.localName} bnDistrict={DISTRICTS.find((d) => d.name === s.district)?.bn} name={getSpotBySlug(slug, "en")?.name ?? s.name} />
              <SaveButton slug={s.slug} name={s.name} variant="pill" />
            </div>
            <ShareButtons text={fmt(t.spot.shareText, { name: s.name, district })} className="mt-4" />
          </div>
        </div>

        {/* Quick facts */}
        <div className="relative mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-jute shadow-xl ring-1 ring-jute sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-white p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted"><span aria-hidden className="mr-1">{f.icon}</span>{f.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- Body ---------------- */}
      <div className="mx-auto mt-16 grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-16">
          <section>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{fmt(t.spot.about, { name: s.name })}</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/85">
              {s.description.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
            <h3 className="mt-10 font-display text-xl font-semibold">{t.spot.whatToSee}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm ring-1 ring-jute">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.65rem] text-brand-700">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.spot.howToGet}</h2>
            <ol className="relative mt-8 space-y-5">
              <span aria-hidden className="absolute top-4 bottom-4 left-[1.15rem] w-0.5 bg-gradient-to-b from-brand-500 to-brand-100" />
              {s.howToReach.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-white shadow-md ring-4 ring-sand">{i + 1}</span>
                  <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-jute">
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    {step.mode && <div className="mt-2"><ModeChip mode={step.mode} /></div>}
                    <p className="mt-3 text-sm leading-relaxed text-ink/80">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.spot.location2}</h2>
            <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-jute">
              <iframe title={fmt(t.guide.map.mapOf, { name: s.name })} src={mapSrc} className="h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-brand-600 hover:underline">
              {t.spot.directions}
            </a>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">
            <h2 className="font-display text-xl font-semibold text-amber-950">{t.spot.goodToKnow}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-amber-950/85">
              {s.tips.map((tip) => <li key={tip} className="flex gap-2"><span aria-hidden>•</span>{tip}</li>)}
            </ul>
          </div>

          {guide && (
            <Link href={`/destinations/${guide.slug}`} className="group block overflow-hidden rounded-3xl bg-brand-600 p-6 text-white transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">{t.spot.fullGuide}</p>
              <p className="mt-2 font-display text-2xl font-semibold">{fmt(t.spot.fullGuideTitle, { name: guide.name })}</p>
              <p className="mt-2 text-sm text-brand-100">{fmt(t.spot.fullGuideText, { days: guide.itinerary.length })}</p>
              <span className="mt-4 inline-block text-sm font-semibold">{t.spot.readTheGuide} <span className="inline-block transition group-hover:translate-x-1">→</span></span>
            </Link>
          )}

          <Link href={`/contact?topic=correction&page=/spots/${s.slug}`} className="flex items-center gap-3 rounded-3xl bg-white p-5 text-sm ring-1 ring-jute transition hover:shadow-lg print:hidden">
            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand text-lg">✏️</span>
            <span>
              <span className="block font-semibold text-ink">{t.spot.changed}</span>
              <span className="block text-xs text-muted">{t.spot.suggest}</span>
            </span>
          </Link>

          <div className="rounded-3xl bg-white p-6 ring-1 ring-jute">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{t.spot.newHere}</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
              <li><Link href="/transport-guide" className="text-brand-700 hover:underline">{t.spot.newLinks.transport}</Link></li>
              <li><Link href="/essentials" className="text-brand-700 hover:underline">{t.spot.newLinks.essentials}</Link></li>
              <li><Link href="/tools/cost-calculator" className="text-brand-700 hover:underline">{t.spot.newLinks.calculator}</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* ---------------- More in this district ---------------- */}
      {more.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{fmt(t.spot.moreIn, { district })}</h2>
            <Link href={exploreDistrict} className="text-sm font-semibold text-brand-600">
              {fmt(t.spot.allIn, { district })}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {more.slice(0, 4).map((m) => <SpotCardView key={m.slug} s={m} />)}
          </div>
        </section>
      )}
    </>
  );
}

/**
 * The page itself returns instantly; the slug-dependent content streams in
 * inside Suspense. All spots are prerendered, so the skeleton only flashes during client navigation.
 */
export default function SpotPage(props: PageProps<"/[lang]/spots/[slug]">) {
  return (
    <Suspense fallback={<PhotoPageSkeleton />}>
      <SpotContent params={props.params} />
    </Suspense>
  );
}
