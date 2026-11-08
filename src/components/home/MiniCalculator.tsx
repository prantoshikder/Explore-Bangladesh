"use client";

/**
 * Homepage mini trip-cost calculator: days, travellers and travel style for
 * one destination, with a live itemised total. Uses the same maths as the full
 * calculator (estimateTripCost), so numbers always match /tools/cost-calculator.
 */
import Link from "next/link";
import { useState } from "react";
import type { BudgetTier } from "@/types/destination";
import { estimateTripCost } from "@/components/tools/cost";
import { bdt, cn, usd } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { useT } from "@/i18n/client";

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const t = useT();
  const btn = "grid h-9 w-9 place-items-center rounded-full bg-white/15 text-lg font-bold text-white transition hover:bg-white/25 disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
      <span className="text-sm font-semibold text-white/85">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={fmt(t.mini.fewer, { what: label.toLowerCase() })}>−</button>
        <span className="w-6 text-center font-display text-2xl font-semibold text-white" aria-live="polite">{value}</span>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={fmt(t.mini.more, { what: label.toLowerCase() })}>+</button>
      </div>
    </div>
  );
}

export function MiniCalculator({ destination, tiers }: { destination: string; tiers: BudgetTier[] }) {
  const t = useT();
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const [tierId, setTierId] = useState<string>(tiers.find((t) => t.id === "midRange")?.id ?? tiers[0].id);
  const tier = tiers.find((t) => t.id === tierId) ?? tiers[0];
  const cost = estimateTripCost({ days, people, tier });

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">{fmt(t.mini.tryIt, { name: destination })}</p>
        <Stepper label={t.mini.days} value={days} min={1} max={14} onChange={setDays} />
        <Stepper label={t.mini.travellers} value={people} min={1} max={10} onChange={setPeople} />
        <div role="radiogroup" aria-label={t.mini.style} className="grid grid-cols-3 gap-1 rounded-2xl bg-white/10 p-1 ring-1 ring-white/15">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              role="radio"
              aria-checked={tier.id === tierId}
              onClick={() => setTierId(tier.id)}
              title={tier.label}
              className={cn("whitespace-nowrap rounded-xl px-2 py-2 text-xs font-semibold transition", tier.id === tierId ? "bg-white text-brand-700 shadow" : "text-white/80 hover:bg-white/10")}
            >
              {t.labels.tierShort[tier.id]}
            </button>
          ))}
        </div>
      </div>

      {/* Receipt */}
      <div className="flex flex-col rounded-3xl bg-white p-5 text-ink shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t.mini.total}</p>
        <p className="mt-1 font-display text-4xl font-semibold text-brand-700" aria-live="polite">{bdt(cost.total)}</p>
        <p className="text-sm text-muted">{fmt(t.common.approxUsd, { usd: usd(cost.total) })} · {fmt(t.mini.perPerson, { amount: bdt(cost.perPerson) })}</p>
        <ul className="mt-4 space-y-1.5 border-t border-dashed border-jute pt-3 text-sm">
          {cost.lines.slice(0, 4).map((l) => (
            <li key={l.key} className="flex justify-between gap-3">
              <span className="text-muted">{t.calc.lines[l.key]}</span>
              <span className="font-semibold">{bdt(l.amount)}</span>
            </li>
          ))}
        </ul>
        <Link href="/tools/cost-calculator" className="mt-auto pt-5 text-sm font-semibold text-brand-600 hover:underline">
          {t.mini.full} →
        </Link>
      </div>
    </div>
  );
}
