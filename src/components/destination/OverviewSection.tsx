/** Section 1 — intro, highlights and month-by-month season cards. */
import Image from "next/image";
import type { Destination, Season } from "@/types/destination";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { getT } from "@/i18n/server";

const VERDICT: Record<Season["verdict"], string> = {
  Best: "bg-emerald-600 text-white",
  Good: "bg-amber-400 text-amber-950",
  Avoid: "bg-rose-100 text-rose-700",
};

export async function OverviewSection({ d }: { d: Destination }) {
  const t = await getT();
  const o = d.overview;
  return (
    <section>
      <SectionHeading id="overview" number={1} eyebrow={t.guide.overview.eyebrow} title={fmt(t.guide.overview.title, { name: d.name })} />
      {/* Intro text beside the gallery photo(s); the cover is already in the hero */}
      <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
        <p className="text-lg leading-relaxed text-ink/85">{o.intro}</p>
        {d.gallery && d.gallery.length > 0 && (
          <div className="space-y-4">
            {d.gallery.map((p) => (
              <figure key={p.src} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-jute">
                <div className="relative aspect-[16/10]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="px-4 py-3 text-muted">
                  <PhotoCredit photo={p} />
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {o.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm ring-1 ring-jute">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.65rem] text-brand-700">✓</span>
            {h}
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-display text-xl font-semibold">{t.guide.overview.weather}</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {o.seasons.map((s) => (
          <div key={s.name} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-jute">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-ink">{s.months}</span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", VERDICT[s.verdict])}>{t.labels.verdict[s.verdict]}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-muted">{s.name}</p>
            <p className="mt-3 font-display text-2xl font-semibold text-brand-700">{s.tempC}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.weather}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
