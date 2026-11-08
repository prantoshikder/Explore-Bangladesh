/**
 * ============================================================================
 *  Spot registry — every tourist spot on the site, grouped by district.
 * ============================================================================
 *  Spot text lives in group-a.ts / group-b.ts / group-c.ts; photos in photos.ts.
 *  To add spots for a new district, create group-d.ts (copy any group file),
 *  add its photos to photos.ts and register the array in ALL_SPOTS below.
 * ============================================================================
 */
import type { Photo } from "@/types/destination";
import type { Spot, SpotCategory } from "@/types/spot";
import { DISTRICTS } from "@/data/districts";
import { SPOTS_A } from "./group-a";
import { SPOTS_B } from "./group-b";
import { SPOTS_C } from "./group-c";
import { SPOTS_D } from "./group-d";
import { SPOT_PHOTOS, spotPhoto } from "./photos";
import { SPOTS_A_BN } from "./bn/group-a";
import { SPOTS_B_BN } from "./bn/group-b";
import { SPOTS_C_BN } from "./bn/group-c";
import { SPOTS_D_BN } from "./bn/group-d";
import type { Locale } from "@/i18n/config";

/**
 * Which full destination guide covers each spot (adds the "Full travel guide"
 * link on spot pages and the "Places to see around …" row on guide pages).
 * A guideSlug written directly in a group file takes priority.
 */
const GUIDE_FOR_SPOT: Record<string, string> = {
  // Sylhet
  jaflong: "sylhet-jaflong-ratargul", ratargul: "sylhet-jaflong-ratargul", bisnakandi: "sylhet-jaflong-ratargul",
  lalakhal: "sylhet-jaflong-ratargul", "shah-jalal-dargah": "sylhet-jaflong-ratargul", "sada-pathor": "sylhet-jaflong-ratargul",
  // Sreemangal
  "sreemangal-tea-gardens": "sreemangal", lawachara: "sreemangal", "baikka-beel": "sreemangal", madhabkunda: "sreemangal",
  // Bandarban
  nilgiri: "bandarban", nilachal: "bandarban", "boga-lake": "bandarban", nafakhum: "bandarban", "golden-temple-bandarban": "bandarban", meghla: "bandarban",
  // Old Dhaka
  "lalbagh-fort": "old-dhaka", "ahsan-manzil": "old-dhaka", "star-mosque": "old-dhaka", sadarghat: "old-dhaka", "dhakeshwari-temple": "old-dhaka", "armenian-church": "old-dhaka",
  // Coast & forest
  "saint-martins-island": "saint-martins-island", sundarbans: "sundarbans", karamjal: "sundarbans",
  // North-west heritage
  paharpur: "paharpur", "kusumba-mosque": "paharpur", mahasthangarh: "paharpur",
};

const ALL_SPOTS: Spot[] = [...SPOTS_A, ...SPOTS_B, ...SPOTS_C, ...SPOTS_D].map((s) => ({
  ...s,
  guideSlug: s.guideSlug ?? GUIDE_FOR_SPOT[s.slug],
}));

/** Bangla spots: translated text, same slugs/numbers (checked by scripts/check-translation.mjs). */
const ALL_SPOTS_BN: Spot[] = [...SPOTS_A_BN, ...SPOTS_B_BN, ...SPOTS_C_BN, ...SPOTS_D_BN].map((s) => ({
  ...s,
  guideSlug: s.guideSlug ?? GUIDE_FOR_SPOT[s.slug],
}));
if (ALL_SPOTS_BN.length !== ALL_SPOTS.length) throw new Error(`Bangla spots: ${ALL_SPOTS_BN.length}, English spots: ${ALL_SPOTS.length}`);

function spots(locale: Locale): Spot[] {
  return locale === "bn" ? ALL_SPOTS_BN : ALL_SPOTS;
}

/* ---- Build-time sanity checks: fail loudly instead of shipping broken links ---- */
{
  const slugs = new Set<string>();
  for (const s of ALL_SPOTS) {
    if (slugs.has(s.slug)) throw new Error(`Duplicate spot slug: ${s.slug}`);
    slugs.add(s.slug);
    if (!DISTRICTS.some((d) => d.name === s.district)) throw new Error(`Spot "${s.slug}" has unknown district "${s.district}"`);
    if (!SPOT_PHOTOS[s.slug]) throw new Error(`Spot "${s.slug}" has no photo in photos.ts`);
  }
}

/** Lightweight card data — safe to send to client components. */
export interface SpotCard {
  slug: string;
  name: string;
  localName: string;
  district: string;
  upazila?: string;
  division: Spot["division"];
  categories: SpotCategory[];
  difficulty: Spot["difficulty"];
  summary: string;
  /** e.g. "2–3 hours" — shown in the card footer. */
  timeNeeded: string;
  photo: Photo;
}

export function getAllSpots(locale: Locale = "en"): Spot[] {
  return spots(locale);
}

export function getSpotBySlug(slug: string, locale: Locale = "en"): Spot | undefined {
  return spots(locale).find((s) => s.slug === slug);
}

/** Spot photo. Bangla pages caption it with the Bangla place name (photo captions are English). */
export function getSpotPhoto(s: Spot, locale: Locale = "en"): Photo {
  const p = spotPhoto(s.slug, s.guideSlug);
  if (locale !== "bn") return p;
  const district = DISTRICTS.find((d) => d.name === s.district)?.bn ?? s.district;
  return { ...p, caption: s.name, alt: `${s.name}, ${district}` };
}

export function toSpotCard(s: Spot, locale: Locale = "en"): SpotCard {
  return {
    slug: s.slug,
    name: s.name,
    localName: s.localName,
    district: s.district,
    upazila: s.upazila,
    division: s.division,
    categories: s.categories,
    difficulty: s.difficulty,
    summary: s.summary,
    timeNeeded: s.timeNeeded,
    photo: getSpotPhoto(s, locale),
  };
}

export function getAllSpotCards(locale: Locale = "en"): SpotCard[] {
  return spots(locale).map((s) => toSpotCard(s, locale));
}

export function getSpotsByDistrict(district: string, locale: Locale = "en"): Spot[] {
  return spots(locale).filter((s) => s.district === district);
}

/** Spots that belong to a full destination guide (for cross-links). */
export function getSpotsForGuide(guideSlug: string, locale: Locale = "en"): Spot[] {
  return spots(locale).filter((s) => s.guideSlug === guideSlug);
}

/** Districts that have at least one spot, with counts, in DISTRICTS order. */
export function getCoveredDistricts(locale: Locale = "en"): { name: string; bn: string; division: Spot["division"]; count: number; photo: Photo }[] {
  return DISTRICTS.flatMap((d) => {
    const list = getSpotsByDistrict(d.name, locale);
    return list.length ? [{ name: d.name, bn: d.bn, division: d.division, count: list.length, photo: getSpotPhoto(list[0], locale) }] : [];
  });
}
