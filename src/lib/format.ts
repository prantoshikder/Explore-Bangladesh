/**
 * Formatting helpers shared across the app.
 * All prices are stored in BDT; USD is derived using BDT_PER_USD.
 */
import { BDT_PER_USD } from "@/data/essentials";
import type { PriceRangeBDT } from "@/types/destination";

const bdtFmt = new Intl.NumberFormat("en-IN"); // 1,00,000 style is familiar locally
const usdFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** 1500 → "৳1,500" */
export function bdt(amount: number): string {
  return `৳${bdtFmt.format(Math.round(amount))}`;
}

/** 1500 → "$12" */
export function usd(amountBDT: number): string {
  return `$${usdFmt.format(Math.max(1, Math.round(amountBDT / BDT_PER_USD)))}`;
}

/** {min:200,max:350} → "৳200–350" ; equal values collapse ; 0 → "Free" */
export function bdtRange(r: PriceRangeBDT): string {
  if (r.max === 0) return "Free";
  if (r.min === r.max) return bdt(r.min);
  return `৳${bdtFmt.format(r.min)}–${bdtFmt.format(r.max)}`;
}

/** {min:200,max:350} → "$2–3" */
export function usdRange(r: PriceRangeBDT): string {
  if (r.max === 0) return "";
  const lo = Math.max(1, Math.round(r.min / BDT_PER_USD));
  const hi = Math.max(1, Math.round(r.max / BDT_PER_USD));
  return lo === hi ? `$${lo}` : `$${lo}–${hi}`;
}

/** "2026-10-01" → "Oct 2026" (deterministic, server-safe). Pass dictionary month names for other languages. */
export function monthYear(iso: string, months: readonly string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]): string {
  const [y, m] = iso.split("-").map(Number);
  return `${months[(m ?? 1) - 1]} ${y}`;
}

/** Tiny className joiner (avoids pulling in clsx for one function). */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
