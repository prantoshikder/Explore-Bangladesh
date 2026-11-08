"use client";

/**
 * Client-side i18n: the root layout wraps the app in <I18nProvider> with the
 * current locale; client components read it with useLocale() / useT() and
 * build links with useLocalizedPath().
 */
import { createContext, useCallback, useContext } from "react";
import { DEFAULT_LOCALE, localizePath, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useT(): Dictionary {
  return getDictionary(useLocale());
}

/** Returns a function that turns "/explore" into "/bn/explore" when browsing in Bangla. */
export function useLocalizedPath() {
  const locale = useLocale();
  return useCallback((path: string) => localizePath(locale, path), [locale]);
}
