/**
 * ============================================================================
 *  Top tourist spots — our editorial "must-see" list (not an official ranking).
 * ============================================================================
 *  Shown on the homepage, /explore, /destinations and the empty My Trip page.
 *  Reorder, add or remove entries freely; `why` is the one-line reason to go.
 * ============================================================================
 */
import { getSpotBySlug, toSpotCard, type SpotCard } from "./index";
import type { Locale } from "@/i18n/config";

const TOP: { slug: string; why: string; whyBn: string }[] = [
  { slug: "saint-martins-island", why: "Bangladesh's only coral island: turquoise water, coconut palms and fresh seafood.", whyBn: "বাংলাদেশের একমাত্র প্রবাল দ্বীপ: ফিরোজা পানি, নারকেল গাছ আর তাজা সামুদ্রিক খাবার।" },
  { slug: "sundarbans", why: "The world's largest mangrove forest, home of the Royal Bengal Tiger.", whyBn: "পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন, রয়েল বেঙ্গল টাইগারের ঘর।" },
  { slug: "laboni-beach", why: "Sunset on the world's longest natural sea beach in Cox's Bazar.", whyBn: "কক্সবাজারে পৃথিবীর দীর্ঘতম প্রাকৃতিক সমুদ্রসৈকতে সূর্যাস্ত।" },
  { slug: "sajek-valley", why: "Wake up above a sea of clouds in the Chittagong Hill Tracts.", whyBn: "পার্বত্য চট্টগ্রামে মেঘের সমুদ্রের ওপর ঘুম ভাঙান।" },
  { slug: "ratargul", why: "Glide by boat through a flooded freshwater swamp forest.", whyBn: "নৌকায় চড়ে পানিতে ডোবা মিঠাপানির জলাবনের ভেতর দিয়ে ঘুরুন।" },
  { slug: "sreemangal-tea-gardens", why: "Rolling green tea estates and seven-layer tea in the tea capital.", whyBn: "চায়ের রাজধানীতে ঢেউখেলানো সবুজ চা বাগান আর সাত রঙের চা।" },
  { slug: "lalbagh-fort", why: "A 17th-century Mughal fort and gardens in the heart of Old Dhaka.", whyBn: "পুরান ঢাকার বুকে ১৭ শতকের মুঘল দুর্গ ও বাগান।" },
  { slug: "nafakhum", why: "The country's mightiest waterfall, reached by river boat in Bandarban.", whyBn: "বান্দরবানে নদীপথে যেতে হয় দেশের সবচেয়ে বড় জলপ্রপাতে।" },
  { slug: "sixty-dome-mosque", why: "A UNESCO World Heritage mosque from the 15th century.", whyBn: "১৫ শতকের ইউনেস্কো বিশ্ব ঐতিহ্য মসজিদ।" },
  { slug: "jaflong", why: "Crystal-clear river, stone beaches and the hills of Meghalaya.", whyBn: "স্বচ্ছ নদী, পাথরের চর আর মেঘালয়ের পাহাড়।" },
];

export interface TopSpot extends SpotCard {
  rank: number;
  why: string;
}

export function getTopSpots(limit = TOP.length, locale: Locale = "en"): TopSpot[] {
  return TOP.slice(0, limit).flatMap((t, i) => {
    const s = getSpotBySlug(t.slug, locale);
    return s ? [{ ...toSpotCard(s, locale), rank: i + 1, why: locale === "bn" ? t.whyBn : t.why }] : [];
  });
}
