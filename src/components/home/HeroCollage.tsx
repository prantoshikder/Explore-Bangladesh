/**
 * Decorative "postcard" collage on the right of the hero (desktop only).
 * Three tilted photo cards that gently float, plus a floating info chip.
 * Each postcard links to its destination so it's useful, not just pretty.
 */
import Image from "next/image";
import Link from "next/link";
import type { DestinationSummary } from "@/types/destination";
import { cn } from "@/lib/format";
import { getT } from "@/i18n/server";

const LAYOUT = [
  { box: "top-0 right-6 w-64", rotate: "5deg", delay: "0s", aspect: "aspect-[4/5]" },
  { box: "top-36 left-0 w-60", rotate: "-7deg", delay: "-2.5s", aspect: "aspect-[4/5]" },
  { box: "bottom-0 right-16 w-56", rotate: "-2deg", delay: "-4.5s", aspect: "aspect-[5/4]" },
];

export async function HeroCollage({ items }: { items: DestinationSummary[] }) {
  const t = await getT();
  return (
    <div aria-hidden={false} className="relative hidden h-[540px] w-full max-w-[460px] justify-self-end lg:block">
      {items.slice(0, 3).map((d, i) => {
        const l = LAYOUT[i];
        const card = (
          <div
            className={cn("animate-float rounded-2xl bg-white p-2.5 pb-3 shadow-2xl shadow-black/40 transition hover:scale-[1.03]")}
            style={{ ["--r" as string]: l.rotate, animationDelay: l.delay }}
          >
            <div className={cn("relative overflow-hidden rounded-xl", l.aspect)}>
              <Image src={d.cover.src} alt={d.cover.alt} fill sizes="260px" className="object-cover" />
            </div>
            <p className="mt-2.5 px-1 font-display text-base font-semibold text-ink">{d.name}</p>
            <p className="px-1 text-xs text-muted">{d.tripTypes.map((x) => t.labels.tripType[x]).join(" · ")} · {t.labels.division[d.division]}</p>
          </div>
        );
        return (
          <div key={d.slug} className={cn("animate-fade-up absolute", l.box)} style={{ animationDelay: `${0.35 + i * 0.15}s` }}>
            {d.hasFullGuide ? <Link href={`/destinations/${d.slug}`}>{card}</Link> : card}
          </div>
        );
      })}

      {/* Floating info chip */}
      <div className="animate-fade-up absolute top-4 -left-6 z-10" style={{ animationDelay: "0.9s" }}>
        <div className="animate-float flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur" style={{ ["--r" as string]: "0deg", animationDelay: "-1s" }}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-xl">🧭</span>
          <span className="text-left">
            <span className="block text-xs font-medium text-muted">{t.home.collageChipTop}</span>
            <span className="block text-sm font-bold text-ink">{t.home.collageChipBottom}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
