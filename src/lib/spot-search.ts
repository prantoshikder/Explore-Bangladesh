/**
 * ============================================================================
 *  Spot search — pure functions, runs in the browser for instant results.
 * ============================================================================
 *  Understands:
 *   - District names in English or Bangla ("Sylhet", "সিলেট")
 *   - Old spellings & aliases ("Chittagong", "Bogra", "Coxs bazar")
 *   - Division names ("Chattogram" → every district in that division)
 *   - Spot names, Bangla names, upazilas ("Jaflong", "জাফলং", "Sreemangal")
 *   - Categories ("waterfall", "beach", "temple")
 *   - Small typos (one or two wrong letters in longer words)
 *   - On Bangla pages spot names are Bangla, so callers pass the English
 *     names too (`altNames`, by slug) and "jaflong" still finds জাফলং.
 * ============================================================================
 */
import type { Division } from "@/types/destination";
import type { District } from "@/data/districts";
import type { SpotCard } from "@/data/spots";

/** Lowercase, strip accents/apostrophes/punctuation; keeps Bangla letters. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’`.]/g, "")
    .replace(/[^a-z0-9ঀ-৿]+/g, " ")
    .trim();
}

/** Levenshtein distance with an early exit once it exceeds `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** Does query `q` match `key`? Exact, prefix (3+ letters), or a small typo. */
function keyMatches(q: string, key: string): boolean {
  if (!q || !key) return false;
  if (key === q) return true;
  if (q.length >= 3 && key.startsWith(q)) return true;
  const allowed = q.length >= 8 ? 2 : q.length >= 5 ? 1 : 0;
  return allowed > 0 && distance(q, key, allowed) <= allowed;
}

/** Match against a phrase, its whole form and each of its words. */
function phraseMatches(q: string, phrase: string): boolean {
  const p = normalize(phrase);
  if (!p) return false;
  if (p.includes(q) && q.length >= 3) return true;
  if (keyMatches(q, p) || keyMatches(q, p.replace(/ /g, ""))) return true;
  return q.length >= 4 && p.split(" ").some((w) => keyMatches(q, w));
}

const DIVISION_ALIASES: Record<Division, string[]> = {
  Dhaka: ["dhaka division", "ঢাকা বিভাগ"],
  Chattogram: ["chattogram division", "chittagong division", "chittagong", "ctg", "চট্টগ্রাম বিভাগ"],
  Sylhet: ["sylhet division", "সিলেট বিভাগ"],
  Khulna: ["khulna division", "খুলনা বিভাগ"],
  Rajshahi: ["rajshahi division", "রাজশাহী বিভাগ"],
  Barishal: ["barishal division", "barisal", "বরিশাল বিভাগ"],
  Rangpur: ["rangpur division", "রংপুর বিভাগ"],
  Mymensingh: ["mymensingh division", "ময়মনসিংহ বিভাগ"],
};

/** Extra words people type for categories. */
const CATEGORY_WORDS: Record<string, string[]> = {
  Beach: ["beach", "sea", "সমুদ্র", "সৈকত"],
  Island: ["island", "দ্বীপ"],
  Hills: ["hill", "hills", "mountain", "পাহাড়"],
  Waterfall: ["waterfall", "falls", "jhorna", "jharna", "ঝর্ণা", "ঝরনা"],
  Lake: ["lake", "লেক", "হ্রদ"],
  Forest: ["forest", "jungle", "বন"],
  River: ["river", "নদী"],
  Wetland: ["wetland", "haor", "beel", "হাওর", "বিল"],
  "Tea Garden": ["tea", "চা বাগান"],
  Heritage: ["heritage", "history", "historic", "fort", "ruins", "museum", "palace", "ঐতিহাসিক"],
  Religious: ["mosque", "temple", "church", "shrine", "mazar", "dargah", "pagoda", "vihara", "মসজিদ", "মন্দির"],
  Wildlife: ["wildlife", "animals", "birds", "deer", "tiger"],
  City: ["city", "town", "শহর"],
};

export interface SearchResult {
  query: string;
  /** Districts the query named (may have zero spots). */
  districts: { district: District; spots: SpotCard[] }[];
  /** Division the query named, if any. */
  division: Division | null;
  /** Spots matched by name / upazila / category, excluding those already shown under a district. */
  spots: SpotCard[];
}

/** Extra searchable names per spot slug (e.g. the English name + upazila on Bangla pages). */
export type AltNames = Record<string, string[]>;

export function searchSpots(rawQuery: string, spots: SpotCard[], districts: District[], altNames: AltNames = {}): SearchResult {
  const q = normalize(rawQuery);
  const empty: SearchResult = { query: rawQuery, districts: [], division: null, spots: [] };
  if (!q) return empty;

  // 1) Division
  const division =
    (Object.keys(DIVISION_ALIASES) as Division[]).find((d) => {
      const keys = [d, ...DIVISION_ALIASES[d]].map(normalize);
      return keys.some((k) => k === q || (q.endsWith("division") && keyMatches(q, k)) || (q.includes("বিভাগ") && keyMatches(q, k)));
    }) ?? null;

  // 2) Districts (exact/alias/typo). Division names like "Chittagong" also hit the district — that's fine.
  const matchedDistricts = districts.filter((d) => [d.name, d.bn, ...(d.aliases ?? [])].some((k) => keyMatches(q, normalize(k))));
  const districtNames = new Set(matchedDistricts.map((d) => d.name));

  // 3) Spots by name / Bangla name / upazila / slug / category words
  // Once the query clearly named a district, only allow exact substring matches for spots,
  // so "Bogra" doesn't also pull in "Boga Lake" through typo tolerance.
  const strict = matchedDistricts.length > 0;
  const nameMatches = (p: string) => (strict ? q.length >= 3 && normalize(p).includes(q) : phraseMatches(q, p));
  const matchedSpots = spots.filter((s) => {
    if (districtNames.has(s.district)) return false; // already listed under its district
    if ([s.name, s.localName, s.upazila ?? "", s.slug.replace(/-/g, " "), ...(altNames[s.slug] ?? [])].some(nameMatches)) return true;
    if (strict) return false;
    return s.categories.some((c) => [c, ...(CATEGORY_WORDS[c] ?? [])].some((w) => keyMatches(q, normalize(w))));
  });

  const districtResults = matchedDistricts.map((d) => ({ district: d, spots: spots.filter((s) => s.district === d.name) }));
  // "Chittagong" names both a district and a division. If the district has no spots yet,
  // show the whole division instead of an empty "no places yet" box.
  const useDivision = division !== null && districtResults.every((r) => r.spots.length === 0);

  return {
    query: rawQuery,
    districts: useDivision ? [] : districtResults,
    division: useDivision ? division : null,
    spots: useDivision ? matchedSpots.filter((s) => s.division !== division) : matchedSpots,
  };
}

export type Suggestion =
  | { type: "district"; district: District; count: number }
  | { type: "spot"; spot: SpotCard };

/** Autocomplete suggestions: districts first (with spot counts), then spots. The UI words them in the page language. */
export function suggest(rawQuery: string, spots: SpotCard[], districts: District[], altNames: AltNames = {}, limit = 7): Suggestion[] {
  const q = normalize(rawQuery);
  if (!q) return [];
  const out: Suggestion[] = [];
  for (const d of districts) {
    if ([d.name, d.bn, ...(d.aliases ?? [])].some((k) => keyMatches(q, normalize(k)) || normalize(k).startsWith(q))) {
      out.push({ type: "district", district: d, count: spots.filter((s) => s.district === d.name).length });
    }
  }
  for (const s of spots) {
    if ([s.name, s.localName, s.upazila ?? "", ...(altNames[s.slug] ?? [])].some((p) => phraseMatches(q, p) || normalize(p).startsWith(q))) {
      out.push({ type: "spot", spot: s });
    }
  }
  return out.slice(0, limit);
}
