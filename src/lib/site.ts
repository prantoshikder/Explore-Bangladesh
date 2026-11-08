/**
 * ============================================================================
 *  Site-wide SEO & marketing config — edit this one file before launch.
 * ============================================================================
 *  Set NEXT_PUBLIC_SITE_URL in your hosting env (e.g. https://explorebangladesh.com).
 *  It is used for canonical URLs, the sitemap, Open Graph images and JSON-LD.
 * ============================================================================
 */
export const SITE = {
  name: "Explore Bangladesh",
  shortName: "Explore BD",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  title: "Explore Bangladesh: Step-by-Step Travel Guides for First-Time Visitors",
  description:
    "Plan a smooth trip to Bangladesh with step-by-step routes from Dhaka, real costs in BDT & USD, where to stay, what to eat and every local transport term explained. Cox's Bazar, Sajek, Sundarbans & more.",
  keywords: [
    "Bangladesh travel guide",
    "Bangladesh tourism",
    "things to do in Bangladesh",
    "Cox's Bazar travel guide",
    "Sajek Valley guide",
    "Sundarbans tour",
    "how to travel in Bangladesh",
    "Bangladesh trip cost",
    "Bangladesh visa on arrival",
    "Dhaka to Cox's Bazar",
    "CNG auto rickshaw",
    "Bangladesh itinerary",
  ],
  locale: "en_US",
  themeColor: "#006a4e",
  /** Social profiles — add real URLs when accounts exist (used in JSON-LD `sameAs`). */
  socials: [] as string[],
  /**
   * Where the /contact form sends messages (opens the visitor's email app — no
   * server needed). Leave empty until you have an address; the form says so.
   */
  contactEmail: "",
  /** X/Twitter handle without the URL, e.g. "@explorebd" (leave empty if none). */
  twitter: "",
} as const;

/** Build an absolute URL from a path ("/destinations" → "https://site/destinations"). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path; // already absolute (e.g. Unsplash CDN images)
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Serialise JSON-LD safely for a <script> tag (escapes "<" to prevent XSS). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
