/**
 * ============================================================================
 *  Languages
 * ============================================================================
 *  English lives at the site root (/explore), Bangla under /bn (/bn/explore).
 *  Internally every page is under app/[lang]; src/proxy.ts rewrites
 *  un-prefixed URLs to /en so English URLs stay clean.
 * ============================================================================
 */
export const LOCALES = ["en", "bn"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
  bn: { label: "বাংলা", short: "বাং", htmlLang: "bn", ogLocale: "bn_BD" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** "/explore" → "/bn/explore" for Bangla; unchanged for English. Leaves external/anchor links alone. */
export function localizePath(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const { path: bare } = splitLocale(path);
  if (locale === DEFAULT_LOCALE) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}

/** "/bn/explore?q=x" → { locale: "bn", path: "/explore?q=x" }; "/explore" → { locale: "en", … } */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(en|bn)(?=\/|$|\?|#)/);
  if (!m) return { locale: DEFAULT_LOCALE, path: pathname || "/" };
  const rest = pathname.slice(m[0].length);
  return { locale: m[1] as Locale, path: rest === "" || rest.startsWith("?") || rest.startsWith("#") ? `/${rest}` : rest };
}

/** Replace {name} placeholders: fmt("Hi {who}", { who: "Anna" }) → "Hi Anna" */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
