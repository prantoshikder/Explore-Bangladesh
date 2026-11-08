/** Share image for a tourist spot: its photo + name + district. */
import { getAllSpots, getSpotBySlug, getSpotPhoto } from "@/data/spots";
import { OG_CONTENT_TYPE, OG_SIZE, publicDataUri, renderOgImage } from "@/lib/og";

export const alt = "Explore Bangladesh tourist spot";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllSpots().map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSpotBySlug(slug) ?? getAllSpots()[0];
  return renderOgImage({
    photo: await publicDataUri(getSpotPhoto(s).src, "image/jpeg"),
    eyebrow: `${s.district} · ${s.division} Division`,
    title: s.name,
    subtitle: s.summary,
    chips: [s.difficulty, ...s.categories.slice(0, 2)],
  });
}
