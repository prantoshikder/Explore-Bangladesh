/**
 * Destination detail page — one template renders every guide.
 * All guides are prerendered at build time via generateStaticParams;
 * unknown slugs hit notFound() below.
 *
 * SEO: rich title/description, canonical URL, per-guide Open Graph image
 * (./opengraph-image.tsx) and JSON-LD for TouristDestination, BreadcrumbList,
 * FAQPage and TouristTrip (the itinerary).
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import { PhotoPageSkeleton } from "@/components/ui/PageSkeleton";
import { notFound } from "next/navigation";
import type { Destination } from "@/types/destination";
import { getAllDestinations, getDestinationBySlug } from "@/data/destinations";
import { DestinationHero } from "@/components/destination/DestinationHero";
import { SectionNav } from "@/components/destination/SectionNav";
import { OverviewSection } from "@/components/destination/OverviewSection";
import { HowToReachSection } from "@/components/destination/HowToReachSection";
import { BudgetSection } from "@/components/destination/BudgetSection";
import { StaySection } from "@/components/destination/StaySection";
import { FoodSection } from "@/components/destination/FoodSection";
import { RulesSection } from "@/components/destination/RulesSection";
import { MapItinerarySection } from "@/components/destination/MapItinerarySection";
import { FaqSection } from "@/components/destination/FaqSection";
import { RelatedSection } from "@/components/destination/RelatedSection";
import { buildFaqs, type Faq } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { SITE, absoluteUrl, jsonLd } from "@/lib/site";
import { LOCALE_META, fmt, localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocale, getT } from "@/i18n/server";

export function generateStaticParams() {
  // Only the slug: the [lang] root layout supplies the language.
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await getLocale();
  const t = await getT();
  const d = getDestinationBySlug(slug, locale);
  if (!d) return { title: t.meta.notFound, robots: { index: false } };
  const year = d.lastVerified.slice(0, 4);
  return pageMetadata({
    // ~60 chars: the phrases people actually search for
    title: fmt(t.meta.guideTitle, { name: d.name, year }),
    description: fmt(t.meta.guideDescription, { tagline: d.tagline, days: d.itinerary.length }),
    path: `/destinations/${d.slug}`,
    locale,
    ogType: "article",
    keywords:
      locale === "en"
        ? [
            `${d.name} travel guide`,
            `how to go to ${d.name} from Dhaka`,
            `${d.name} tour cost`,
            `best time to visit ${d.name}`,
            `${d.name} hotels`,
            `${d.name} itinerary`,
            d.localName,
          ]
        : [d.name, fmt(t.guide.shareText, { name: d.name }), fmt(t.faq.bestTimeQ, { name: d.name }), fmt(t.faq.reachQ, { name: d.name })],
  });
}

/** Structured data graph for one guide (in the page's language). */
function buildJsonLd(d: Destination, faqs: Faq[], locale: Locale, t: Dictionary) {
  const url = absoluteUrl(localizePath(locale, `/destinations/${d.slug}`));
  const inLanguage = LOCALE_META[locale].htmlLang;
  const planName = `${fmt(t.guide.map.title, { days: d.itinerary.length })}: ${d.name}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": `${url}#destination`,
        name: d.name,
        alternateName: d.localName,
        description: d.overview.intro,
        url,
        image: [absoluteUrl(d.cover.src), ...(d.gallery ?? []).map((p) => absoluteUrl(p.src))],
        touristType: d.tripTypes.map((x) => t.labels.tripType[x]),
        geo: { "@type": "GeoCoordinates", latitude: d.map.lat, longitude: d.map.lng },
        address: {
          "@type": "PostalAddress",
          addressRegion: `${d.district}, ${fmt(t.labels.divisionSuffix, { name: t.labels.division[d.division] })}`,
          addressCountry: "BD",
        },
        includesAttraction: d.overview.highlights.map((h) => ({ "@type": "TouristAttraction", name: h })),
      },
      {
        "@type": "TouristTrip",
        name: planName,
        description: planName,
        inLanguage,
        touristType: d.tripTypes.map((x) => t.labels.tripType[x]),
        itinerary: {
          "@type": "ItemList",
          itemListElement: d.itinerary.map((day) => ({
            "@type": "ListItem",
            position: day.day,
            name: fmt(t.faq.dayItem, { n: day.day, title: day.title }),
            description: day.activities.map((a) => `${a.time}: ${a.activity}`).join(" "),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.common.breadcrumbHome, item: absoluteUrl(localizePath(locale, "/")) },
          { "@type": "ListItem", position: 2, name: t.nav.destinations, item: absoluteUrl(localizePath(locale, "/destinations")) },
          { "@type": "ListItem", position: 3, name: d.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage,
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: fmt(t.guide.shareText, { name: d.name }),
        inLanguage,
        dateModified: d.lastVerified,
        isPartOf: { "@id": absoluteUrl(`${localizePath(locale, "/")}#website`) },
        about: { "@id": `${url}#destination` },
        publisher: { "@type": "Organization", name: SITE.name },
      },
    ],
  };
}

/** Everything that depends on the URL `slug` — rendered inside <Suspense> (see default export). */
async function DestinationContent({ params }: { params: PageProps<"/[lang]/destinations/[slug]">["params"] }) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getT();
  const d = getDestinationBySlug(slug, locale);
  if (!d) notFound();
  const faqs = buildFaqs(d, t);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildJsonLd(d, faqs, locale, t)) }} />
      <DestinationHero d={d} />
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-[200px_1fr] lg:gap-14 lg:px-8">
        <aside><SectionNav /></aside>
        {/* Each section is self-contained — reorder or add new ones freely. */}
        <div className="space-y-24 pt-8 lg:pt-0">
          <OverviewSection d={d} />
          <HowToReachSection d={d} />
          <BudgetSection d={d} />
          <StaySection d={d} />
          <FoodSection d={d} />
          <RulesSection d={d} />
          <MapItinerarySection d={d} />
          <FaqSection name={d.name} faqs={faqs} slug={d.slug} />
        </div>
      </div>
      <RelatedSection d={d} />
    </>
  );
}

/**
 * The page itself returns instantly; the slug-dependent content streams in
 * inside Suspense. All guides are prerendered, so the skeleton only flashes during client navigation.
 */
export default function DestinationPage(props: PageProps<"/[lang]/destinations/[slug]">) {
  return (
    <Suspense fallback={<PhotoPageSkeleton />}>
      <DestinationContent params={props.params} />
    </Suspense>
  );
}
