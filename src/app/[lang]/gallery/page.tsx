/** /gallery — Bangladesh in pictures (bento grid + lightbox). */
import type { Metadata } from "next";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { PageHero } from "@/components/ui/PageHero";
import { GALLERY_CATEGORIES, getGalleryItems } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.gallery.title, description: t.meta.gallery.description, path: "/gallery", locale });
}

export default async function GalleryPage() {
  const locale = await getLocale();
  const t = await getT();
  const items = getGalleryItems(locale);
  const places = new Set(items.map((i) => i.place)).size;
  const heroPhoto = items.find((i) => i.photo.src.includes("ratargul-boat"))?.photo ?? items[0].photo;

  return (
    <>
      <PageHero
        photo={heroPhoto}
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        accent={t.gallery.titleAccent}
        text={t.gallery.text}
        size="lg"
      >
        <dl className="flex gap-10">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">{t.gallery.photos}</dt>
            <dd className="font-display text-5xl font-semibold text-white">{items.length}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">{t.gallery.placesDishes}</dt>
            <dd className="font-display text-5xl font-semibold text-white">{places}</dd>
          </div>
        </dl>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <PhotoGallery items={items} categories={GALLERY_CATEGORIES} />
        <p className="mt-12 text-center text-sm text-muted">
          {t.gallery.footer}
        </p>
      </div>
    </>
  );
}
