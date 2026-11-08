/**
 * /sitemap.xml — every public page, with images for Google Images.
 */
import type { MetadataRoute } from "next";
import { getAllDestinations } from "@/data/destinations";
import { ESSENTIALS_LAST_VERIFIED } from "@/data/essentials";
import { getGalleryItems } from "@/data/gallery";
import { getAllSpots, getSpotPhoto } from "@/data/spots";
import { absoluteUrl } from "@/lib/site";

type Entry = Omit<MetadataRoute.Sitemap[number], "url"> & { path: string };

const toUrl = ({ path, ...rest }: Entry): MetadataRoute.Sitemap[number] => ({ ...rest, url: absoluteUrl(path) });

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
  return [...staticPages, ...guides, ...spots].map(toUrl);
}
