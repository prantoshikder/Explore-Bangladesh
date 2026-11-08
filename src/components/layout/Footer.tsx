/**
 * Site footer
 *  1. Wave edge (mirrors the hero wave)
 *  2. Brand + mission, with quick-info cards (emergency number, exchange rate, best season)
 *  3. Link columns: Destinations · Plan · Before you fly
 *  4. Photo strip from the gallery
 *  5. Oversized faded wordmark + bottom bar (©, freshness note, back to top)
 * Server component — no client JS.
 */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { ESSENTIALS_LAST_VERIFIED, BDT_PER_USD } from "@/data/essentials";
import { getFeaturedSummaries } from "@/data/destinations";
import { getGalleryItems } from "@/data/gallery";
import { monthYear } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";
import { fmt } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-0 text-brand-100/80 transition-all hover:gap-2 hover:text-white">
      <span aria-hidden className="h-px w-0 bg-sun transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-200">{children}</p>;
}

export async function Footer() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const f = t.footer;
  const destinations = getFeaturedSummaries(locale).slice(0, 6);
  const photos = getGalleryItems(locale).slice(0, 6);
  const year = ESSENTIALS_LAST_VERIFIED.slice(0, 4); // static, so pages stay prerenderable

  const PLAN_LINKS = [
    { href: "/explore", label: f.links.explore },
    { href: "/destinations", label: f.links.destinations },
    { href: "/gallery", label: f.links.gallery },
    { href: "/tools/cost-calculator", label: f.links.calculator },
    { href: "/transport-guide", label: f.links.transport },
    { href: "/my-trip", label: f.links.myTrip },
  ];
  const FLY_LINKS = [
    { href: "/essentials#visa", label: f.links.visa },
    { href: "/essentials#currency", label: f.links.money },
    { href: "/essentials#sim", label: f.links.sim },
    { href: "/essentials#safety", label: f.links.safety },
    { href: "/phrases", label: f.links.phrases },
    { href: "/contact", label: f.links.contact },
  ];

  const facts = [
    { icon: "🚨", label: f.emergency, value: "999" },
    { icon: "💱", label: f.exchangeRate, value: `$1 ≈ ৳${BDT_PER_USD}` },
    { icon: "🌤️", label: f.bestSeason, value: f.bestSeasonValue },
  ];

  return (
    <footer className="relative mt-32 bg-brand-900 text-brand-100 print:hidden">
      {/* 1. Wave edge — same shape as the hero, flipped */}
      <svg aria-hidden className="absolute -top-[59px] left-0 block h-[60px] w-full text-brand-900" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 40 C 240 0, 480 60, 720 30 S 1200 0, 1440 25 V60 H0Z" />
      </svg>

      {/* Soft decorative glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-6rem] h-80 w-80 rounded-full bg-sun/15 blur-3xl" />
        <div className="absolute bottom-0 left-[-8rem] h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* 2. Brand + quick info */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Logo idPrefix="footer-logo" tone="light" />
            <p className="mt-6 max-w-md font-display text-2xl leading-snug text-white sm:text-3xl">
              {f.tagline} <em className="text-brand-200">{f.taglineAccent}</em>
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                <span aria-hidden className="text-xl">{f.icon}</span>
                <dt className="mt-2 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-200/70">{f.label}</dt>
                <dd className="mt-0.5 font-display text-lg font-semibold text-white sm:text-xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3 + 4. Link columns and photo strip */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr]">
          <nav aria-label={f.destinations}>
            <ColumnTitle>{f.destinations}</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <FooterLink href={d.hasFullGuide ? `/destinations/${d.slug}` : `/destinations?q=${encodeURIComponent(d.name.split(" (")[0])}`}>
                    {d.name.split(" (")[0]}
                    {d.hasFullGuide && <span className="ml-2 rounded-full bg-brand-500/30 px-1.5 py-0.5 text-[0.6rem] font-bold text-brand-100">{f.guideBadge}</span>}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={f.planYourTrip}>
            <ColumnTitle>{f.planYourTrip}</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {PLAN_LINKS.map((l) => <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </nav>

          <nav aria-label={f.beforeYouFly}>
            <ColumnTitle>{f.beforeYouFly}</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {FLY_LINKS.map((l) => <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </nav>

          <div>
            <ColumnTitle>{f.fromGallery}</ColumnTitle>
            <ul className="grid grid-cols-3 gap-2">
              {photos.map((p) => (
                <li key={p.photo.src}>
                  <Link href="/gallery" aria-label={`${f.fromGallery}: ${p.photo.caption ?? p.place}`} className="group relative block aspect-square overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image src={p.photo.src} alt={p.photo.alt} fill sizes="120px" className="object-cover transition duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 bg-brand-900/20 transition group-hover:bg-transparent" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/gallery" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-200">
              {f.viewGallery} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Oversized wordmark */}
      <div aria-hidden className="relative -mt-16 overflow-hidden sm:-mt-24">
        <p className="mx-auto max-w-7xl translate-y-[18%] px-4 text-center font-display text-[17vw] leading-none font-semibold tracking-tight text-white/[0.04] select-none sm:px-6 lg:px-8 xl:text-[13rem]">
          {locale === "bn" ? "বাংলাদেশ" : "Bangladesh"}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-black/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-brand-200/70 sm:flex-row sm:px-6 lg:px-8">
          <p>{fmt(f.copyright, { year, date: monthYear(ESSENTIALS_LAST_VERIFIED, t.labels.months) })}</p>
          <div className="flex flex-wrap items-center gap-3">
          <LanguageSwitcher tone="dark" />
          <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20">
            {f.backToTop}
            <span aria-hidden className="transition group-hover:-translate-y-0.5">↑</span>
          </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
