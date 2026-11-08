/** /gallery — Bangladesh in pictures (bento grid + lightbox). */
import type { Metadata } from "next";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { PageHero } from "@/components/ui/PageHero";
import { GALLERY_CATEGORIES, getGalleryItems } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bangladesh Photo Gallery: Beaches, Hills, Forests, Food & Heritage",
  description:
    "See Bangladesh before you go: Cox's Bazar sunsets, clouds over Sajek, Sundarbans wildlife, Ratargul swamp forest, Mughal forts, tea gardens, street food and colourful rickshaw art.",
  path: "/gallery",
});

export default function GalleryPage() {
  const items = getGalleryItems();
  const places = new Set(items.map((i) => i.place)).size;
  const heroPhoto = items.find((i) => i.photo.src.includes("ratargul-boat"))?.photo ?? items[0].photo;

  return (
    <>
      <PageHero
        photo={heroPhoto}
        eyebrow="Gallery"
        title="Bangladesh"
        accent="in pictures."
        text="Golden beaches, cloud-wrapped hills, flooded forests, Mughal palaces and street food. Tap any photo to see it full screen, then jump straight to the travel guide."
        size="lg"
      >
        <dl className="flex gap-10">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">Photos</dt>
            <dd className="font-display text-5xl font-semibold text-white">{items.length}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">Places &amp; dishes</dt>
            <dd className="font-display text-5xl font-semibold text-white">{places}</dd>
          </div>
        </dl>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <PhotoGallery items={items} categories={GALLERY_CATEGORIES} />
        <p className="mt-12 text-center text-sm text-muted">
          Photos from Wikimedia Commons under Creative Commons licences. Open any photo to see who took it.
        </p>
      </div>
    </>
  );
}
