/** Section 4 — accommodation grouped by tier. */
import type { Accommodation, Destination } from "@/types/destination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Price } from "./Price";
import { cn } from "@/lib/format";
import { getT } from "@/i18n/server";

const TIERS: { tier: Accommodation["tier"]; icon: string; accent: string }[] = [
  { tier: "Budget", icon: "🎒", accent: "border-t-sky-500" },
  { tier: "Mid-range", icon: "🛏️", accent: "border-t-brand-500" },
  { tier: "Luxury", icon: "✨", accent: "border-t-amber-400" },
];

export async function StaySection({ d }: { d: Destination }) {
  const t = await getT();
  return (
    <section>
      <SectionHeading id="stay" number={4} eyebrow={t.guide.stay.eyebrow} title={t.guide.stay.title} intro={t.guide.stay.intro} />
      <div className="grid gap-6 lg:grid-cols-3">
        {TIERS.map(({ tier, icon, accent }) => {
          const list = d.stay.filter((s) => s.tier === tier);
          if (!list.length) return null;
          return (
            <div key={tier}>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted"><span aria-hidden>{icon}</span>{t.labels.tier[tier]}</h3>
              <div className="space-y-4">
                {list.map((s) => (
                  <article key={s.name} className={cn("rounded-2xl border-t-4 bg-white p-5 ring-1 ring-jute", accent)}>
                    <h4 className="font-semibold text-ink">{s.name}</h4>
                    <p className="mt-0.5 text-xs text-muted">📍 {s.area}</p>
                    <p className="mt-3 text-sm"><Price range={s.pricePerNight} /> <span className="text-xs text-muted">{t.common.perNight}</span></p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.why}</p>
                    {s.bookingTip && <p className="mt-3 text-xs text-brand-700">💡 {s.bookingTip}</p>}
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
