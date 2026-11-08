/**
 * ============================================================================
 *  Unsplash photo overrides
 * ============================================================================
 *  `npm run unsplash:sync` (needs UNSPLASH_ACCESS_KEY in .env.local) searches
 *  Unsplash for each "slot" listed in scripts/unsplash-sync.mjs and stores up
 *  to 3 candidates per slot in src/data/unsplash.json.
 *
 *  Anywhere the site defines a photo, wrap it with withUnsplash(slot, fallback):
 *  the selected Unsplash photo is used when one exists, otherwise the current
 *  (Wikimedia Commons) photo stays. With no key / empty manifest nothing changes.
 *
 *  Unsplash API rules followed here:
 *   - images are hotlinked from images.unsplash.com (never re-hosted)
 *   - photographer + Unsplash are credited with links (utm params added)
 *   - the download endpoint is pinged when a photo is selected (by the script)
 * ============================================================================
 */
import type { Photo } from "@/types/destination";
import manifest from "./unsplash.json";

export interface UnsplashCandidate {
  id: string;
  /** urls.raw from the API — sized via imgix params below */
  raw: string;
  alt: string;
  color?: string;
  width: number;
  height: number;
  author: string;
  authorUrl: string;
  pageUrl: string;
  /** Small preview for the review sheet */
  thumb?: string;
  /** API endpoint to ping when the photo is used (Unsplash guideline) */
  downloadLocation?: string;
  /** Did the photo's description/tags mention the place? */
  matches?: boolean;
  pinged?: boolean;
}

export interface UnsplashSlot {
  label: string;
  query: string;
  selected: number | null;
  candidates: UnsplashCandidate[];
  /** Caption describing the selected photo (written after reviewing it). */
  caption?: string;
}

const UTM = "utm_source=explore_bangladesh&utm_medium=referral";
const withUtm = (url: string) => `${url}${url.includes("?") ? "&" : "?"}${UTM}`;

const SLOTS = (manifest as { photos: Record<string, UnsplashSlot> }).photos;

/** The chosen Unsplash photo for a slot, as a site Photo (or undefined). */
export function unsplashPhoto(slot: string): Photo | undefined {
  const entry = SLOTS[slot];
  if (!entry || entry.selected === null || entry.selected === undefined) return undefined;
  const c = entry.candidates[entry.selected];
  if (!c) return undefined;
  return {
    // Unsplash's CDN (imgix) serves the size; next/image then picks per-device widths.
    src: `${c.raw}${c.raw.includes("?") ? "&" : "?"}w=2400&q=80&fm=jpg&fit=max`,
    alt: c.alt || entry.caption || entry.label,
    caption: entry.caption ?? entry.label,
    credit: { author: c.author, license: "Unsplash License", source: withUtm(c.pageUrl), authorUrl: withUtm(c.authorUrl) },
  };
}

/** Use the Unsplash photo for `slot` if one is selected, else keep `fallback`. */
export function withUnsplash(slot: string, fallback: Photo): Photo {
  const u = unsplashPhoto(slot);
  // The Unsplash photo is a different picture, so it must use its own caption
  return u ?? fallback;
}

export function isUnsplash(photo: Photo): boolean {
  return photo.credit.license === "Unsplash License";
}
