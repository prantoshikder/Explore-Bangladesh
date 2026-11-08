/**
 * Two rows of photos gliding in opposite directions — a bold, cinematic band.
 * Pure CSS animation (no JS). Pauses on hover; static for reduced-motion users.
 * Each photo links to its spot / guide when available.
 */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import type { GalleryItem } from "@/data/gallery";
import { getT } from "@/i18n/server";
import type { Dictionary } from "@/i18n/dictionaries";

function Row({ items, reverse, duration, t }: { items: GalleryItem[]; reverse?: boolean; duration: string; t: Dictionary }) {
  // Render the list twice so translateX(-50%) loops seamlessly
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <ul
        className={`flex w-max gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {loop.map((it, i) => {
          const tile = (
            <div className="group relative h-56 w-80 shrink-0 overflow-hidden rounded-3xl sm:h-72 sm:w-[26rem]">
              <Image src={it.photo.src} alt={i < items.length ? it.photo.alt : ""} fill sizes="420px" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/70">{t.labels.galleryCategory[it.category]}</p>
                <p className="font-display text-2xl font-semibold leading-tight">{it.place}</p>
              </div>
            </div>
          );
          return (
            <li key={`${it.photo.src}-${i}`} aria-hidden={i >= items.length || undefined}>
              {it.href ? <Link href={it.href} tabIndex={i >= items.length ? -1 : undefined}>{tile}</Link> : tile}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function PhotoMarquee({ top, bottom }: { top: GalleryItem[]; bottom: GalleryItem[] }) {
  const t = await getT();
  return (
    <div className="marquee-pause space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <Row items={top} duration="70s" t={t} />
      <Row items={bottom} reverse duration="80s" t={t} />
    </div>
  );
}
