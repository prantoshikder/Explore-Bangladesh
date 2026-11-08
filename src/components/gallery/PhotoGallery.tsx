"use client";

/**
 * Photo gallery: category filter chips → bento-style CSS grid → lightbox.
 *
 * Grid: 2 columns on phones, 4 on desktop, fixed row height, with a repeating
 * pattern of big / tall / wide tiles. `grid-flow-dense` back-fills any gaps,
 * so it stays tidy whatever the filter.
 *
 * Progressive loading: the first PAGE_SIZE photos render, the next batch loads
 * automatically as you scroll near the bottom (IntersectionObserver), and a
 * "Load more" button does the same on demand. Tiles show a shimmer until their
 * image arrives, then fade in.
 *
 * Lightbox: click a photo to view it large. ← / → to navigate, Esc to close,
 * swipe on touch screens. Page scroll is locked while it's open and focus
 * returns to the photo you opened.
 */
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/format";

/** How many photos to reveal per batch. */
const PAGE_SIZE = 12;

/** Tile shape by position (repeats every 10 photos). */
function spanFor(i: number): string {
  switch (i % 10) {
    case 0: return "col-span-2 row-span-2";
    case 3: return "row-span-2";
    case 5: return "col-span-2";
    case 7: return "row-span-2";
    default: return "";
  }
}

export function PhotoGallery({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: { id: GalleryCategory; icon: string }[];
}) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loadedSrc, setLoadedSrc] = useState<Set<string>>(() => new Set());
  const [announce, setAnnounce] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const shown = filter === "All" ? items : items.filter((it) => it.category === filter);
  const count = (c: GalleryCategory) => items.filter((it) => it.category === c).length;
  const visibleItems = shown.slice(0, visible);
  const remaining = shown.length - visibleItems.length;
  const hasMore = remaining > 0;

  /* A new filter starts again from the first batch (reset-on-change pattern) */
  const [lastFilter, setLastFilter] = useState(filter);
  if (lastFilter !== filter) {
    setLastFilter(filter);
    setVisible(PAGE_SIZE);
    setAnnounce("");
  }

  const loadMore = useCallback(() => {
    setVisible((v) => {
      const next = Math.min(v + PAGE_SIZE, shown.length);
      if (next > v) setAnnounce(`${next - v} more photos loaded. Showing ${next} of ${shown.length}.`);
      return next;
    });
  }, [shown.length]);

  /* Infinite scroll: load the next batch when the sentinel nears the viewport.
     Re-created after each batch, so it keeps going while the sentinel stays visible. */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || open !== null) return;
    const io = new IntersectionObserver((entries) => entries[0]?.isIntersecting && loadMore(), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadMore, visible, open]);

  const markLoaded = (src: string) => setLoadedSrc((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  const close = useCallback(() => {
    setOpen((i) => {
      if (i !== null) setTimeout(() => tileRefs.current[i]?.focus(), 0);
      return null;
    });
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (open === null) return;
      const next = (open + dir + shown.length) % shown.length;
      setOpen(next);
      // Browsing past the loaded photos in the lightbox also reveals them in the grid
      setVisible((v) => Math.max(v, Math.ceil((next + 1) / PAGE_SIZE) * PAGE_SIZE));
    },
    [open, shown.length],
  );

  /* Keyboard + scroll lock while the lightbox is open */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open === null ? null : shown[open];

  return (
    <div>
      {/* ---- Filter chips ---- */}
      <div role="group" aria-label="Filter photos" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: "All" as const, icon: "✨", n: items.length }, ...categories.map((c) => ({ ...c, n: count(c.id) }))].map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition",
                active ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25" : "bg-white text-ink/80 ring-1 ring-jute hover:bg-jute",
              )}
            >
              <span aria-hidden>{c.icon}</span>
              {c.id}
              <span className={cn("rounded-full px-2 py-0.5 text-xs", active ? "bg-white/20" : "bg-sand text-muted")}>{c.n}</span>
            </button>
          );
        })}
      </div>

      {/* ---- Bento grid ---- */}
      <ul className="mt-8 grid grid-flow-dense auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[230px]">
        {visibleItems.map((it, i) => (
          <li
            key={it.photo.src}
            className={cn(spanFor(i), "animate-fade-up")}
            // Stagger each new batch so tiles cascade in
            style={{ animationDelay: `${(i % PAGE_SIZE) * 45}ms` }}
          >
            <button
              ref={(el) => { tileRefs.current[i] = el; }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View photo: ${it.photo.caption ?? it.photo.alt}`}
              className={cn(
                "group relative block h-full w-full overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500 md:rounded-3xl",
                loadedSrc.has(it.photo.src) ? "bg-jute" : "shimmer",
              )}
            >
              <Image
                src={it.photo.src}
                alt={it.photo.alt}
                fill
                sizes={spanFor(i).includes("col-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                onLoad={() => markLoaded(it.photo.src)}
                className={cn(
                  "object-cover transition duration-700 ease-out group-hover:scale-110",
                  loadedSrc.has(it.photo.src) ? "opacity-100" : "opacity-0",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 transition duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/75">{it.place}</p>
                <p className="line-clamp-1 text-sm font-semibold md:translate-y-1 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {it.photo.caption}
                </p>
              </div>
              <span aria-hidden className="absolute top-3 right-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow transition group-hover:scale-100 group-hover:opacity-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ---- Progressive loading: sentinel + status + Load more ---- */}
      <div ref={sentinelRef} aria-hidden className="h-px" />
      <p className="sr-only" aria-live="polite">{announce}</p>
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs font-semibold text-muted">
            <span>Showing {visibleItems.length} of {shown.length}</span>
            <span>{Math.round((visibleItems.length / Math.max(1, shown.length)) * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-jute">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500" style={{ width: `${(visibleItems.length / Math.max(1, shown.length)) * 100}%` }} />
          </div>
        </div>
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-600 py-3 pr-3 pl-7 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Load more photos
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs">{Math.min(PAGE_SIZE, remaining)} of {remaining} left</span>
          </button>
        ) : (
          shown.length > PAGE_SIZE && <p className="text-sm font-semibold text-brand-700">🎉 You&apos;ve seen all {shown.length} photos</p>
        )}
      </div>

      {/* ---- Lightbox ---- */}
      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.photo.caption ?? "Photo"}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <span className="text-sm font-medium text-white/70">{open + 1} / {shown.length}</span>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          {/* Image */}
          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image key={current.photo.src} src={current.photo.src} alt={current.photo.alt} fill sizes="100vw" className="animate-fade-up object-contain px-2 sm:px-20" />
            {(["prev", "next"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => step(d === "next" ? 1 : -1)}
                aria-label={d === "next" ? "Next photo" : "Previous photo"}
                className={cn(
                  "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/25 sm:grid",
                  d === "next" ? "right-4" : "left-4",
                )}
              >
                {d === "next" ? "→" : "←"}
              </button>
            ))}
          </div>

          {/* Caption */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-white sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">{current.place} · {current.category}</p>
              <p className="mt-1 font-display text-xl font-semibold">{current.photo.caption}</p>
              {/* Required attribution for CC BY / CC BY-SA photos — this is the only place
                  credits appear on the site, so keep it. Every site photo is in the gallery. */}
              {current.photo.credit.license === "Unsplash License" ? (
                // Unsplash API guidelines: credit the photographer AND Unsplash, both linked
                <p className="mt-1.5 text-xs text-white/55">
                  Photo by{" "}
                  <a href={current.photo.credit.authorUrl ?? current.photo.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:text-white">
                    {current.photo.credit.author}
                  </a>{" "}
                  on{" "}
                  <a href={current.photo.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:text-white">
                    Unsplash
                  </a>
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-white/55">
                  Photo:{" "}
                  <a href={current.photo.credit.source} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:text-white">
                    {current.photo.credit.author}
                  </a>{" "}
                  · {current.photo.credit.license} · Wikimedia Commons
                </p>
              )}
            </div>
            {current.href && (
              <Link href={current.href} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">
                Read the {current.place} guide →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
