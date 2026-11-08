<div align="center">

# 🇧🇩 Explore Bangladesh

**Step-by-step travel guides for people who have never been to Bangladesh.**

Clear routes from Dhaka airport to the exact spot, honest prices in Taka and dollars,
and every local word (CNG, Chander Gari, Launch…) explained in plain English.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

</div>

---

## ✨ What's inside

| | |
| --- | --- |
| 🗺️ **9 full destination guides** | Cox's Bazar, Sajek Valley, Sundarbans, Sylhet (Jaflong & Ratargul), Sreemangal, Saint Martin's Island, Bandarban, Old Dhaka, Paharpur |
| 📍 **67 tourist spots in 29 districts** | Each with directions, entry fee, opening hours, tips and a map |
| 🔎 **Explore by district** | Type a district or place (English, বাংলা or old spellings like "Chittagong") and see every spot with photos |
| 🧮 **Trip cost calculator** | Days × people × travel style → itemised estimate in BDT and USD |
| 🛺 **Transport explained** | What a CNG, Chander Gari, Leguna or Launch is, typical fares, how to book trains |
| 🗣️ **Bangla phrasebook** | 40+ phrases with pronunciation, listen, copy and "show big" |
| ❤️ **My Trip** | Save places (no account), grouped by district, shareable link, printable |
| 🚖 **Show to driver** | Full-screen Bangla place name to show CNG and rickshaw drivers |
| 📸 **Photo gallery** | Grid with lightbox, infinite scroll and "Load more"; photo credits live here |
| 🌐 **English ⇄ বাংলা** | Every page and all content in both languages, one-tap switcher |
| 🔍 **SEO-ready** | Metadata, sitemap, robots, OG share images, JSON-LD (FAQ, breadcrumbs, places) |

---

## 🚀 Getting started

**Requirements:** Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then edit the values (see below)
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (all guides and spots are prerendered) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run unsplash:sync` | Optional: pick Unsplash photos (see [Unsplash photos](#-unsplash-photos-optional)) |

### Environment variables

| Variable | Required | Used for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Before launch | Canonical URLs, sitemap, robots, OG images, structured data. No trailing slash. |
| `UNSPLASH_ACCESS_KEY` | No | Only for `npm run unsplash:sync`. |

> 🔐 Put real keys only in `.env.local` (git-ignored). Never put them in `.env.example`, because that file is committed.

---

## 🧭 Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero search, top destinations, top 10 spots, seasons, food, tools |
| `/destinations` | All guides, filterable by division, budget and trip type (filters live in the URL) |
| `/destinations/[slug]` | Full guide: overview, how to reach, budget, stay, food, rules, map & itinerary, FAQ |
| `/explore` | Search by district or place, browse by district |
| `/spots/[slug]` | One tourist spot: directions, fee, hours, tips, map |
| `/gallery` | Every photo on the site, with credits in the lightbox |
| `/essentials` | Visa, money, SIM card, safety |
| `/transport-guide` | Every local vehicle explained |
| `/tools/cost-calculator` | Trip budget calculator |
| `/phrases` | Bangla phrasebook |
| `/my-trip` | Saved places (`?s=slug1,slug2` opens a shared list) |
| `/contact` | Questions and corrections (opens the visitor's email app) |

---

## 🏗️ Project structure

```
src/
├─ app/[lang]/               Pages (one tree serves /… English and /bn/… Bangla)
├─ app/                      sitemap, robots, manifest, icons, globals.css
├─ proxy.ts                  Language routing
├─ components/
│  ├─ layout/                Navbar, Footer, ScrollHelpers
│  ├─ home/                  Hero search, carousel, mini calculator, seasons…
│  ├─ destination/           One component per guide section + RouteTabs
│  ├─ spots/                 SpotExplorer, SpotCardView, TopSpots
│  ├─ gallery/ trip/ phrases/ tools/ contact/
│  └─ ui/                    Badge, Cards, PageHero, Select, ShowToDriver, SaveButton…
├─ data/
│  ├─ destinations/*.json    Full guides (index.ts = registry + getters)
│  ├─ spots/group-a…d.ts     Tourist spots (photos.ts, top.ts, index.ts)
│  ├─ districts.ts           All 64 districts + Bangla names + spelling aliases
│  ├─ transport-glossary.ts  Local vehicles explained
│  ├─ essentials.ts          Visa / money / SIM / safety + BDT_PER_USD rate
│  ├─ phrases.ts             Phrasebook
│  ├─ gallery.ts media.ts    Gallery list, food & transport photos
│  └─ unsplash.ts/.json      Optional Unsplash photo overrides
├─ i18n/                    Languages: config, dictionaries (en + bn), helpers
├─ lib/                      SEO, site config, FAQ builder, search, formatting
└─ types/                    Data contracts (destination.ts, spot.ts)
```

**Built with:** Next.js 16 App Router with Cache Components, React Server Components (only interactive widgets are client components), Tailwind CSS v4, `next/image` and `next/font`.

### Design rules

- **Never assume local knowledge.** Every journey step has a `mode` (e.g. `"cng"`), and the UI links it to `/transport-guide#cng` automatically.
- **Prices are stored in BDT only.** USD is calculated from `BDT_PER_USD` in `src/data/essentials.ts`, so one number updates the whole site.
- **Freshness is visible.** Each guide's `lastVerified` date is shown to travellers.
- **Interface text lives in the dictionaries** (`src/i18n/dictionaries/en.ts` + `bn.ts`). Change a label there instead of hunting through components.

---

## ➕ Adding content

### A new destination guide

1. Copy `src/data/destinations/coxs-bazar.json` to `<slug>.json` and fill it in.
2. Import it in `src/data/destinations/index.ts` and add it to `FULL_GUIDES`.
3. Add a cover photo (see below) and run `npm run build`. TypeScript flags missing fields, and the page, sitemap entry, OG image and FAQ are generated automatically.

### A new tourist spot

1. Add an entry to one of `src/data/spots/group-*.ts` (type: `src/types/spot.ts`).
2. Save the photo as `public/images/spots/<slug>.jpg` and add it to `SPOT_PHOTOS` in `src/data/spots/photos.ts`, with the author, licence and source URL.
3. Build. It fails with a clear message if a spot has no photo or an unknown district.

### Photos & credits

- Photos come from **Wikimedia Commons** (CC0 / CC BY / CC BY-SA) and optionally **Unsplash**. Attribution is required.
- Every `Photo` has `src`, `alt`, `caption` and `credit { author, license, source }`.
- **Every photo used on the site must appear in `/gallery`**, where credits are shown in the lightbox. This happens automatically for destination, spot, food and transport photos.
- Inline credits on images are hidden. Set `SHOW_INLINE_CREDITS = true` in `src/components/ui/PhotoCredit.tsx` to show them.
- About 1920 px wide is plenty. `next/image` handles resizing, WebP and lazy loading.

---

## 📷 Unsplash photos (optional)

Swaps in high-resolution Unsplash photos where a genuine match exists. Without a key nothing changes.

1. Create a free app at <https://unsplash.com/developers> and copy the **Access Key**.
2. Add it to `.env.local`: `UNSPLASH_ACCESS_KEY=your_key`
3. Run `npm run unsplash:sync`.
4. Open `unsplash-review.html` to review the picks. To change one, set `selected` (`0`, `1`, `2` or `null`) for that slot in `src/data/unsplash.json`, then run `npm run unsplash:sync -- --ping`.
5. Restart the dev server or rebuild.

Notes:

- A photo is used only when its description or tags mention the place, so pages don't show the wrong country.
- Demo keys allow 50 requests per hour. The script stops cleanly at the limit and continues on the next run.
- The Unsplash API rules are followed: images are hotlinked from `images.unsplash.com`, the download endpoint is pinged for each selected photo, and the photographer and Unsplash are credited.

---

## 🔍 SEO

| What | Where |
| --- | --- |
| Title, description, canonical, Open Graph, Twitter | `src/app/[lang]/layout.tsx` + `pageMetadata()` in `src/lib/seo.ts` |
| Sitemap, robots, web manifest | `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` |
| Share images (1200×630) | `opengraph-image.tsx` files, renderer in `src/lib/og.tsx` |
| Structured data | Organization + WebSite (search box), ItemList, TouristDestination, TouristTrip, BreadcrumbList, FAQPage |
| Site name, keywords, socials | `src/lib/site.ts` |

After deploying, submit `https://<your-domain>/sitemap.xml` in Google Search Console and test a guide page with Google's Rich Results Test.

---

## ✅ Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Set `contactEmail` in `src/lib/site.ts`. Until then, the contact form tells visitors it is being set up.
- [ ] Add social profiles to `SITE.socials` and an X handle to `SITE.twitter` (optional).
- [ ] Have someone local check prices, fees, timetables, hotel names and coordinates. Many are marked "approx." in the data.
- [ ] Update `BDT_PER_USD` and the `lastVerified` dates.

> ⚠️ All guides and spots were written from general knowledge for the 2025–26 season. Verify fees, fares, timetables and permit rules before publishing.

---

## 🌐 English ⇄ বাংলা

The whole site (interface **and** content) is available in English and Bangla.

| URL | Language |
| --- | --- |
| `/explore`, `/destinations/sajek-valley`… | English (default, clean URLs) |
| `/bn/explore`, `/bn/destinations/sajek-valley`… | বাংলা |

- **Switcher:** the EN / বাং pill in the header, the mobile menu and the footer keeps you on the same page (query string and `#section` included).
- **Remembered:** the choice is saved in a `lang` cookie, so the site opens in Bangla next time.
- **SEO:** every page has its own canonical URL plus `hreflang` alternates (en, bn, x-default), and the sitemap lists both languages.
- **Search works in both scripts:** "Jaflong" and "জাফলং" find the same place.

How it works:

| Piece | Where |
| --- | --- |
| Routing (`/en/…` → clean URL, un-prefixed → English, cookie redirect) | `src/proxy.ts` |
| Locales, `localizePath()`, `fmt()` | `src/i18n/config.ts` |
| Interface text | `src/i18n/dictionaries/en.ts` + `bn.ts` (TypeScript enforces identical keys) |
| Server / client helpers | `getLocale()`, `getT()` in `src/i18n/server.ts` · `useT()`, `useLocale()` in `src/i18n/client.tsx` |
| Language-aware links | `src/components/i18n/Link.tsx` (use instead of `next/link`) |
| Switcher | `src/components/i18n/LanguageSwitcher.tsx` |
| Bangla content | `src/data/destinations/bn/*.json`, `src/data/spots/bn/group-*.ts`, `src/data/bn/*` (essentials, phrases, transport) |

**Adding a guide or spot?** Add the Bangla copy too, then check it:

```bash
node scripts/check-translation.mjs src/data/destinations/<slug>.json src/data/destinations/bn/<slug>.json
node scripts/check-translation.mjs src/data/spots/group-a.ts src/data/spots/bn/group-a.ts SPOTS_A SPOTS_A_BN
```

The checker makes sure the translation has the same structure, the same numbers (prices, coordinates) and unchanged locked fields (slugs, enums, photo credits).

> Share images (OG) stay in English, because the image renderer has no Bangla font.
