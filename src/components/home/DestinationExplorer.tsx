"use client";

/**
 * Filterable grid for /destinations. Reads/writes filters to the URL
 * (?q=&division=&budget=&type=) so the hero search can deep-link into it.
 */
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DestinationSummary } from "@/types/destination";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { budgetOptions, divisionOptions, typeOptions, matches, toQueryString, type Filters } from "./filters";
import { Select } from "@/components/ui/Select";
import { fmt } from "@/i18n/config";
import { useT } from "@/i18n/client";

const inputCls = "rounded-xl bg-white px-3.5 py-3 text-sm font-medium ring-1 ring-jute placeholder:text-muted focus:ring-2 focus:ring-brand-500 focus:outline-none";

export function DestinationExplorer({ items }: { items: DestinationSummary[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();

  const f: Filters = {
    q: params.get("q") ?? "",
    division: params.get("division") ?? "",
    budget: params.get("budget") ?? "",
    type: params.get("type") ?? "",
  };
  const update = (patch: Partial<Filters>) =>
    router.replace(`${pathname}${toQueryString({ ...f, ...patch })}`, { scroll: false });

  const results = items.filter((d) => matches(d, f));
  const active = Object.values(f).some(Boolean);

  return (
    <div>
      <div className="flex flex-wrap gap-3 rounded-2xl bg-jute/50 p-3">
        <input
          value={f.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder={t.destinationsPage.searchByName}
          aria-label={t.destinationsPage.searchByName.replace(/…$/, "")}
          className={`${inputCls} min-w-48 flex-1`}
        />
        <Select ariaLabel={t.filters.division} icon="📍" variant="white" value={f.division} onChange={(v) => update({ division: v })} options={divisionOptions(t)} className="w-full sm:w-52" />
        <Select ariaLabel={t.filters.budget} variant="white" value={f.budget} onChange={(v) => update({ budget: v })} options={budgetOptions(t)} className="w-full sm:w-52" />
        <Select ariaLabel={t.filters.tripType} variant="white" value={f.type} onChange={(v) => update({ type: v })} options={typeOptions(t)} className="w-full sm:w-52" />
        {active && (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="rounded-xl px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-white">
            {t.destinationsPage.clear}
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">{fmt(t.destinationsPage.found, { count: results.length })}</p>

      {results.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-white p-12 text-center ring-1 ring-jute">
          <p className="text-4xl">🧭</p>
          <p className="mt-3 font-semibold">{t.destinationsPage.noMatches}</p>
          <p className="mt-1 text-sm text-muted">{t.destinationsPage.noMatchesText}</p>
        </div>
      )}
    </div>
  );
}
