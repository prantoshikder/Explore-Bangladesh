/** /my-trip — the traveller's saved places (stored in their browser). */
import type { Metadata } from "next";
import { Suspense } from "react";
import { MyTrip } from "@/components/trip/MyTrip";
import { PageHero } from "@/components/ui/PageHero";
import { DISTRICTS } from "@/data/districts";
import { getAllSpotCards, getAllSpots, getSpotPhoto } from "@/data/spots";
import { getTopSpots } from "@/data/spots/top";

export const metadata: Metadata = {
  title: "My Trip",
  description: "Your saved places in Bangladesh, grouped by district. Share the list or print it.",
  robots: { index: false, follow: true }, // personal page — keep it out of search results
};

export default function MyTripPage() {
  const spots = getAllSpotCards();
  const districtBn = Object.fromEntries(DISTRICTS.map((d) => [d.name, d.bn]));
  const tanguar = getAllSpots().find((s) => s.slug === "tanguar-haor");

  return (
    <>
      <PageHero
        photo={tanguar ? getSpotPhoto(tanguar) : spots[0].photo}
        eyebrow="My Trip"
        title="Your Bangladesh,"
        accent="your way."
        text="Every place you ❤️ is saved here, grouped by district so you can plan the route. Share the list with friends or print it for the road."
      />
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white ring-1 ring-jute" />}>
          <MyTrip spots={spots} districtBn={districtBn} topSpots={getTopSpots(10)} />
        </Suspense>
      </div>
    </>
  );
}
