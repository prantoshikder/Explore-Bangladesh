/**
 * Builds FAQs for a destination straight from its (already localized) data
 * and the dictionary's FAQ templates — no extra writing needed for new spots
 * or languages. Rendered on the page AND emitted as FAQPage structured data.
 */
import type { Destination } from "@/types/destination";
import type { Dictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/config";
import { bdt, bdtRange, usd } from "./format";

export interface Faq {
  q: string;
  a: string;
}

export function buildFaqs(d: Destination, t: Dictionary): Faq[] {
  const f = t.faq;
  const faqs: Faq[] = [];
  const best = d.overview.seasons.filter((s) => s.verdict === "Best");
  const avoid = d.overview.seasons.filter((s) => s.verdict === "Avoid");

  faqs.push({
    q: fmt(f.bestTimeQ, { name: d.name }),
    a: [
      fmt(f.bestTimeA, { name: d.name, summary: d.overview.bestTimeSummary }),
      ...best.map((s) => `${s.months}: ${s.weather}`),
      avoid.length ? fmt(f.avoid, { list: avoid.map((s) => `${s.months} (${s.name})`).join(", ") }) : "",
    ].filter(Boolean).join(" "),
  });

  const rec = d.howToReach.routes.find((r) => r.recommended) ?? d.howToReach.routes[0];
  faqs.push({
    q: fmt(f.reachQ, { name: d.name }),
    a: `${d.howToReach.summary} ${fmt(f.reachA, { route: rec.label.replace(/\s*\(.*\)/, ""), time: rec.totalTime, cost: bdtRange(rec.totalCost) })}`,
  });

  const tiers = d.budget.tiers.map((tier) => {
    const perDay = Object.values(tier.perPersonPerDay).reduce((a, b) => a + b, 0);
    return fmt(f.costTier, { label: tier.label, bdt: bdt(perDay), usd: usd(perDay) });
  });
  faqs.push({
    q: fmt(f.costQ, { name: d.name }),
    a: `${tiers.join("; ")}. ${fmt(f.costReturn, { from: bdt(d.budget.tiers[0].roundTripFromDhaka), to: bdt(d.budget.tiers[d.budget.tiers.length - 1].roundTripFromDhaka) })} ${d.budget.disclaimer}`,
  });

  const permits = d.rules.find((r) => r.category === "Permits");
  if (permits) faqs.push({ q: fmt(f.permitQ, { name: d.name }), a: permits.items.slice(0, 2).join(" ") });

  faqs.push({
    q: fmt(f.daysQ, { name: d.name }),
    a: fmt(f.daysA, { duration: d.idealDuration, plan: d.itinerary.map((day) => fmt(f.dayItem, { n: day.day, title: day.title })).join("; ") }),
  });

  const mid = d.stay.filter((s) => s.tier === "Mid-range").map((s) => s.name);
  const budget = d.stay.filter((s) => s.tier === "Budget").map((s) => s.name);
  if (mid.length || budget.length) {
    faqs.push({ q: fmt(f.stayQ, { name: d.name }), a: fmt(f.stayA, { budget: budget.join(` ${f.or} `), mid: mid.join(` ${f.or} `) }) });
  }

  const safety = d.rules.find((r) => r.category === "Safety");
  if (safety) faqs.push({ q: fmt(f.safeQ, { name: d.name }), a: fmt(f.safeA, { tips: safety.items.slice(0, 2).join(" ") }) });
  return faqs;
}
