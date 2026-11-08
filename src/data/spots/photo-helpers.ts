/** Helpers shared by photos.ts and the per-group photo files (photos-e.ts …). */
import type { Photo } from "@/types/destination";

/** A photo saved as /public/images/spots/<file>, with its Commons credit. */
export function p(file: string, alt: string, caption: string, author: string, license: string, source: string): Photo {
  return { src: `/images/spots/${file}`, alt, caption, credit: { author, license, source } };
}
