import Image from "next/image";
import Link from "@/components/i18n/Link";
import { getLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** 404 — a lost traveller in the Lawachara mist. */
export default async function NotFound() {
  // Falls back to English if the language can't be resolved (e.g. an unknown /xx prefix).
  let locale: Locale = "en";
  try {
    locale = await getLocale();
  } catch {
    locale = "en";
  }
  const t = getDictionary(locale);
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-brand-900">
      <Image src="/images/gallery/lawachara-mist.jpg" alt={t.notFound.imageAlt} fill preload sizes="100vw" className="animate-kenburns object-cover" />
      <div className="absolute inset-0 bg-brand-900/60" />
      <div className="relative mx-auto max-w-xl px-4 pt-24 text-center text-white">
        <p className="font-display text-8xl font-semibold text-white/90 sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">{t.notFound.title}</h1>
        <p className="mt-3 text-lg text-white/80">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/explore" className="rounded-full bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50">{t.notFound.explore}</Link>
          <Link href="/" className="rounded-full px-6 py-3 font-semibold text-white ring-1 ring-white/50 hover:bg-white/10">{t.notFound.home}</Link>
        </div>
      </div>
    </section>
  );
}
