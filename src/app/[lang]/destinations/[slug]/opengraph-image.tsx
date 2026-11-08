/**
 * Per-destination share image: cover photo + name + key facts.
 * Text stays English in both languages (the OG renderer has no Bangla font).
 */
import { getAllDestinations, getDestinationBySlug } from "@/data/destinations";
import { OG_CONTENT_TYPE, OG_SIZE, publicDataUri, renderOgImage } from "@/lib/og";

export const alt = "Explore Bangladesh destination guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllDestinations("en").map((d) => ({ slug: d.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug, "en") ?? getAllDestinations("en")[0];
  return renderOgImage({
    photo: await publicDataUri(d.cover.src, "image/jpeg"),
    eyebrow: `${d.division} · Travel guide`,
    title: d.name,
    subtitle: d.tagline,
    chips: [d.difficulty, `Best: ${d.overview.bestTimeSummary.split(" (")[0]}`, d.idealDuration],
  });
}
