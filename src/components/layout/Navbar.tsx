"use client";

/**
 * Site header — a floating "pill" bar.
 *
 *  - On pages with a full-bleed photo hero (home + destination guides) the
 *    header floats transparently over the photo with white text, then turns
 *    into a solid white bar once you scroll.
 *  - Everywhere else it is solid from the start, and a spacer keeps page
 *    content from sliding under it.
 *  - "Travel tools" groups the planning pages in a dropdown (click or hover;
 *    Esc / click outside closes it).
 *  - The current page is highlighted.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/format";
import { useSavedSpots } from "@/lib/saved-spots";
import { useT } from "@/i18n/client";
import { fmt } from "@/i18n/config";

/** Routes whose first section is a dark full-width photo the header can float over. */
function hasPhotoHero(path: string) {
  if (path === "/" || /^\/(destinations|spots)\/[^/]+$/.test(path)) return true;
  // Inner pages that start with <PageHero>
  return ["/destinations", "/explore", "/gallery", "/essentials", "/transport-guide", "/tools/cost-calculator", "/phrases", "/my-trip", "/contact"].includes(path);
}

export function Navbar() {
  const t = useT();
  const pathname = usePathname() ?? "/";
  const overlay = hasPhotoHero(pathname);

  const MAIN_LINKS = [
    { href: "/explore", label: t.nav.explore },
    { href: "/destinations", label: t.nav.destinations },
    { href: "/gallery", label: t.nav.gallery },
  ];
  const TOOLS = [
    { href: "/essentials", icon: "🛂", ...t.nav.tools.essentials },
    { href: "/transport-guide", icon: "🛺", ...t.nav.tools.transport },
    { href: "/tools/cost-calculator", icon: "🧮", ...t.nav.tools.calculator },
    { href: "/phrases", icon: "🗣️", ...t.nav.tools.phrases },
    { href: "/contact", icon: "✉️", ...t.nav.tools.contact },
  ];

  const { saved } = useSavedSpots();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLLIElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Solid background after a little scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on navigation (reset-state-on-prop-change pattern, no effect needed) */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setToolsOpen(false);
  }

  /* Tools dropdown: Esc + click outside */
  useEffect(() => {
    if (!toolsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setToolsOpen(false);
    const onDown = (e: PointerEvent) => !toolsRef.current?.contains(e.target as Node) && setToolsOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [toolsOpen]);

  // Transparent only while over a photo hero, not scrolled, and the mobile menu is closed
  const glass = overlay && !scrolled && !mobileOpen;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const toolsActive = TOOLS.some((t) => isActive(t.href));

  const linkCls = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition",
      glass
        ? active ? "bg-white/20 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"
        : active ? "bg-brand-50 text-brand-700" : "text-ink/70 hover:bg-sand hover:text-ink",
    );

  const openToolsSoon = () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setToolsOpen(true); };
  const closeToolsSoon = () => { hoverTimer.current = setTimeout(() => setToolsOpen(false), 150); };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 print:hidden">
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full pr-2 pl-4 transition-all duration-300 sm:pl-5",
            glass
              ? "bg-white/10 ring-1 ring-white/20 backdrop-blur-md"
              : "bg-white/90 shadow-lg shadow-brand-900/5 ring-1 ring-jute backdrop-blur-xl",
          )}
        >
          <Link href="/" aria-label={t.nav.home} className="group shrink-0">
            <Logo idPrefix="nav-logo" tone={glass ? "light" : "dark"} />
          </Link>

          {/* ---- Desktop links ---- */}
          <ul className="hidden items-center gap-1 md:flex">
            {MAIN_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={linkCls(isActive(l.href))}>
                  {l.label}
                </Link>
              </li>
            ))}

            <li ref={toolsRef} className="relative" onPointerEnter={(e) => e.pointerType === "mouse" && openToolsSoon()} onPointerLeave={(e) => e.pointerType === "mouse" && closeToolsSoon()}>
              <button
                type="button"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen((o) => !o)}
                className={cn(linkCls(toolsActive || toolsOpen), "inline-flex items-center gap-1.5")}
              >
                {t.nav.travelTools}
                <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform", toolsOpen && "rotate-180")}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div
                className={cn(
                  "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 transition duration-200",
                  toolsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                )}
              >
                <ul className="rounded-3xl bg-white p-2 shadow-2xl shadow-brand-900/15 ring-1 ring-jute">
                  {TOOLS.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        aria-current={isActive(t.href) ? "page" : undefined}
                        onClick={() => setToolsOpen(false)}
                        className={cn("flex items-center gap-3.5 rounded-2xl p-3 transition hover:bg-sand", isActive(t.href) && "bg-brand-50")}
                      >
                        <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-xl">{t.icon}</span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">{t.label}</span>
                          <span className="block text-xs text-muted">{t.text}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>

          {/* ---- Right side ---- */}
          <div className="flex items-center gap-2">
            {/* My Trip (saved places) */}
            <Link
              href="/my-trip"
              aria-label={fmt(t.nav.myTripAria, { count: saved.length })}
              title={t.nav.myTrip}
              className={cn(
                "relative grid h-11 w-11 place-items-center rounded-full transition",
                glass ? "bg-white/15 text-white hover:bg-white/25" : isActive("/my-trip") ? "bg-brand-50 text-sun" : "bg-sand text-ink hover:bg-jute hover:text-sun",
              )}
            >
              <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill={saved.length ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                <path d="M12 20.5s-7.5-4.6-9.3-9.1C1.5 8.3 3.6 5 7 5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.4 0 5.5 3.3 4.3 6.4-1.8 4.5-9.3 9.1-9.3 9.1z" />
              </svg>
              {saved.length > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-[0.65rem] font-bold text-white ring-2 ring-white">{saved.length}</span>
              )}
            </Link>
            <Link
              href="/destinations"
              className={cn(
                "group hidden items-center gap-2 rounded-full py-2.5 pr-2.5 pl-5 text-sm font-semibold whitespace-nowrap shadow-sm transition sm:inline-flex",
                glass ? "bg-white text-brand-700 hover:bg-brand-50" : "bg-brand-600 text-white hover:bg-brand-700",
              )}
            >
              {t.nav.planTrip}
              <span aria-hidden className={cn("grid h-7 w-7 place-items-center rounded-full transition group-hover:translate-x-0.5", glass ? "bg-brand-600 text-white" : "bg-white/20")}>
                →
              </span>
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full transition md:hidden",
                glass ? "bg-white/15 text-white hover:bg-white/25" : "bg-sand text-ink hover:bg-jute",
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* ---- Mobile menu sheet ---- */}
        <div
          id="mobile-menu"
          className={cn(
            "mx-auto mt-2 max-w-7xl origin-top rounded-[2rem] bg-white p-3 shadow-2xl shadow-brand-900/20 ring-1 ring-jute transition duration-200 md:hidden",
            mobileOpen ? "visible scale-100 opacity-100" : "invisible pointer-events-none scale-95 opacity-0",
          )}
        >
          <ul className="space-y-1">
            {[
              { href: "/explore", icon: "🔎", ...t.nav.mobile.explore },
              { href: "/destinations", icon: "🗺️", ...t.nav.mobile.destinations },
              { href: "/gallery", icon: "📸", ...t.nav.mobile.gallery },
              { href: "/my-trip", icon: "❤️", ...t.nav.mobile.myTrip, label: `${t.nav.mobile.myTrip.label}${saved.length ? ` (${saved.length})` : ""}` },
              ...TOOLS,
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn("flex items-center gap-3.5 rounded-2xl p-3 transition hover:bg-sand", isActive(l.href) && "bg-brand-50")}
                >
                  <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sand text-xl">{l.icon}</span>
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{l.label}</span>
                    <span className="block text-xs text-muted">{l.text}</span>
                  </span>
                  <span aria-hidden className="text-muted">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/destinations" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-2xl bg-brand-600 py-3.5 text-center font-semibold text-white">
            {t.nav.planTrip} →
          </Link>
        </div>
      </header>

      {/* Spacer so solid-header pages don't start underneath the fixed bar */}
      {!overlay && <div aria-hidden className="h-[5.25rem] print:hidden" />}
    </>
  );
}
