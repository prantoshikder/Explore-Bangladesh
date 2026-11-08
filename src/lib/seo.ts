/**
 * Per-page metadata builder. Gives every page a canonical URL in its own
 * language, hreflang alternates (English ⇄ Bangla) and complete Open Graph &
 * Twitter tags (OG images come from opengraph-image.tsx files).
 */
import type { Metadata } from "next";
import { LOCALES, LOCALE_META, localizePath, type Locale } from "@/i18n/config";
import { SITE } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  locale = "en",
  ogType = "website",
  keywords,
}: {
  title: string;
  description: string;
  /** Path WITHOUT the language prefix, e.g. "/explore" */
  path: string;
  locale?: Locale;
  ogType?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const url = localizePath(locale, path);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, localizePath(l, path)])), "x-default": localizePath("en", path) },
    },
    openGraph: { type: ogType, siteName: SITE.name, locale: LOCALE_META[locale].ogLocale, url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
