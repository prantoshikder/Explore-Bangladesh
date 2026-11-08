/** Section 3 — per-day tier cards with stacked breakdown bar, entry fees, and the calculator. */
import type { Destination, DailyCostBreakdown } from "@/types/destination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CostCalculator } from "@/components/tools/CostCalculator";
import { bdt, cn, usd } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { getT } from "@/i18n/server";

const PARTS: { key: keyof DailyCostBreakdown; color: string }[] = [
  { key: "stay", color: "bg-brand-600" },
  { key: "food", color: "bg-amber-400" },
  { key: "localTransport", color: "bg-sky-500" },
  { key: "entryFees", color: "bg-rose-400" },
];

export async function BudgetSection({ d }: { d: Destination }) {
  const tr = await getT();
  return (
    <section>
      <SectionHeading id="budget" number={3} eyebrow={tr.guide.budget.eyebrow} title={tr.guide.budget.title} intro={d.budget.disclaimer} />

      <div className="grid gap-5 md:grid-cols-3">
        {d.budget.tiers.map((t) => {
          const total = Object.values(t.perPersonPerDay).reduce((a, b) => a + b, 0);
          return (
            <article key={t.id} className={cn("flex flex-col rounded-3xl bg-white p-6 ring-1 ring-jute", t.id === "midRange" && "ring-2 ring-brand-500")}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ink">{t.label}</h3>
                {t.id === "midRange" && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700">{tr.guide.budget.popular}</span>}
              </div>
              <p className="mt-4 font-display text-4xl font-semibold text-ink">{bdt(total)}</p>
              <p className="text-sm text-muted">{fmt(tr.guide.budget.perPersonDay, { usd: usd(total) })}</p>

              {/* Stacked bar visualises where the money goes */}
              <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-jute" aria-hidden>
                {PARTS.map((p) => (
                  <span key={p.key} className={p.color} style={{ width: `${(t.perPersonPerDay[p.key] / total) * 100}%` }} />
                ))}
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                {PARTS.map((p) => (
                  <div key={p.key} className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted"><span className={cn("h-2.5 w-2.5 rounded-full", p.color)} />{tr.guide.budget.parts[p.key]}</dt>
                    <dd className="font-semibold">{bdt(t.perPersonPerDay[p.key])}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-xl bg-sand p-3 text-xs leading-relaxed">
                <strong>{tr.guide.budget.returnFromDhaka}</strong> {bdt(t.roundTripFromDhaka)} ({usd(t.roundTripFromDhaka)})
                <span className="block text-muted">{t.roundTripMode}</span>
              </div>
              <p className="mt-auto pt-4 text-xs text-muted">{t.notes}</p>
            </article>
          );
        })}
      </div>

      {/* Entry fees */}
      <h3 className="mt-12 font-display text-xl font-semibold">{tr.guide.budget.entryFees}</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-jute">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-sand text-left text-xs uppercase tracking-wider text-muted">
            <tr><th className="px-5 py-3">{tr.guide.budget.table.place}</th><th className="px-5 py-3">{tr.guide.budget.table.locals}</th><th className="px-5 py-3">{tr.guide.budget.table.foreigners}</th><th className="px-5 py-3">{tr.guide.budget.table.note}</th></tr>
          </thead>
          <tbody className="divide-y divide-jute">
            {d.budget.entryFees.map((e) => (
              <tr key={e.place}>
                <td className="px-5 py-3 font-medium">{e.place}</td>
                <td className="px-5 py-3">{e.local ? bdt(e.local) : tr.common.free}</td>
                <td className="px-5 py-3">{e.foreigner ? `${bdt(e.foreigner)} (${usd(e.foreigner)})` : tr.common.free}</td>
                <td className="px-5 py-3 text-xs text-muted">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calculator pre-loaded with this destination */}
      <h3 className="mt-12 font-display text-xl font-semibold">{tr.guide.budget.calculate}</h3>
      <div className="mt-4">
        <CostCalculator destinations={[{ slug: d.slug, name: d.name, idealDuration: d.idealDuration, tiers: d.budget.tiers }]} />
      </div>
    </section>
  );
}
