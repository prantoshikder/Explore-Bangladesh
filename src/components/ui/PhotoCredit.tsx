"use client";

/**
 * Caption + attribution line shown on photos.
 *
 * Inline author credits are currently HIDDEN (SHOW_INLINE_CREDITS = false).
 * Attribution is shown in the /gallery lightbox instead (every site photo is
 * in the gallery), which CC BY / CC BY-SA licences require — keep it there.
 * Flip the flag to `true` to show "Photo: Name · Licence" on every image again.
 */
import type { Photo } from "@/types/destination";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";

export const SHOW_INLINE_CREDITS = false;

export function PhotoCredit({ photo, className, showCaption = true }: { photo: Photo; className?: string; showCaption?: boolean }) {
  const t = useT();
  const caption = showCaption ? photo.caption : undefined;
  // Nothing visible to render → render nothing (avoids empty boxes).
  if (!caption && !SHOW_INLINE_CREDITS) return null;

  return (
    <p className={cn("text-[0.7rem] leading-snug", className)}>
      {caption && <span className="font-medium">{caption}</span>}
      <span className={SHOW_INLINE_CREDITS ? undefined : "hidden"}>
        {caption && " · "}{t.common.photo}:{" "}
        <a href={photo.credit.authorUrl ?? photo.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-current/40 underline-offset-2 hover:decoration-current">
          {photo.credit.author}
        </a>{" "}
        · {photo.credit.license === "Unsplash License" ? <a href={photo.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-current/40 underline-offset-2">Unsplash</a> : photo.credit.license}
      </span>
    </p>
  );
}
