/** Share image for the homepage and any page without its own. */
import { HERO_PHOTO } from "@/data/destinations";
import { OG_CONTENT_TYPE, OG_SIZE, publicDataUri, renderOgImage } from "@/lib/og";

export const alt = "Explore Bangladesh: step-by-step travel guides for first-time visitors";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    photo: await publicDataUri(HERO_PHOTO.src, "image/jpeg"),
    eyebrow: "Step-by-step travel guides",
    title: "Bangladesh, made easy",
    subtitle: "Routes from Dhaka, real costs in BDT & USD, and every local word explained.",
    chips: ["Cox's Bazar", "Sajek Valley", "Sundarbans"],
  });
}
