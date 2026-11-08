/**
 * ============================================================================
 *  Tourist Spot (attraction) types — powers /explore and /spots/[slug]
 * ============================================================================
 *  A "spot" is one place to visit (a beach, waterfall, fort…), smaller than a
 *  full Destination guide. Spots are grouped by DISTRICT so travellers can
 *  type a district name and see everything worth visiting there.
 *
 *  Data lives in src/data/spots/*.ts (one file per group of districts).
 *  Photos are looked up by slug in src/data/spots/photos.ts.
 * ============================================================================
 */
import type { Difficulty, Division, TransportMode } from "./destination";

export type SpotCategory =
  | "Beach"
  | "Island"
  | "Hills"
  | "Waterfall"
  | "Lake"
  | "Forest"
  | "River"
  | "Wetland"
  | "Tea Garden"
  | "Heritage"
  | "Religious"
  | "Wildlife"
  | "City";

export interface SpotReachStep {
  /** e.g. "From Sylhet city" */
  title: string;
  /** Plain-English directions with time and approximate cost. */
  detail: string;
  /** Links the step to the Transport Guide glossary. */
  mode?: TransportMode;
}

export interface Spot {
  /** URL id, kebab-case, unique across all spots. */
  slug: string;
  name: string;
  /** Bangla name — useful to show drivers. */
  localName: string;
  /** Canonical district name — must match a `name` in src/data/districts.ts. */
  district: string;
  /** Sub-district (upazila/thana), optional. */
  upazila?: string;
  division: Division;
  categories: SpotCategory[];
  difficulty: Difficulty;
  /** One line for cards (max ~110 chars). */
  summary: string;
  /** 2–3 short paragraphs. */
  description: string[];
  /** 3–5 things to see or do. */
  highlights: string[];
  /** 2–4 steps, starting from the nearest district town / transport hub. */
  howToReach: SpotReachStep[];
  bestTime: string;
  timeNeeded: string;
  /** Human text, e.g. "Free" or "≈ ৳30 locals · ৳500 foreigners (approx.)" */
  entryFee: string;
  openingHours: string;
  /** 2–4 practical tips (safety, dress code, what to bring). */
  tips: string[];
  map: { lat: number; lng: number };
  /** Slug of a full Destination guide covering this area, if one exists. */
  guideSlug?: string;
}
