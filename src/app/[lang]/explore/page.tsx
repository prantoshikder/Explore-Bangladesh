/** /explore — search every tourist spot by district, division or place name. */
import type { Metadata } from "next";
import { Suspense } from "react";
import { SpotExplorer } from "@/components/spots/SpotExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { DISTRICTS } from "@/data/districts";
import { getAllSpotCards, getAllSpots, getCoveredDistricts, getSpotPhoto } from "@/data/spots";
import { pageMetadata } from "@/lib/seo";
import { getTopSpots } from "@/data/spots/top";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.explore.title, description: t.meta.explore.description, path: "/explore", locale });
}

export default async function ExplorePage() {
  const locale = await getLocale();
  const t = await getT();
  const spots = getAllSpotCards(locale);
  const covered = getCoveredDistricts(locale);
  const lalakhal = getAllSpots(locale).find((s) => s.slug === "lalakhal");
  const heroPhoto = lalakhal ? getSpotPhoto(lalakhal, locale) : spots[0].photo;
  // On Bangla pages spot names are Bangla — send the English names too so "jaflong" still finds জাফলং
  const altNames =
    locale === "bn" ? Object.fromEntries(getAllSpots("en").map((s) => [s.slug, [s.name, ...(s.upazila ? [s.upazila] : [])]])) : undefined;

  return (
    <>
      <PageHero
        photo={heroPhoto}
        eyebrow={t.explore.eyebrow}
        title={t.explore.title}
        accent={t.explore.titleAccent}
        text={t.explore.text}
        align="center"
        size="lg"
        overlap
      />

      {/* The search box floats over the bottom edge of the hero */}
      <div className="relative z-20 mx-auto -mt-44 max-w-7xl px-4 pb-14 sm:-mt-56 sm:px-6 lg:px-8">
        {/* useSearchParams needs a Suspense boundary so the shell can prerender */}
        <Suspense fallback={<div className="mx-auto h-16 max-w-3xl animate-pulse rounded-full bg-white ring-1 ring-jute" />}>
          <SpotExplorer spots={spots} districts={DISTRICTS} covered={covered} topSpots={getTopSpots(10, locale)} altNames={altNames} />
        </Suspense>
      </div>
    </>
  );
}
