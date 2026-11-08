/**
 * Server-side i18n helpers. Any Server Component can call these without
 * receiving `lang` as a prop — the locale comes from the root [lang] segment
 * via next/root-params.
 */
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

/** The UI dictionary for the current request's language. */
export async function getT(): Promise<Dictionary> {
  return getDictionary(await getLocale());
}
