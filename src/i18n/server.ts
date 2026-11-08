/**
 * Server-side text helpers. The site is English-only, so the locale is fixed.
 * (Bangla translation files are kept in the repo but not wired up.)
 */
import type { Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  return "en";
}

/** The UI text dictionary. */
export async function getT(): Promise<Dictionary> {
  return getDictionary("en");
}
