/**
 * Full-bleed photo header for inner pages (Destinations, Explore, Gallery,
 * Essentials, Transport Guide, Calculator…). Big bold type over a dramatic
 * photo with a slow Ken Burns zoom and the brand wave at the bottom.
 *
 * The Navbar floats transparently over it — keep the path list in
 * Navbar's `hasPhotoHero()` in sync when you add a PageHero to a new route.
 */
import Image from "next/image";
import type { Photo } from "@/types/destination";
import { cn } from "@/lib/format";

export function PageHero({
  photo,
  eyebrow,
  title,
  accent,
  text,
  children,
  align = "left",
  size = "md",
  overlap = false,
}: {
  photo: Photo;
  eyebrow: string;
  /** Main heading. `accent` is appended in italic brand green. */
  title: string;
  accent?: string;
  text?: string;
  /** Extra content under the text (stats, chips…). */
  children?: React.ReactNode;
  align?: "left" | "center";
  /** md ≈ 520px tall, lg ≈ 640px. */
  size?: "md" | "lg";
  /** Extra room at the bottom for a search box + chips that float up into the hero. */
  overlap?: boolean;
}) {
  const center = align === "center";
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <div className="absolute inset-0">
        <Image src={photo.src} alt={photo.alt} fill preload sizes="100vw" className="animate-kenburns object-cover" />
        <div className={cn("absolute inset-0", center ? "bg-brand-900/55" : "bg-gradient-to-r from-brand-900/95 via-brand-900/65 to-brand-900/15")} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-brand-900/40" />
      </div>

      <div
        className={cn(
          "relative mx-auto flex max-w-7xl flex-col justify-end px-4 pt-36 sm:px-6 lg:px-8",
          overlap ? "pb-72 sm:pb-80" : "pb-28 sm:pb-36",
          size === "lg" ? "min-h-[640px]" : "min-h-[520px]",
          center && "items-center text-center",
        )}
      >
        <p className={cn("animate-fade-up flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-200", center && "justify-center")}>
          <span aria-hidden className="h-px w-10 bg-sun" />
          {eyebrow}
          {center && <span aria-hidden className="h-px w-10 bg-sun" />}
        </p>
        <h1
          className="animate-fade-up mt-5 max-w-4xl font-display text-5xl leading-[0.98] font-semibold tracking-tight text-white drop-shadow-lg sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
          {accent && <> <em className="font-normal text-brand-200">{accent}</em></>}
        </h1>
        {text && (
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            {text}
          </p>
        )}
        {children && (
          <div className="animate-fade-up mt-8 w-full" style={{ animationDelay: "0.3s" }}>
            {children}
          </div>
        )}
      </div>

      {/* Caption chip */}
      {photo.caption && (
        <p className="absolute right-4 bottom-20 hidden rounded-full bg-black/35 px-3 py-1 text-[0.7rem] text-white/85 backdrop-blur sm:right-8 sm:bottom-28 lg:block">
          📍 {photo.caption}
        </p>
      )}

      {/* Brand wave */}
      <svg aria-hidden className="absolute -bottom-px left-0 block w-full text-sand" viewBox="0 0 1440 90" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 60 C 240 10, 480 90, 720 50 S 1200 5, 1440 45 V90 H0Z" />
      </svg>
    </section>
  );
}
