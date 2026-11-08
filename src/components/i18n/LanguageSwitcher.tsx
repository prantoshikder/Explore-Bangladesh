"use client";

/**
 * EN ⇄ বাং toggle — a pill with a sliding thumb.
 *  - Keeps the visitor on the same page, query string and #section.
 *  - Remembers the choice in a `lang` cookie; src/proxy.ts uses it to open
 *    the site in that language next time.
 */
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALES, LOCALE_META, localizePath, splitLocale, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/client";
import { cn } from "@/lib/format";

export const LANG_COOKIE = "lang";

type Tone = "light" | "glass" | "dark";

/** Remember the visitor's language for a year (read by src/proxy.ts). */
function rememberLanguage(locale: Locale) {
  document.cookie = `${LANG_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

const TRACK: Record<Tone, string> = {
  light: "bg-sand ring-1 ring-jute",
  glass: "bg-white/15 ring-1 ring-white/25 backdrop-blur",
  dark: "bg-white/10 ring-1 ring-white/15",
};
const THUMB: Record<Tone, string> = {
  light: "bg-brand-600 shadow-md shadow-brand-900/20",
  glass: "bg-white shadow-md",
  dark: "bg-white shadow-md",
};
const TEXT: Record<Tone, { on: string; off: string }> = {
  light: { on: "text-white", off: "text-ink/60 hover:text-ink" },
  glass: { on: "text-brand-700", off: "text-white/80 hover:text-white" },
  dark: { on: "text-brand-800", off: "text-white/70 hover:text-white" },
};

export function LanguageSwitcher({ tone = "light", className }: { tone?: Tone; className?: string }) {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const index = LOCALES.indexOf(locale);

  const go = (target: Locale) => {
    if (target === locale) return;
    rememberLanguage(target);
    const { path } = splitLocale(pathname);
    const rest = window.location.search + window.location.hash;
    startTransition(() => router.push(localizePath(target, path) + rest, { scroll: false }));
  };

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn("relative inline-grid shrink-0 grid-cols-2 rounded-full p-1 text-xs font-bold", TRACK[tone], pending && "opacity-70", className)}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden
        className={cn("absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full transition-transform duration-300 ease-out", THUMB[tone])}
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={LOCALE_META[l].htmlLang}
            aria-pressed={active}
            title={LOCALE_META[l].label}
            onClick={() => go(l)}
            className={cn(
              "relative z-10 min-w-10 rounded-full px-3 py-1.5 leading-none transition-colors duration-300",
              l === "bn" && "font-semibold",
              active ? TEXT[tone].on : TEXT[tone].off,
            )}
          >
            {LOCALE_META[l].short}
          </button>
        );
      })}
    </div>
  );
}
