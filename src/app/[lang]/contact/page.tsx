/** /contact — questions, corrections and suggestions. */
import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { TRANSPORT_PHOTOS } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.contact.title, description: t.meta.contact.description, path: "/contact", locale });
}

const QUICK_HELP = [
  { href: "/essentials", icon: "🛂", key: "essentials" },
  { href: "/transport-guide", icon: "🛺", key: "transport" },
  { href: "/phrases", icon: "🗣️", key: "phrases" },
  { href: "/explore", icon: "🔎", key: "explore" },
] as const;

export default async function ContactPage() {
  const t = await getT();
  const [emergencyBefore, emergencyAfter = ""] = t.contact.emergencyText.split("{number}");
  return (
    <>
      <PageHero
        photo={TRANSPORT_PHOTOS["chander-gari"]!}
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        accent={t.contact.titleAccent}
        text={t.contact.text}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[2rem] bg-white ring-1 ring-jute" />}>
          <ContactForm />
        </Suspense>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-sun/10 p-6 ring-1 ring-sun/25">
            <p className="font-display text-xl font-semibold text-ink">{t.contact.emergencyTitle}</p>
            <p className="mt-2 text-sm text-ink/80">
              {emergencyBefore}<strong className="text-lg">999</strong>{emergencyAfter}
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">{t.contact.quick}</p>
            <ul className="space-y-3">
              {QUICK_HELP.map((q) => (
                <li key={q.href}>
                  <Link href={q.href} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-jute transition hover:-translate-y-0.5 hover:shadow-lg">
                    <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-xl">{q.icon}</span>
                    <span>
                      <span className="block font-semibold text-ink">{t.contact.quickItems[q.key].title}</span>
                      <span className="block text-xs text-muted">{t.contact.quickItems[q.key].text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
