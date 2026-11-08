import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TopSpots } from "@/components/spots/TopSpots";
import { SectionIntro } from "@/components/home/SectionIntro";
import { getTopSpots } from "@/data/spots/top";
import { getGalleryItems } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { DestinationExplorer } from "@/components/home/DestinationExplorer";
import { getAllSummaries } from "@/data/destinations";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({
    title: t.meta.destinations.title,
    description: t.meta.destinations.description,
    path: "/destinations",
    locale,
  });
}

export default async function DestinationsPage() {
  const locale = await getLocale();
  const t = await getT();
  const items = getAllSummaries(locale);
  return (
    <>
      <PageHero
        photo={getGalleryItems(locale).find((g) => g.photo.src.includes("kaptai-lake"))!.photo}
        eyebrow={t.destinationsPage.eyebrow}
        title={t.destinationsPage.title}
        accent={t.destinationsPage.titleAccent}
        text={t.destinationsPage.text}
      />
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mt-10">
        {/* useSearchParams needs a Suspense boundary so the shell can prerender. */}
        <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-jute/50" />}>
          <DestinationExplorer items={items} />
        </Suspense>
      </div>

      {/* Individual spots worth a visit, beyond the full guides */}
      <section className="mt-24">
        <SectionIntro eyebrow={t.destinationsPage.topEyebrow} title={t.destinationsPage.topTitle} text={t.destinationsPage.topText} link={{ href: "/explore", label: t.destinationsPage.topLink }} />
        <TopSpots spots={getTopSpots(10, locale)} variant="row" />
      </section>
    </div>
    </>
  );
}
