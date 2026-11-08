/**
 * Locale-aware accessors for site data that has a Bangla translation file.
 * (Kept in their own module so the English files don't import the Bangla ones.)
 */
import type { Locale } from "@/i18n/config";
import { GLOSSARY_GROUPS, TRANSPORT_GLOSSARY } from "./transport-glossary";
import { GLOSSARY_GROUPS_BN, TRANSPORT_GLOSSARY_BN } from "./bn/transport-glossary.bn";
import { ESSENTIALS } from "./essentials";
import { ESSENTIALS_BN } from "./bn/essentials.bn";
import { PHRASE_GROUPS } from "./phrases";
import { PHRASE_GROUPS_BN } from "./bn/phrases.bn";
import { FOODS, type FoodItem } from "./media";

export const getGlossary = (locale: Locale = "en") => (locale === "bn" ? TRANSPORT_GLOSSARY_BN : TRANSPORT_GLOSSARY);
export const getGlossaryGroups = (locale: Locale = "en") => (locale === "bn" ? GLOSSARY_GROUPS_BN : GLOSSARY_GROUPS);
export const getEssentials = (locale: Locale = "en") => (locale === "bn" ? ESSENTIALS_BN : ESSENTIALS);
export const getPhraseGroups = (locale: Locale = "en") => (locale === "bn" ? PHRASE_GROUPS_BN : PHRASE_GROUPS);

/** Foods; in Bangla the big name is Bangla and the small label is the English name. */
export function getFoods(locale: Locale = "en"): FoodItem[] {
  if (locale !== "bn") return FOODS;
  return FOODS.map((f) => ({ ...f, name: f.bn, bn: f.name, blurb: f.blurbBn, photo: { ...f.photo, caption: f.bn } }));
}
