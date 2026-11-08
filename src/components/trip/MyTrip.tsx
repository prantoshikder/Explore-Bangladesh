"use client";

/**
 * "My Trip" — the traveller's saved spots, grouped by district.
 *  - Share: copies a link like /my-trip?s=jaflong,lalakhal that anyone can open
 *  - Opening a shared link shows those places with a "Save all" button
 *  - Print-friendly; Clear needs a second tap (no browser confirm dialogs)
 */
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { SpotCard } from "@/data/spots";
import { SpotCardView } from "@/components/spots/SpotCardView";
import { useSavedSpots } from "@/lib/saved-spots";
import { TopSpots } from "@/components/spots/TopSpots";
import type { TopSpot } from "@/data/spots/top";

function groupByDistrict(list: SpotCard[]) {
  const map = new Map<string, SpotCard[]>();
  list.forEach((s) => map.set(s.district, [...(map.get(s.district) ?? []), s]));
  return Array.from(map.entries());
}

export function MyTrip({ spots, districtBn, topSpots = [] }: { spots: SpotCard[]; districtBn: Record<string, string>; topSpots?: TopSpot[] }) {
  const { saved, addMany, clear } = useSavedSpots();
  const params = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const bySlug = new Map(spots.map((s) => [s.slug, s]));
  const mine = saved.map((s) => bySlug.get(s)).filter((s): s is SpotCard => Boolean(s));
  const shared = (params.get("s") ?? "").split(",").map((s) => bySlug.get(s.trim())).filter((s): s is SpotCard => Boolean(s));
  const sharedNew = shared.filter((s) => !saved.includes(s.slug));
  const groups = groupByDistrict(mine);

  const share = async () => {
    const url = `${window.location.origin}/my-trip?s=${mine.map((s) => s.slug).join(",")}`;
    try {
      if (navigator.share) await navigator.share({ title: "My Bangladesh trip", text: `${mine.length} places I want to visit in Bangladesh`, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* cancelled or blocked */
    }
  };

  const btn = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition";

  return (
    <div className="space-y-12">
      {/* Shared list banner */}
      {sharedNew.length > 0 && (
        <section className="rounded-[2rem] bg-brand-600 p-6 text-white sm:p-8 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Shared with you</p>
              <p className="mt-1 font-display text-2xl font-semibold">Someone shared {shared.length} place{shared.length > 1 ? "s" : ""} with you</p>
              <p className="mt-1 text-sm text-brand-100">{shared.map((s) => s.name).join(" · ")}</p>
            </div>
            <button type="button" onClick={() => addMany(sharedNew.map((s) => s.slug))} className={`${btn} bg-white text-brand-700 hover:bg-brand-50`}>
              ❤️ Save all to my trip
            </button>
          </div>
        </section>
      )}

      {mine.length === 0 ? (
        <section className="mx-auto max-w-xl rounded-[2rem] bg-white p-10 text-center ring-1 ring-jute">
          <p className="text-5xl">🧳</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">Your trip is empty</h2>
          <p className="mt-2 text-muted">Tap the ❤️ on any place to save it here. Your list stays in this browser, so no account is needed.</p>
          <Link href="/explore" className={`${btn} mt-6 bg-brand-600 text-white hover:bg-brand-700`}>Find places to visit →</Link>
        </section>
      ) : null}

      {mine.length === 0 && topSpots.length > 0 && (
        <section className="print:hidden">
          <h2 className="mb-6 text-center font-display text-3xl font-semibold tracking-tight">Start with the top 10 ❤️</h2>
          <TopSpots spots={topSpots} variant="row" />
        </section>
      )}

      {mine.length > 0 && (
        <>
          {/* Summary + actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 ring-1 ring-jute sm:p-6">
            <p className="text-lg">
              <strong className="font-display text-3xl text-brand-600">{mine.length}</strong> place{mine.length > 1 ? "s" : ""} in{" "}
              <strong className="font-display text-3xl text-brand-600">{groups.length}</strong> district{groups.length > 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-2 print:hidden">
              <button type="button" onClick={share} className={`${btn} bg-brand-600 text-white hover:bg-brand-700`}>
                {copied ? "✓ Link copied" : "🔗 Share list"}
              </button>
              <button type="button" onClick={() => window.print()} className={`${btn} bg-sand ring-1 ring-jute hover:bg-jute`}>🖨️ Print</button>
              <button
                type="button"
                onClick={() => (confirmClear ? (clear(), setConfirmClear(false)) : setConfirmClear(true))}
                onBlur={() => setConfirmClear(false)}
                className={`${btn} ${confirmClear ? "bg-sun text-white" : "bg-sand ring-1 ring-jute hover:bg-jute"}`}
              >
                {confirmClear ? "Tap again to clear" : "Clear"}
              </button>
            </div>
          </div>

          <p className="rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900 ring-1 ring-amber-200">
            💡 Places in the same district can often be combined into one day trip. Spots in different divisions usually need an overnight bus or train between them.
          </p>

          {groups.map(([district, list]) => (
            <section key={district} className="break-inside-avoid">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-jute pb-3">
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {district} <span className="text-lg font-normal text-muted">{districtBn[district]}</span>
                </h2>
                <Link href={`/explore?q=${encodeURIComponent(district)}`} className="text-sm font-semibold text-brand-600 print:hidden">More in {district} →</Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((s) => <SpotCardView key={s.slug} s={s} />)}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
