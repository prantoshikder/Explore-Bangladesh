/**
 * Share image for a tourist spot: its photo + name + district.
 * Text stays English in both languages (the OG renderer has no Bangla font).
 */
import { getAllSpots, getSpotBySlug, getSpotPhoto } from "@/data/spots";
import { OG_CONTENT_TYPE, OG_SIZE, publicDataUri, renderOgImage } from "@/lib/og";

export const alt = "Explore Bangladesh tourist spot";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllSpots("en").map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSpotBySlug(slug, "en") ?? getAllSpots("en")[0];
  return renderOgImage({
    photo: await publicDataUri(getSpotPhoto(s, "en").src, "image/jpeg"),
    eyebrow: `${s.district} · ${s.division} Division`,
    title: s.name,
    subtitle: s.summary,
    chips: [s.difficulty, ...s.categories.slice(0, 2)],
  });
}
