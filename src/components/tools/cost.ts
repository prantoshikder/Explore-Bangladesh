/**
 * Pure trip-cost maths (no React, no text) so it can be reused by the
 * calculator widgets in any language. Lines carry a `key`; the UI turns
 * keys + numbers into words using the dictionary (calc.lines / calc.rooms…).
 */
import type { BudgetTier } from "@/types/destination";

export interface CostInput {
  days: number;
  people: number;
  tier: BudgetTier;
}

export type CostLineKey = "travel" | "stay" | "food" | "local" | "entry";

export interface CostLine {
  key: CostLineKey;
  amount: number;
}

export interface CostResult {
  days: number;
  people: number;
  nights: number;
  rooms: number;
  lines: CostLine[];
  total: number;
  perPerson: number;
}

export function estimateTripCost({ days, people, tier }: CostInput): CostResult {
  const d = Math.max(1, Math.floor(days));
  const p = Math.max(1, Math.floor(people));
  const nights = Math.max(d - 1, 0); // assumes you arrive day 1 and leave the last day
  const rooms = Math.ceil(p / 2); // `stay` in the data is per person, twin sharing
  const roomRate = tier.perPersonPerDay.stay * 2;
  const c = tier.perPersonPerDay;

  const lines: CostLine[] = [
    { key: "travel", amount: tier.roundTripFromDhaka * p },
    { key: "stay", amount: roomRate * rooms * nights },
    { key: "food", amount: c.food * p * d },
    { key: "local", amount: c.localTransport * p * d },
    { key: "entry", amount: c.entryFees * p * d },
  ];
  const total = lines.reduce((s, l) => s + l.amount, 0);
  return { days: d, people: p, nights, rooms, lines, total, perPerson: Math.round(total / p) };
}
