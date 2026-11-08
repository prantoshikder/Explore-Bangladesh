/** Section 2 — routes (tabs), every transport option with classes, and last-mile. */
import type { Destination } from "@/types/destination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ModeChip } from "@/components/ui/ModeChip";
import { RouteTabs } from "./RouteTabs";
import { Price } from "./Price";
import { fmt } from "@/i18n/config";
import { getT } from "@/i18n/server";

export async function HowToReachSection({ d }: { d: Destination }) {
  const t = await getT();
  const h = d.howToReach;
  return (
    <section>
      <SectionHeading id="how-to-reach" number={2} eyebrow={t.guide.reach.eyebrow} title={fmt(t.guide.reach.title, { name: d.name })} intro={h.summary} />

      <RouteTabs routes={h.routes} />

      {/* Transport options & classes */}
      <h3 className="mt-14 font-display text-xl font-semibold">{t.guide.reach.allOptions}</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {h.transportOptions.map((o) => (
          <article key={o.name} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-jute">
            <ModeChip mode={o.mode} />
            <h4 className="mt-3 font-semibold text-ink">{o.name}</h4>
            <p className="mt-1 text-xs text-muted">{t.guide.reach.from} {o.departFrom} · ⏱ {o.duration}</p>
            <table className="mt-4 w-full text-sm">
              <tbody className="divide-y divide-jute">
                {o.classes.map((c) => (
                  <tr key={c.name}>
                    <td className="py-2 pr-3 align-top">
                      <span className="font-medium">{c.name}</span>
                      {c.note && <span className="block text-xs text-muted">{c.note}</span>}
                    </td>
                    <td className="py-2 text-right align-top whitespace-nowrap"><Price range={c.price} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-auto pt-4 text-xs leading-relaxed text-brand-700">🎟 {o.bookingTip}</p>
          </article>
        ))}
      </div>

      {/* Last mile */}
      <h3 className="mt-14 font-display text-xl font-semibold">{t.guide.reach.lastMile}</h3>
      <p className="mt-2 text-sm text-muted">{t.guide.reach.lastMileText}</p>
      <div className="mt-5 space-y-3">
        {h.lastMile.map((l) => (
          <div key={l.from + l.to} className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-jute md:grid-cols-[1.3fr_1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-ink">
                {l.from} <span className="mx-1 text-brand-600">→</span> {l.to}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{l.note}</p>
            </div>
            <ModeChip mode={l.mode} />
            <div className="text-sm md:text-right">
              <Price range={l.cost} />
              <p className="text-xs text-muted">⏱ {l.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
