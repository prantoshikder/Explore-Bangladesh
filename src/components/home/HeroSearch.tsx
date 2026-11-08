"use client";

/**
 * Hero search box: free text + Division + Budget + Trip Type.
 * Submitting navigates to /destinations with the filters in the URL,
 * so results are shareable and the back button works.
 */
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TRIP_TYPES, budgetOptions, divisionOptions, toQueryString, type Filters } from "./filters";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/format";
import { useLocalizedPath, useT } from "@/i18n/client";

const selectCls =
  "w-full appearance-none rounded-xl border-0 bg-sand px-3.5 py-3 text-sm font-medium text-ink ring-1 ring-jute focus:ring-2 focus:ring-brand-500 focus:outline-none";

export function HeroSearch() {
  const router = useRouter();
  const t = useT();
  const lp = useLocalizedPath();
  const [f, setF] = useState<Filters>({ q: "", division: "", budget: "", type: "" });
  const set = (k: keyof Filters) => (v: string) => setF((prev) => ({ ...prev, [k]: v }));

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        // A typed place/district → spot search; otherwise filter the destination guides
        if (f.q.trim() && !f.division && !f.budget && !f.type) router.push(lp(`/explore?q=${encodeURIComponent(f.q.trim())}`));
        else router.push(lp(`/destinations${toQueryString(f)}`));
      }}
      className="w-full rounded-3xl bg-white p-3 shadow-2xl shadow-brand-900/20 ring-1 ring-black/5 sm:p-4"
    >
      <div className="grid gap-2.5 sm:grid-cols-[1fr_1fr_auto]">
        <label className="relative sm:col-span-3">
          <span className="sr-only">{t.home.searchAria}</span>
          <svg className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            value={f.q}
            onChange={(e) => set("q")(e.target.value)}
            placeholder={t.home.searchPlaceholder}
            className={cn(selectCls, "pl-10")}
          />
        </label>
        <Select ariaLabel={t.filters.division} icon="📍" value={f.division} onChange={set("division")} options={divisionOptions(t)} />
        <Select ariaLabel={t.filters.budget} value={f.budget} onChange={set("budget")} options={budgetOptions(t)} />
        <button type="submit" className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
          {t.home.search}
        </button>
      </div>

      {/* Trip type chips (single-select, click again to clear) */}
      <div className="mt-3 flex flex-wrap gap-2 px-1" role="group" aria-label={t.filters.tripType}>
        {TRIP_TYPES.map((tt) => {
          const active = f.type === tt;
          return (
            <button
              key={tt}
              type="button"
              aria-pressed={active}
              onClick={() => set("type")(active ? "" : tt)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                active ? "bg-brand-600 text-white" : "bg-sand text-ink/75 ring-1 ring-jute hover:bg-jute",
              )}
            >
              {t.labels.tripType[tt]}
            </button>
          );
        })}
      </div>
    </form>
  );
}
