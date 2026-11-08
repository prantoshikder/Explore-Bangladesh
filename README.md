# Explore Bangladesh 🇧🇩

Beginner-friendly, step-by-step travel guides for Bangladesh. Built with **Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS v4**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # all guides are prerendered as static pages
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero + search (division / budget / trip type), top-destinations carousel, travel essentials, tools teaser |
| `/destinations` | Filterable grid (filters live in the URL: `?division=&budget=&type=&q=`) |
| `/destinations/[slug]` | Full guide template: 7 sections (overview, how to reach, budget, stay, food, rules, map + itinerary) |
| `/tools/cost-calculator` | Days × people × travel style → itemised BDT/USD estimate |
| `/transport-guide` | Plain-English explainer for CNG, Chander Gari, Launch, Leguna, train classes… |
| `/essentials` | Visa, safety, currency, airport SIM guide |

## Architecture

```
src/
├─ types/destination.ts           ← the data contract every guide must follow
├─ data/
│  ├─ destinations/
│  │  ├─ coxs-bazar.json          ← full guide (template to copy)
│  │  ├─ sajek-valley.json        ← full guide
│  │  └─ index.ts                 ← registry + helper functions (swap for a CMS later)
│  ├─ transport-glossary.ts       ← every TransportMode explained
│  └─ essentials.ts               ← visa / safety / currency / SIM + BDT_PER_USD rate
├─ lib/format.ts                  ← ৳ / $ formatting, cn()
├─ components/
│  ├─ layout/   Navbar, Footer
│  ├─ ui/       Badge (difficulty), DestinationCard, ModeChip ("What's this?"), SectionHeading
│  ├─ home/     HeroSearch, DestinationCarousel, EssentialsGrid, DestinationExplorer, filters.ts
│  ├─ destination/  one component per guide section + RouteTabs (step cards)
│  └─ tools/    CostCalculator (UI) + cost.ts (pure maths)
└─ app/        pages (server components; only interactive widgets are client components)
```

### Key design rules
- **Never assume local knowledge:** every journey step has a `mode` (e.g. `"cng"`). The UI automatically links it to `/transport-guide#cng`.
- **Prices are stored in BDT only.** USD is calculated from `BDT_PER_USD` in `src/data/essentials.ts`, so you update one number when the rate changes.
- **`lastVerified`** on each guide is shown to travellers, so they know how fresh the prices are.

## Adding a new destination (scaling to 50+)

1. Copy `src/data/destinations/coxs-bazar.json` to `<slug>.json` and fill it in.
2. In `src/data/destinations/index.ts`, import the file, add it to `FULL_GUIDES`, and remove its entry from `UPCOMING_SPOTS`.
3. Run `npm run build`. TypeScript catches missing fields, and the page is generated automatically.

Spots without a full guide yet go in `UPCOMING_SPOTS` (card data only). They show in search and the carousel as "Guide coming soon".

### Photos
Real photos of each place live in `public/images/` and are served through `next/image`, which handles resizing, WebP and lazy loading. They come from **Wikimedia Commons** under CC0 / CC BY / CC BY-SA licences, and **attribution is required**.

- Each destination has a `cover` (and optionally `gallery`) `Photo` with `src`, `alt`, `caption` and `credit { author, license, source }`.
- Credits appear in the `/gallery` lightbox (open a photo to see author + licence). Every photo used on the site must also be in the gallery, which happens automatically for destination photos. Inline credits on images are hidden; set `SHOW_INLINE_CREDITS = true` in `src/components/ui/PhotoCredit.tsx` to show them again.
- To add a photo for a new spot: save it as `public/images/destinations/<slug>.jpg` (about 1920px wide is plenty), then fill in `cover` with the author, licence and Commons page URL.

> ⚠️ All prices, timetables and permit rules are estimates for the 2025–26 season. Verify them before publishing.

## SEO & marketing

**Before launch:** set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the real domain. Canonical URLs, the sitemap, OG images and structured data are all built from it. Site name, description and keywords live in `src/lib/site.ts`; add social profile URLs to `SITE.socials` and an X handle to `SITE.twitter` when you have them.

| What | Where |
| --- | --- |
| Title, description, canonical, Open Graph, Twitter card | root `src/app/layout.tsx` + `pageMetadata()` in `src/lib/seo.ts` |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` (new guides are added automatically) |
| Share images (1200×630) | `src/app/opengraph-image.tsx`, `src/app/destinations/[slug]/opengraph-image.tsx`, renderer in `src/lib/og.tsx` |
| Structured data (JSON-LD) | Organization + WebSite (search box) in layout; ItemList on home; TouristDestination, TouristTrip, BreadcrumbList, FAQPage, WebPage on each guide |
| FAQ (auto-generated from guide data) | `src/lib/faq.ts` → `FaqSection` |
| Share buttons, related destinations, planning CTA | `ShareButtons`, `RelatedSection` |

After deploying: submit `https://<your-domain>/sitemap.xml` in Google Search Console, then check a guide page with Google's Rich Results Test.

## Explore by district (`/explore`) & tourist spots (`/spots/[slug]`)

Type a district, division or place name (English or বাংলা, old spellings like "Chittagong" or "Bogra" work too) to see every tourist spot there with photos. Each spot has its own page with directions, entry fee, opening hours, tips and a map.

| What | Where |
| --- | --- |
| Spot data (50 spots, 15 districts) | `src/data/spots/group-a.ts`, `group-b.ts`, `group-c.ts` (type: `src/types/spot.ts`) |
| Spot photos (one per slug) | `src/data/spots/photos.ts` → files in `public/images/spots/` |
| All 64 districts + Bangla names + aliases | `src/data/districts.ts` |
| Search logic (aliases, Bangla, typos, categories) | `src/lib/spot-search.ts` |
| UI | `src/components/spots/SpotExplorer.tsx`, `SpotCardView.tsx`, `src/app/spots/[slug]/page.tsx` |

**Add a spot:** add an entry to a group file (or create `group-d.ts` and register it in `src/data/spots/index.ts`), save its photo as `public/images/spots/<slug>.jpg`, and add a line to `SPOT_PHOTOS` with the author, licence and Commons URL. The build fails with a clear message if a spot has no photo or an unknown district. Spot photos are added to `/gallery` automatically (that's where credits are shown).

> ⚠️ Spot fees, opening hours, boat/transport prices and some coordinates are approximate (marked "approx." in the data). Verify them before publishing.

## Traveller helpers

| Feature | Where |
| --- | --- |
| ❤️ Save places to **My Trip** (`/my-trip`, grouped by district, share link `?s=slug1,slug2`, print) | `src/lib/saved-spots.ts` (localStorage store), `SaveButton`, `src/components/trip/MyTrip.tsx` |
| 🚖 **Show to driver**: full-screen Bangla place name for CNG/rickshaw drivers | `src/components/ui/ShowToDriver.tsx` (spot pages + guide heroes) |
| 🗣️ **Bangla phrasebook** (`/phrases`, 40+ phrases, listen / copy / show big) | `src/data/phrases.ts`, `src/components/phrases/Phrasebook.tsx` |
| Reading progress bar + back-to-top button | `src/components/layout/ScrollHelpers.tsx` |
| Print-friendly pages (nav, footer, maps and buttons hidden) | `print:` classes + `@media print` in `globals.css` |
| Press <kbd>/</kbd> on `/explore` to jump to search | `SpotExplorer.tsx` |

Saved places live only in the visitor's browser (no account). "Listen" in the phrasebook appears only when the device has a Bangla text-to-speech voice.

## Unsplash photos (optional)

The site can swap its photos for high-resolution Unsplash photos where a genuine match exists. Without a key nothing changes.

1. Create a free app at <https://unsplash.com/developers> → **New Application**, then copy the **Access Key** (not the Secret).
2. Put it in `.env.local` (already created, git-ignored): `UNSPLASH_ACCESS_KEY=your_key`
3. Run `npm run unsplash:sync`. It searches ~46 slots (hero, destination covers, spots, food, transport) listed at the top of `scripts/unsplash-sync.mjs`.
4. Open **`unsplash-review.html`** (project root) to see every pick. To change one, edit `selected` (0, 1, 2 or `null`) for that slot in `src/data/unsplash.json`, then run `npm run unsplash:sync -- --ping`.
5. Restart `npm run dev` / rebuild.

How it works:
- A photo is only used automatically when its Unsplash description or tags mention the place (`must` words per slot), so Bangladesh pages don't show the wrong country. Others stay on the current Commons photo but appear in the review sheet.
- Demo keys allow **50 requests/hour** (2 per slot). The script stops cleanly at the limit; run it again later and it continues. Apply for Production access on the Unsplash dashboard for 5,000/hour.
- Unsplash API rules are followed: images are hotlinked from `images.unsplash.com` (allowed in `next.config.ts`), the download endpoint is pinged for each selected photo, and the photographer + Unsplash are credited with links in the gallery lightbox.
- Code: `src/data/unsplash.ts` (`withUnsplash(slot, fallback)`), manifest `src/data/unsplash.json`.

## Coverage (Oct 2026)

- **9 full destination guides:** Cox's Bazar, Sajek Valley, Sundarbans, Sylhet (Jaflong & Ratargul), Sreemangal, Saint Martin's Island, Bandarban, Old Dhaka, Paharpur (`src/data/destinations/*.json`).
- **67 tourist spots in 29 districts** (`src/data/spots/group-a…d.ts`). Spots link to the guide that covers them via `GUIDE_FOR_SPOT` in `src/data/spots/index.ts`.
- A destination listed without a full guide (see `UPCOMING_SPOTS`) links to `/explore` for that place instead of a dead card.

## Contact & corrections

`/contact` opens the visitor's email app with a pre-filled message (no server needed). **Set `contactEmail` in `src/lib/site.ts`** — until then the form tells visitors it is being set up. Every guide (under the FAQ) and spot page (sidebar) links to it with the page pre-filled as a correction.

> ⚠️ All guides and spots were written from general knowledge; fees, train/bus fares and timetables, hotel names/prices and some coordinates are marked "approx." and should be checked by someone local before launch.
