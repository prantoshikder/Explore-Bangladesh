/**
 * Shared filter options + matching logic for the hero search and the
 * /destinations explorer. Keeping it in one place means the URL params
 * (?division=&budget=&type=&q=) always mean the same thing.
 */
import type { BudgetLevel, DestinationSummary, Division, TripType } from "@/types/destination";
import type { SelectOption } from "@/components/ui/Select";
import type { Dictionary } from "@/i18n/dictionaries";

export const DIVISIONS: Division[] = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal", "Rangpur", "Mymensingh"];
export const TRIP_TYPES: TripType[] = ["Beach", "Hills", "Forest", "Heritage", "Island", "Tea Gardens", "River", "City"];
export const BUDGETS: { value: BudgetLevel; label: string }[] = [
  { value: "Shoestring", label: "Shoestring (< $25/day)" },
  { value: "Moderate", label: "Moderate ($25–60/day)" },
  { value: "Comfortable", label: "Comfortable ($60+/day)" },
];

export interface Filters {
  q: string;
  division: string;
  budget: string;
  type: string;
}

export function matches(d: DestinationSummary, f: Filters): boolean {
  const q = f.q.trim().toLowerCase();
  if (q && !`${d.name} ${d.localName} ${d.tagline} ${d.division}`.toLowerCase().includes(q)) return false;
  if (f.division && d.division !== f.division) return false;
  if (f.budget && d.budgetLevel !== f.budget) return false;
  if (f.type && !d.tripTypes.includes(f.type as TripType)) return false;
  return true;
}

export function toQueryString(f: Filters): string {
  const p = new URLSearchParams();
  (Object.keys(f) as (keyof Filters)[]).forEach((k) => f[k] && p.set(k, f[k]));
  const s = p.toString();
  return s ? `?${s}` : "";
}

/* ---- Options for the custom <Select> dropdowns (labels, icons, hints) ----
 * Use the *Options(t) functions so labels follow the page language.
 * The English-only constants below are kept for older importers. */

const BUDGET_ICONS: Record<BudgetLevel, string> = { Shoestring: "🎒", Moderate: "🧳", Comfortable: "✨" };

export function divisionOptions(t: Dictionary): SelectOption[] {
  return [
    { value: "", label: t.filters.anyDivision, description: t.filters.allOfBangladesh },
    ...DIVISIONS.map((d) => ({ value: d, label: t.labels.division[d] })),
  ];
}

export function budgetOptions(t: Dictionary): SelectOption[] {
  return [
    { value: "", label: t.filters.anyBudget, icon: "💳", description: t.filters.everyPrice },
    ...BUDGETS.map(({ value }) => ({ value, label: t.labels.budgetLevel[value], icon: BUDGET_ICONS[value], description: t.filters.budgetHint[value] })),
  ];
}

export function typeOptions(t: Dictionary): SelectOption[] {
  return [
    { value: "", label: t.filters.anyTripType, icon: "🧭" },
    ...TRIP_TYPES.map((tt) => ({ value: tt, label: t.labels.tripType[tt], icon: TRIP_ICONS[tt] })),
  ];
}

export const DIVISION_OPTIONS: SelectOption[] = [
  { value: "", label: "Any division", description: "All of Bangladesh" },
  ...DIVISIONS.map((d) => ({ value: d, label: d })),
];

export const BUDGET_OPTIONS: SelectOption[] = [
  { value: "", label: "Any budget", icon: "💳", description: "Show every price range" },
  { value: "Shoestring", label: "Shoestring", icon: "🎒", description: "Under $25 per day" },
  { value: "Moderate", label: "Moderate", icon: "🧳", description: "$25–60 per day" },
  { value: "Comfortable", label: "Comfortable", icon: "✨", description: "$60+ per day" },
];

const TRIP_ICONS: Record<TripType, string> = {
  Beach: "🏖️", Hills: "⛰️", Forest: "🌳", Heritage: "🏛️", Island: "🏝️", "Tea Gardens": "🍃", River: "🛶", City: "🏙️",
};

export const TYPE_OPTIONS: SelectOption[] = [
  { value: "", label: "Any trip type", icon: "🧭" },
  ...TRIP_TYPES.map((t) => ({ value: t, label: t, icon: TRIP_ICONS[t] })),
];
