/**
 * ============================================================================
 *  Destination Registry — the single source of truth for all spots.
 * ============================================================================
 *  HOW TO ADD A NEW FULL GUIDE (e.g. Sundarbans):
 *    1. Create `sundarbans.json` next to this file (copy coxs-bazar.json).
 *    2. `import sundarbans from "./sundarbans.json";`
 *    3. Add it to the FULL_GUIDES array below.
 *    4. Delete its entry from UPCOMING_SPOTS (if present).
 *  That's it — /destinations/sundarbans is statically generated at build.
 *
 *  Later, this file can be swapped for a CMS / database call without touching
 *  any UI component, because everything goes through the helper functions.
 * ============================================================================
 */
import type { Destination, DestinationSummary, Photo } from "@/types/destination";
import type { Locale } from "@/i18n/config";
import { unsplashPhoto, withUnsplash } from "@/data/unsplash";

import coxsBazar from "./coxs-bazar.json";
import sajekValley from "./sajek-valley.json";
import sundarbans from "./sundarbans.json";
import sylhet from "./sylhet-jaflong-ratargul.json";
import sreemangal from "./sreemangal.json";
import saintMartins from "./saint-martins-island.json";
import bandarban from "./bandarban.json";
import oldDhaka from "./old-dhaka.json";
import paharpur from "./paharpur.json";
// Bangla translations (same structure, translated text — see scripts/check-translation.mjs)
import coxsBazarBn from "./bn/coxs-bazar.json";
import sajekValleyBn from "./bn/sajek-valley.json";
import sundarbansBn from "./bn/sundarbans.json";
import sylhetBn from "./bn/sylhet-jaflong-ratargul.json";
import sreemangalBn from "./bn/sreemangal.json";
import saintMartinsBn from "./bn/saint-martins-island.json";
import bandarbanBn from "./bn/bandarban.json";
import oldDhakaBn from "./bn/old-dhaka.json";
import paharpurBn from "./bn/paharpur.json";

/** JSON imports are widened to `string`, so we assert the stricter type here. */
const FULL_GUIDES: Destination[] = ([coxsBazar, sajekValley, sundarbans, sylhet, sreemangal, saintMartins, bandarban, oldDhaka, paharpur] as Destination[]).map((d) => ({
  ...d,
  // Prefer a selected Unsplash photo (see src/data/unsplash.ts); falls back to the JSON cover
  cover: withUnsplash(`dest:${d.slug}`, d.cover),
}));

/** Bangla guides. An Unsplash cover keeps its photo but gets the Bangla place name as caption. */
const FULL_GUIDES_BN: Destination[] = ([coxsBazarBn, sajekValleyBn, sundarbansBn, sylhetBn, sreemangalBn, saintMartinsBn, bandarbanBn, oldDhakaBn, paharpurBn] as Destination[]).map((d) => {
  const cover = withUnsplash(`dest:${d.slug}`, d.cover);
  return { ...d, cover: cover === d.cover ? cover : { ...cover, caption: d.name, alt: d.cover.alt } };
});

function guides(locale: Locale): Destination[] {
  return locale === "bn" ? FULL_GUIDES_BN : FULL_GUIDES;
}

/** Shorthand for a destination photo stored in /public/images/destinations. */
export function destinationPhoto(file: string, alt: string, caption: string, author: string, license: string, source: string): Photo {
  return { src: `/images/destinations/${file}`, alt, caption, credit: { author, license, source } };
}

/** Boga Lake, Bandarban (used by the Boga Lake spot and the gallery). */
export const BOGA_LAKE_PHOTO: Photo = {
  src: "/images/hero-boga-lake.jpg",
  alt: "Boga Lake in Bandarban, a still blue lake reflecting white clouds and green forested hills",
  caption: "Boga Lake, Bandarban",
  credit: {
    author: "Mazharul Sabuz",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Boga_Lake,_Bandarban.jpg",
  },
};

/**
 * Big background photo for the homepage hero: the Kanchenjunga range seen from
 * Tetulia, Panchagarh, in Bangladesh's far north (visible on clear winter mornings).
 * An Unsplash photo selected for slot "hero:home" in unsplash.json overrides it.
 */
export const HERO_PHOTO: Photo = withUnsplash("hero:home", {
  src: "/images/hero-kanchenjunga.jpg",
  alt: "The snow-covered Kanchenjunga range glowing pink at sunrise above the hills, seen across a river from Tetulia in northern Bangladesh",
  caption: "Kanchenjunga from Tetulia, Panchagarh",
  position: "center 18%",
  credit: {
    author: "MD sajjad hossain photography",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Kanchenjunga_on_a_cold_morning.jpg",
  },
});

/** Homepage hero photo with Bangla caption/alt when browsing in Bangla. */
export function getHeroPhoto(locale: Locale = "en"): Photo {
  if (locale !== "bn") return HERO_PHOTO;
  return unsplashPhoto("hero:home")
    ? { ...HERO_PHOTO, caption: "বাংলাদেশ" }
    : { ...HERO_PHOTO, caption: "তেঁতুলিয়া, পঞ্চগড় থেকে কাঞ্চনজঙ্ঘা", alt: "উত্তরবঙ্গের তেঁতুলিয়া থেকে দেখা ভোরের আলোয় রঙিন বরফে ঢাকা কাঞ্চনজঙ্ঘা" };
}

/** Where the hero photo was taken (for gallery labels). */
export const HERO_PLACE = unsplashPhoto("hero:home") ? "Bangladesh" : "Tetulia, Panchagarh";

/**
 * Spots shown in the carousel/search whose full guide is still being written.
 * Each needs only card-level data. Promote to a full JSON guide when ready.
 */
const UPCOMING_SPOTS: Omit<DestinationSummary, "hasFullGuide">[] = [
  // All destinations currently have full guides. To list a new place before its guide is
  // written, add card data here, e.g.
  // { slug: "kuakata", name: "Kuakata", localName: "কুয়াকাটা", tagline: "…", division: "Barishal",
  //   tripTypes: ["Beach"], difficulty: "Easy", budgetLevel: "Moderate", idealDuration: "2 days",
  //   cover: destinationPhoto("kuakata.jpg", "…alt…", "…caption…", "Author", "CC BY-SA 4.0", "https://commons…"),
  //   coverGradient: "from-sky-600 to-amber-200", coverEmoji: "🌅" },
  // Its card then links to /explore until the guide exists.
];

/* --------------------------------- Helpers --------------------------------- */

/** All destinations with full guides (used for static generation). */
export function getAllDestinations(locale: Locale = "en"): Destination[] {
  return guides(locale);
}

export function getDestinationBySlug(slug: string, locale: Locale = "en"): Destination | undefined {
  return guides(locale).find((d) => d.slug === slug);
}

/** Convert a full guide into a lightweight card. */
function toSummary(d: Destination): DestinationSummary {
  return {
    slug: d.slug,
    name: d.name,
    localName: d.localName,
    tagline: d.tagline,
    division: d.division,
    tripTypes: d.tripTypes,
    difficulty: d.difficulty,
    budgetLevel: d.budgetLevel,
    idealDuration: d.idealDuration,
    cover: d.cover,
    coverGradient: d.coverGradient,
    coverEmoji: d.coverEmoji,
    hasFullGuide: true,
  };
}

/** Every spot (full + upcoming) as cards — for search & carousel. */
export function getAllSummaries(locale: Locale = "en"): DestinationSummary[] {
  return [
    ...guides(locale).map(toSummary),
    ...UPCOMING_SPOTS.map((s) => ({ ...s, cover: withUnsplash(`dest:${s.slug}`, s.cover), hasFullGuide: false })),
  ];
}

/** Display order for the homepage "Top Destinations" carousel. */
const FEATURED_ORDER = [
  "coxs-bazar",
  "sundarbans",
  "sajek-valley",
  "sylhet-jaflong-ratargul",
  "sreemangal",
  "saint-martins-island",
  "bandarban",
  "old-dhaka",
  "paharpur",
];

export function getFeaturedSummaries(locale: Locale = "en"): DestinationSummary[] {
  const all = getAllSummaries(locale);
  return FEATURED_ORDER.map((slug) => all.find((s) => s.slug === slug)).filter(
    (s): s is DestinationSummary => Boolean(s),
  );
}
