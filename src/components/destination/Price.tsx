/** Renders a BDT range with a muted USD equivalent: "৳200–350 ≈ $2–3". */
import type { PriceRangeBDT } from "@/types/destination";
import { bdtRange, usdRange } from "@/lib/format";

export function Price({ range, className = "" }: { range: PriceRangeBDT; className?: string }) {
  const u = usdRange(range);
  return (
    <span className={className}>
      <span className="font-semibold text-ink">{bdtRange(range)}</span>
      {u && <span className="ml-1 text-muted">≈ {u}</span>}
    </span>
  );
}
