/**
 * /sitemap.xml — every public page in both languages (English at the bare
 * path, Bangla under /bn), each entry listing its hreflang alternates.
 */
import type { MetadataRoute } from "next";
import { getAllDestinations } from "@/data/destinations";
import { ESSENTIALS_LAST_VERIFIED } from "@/data/essentials";
import { getGalleryItems } from "@/data/gallery";
import { getAllSpots, getSpotPhoto } from "@/data/spots";
import { LOCALES, localizePath } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

type Entry = Omit<MetadataRoute.Sitemap[number], "url" | "alternates"> & { path: string };

/** One sitemap entry per language for a path, each with en/bn alternates. */
function localized({ path, ...rest }: Entry): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(localizePath(l, path))]));
  return LOCALES.map((l) => ({ ...rest, url: absoluteUrl(localizePath(l, path)), alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(ESSENTIALS_LAST_VERIFIED);
  const staticPages: Entry[] = [
    { path: "/", lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { path: "/destinations", lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    {
      path: "/gallery",
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
      images: getGalleryItems().map((g) => absoluteUrl(g.photo.src)),
    },
    { path: "/contact", lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { path: "/phrases", lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { path: "/explore", lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { path: "/essentials", lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { path: "/transport-guide", lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/cost-calculator", lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
  ];
  const guides: Entry[] = getAllDestinations().map((d) => ({
    path: `/destinations/${d.slug}`,
    lastModified: new Date(d.lastVerified),
    changeFrequency: "monthly",
    priority: 0.9,
    images: [absoluteUrl(d.cover.src)],
  }));
  const spots: Entry[] = getAllSpots().map((s) => ({
    path: `/spots/${s.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(getSpotPhoto(s).src)],
  }));
  return [...staticPages, ...guides, ...spots].flatMap(localized);
}
