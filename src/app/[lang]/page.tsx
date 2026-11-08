/**
 * Homepage
 *  1. Hero: photo background, headline, search, postcard collage
 *  2. Stats strip — frosted glass inside the hero (numbers derived from real data)
 *  3. Top destinations carousel
 *  4. "Pick your kind of trip" photo bento
 *  5. How it works (green band)
 *  6. When to go (seasons)
 *  7. Quick travel essentials
 *  8. Tools: transport explainer + cost calculator preview
 *  9. Final call to action
 */
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroCollage } from "@/components/home/HeroCollage";
import { DestinationCarousel } from "@/components/home/DestinationCarousel";
import { EssentialsGrid } from "@/components/home/EssentialsGrid";
import { SeasonGuide } from "@/components/home/SeasonGuide";
import { SectionIntro } from "@/components/home/SectionIntro";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";
import { TopSpots } from "@/components/spots/TopSpots";
import { getTopSpots } from "@/data/spots/top";
import { getGalleryItems } from "@/data/gallery";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { MiniCalculator } from "@/components/home/MiniCalculator";
import { PHRASE_GROUPS } from "@/data/phrases";
import { TRANSPORT_PHOTOS } from "@/data/media";
import { getAllDestinations, getAllSummaries, getFeaturedSummaries, getHeroPhoto } from "@/data/destinations";
import { getAllSpots } from "@/data/spots";
import { getFoods, getGlossary, getPhraseGroups } from "@/data/localized";
import { absoluteUrl, jsonLd } from "@/lib/site";
import { fmt, localizePath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import type { TripType } from "@/types/destination";

/* "How it works" icons; titles and text come from t.home.how.steps (same order). */
const STEP_ICONS = ["🗺️", "🚆", "💰", "🗣️"];

/**
 * "Pick your kind of trip" photo grid. Each tile borrows the cover photo of a
 * destination and links to the /destinations list filtered by that trip type.
 * The first tile spans two rows on desktop (bento layout).
 */
const EXPERIENCES: { type: Extract<TripType, "Hills" | "Beach" | "Forest" | "Heritage" | "Island">; photoFrom: string }[] = [
  { type: "Hills", photoFrom: "sajek-valley" },
  { type: "Beach", photoFrom: "coxs-bazar" },
  { type: "Forest", photoFrom: "sundarbans" },
  { type: "Heritage", photoFrom: "old-dhaka" },
  { type: "Island", photoFrom: "saint-martins-island" },
];

/* Phrases teased on the homepage (matched in the English phrasebook, shown from the localized one). */
const TEASER_PHRASES = ["How much is the fare?", "Less spicy, please", "Thank you"];

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getT();
  const featured = getFeaturedSummaries(locale);
  const all = getAllSummaries(locale);
  const guides = getAllDestinations(locale);
  const bySlug = (slug: string) => all.find((d) => d.slug === slug)!;
  const heroPhoto = getHeroPhoto(locale);
  const glossary = getGlossary(locale);

  /* Honest, data-derived numbers (no invented reviews or visitor counts). */
  const transportTerms = Object.keys(glossary).length - 1;
  const stats = [
    { value: String(all.length), label: t.home.stats.destinations },
    { value: String(guides.reduce((n, d) => n + d.howToReach.routes.reduce((m, r) => m + r.steps.length, 0), 0)), label: t.home.stats.routeCards },
    { value: String(transportTerms), label: t.home.stats.transport },
    { value: "৳ + $", label: t.home.stats.prices },
  ];

  /* ItemList structured data for the featured destinations. */
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.home.top.eyebrow,
    itemListElement: featured.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      ...(d.hasFullGuide ? { url: absoluteUrl(localizePath(locale, `/destinations/${d.slug}`)) } : {}),
    })),
  };

  const experiences = EXPERIENCES.map((e) => ({ ...e, ...t.home.experiences[e.type], photo: bySlug(e.photoFrom).cover }));
  /* Tools section: four vehicles with real photos, and a few phrases to tease the phrasebook */
  const vehicles = (["cng", "chander-gari", "launch", "rickshaw"] as const).map((id) => ({ ...glossary[id], photo: TRANSPORT_PHOTOS[id]! }));
  const allPhrasesEn = PHRASE_GROUPS.flatMap((g) => g.phrases);
  const allPhrases = getPhraseGroups(locale).flatMap((g) => g.phrases);
  const teaserPhrases = TEASER_PHRASES.map((en) => allPhrases[allPhrasesEn.findIndex((p) => p.en === en)]).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  /* Live mini calculator uses a real guide's budget data */
  const sample = guides.find((d) => d.slug === "coxs-bazar") ?? guides[0];

  const finalPhoto = bySlug("sajek-valley").cover;

  /* Photo ribbon: spot photos (they link to their spot pages), split into two rows */
  const ribbon = getGalleryItems(locale).filter((g) => g.href?.startsWith("/spots/"));
  const ribbonTop = ribbon.filter((_, i) => i % 2 === 0).slice(0, 12);
  const ribbonBottom = ribbon.filter((_, i) => i % 2 === 1).slice(0, 12);

  const topSpots = getTopSpots(10, locale);
  const spotCount = getAllSpots(locale).length;

  /* Food bento: first tile is big */
  const foods = getFoods(locale).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(listJsonLd) }} />

      {/* ============================== 1. HERO ============================== */}
      {/* No overflow-hidden on the section itself: the search dropdowns must be able to extend below it */}
      <section className="relative bg-brand-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={heroPhoto.src} alt={heroPhoto.alt} fill preload sizes="100vw" className="object-cover" style={{ objectPosition: heroPhoto.position ?? "center" }} />
          {/* Dark only behind the text on the left; clear on the right and top so the snow peaks glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/75 via-brand-900/10 to-transparent" />
          <svg aria-hidden className="absolute -bottom-px left-0 block w-full text-sand" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0 80 C 240 20, 480 120, 720 70 S 1200 10, 1440 60 V120 H0Z" />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-32 pb-12 sm:px-6 sm:pt-40 lg:min-h-[760px] lg:grid-cols-[1.25fr_1fr] lg:px-8">
          <div>
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100 ring-1 ring-white/20 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sun" />
              </span>
              {t.home.badge}
            </p>
            <h1 className="animate-fade-up mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-tight text-white sm:text-7xl" style={{ animationDelay: "0.1s" }}>
              {t.home.title}
              <br />
              <em className="font-normal text-brand-200">{t.home.titleAccent}</em>
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-brand-100/90 sm:text-xl" style={{ animationDelay: "0.2s" }}>
              {t.home.intro}
            </p>
            {/* relative z-20: the fade-up animation creates its own stacking context, so lift
                the whole search box above the stats strip or the open dropdowns get covered */}
            <div className="animate-fade-up relative z-20 mt-9" style={{ animationDelay: "0.3s" }}>
              <HeroSearch />
            </div>
            <p className="animate-fade-up mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/75" style={{ animationDelay: "0.4s" }}>
              <span className="font-semibold text-white/90">{t.home.popular}</span>
              {guides.map((d) => (
                <Link key={d.slug} href={`/destinations/${d.slug}`} className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white">
                  {d.name}
                </Link>
              ))}
            </p>
          </div>

          <HeroCollage items={[bySlug("sajek-valley"), bySlug("coxs-bazar"), bySlug("old-dhaka")]} />
        </div>

        {/* ---- 2. STATS: frosted-glass strip inside the hero, clear of the bottom wave ---- */}
        <div className="relative mx-auto max-w-7xl px-4 pb-28 sm:px-6 sm:pb-36 lg:px-8">
          <dl aria-label={t.home.stats.ariaLabel} className="animate-fade-up grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 shadow-2xl shadow-black/20 ring-1 ring-white/20 backdrop-blur-md lg:grid-cols-4" style={{ animationDelay: "0.5s" }}>
            {stats.map((s) => (
              <div key={s.label} className="bg-brand-900/35 px-5 py-6 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold text-white sm:text-5xl">{s.value}</dd>
                <dd className="mt-1.5 text-xs font-medium text-brand-100/80 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PhotoCredit photo={heroPhoto} className="absolute top-24 right-4 hidden rounded-full bg-black/30 px-3 py-1 text-white/85 backdrop-blur sm:right-8 lg:block" />
      </section>

      {/* ======================= 3. TOP DESTINATIONS ======================== */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={t.home.top.eyebrow} title={t.home.top.title} text={t.home.top.text} />
        <DestinationCarousel items={featured} />
      </section>

      {/* ======================== TOP TOURIST SPOTS ======================= */}
      <section className="reveal mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow={t.home.topSpots.eyebrow}
          title={<>{t.home.topSpots.title} <em className="font-normal text-brand-600">{t.home.topSpots.titleAccent}</em></>}
          text={t.home.topSpots.text}
          link={{ href: "/explore", label: t.home.topSpots.link }}
        />
        <TopSpots spots={topSpots} />
      </section>

      {/* ========================= 4. KIND OF TRIP ========================= */}
      <section className="reveal mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={t.home.kind.eyebrow} title={t.home.kind.title} link={{ href: "/destinations", label: t.home.kind.link }} />
        <div className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <Link
              key={e.type}
              href={`/destinations?type=${encodeURIComponent(e.type)}`}
              className={`group relative overflow-hidden rounded-[1.75rem] bg-brand-900 ${i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}
            >
              <Image
                src={e.photo.src}
                alt={e.photo.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">{t.labels.tripType[e.type]}</p>
                  <p className={`font-display font-semibold ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl"}`}>{e.title}</p>
                  <p className="mt-1 text-sm text-white/80">{e.text}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-brand-700 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====================== PHOTO RIBBON (marquee) ===================== */}
      <section aria-label={t.home.marquee.aria} className="pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow={t.home.marquee.eyebrow} title={fmt(t.home.marquee.title, { count: spotCount })} link={{ href: "/explore", label: t.home.marquee.link }} />
        </div>
        <PhotoMarquee top={ribbonTop} bottom={ribbonBottom} />
      </section>

      {/* ========================= 5. HOW IT WORKS ========================= */}
      <section className="relative mt-24 overflow-hidden bg-brand-900 py-20">
        <div aria-hidden className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-sun/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro tone="light" eyebrow={t.home.how.eyebrow} title={t.home.how.title} text={t.home.how.text} />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.how.steps.map((s, i) => (
              <li key={s.title} className="reveal relative rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-lg">{STEP_ICONS[i]}</span>
                  <span className="font-display text-5xl font-semibold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================== 6. WHEN TO GO ========================== */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={t.home.seasons.eyebrow} title={t.home.seasons.title} text={t.home.seasons.text} />
        <SeasonGuide all={all} />
      </section>

      {/* ======================= TASTE OF BANGLADESH ======================= */}
      <section className="reveal mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={t.home.taste.eyebrow} title={t.home.taste.title} text={t.home.taste.text} link={{ href: "/gallery", label: t.home.taste.link }} />
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 lg:auto-rows-[240px]">
          {foods.map((f, i) => (
            <figure key={f.id} className={`group relative overflow-hidden rounded-[1.75rem] bg-brand-900 ${i === 0 ? "col-span-2 row-span-2" : i === 5 ? "col-span-2" : ""}`}>
              <Image src={f.photo.src} alt={f.photo.alt} fill sizes={i === 0 || i === 5 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-semibold text-white/70">{f.bn}</p>
                <p className={`font-display font-semibold leading-tight ${i === 0 ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{f.name}</p>
                <p className={`mt-1 text-sm text-white/85 ${i === 0 ? "max-w-md" : "line-clamp-2 max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100"}`}>{f.blurb}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ======================== 7. TRAVEL ESSENTIALS ===================== */}
      <section className="reveal mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={t.home.essentials.eyebrow} title={t.home.essentials.title} link={{ href: "/essentials", label: t.home.essentials.link }} />
        <EssentialsGrid />
      </section>

      {/* ============================= 8. TOOLS ============================ */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={t.home.tools.eyebrow} title={<>{t.home.tools.title} <em className="font-normal text-brand-600">{t.home.tools.titleAccent}</em></>} text={t.home.tools.text} />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ---- Getting around: real photos of the vehicles ---- */}
          <article className="reveal flex flex-col rounded-[2rem] bg-white p-6 ring-1 ring-jute sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">{t.home.tools.gettingAround}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{t.home.tools.cngTitle}</h3>
                <p className="mt-2 text-muted">{t.home.tools.cngText}</p>
              </div>
              <span aria-hidden className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl sm:grid">🛺</span>
            </div>
            <ul className="mt-6 grid flex-1 grid-cols-2 gap-3">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <Link href={`/transport-guide#${v.id}`} className="group relative block h-full min-h-44 overflow-hidden rounded-2xl bg-brand-900">
                    <Image src={v.photo.src} alt={v.photo.alt} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                      <p className="font-display text-lg font-semibold leading-tight">{v.term.replace(/ \(.*\)/, "")}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-white/80">{v.typicalFare}</p>
                    </div>
                    <span aria-hidden className="absolute top-2.5 right-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-sm text-brand-700 opacity-0 transition group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/transport-guide" className="group mt-6 inline-flex items-center gap-2 self-start rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-brand-700 ring-1 ring-jute transition hover:bg-brand-600 hover:text-white">
              {fmt(t.home.tools.allVehicles, { count: transportTerms })} <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </article>

          {/* ---- Live mini calculator over a photo ---- */}
          <article className="reveal relative overflow-hidden rounded-[2rem] bg-brand-900 p-6 text-white sm:p-8">
            <Image src={sample.cover.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-brand-900/85 to-brand-700/70" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200">{t.home.tools.calcEyebrow}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{t.home.tools.calcTitle}</h3>
              <p className="mt-2 text-brand-100/85">{t.home.tools.calcText}</p>
              <div className="mt-6">
                <MiniCalculator destination={sample.name} tiers={sample.budget.tiers} />
              </div>
            </div>
          </article>
        </div>

        {/* ---- Phrasebook strip ---- */}
        <Link href="/phrases" className="reveal group mt-6 flex flex-col gap-5 overflow-hidden rounded-[2rem] bg-sun/10 p-6 ring-1 ring-sun/20 transition hover:bg-sun/15 sm:p-8 lg:flex-row lg:items-center">
          <div className="lg:w-64 lg:shrink-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{t.home.tools.phraseEyebrow}</p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{t.home.tools.phraseTitle}</p>
            <p className="mt-1 text-sm text-muted">{fmt(t.home.tools.phraseText, { count: allPhrases.length })}</p>
          </div>
          <ul className="no-scrollbar -mx-2 flex flex-1 gap-3 overflow-x-auto px-2">
            {teaserPhrases.map((p) => (
              <li key={p.bn} className="min-w-48 flex-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-jute">
                <p lang="bn" className="text-xl font-semibold text-brand-700">{p.bn}</p>
                <p className="mt-0.5 text-xs text-ink/70 italic">&ldquo;{p.say}&rdquo;</p>
                <p className="mt-1 text-xs font-medium text-muted">{p.en}</p>
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-white transition group-hover:gap-3 lg:self-center">
            {t.home.tools.openPhrasebook} →
          </span>
        </Link>
      </section>

      {/* ========================== 9. FINAL CTA ========================== */}
      <section className="reveal mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-900 px-6 py-20 text-center sm:px-16 sm:py-28">
          <Image src={finalPhoto.src} alt={finalPhoto.alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/70 to-brand-900/40" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200">{t.home.cta.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-6xl">
              {t.home.cta.title} <em className="font-normal text-brand-200">{t.home.cta.titleAccent}</em>
            </h2>
            <p className="mt-5 text-lg text-brand-100/90">{t.home.cta.text}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/destinations" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50">
                {t.home.cta.primary}
              </Link>
              <Link href="/essentials" className="rounded-full px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/50 transition hover:bg-white/10">
                {t.home.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
