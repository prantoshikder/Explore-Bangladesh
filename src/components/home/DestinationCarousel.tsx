"use client";

/**
 * Horizontal, scroll-snapping carousel. Native scrolling (touch & trackpad)
 * plus prev/next buttons on desktop — no carousel library needed.
 */
import { useRef } from "react";
import type { DestinationSummary } from "@/types/destination";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { useT } from "@/i18n/client";

export function DestinationCarousel({ items }: { items: DestinationSummary[] }) {
  const t = useT();
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 hidden gap-2 md:flex">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? t.home.prevDestinations : t.home.nextDestinations}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-jute transition hover:bg-brand-600 hover:text-white"
          >
            {dir === -1 ? "←" : "→"}
          </button>
        ))}
      </div>
      <div
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {items.map((d) => (
          <div key={d.slug} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[31%] xl:w-[23.5%]">
            <DestinationCard d={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
