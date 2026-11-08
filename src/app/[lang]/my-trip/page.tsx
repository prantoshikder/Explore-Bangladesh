/** /my-trip — the traveller's saved places (stored in their browser). */
import type { Metadata } from "next";
import { Suspense } from "react";
import { MyTrip } from "@/components/trip/MyTrip";
import { PageHero } from "@/components/ui/PageHero";
import { DISTRICTS } from "@/data/districts";
import { getAllSpotCards, getAllSpots, getSpotPhoto } from "@/data/spots";
import { getTopSpots } from "@/data/spots/top";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.meta.myTrip.title,
    description: t.meta.myTrip.description,
    robots: { index: false, follow: true }, // personal page — keep it out of search results
  };
}

export default async function MyTripPage() {
  const locale = await getLocale();
  const t = await getT();
  const spots = getAllSpotCards(locale);
  const districtBn = Object.fromEntries(DISTRICTS.map((d) => [d.name, d.bn]));
  const tanguar = getAllSpots(locale).find((s) => s.slug === "tanguar-haor");

  return (
    <>
      <PageHero
        photo={tanguar ? getSpotPhoto(tanguar, locale) : spots[0].photo}
        eyebrow={t.myTrip.eyebrow}
        title={t.myTrip.title}
        accent={t.myTrip.titleAccent}
        text={t.myTrip.text}
      />
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white ring-1 ring-jute" />}>
          <MyTrip spots={spots} districtBn={districtBn} topSpots={getTopSpots(10, locale)} />
        </Suspense>
      </div>
    </>
  );
}
