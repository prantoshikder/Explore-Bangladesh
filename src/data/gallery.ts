/**
 * ============================================================================
 *  Photo Gallery data (/gallery)
 * ============================================================================
 *  The gallery = every destination photo (covers + guide galleries + hero),
 *  pulled in automatically, PLUS the extra photos listed in GALLERY_EXTRAS.
 *
 *  To add a photo: save it in /public/images/gallery/, then add an entry to
 *  GALLERY_EXTRAS with its category and Wikimedia Commons credit.
 * ============================================================================
 */
import type { Photo, TripType } from "@/types/destination";
import type { SpotCategory } from "@/types/spot";
import { HERO_PLACE, getAllDestinations, getAllSummaries, getHeroPhoto } from "@/data/destinations";
import type { Locale } from "@/i18n/config";
import { getFoods, getGlossary } from "@/data/localized";
import { getAllSpots, getSpotPhoto } from "@/data/spots";
import { ESSENTIAL_PHOTOS, TRANSPORT_PHOTOS } from "@/data/media";

export type GalleryCategory = "Beaches" | "Hills & Lakes" | "Forests & Rivers" | "Heritage" | "Food" | "Culture";

export const GALLERY_CATEGORIES: { id: GalleryCategory; icon: string }[] = [
  { id: "Beaches", icon: "🏖️" },
  { id: "Hills & Lakes", icon: "⛰️" },
  { id: "Forests & Rivers", icon: "🌳" },
  { id: "Heritage", icon: "🏛️" },
  { id: "Food", icon: "🍛" },
  { id: "Culture", icon: "🎨" },
];

export interface GalleryItem {
  photo: Photo;
  place: string;
  /** Bangla place + caption (used on /bn pages). */
  placeBn?: string;
  captionBn?: string;
  category: GalleryCategory;
  /** Link to a full guide when one exists. */
  href?: string;
}

function g(file: string, alt: string, caption: string, author: string, license: string, source: string): Photo {
  return { src: `/images/gallery/${file}`, alt, caption, credit: { author, license, source } };
}

/** Extra photos that are not destination covers. */
const GALLERY_EXTRAS: GalleryItem[] = [
  {
    place: "Old Dhaka",
    category: "Heritage",
    photo: g("lalbagh-fort-aerial.jpg", "Aerial view of Lalbagh Fort's green gardens and Mughal buildings surrounded by the dense rooftops of Old Dhaka", "Lalbagh Fort from above", "Pinu Rahman", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:2._%E0%A6%B2%E0%A6%BE%E0%A6%B2%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A7%87%E0%A6%B0_%E0%A6%95%E0%A7%87%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A6%BE.jpg"),
    placeBn: "পুরান ঢাকা",
    captionBn: "ওপর থেকে লালবাগ কেল্লা",
  },
  {
    place: "Bagerhat",
    category: "Heritage",
    photo: g("sixty-dome-mosque.jpg", "The arched brick facade and rows of domes of the 15th-century Sixty Dome Mosque in Bagerhat", "Sixty Dome Mosque, a UNESCO site", "TanvirSdq", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Sixty_Dome_Mosque(Shat_Gombuj_Masjid),Bangladesh_1.jpg"),
    placeBn: "বাগেরহাট",
    captionBn: "ষাট গম্বুজ মসজিদ, ইউনেস্কো ঐতিহ্য",
  },
  {
    place: "Dhaka",
    category: "Culture",
    photo: g("rickshaw-art.jpg", "Close-up of a rickshaw's back panel painted with bright flowers, peacocks and Bangla lettering", "Hand-painted rickshaw art", "Mrb Rafi", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Rickshaw_back_decoration.jpg"),
    placeBn: "ঢাকা",
    captionBn: "হাতে আঁকা রিকশা আর্ট",
  },
  {
    place: "Rangamati",
    category: "Hills & Lakes",
    photo: g("kaptai-lake.jpg", "Turquoise water of Kaptai Lake winding between green forested hills in Rangamati", "Kaptai Lake, Rangamati", "ANKAN", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kaptai_Lake_from_Navy_Camp_picnic_spot.jpg"),
    placeBn: "রাঙ্গামাটি",
    captionBn: "কাপ্তাই লেক, রাঙ্গামাটি",
  },
  {
    place: "Cox's Bazar",
    category: "Beaches",
    photo: g("inani-beach-boats.jpg", "Traditional curved wooden fishing boats resting on calm shallow water at Inani Beach", "Fishing boats at Inani Beach", "Syed sajidul islam", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Beauty_of_inani-beach_at_Cox%27s_bazar.jpg"),
    placeBn: "কক্সবাজার",
    captionBn: "ইনানী সৈকতে মাছ ধরার নৌকা",
    href: "/destinations/coxs-bazar",
  },
  {
    place: "Sreemangal",
    category: "Forests & Rivers",
    photo: g("lawachara-mist.jpg", "Tall straight tree trunks fading into thick morning mist in Lawachara rainforest", "Morning mist in Lawachara forest", "Abdulmominbd", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Lawachara_Forest.jpg"),
    placeBn: "শ্রীমঙ্গল",
    captionBn: "লাউয়াছড়া বনে সকালের কুয়াশা",
  },
  {
    place: "Sylhet",
    category: "Forests & Rivers",
    photo: g("ratargul-boat.jpg", "A boatman paddling a narrow wooden boat with smiling children through the flooded Ratargul forest", "Boat ride through Ratargul", "Abdulmominbd", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Ratargul-02.jpg"),
    placeBn: "সিলেট",
    captionBn: "রাতারগুলে নৌকা ভ্রমণ",
  },
  {
    place: "Sylhet",
    category: "Forests & Rivers",
    photo: g("jaflong-fisherman.jpg", "A fisherman casting a round net from a pile of river stones at Jaflong, with hills behind", "Casting nets at Jaflong", "Salam Khokon", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Jaflong,_Sylhet,_Bangladesh.jpg"),
    placeBn: "সিলেট",
    captionBn: "জাফলংয়ে জাল ফেলছেন জেলে",
  },
  {
    place: "Paharpur",
    category: "Heritage",
    photo: g("paharpur-aerial.jpg", "Aerial view of the cross-shaped terraced brick temple at the centre of Somapura Mahavihara", "Somapura Mahavihara from the air", "Md. Ahsanul Haque Nayem", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Somapura_Mahavihara.jpg"),
    placeBn: "পাহাড়পুর",
    captionBn: "আকাশ থেকে সোমপুর মহাবিহার",
  },
  {
    place: "Sreemangal",
    category: "Hills & Lakes",
    photo: g("sreemangal-tea-path.jpg", "A dirt road running between neat rows of tea bushes and tall shade trees in Sreemangal", "A path through the tea gardens", "Kritzolina", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Tea_gardens_in_Sreemangal_01.jpg"),
    placeBn: "শ্রীমঙ্গল",
    captionBn: "চা বাগানের ভেতর দিয়ে পথ",
  },
  {
    place: "Bandarban",
    category: "Hills & Lakes",
    photo: g("bandarban-hills.jpg", "Endless ridges of forested hills fading into haze, seen from Nilgiri in Bandarban", "View from Nilgiri, Bandarban", "Tanvir Rahat", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Nilgiri,_Bandarban,_Bangladesh.jpg"),
    placeBn: "বান্দরবান",
    captionBn: "নীলগিরি থেকে পাহাড়ের সারি",
  },
  {
    place: "Old Dhaka",
    category: "Heritage",
    photo: g("ahsan-manzil-front.jpg", "Front view of the pink Ahsan Manzil palace with its grand staircase and dome", "Ahsan Manzil, the Pink Palace", "Mahbub Hossain Shaheed (mahosha)", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Ahsan_Manzil-Front_View.jpg"),
    placeBn: "পুরান ঢাকা",
    captionBn: "আহসান মঞ্জিল, গোলাপি প্রাসাদ",
  },
];

/** Map a destination's trip types to a gallery category. */
function categoryFor(types: TripType[]): GalleryCategory {
  if (types.some((t) => t === "Beach" || t === "Island")) return "Beaches";
  if (types.includes("Heritage")) return "Heritage";
  if (types.includes("Hills") || types.includes("Tea Gardens")) return "Hills & Lakes";
  if (types.includes("Forest") || types.includes("River")) return "Forests & Rivers";
  return "Culture";
}

/** Map a spot's categories to a gallery category. */
function categoryForSpot(cats: SpotCategory[]): GalleryCategory {
  if (cats.some((c) => c === "Beach" || c === "Island")) return "Beaches";
  if (cats.some((c) => c === "Heritage" || c === "Religious")) return "Heritage";
  if (cats.some((c) => c === "Hills" || c === "Lake" || c === "Tea Garden")) return "Hills & Lakes";
  if (cats.some((c) => c === "Waterfall" || c === "Forest" || c === "River" || c === "Wetland" || c === "Wildlife")) return "Forests & Rivers";
  return "Culture";
}

/** Every gallery photo, interleaved so categories mix nicely in "All". Bangla pages get Bangla places/captions. */
export function getGalleryItems(locale: Locale = "en"): GalleryItem[] {
  const bn = locale === "bn";
  const fromDestinations: GalleryItem[] = [];
  for (const s of getAllSummaries(locale)) {
    fromDestinations.push({
      photo: s.cover,
      place: s.name.split(" (")[0],
      category: categoryFor(s.tripTypes),
      href: s.hasFullGuide ? `/destinations/${s.slug}` : undefined,
    });
  }
  for (const d of getAllDestinations(locale)) {
    d.gallery?.forEach((p) => fromDestinations.push({ photo: p, place: d.name, category: categoryFor(d.tripTypes), href: `/destinations/${d.slug}` }));
  }
  const hero = getHeroPhoto(locale);
  fromDestinations.push({ photo: hero, place: bn ? (hero.caption ?? "বাংলাদেশ") : HERO_PLACE, category: "Hills & Lakes" });

  const extrasLocalized = GALLERY_EXTRAS.map((g) =>
    bn ? { ...g, place: g.placeBn ?? g.place, photo: { ...g.photo, caption: g.captionBn ?? g.photo.caption } } : g,
  );

  // Interleave the two lists for a varied mosaic
  const out: GalleryItem[] = [];
  const max = Math.max(fromDestinations.length, extrasLocalized.length);
  for (let i = 0; i < max; i++) {
    if (fromDestinations[i]) out.push(fromDestinations[i]);
    if (extrasLocalized[i]) out.push(extrasLocalized[i]);
  }
  // Tourist spot photos (every photo on the site must appear here for attribution)
  for (const s of getAllSpots(locale)) {
    out.push({ photo: getSpotPhoto(s, locale), place: s.name, category: categoryForSpot(s.categories), href: `/spots/${s.slug}` });
  }
  // Food, local transport and essentials photos — mixed in so "All" stays varied
  const glossary = getGlossary(locale);
  const extras: GalleryItem[] = [
    ...getFoods(locale).map((f) => ({ photo: f.photo, place: f.name, category: "Food" as const })),
    ...Object.entries(TRANSPORT_PHOTOS).map(([id, photo]) => {
      const term = glossary[id as keyof typeof glossary]?.term;
      return { photo: bn && term ? { ...photo!, caption: term } : photo!, place: bn && term ? term : (photo!.caption ?? id), category: "Culture" as const, href: `/transport-guide#${id}` };
    }),
    { photo: bn ? { ...ESSENTIAL_PHOTOS.airport, caption: "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর" } : ESSENTIAL_PHOTOS.airport, place: bn ? "ঢাকা বিমানবন্দর" : "Dhaka airport", category: "Culture" as const, href: "/essentials" },
  ];
  extras.forEach((item, i) => out.splice(Math.min(out.length, 3 + i * 3), 0, item));
  // De-duplicate by image path
  return out.filter((item, i) => out.findIndex((o) => o.photo.src === item.photo.src) === i);
}
