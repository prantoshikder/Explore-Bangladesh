"use client";

/**
 * Cost Calculator widget.
 * Inputs: destination, travel style, days, people → itemised estimate in BDT + USD.
 * Pass `destinations` with one item to lock it (used inside a destination page).
 */
import { useMemo, useState } from "react";
import type { Destination } from "@/types/destination";
import { estimateTripCost, type CostLineKey } from "./cost";
import { Select } from "@/components/ui/Select";
import { bdt, cn, usd } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { useT } from "@/i18n/client";

/** Only the fields the calculator needs — keeps the client bundle small. */
export type CalculatorDestination = Pick<Destination, "slug" | "name" | "idealDuration"> & {
  /** Optional emoji shown in the destination dropdown. */
  icon?: string;
  tiers: Destination["budget"]["tiers"];
};

function Stepper({ label, value, onChange, min, max, unit }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; unit: string }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const t = useT();
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      <div className="mt-2 flex items-center rounded-xl bg-sand ring-1 ring-jute">
        <button type="button" aria-label={fmt(t.calc.decrease, { label })} onClick={() => onChange(clamp(value - 1))} className="h-11 w-11 text-lg font-bold text-ink/70 hover:text-brand-600">−</button>
        <input
          type="number"
          inputMode="numeric"
          aria-label={label}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          className="w-full bg-transparent text-center text-lg font-bold text-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="pr-1 text-xs text-muted">{unit}</span>
        <button type="button" aria-label={fmt(t.calc.increase, { label })} onClick={() => onChange(clamp(value + 1))} className="h-11 w-11 text-lg font-bold text-ink/70 hover:text-brand-600">+</button>
      </div>
    </div>
  );
}

export function CostCalculator({ destinations, compact = false }: { destinations: CalculatorDestination[]; compact?: boolean }) {
  const [slug, setSlug] = useState(destinations[0].slug);
  const [tierId, setTierId] = useState<string>("budget");
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const t = useT();

  const dest = destinations.find((d) => d.slug === slug) ?? destinations[0];
  const tier = dest.tiers.find((x) => x.id === tierId) ?? dest.tiers[0];
  const result = useMemo(() => estimateTripCost({ days, people, tier }), [days, people, tier]);
  const lineDetail = (key: CostLineKey) =>
    key === "travel"
      ? tier.roundTripMode
      : key === "stay"
        ? fmt(t.calc.rooms, { rooms: result.rooms, nights: result.nights })
        : fmt(t.calc.perDays, { people: result.people, days: result.days });

  return (
    <div className={cn("overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-jute", !compact && "lg:grid lg:grid-cols-[1fr_1.1fr]")}>
      {/* Inputs */}
      <div className="space-y-6 p-6 sm:p-8">
        {destinations.length > 1 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.calc.destination}</span>
            <Select
              ariaLabel={t.calc.destination}
              value={slug}
              onChange={setSlug}
              className="mt-2"
              options={destinations.map((d) => ({ value: d.slug, label: d.name, icon: d.icon, description: fmt(t.calc.recommended, { duration: d.idealDuration }) }))}
            />
            <span className="mt-1.5 block text-xs text-muted">{fmt(t.calc.recommended, { duration: dest.idealDuration })}</span>
          </div>
        )}

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.calc.style}</span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {dest.tiers.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={x.id === tier.id}
                onClick={() => setTierId(x.id)}
                className={cn(
                  "rounded-xl px-2 py-3 text-xs font-semibold transition sm:text-sm",
                  x.id === tier.id ? "bg-brand-600 text-white shadow" : "bg-sand text-ink/75 ring-1 ring-jute hover:bg-jute",
                )}
              >
                {x.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">{tier.notes}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stepper label={t.calc.days} value={days} onChange={setDays} min={1} max={30} unit={t.common.days} />
          <Stepper label={t.calc.travellers} value={people} onChange={setPeople} min={1} max={20} unit={t.common.people} />
        </div>
      </div>

      {/* Result */}
      <div className="bg-brand-900 p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">{t.calc.estimatedTotal}</p>
        <p className="mt-2 font-display text-5xl font-semibold" aria-live="polite">{bdt(result.total)}</p>
        <p className="mt-1 text-brand-200">{fmt(t.common.approxUsd, { usd: usd(result.total) })} · {fmt(t.calc.perPerson, { bdt: bdt(result.perPerson), usd: usd(result.perPerson) })}</p>

        <ul className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
          {result.lines.map((l) => (
            <li key={l.key} className="flex items-start justify-between gap-4">
              <span>
                {t.calc.lines[l.key]}
                <span className="block text-xs text-brand-200/70">{lineDetail(l.key)}</span>
              </span>
              <span className="font-semibold whitespace-nowrap">{bdt(l.amount)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-brand-200/70">
          {t.calc.assumption}
        </p>
      </div>
    </div>
  );
}
