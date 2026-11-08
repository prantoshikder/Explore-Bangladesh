import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ESSENTIAL_PHOTOS } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { ESSENTIALS_LAST_VERIFIED } from "@/data/essentials";
import { getEssentials } from "@/data/localized";
import { monthYear } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.essentials.title, description: t.meta.essentials.description, path: "/essentials", locale });
}

export default async function EssentialsPage() {
  const locale = await getLocale();
  const t = await getT();
  const ESSENTIALS = getEssentials(locale);
  return (
    <>
      <PageHero
        photo={ESSENTIAL_PHOTOS.airport}
        eyebrow={t.essentialsPage.eyebrow}
        title={t.essentialsPage.title}
        accent={t.essentialsPage.titleAccent}
        text={fmt(t.essentialsPage.text, { date: monthYear(ESSENTIALS_LAST_VERIFIED, t.labels.months) })}
      />
      <div className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">

      <div className="mt-12 space-y-10">
        {ESSENTIALS.map((e) => (
          <section key={e.id} id={e.id} className="rounded-3xl bg-white p-6 ring-1 ring-jute sm:p-10">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl">{e.emoji}</span>
              <h2 className="font-display text-3xl font-semibold">{e.title}</h2>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{e.summary}</p>

            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-jute ring-1 ring-jute sm:grid-cols-2 lg:grid-cols-4">
              {e.keyFacts.map((k) => (
                <div key={k.label} className="bg-sand p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k.label}</dt>
                  <dd className="mt-1 font-semibold">{k.value}</dd>
                </div>
              ))}
            </dl>

            <ol className="mt-8 space-y-4">
              {e.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            {e.warning && <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">⚠️ {e.warning}</p>}
          </section>
        ))}
      </div>
    </div>
    </>
  );
}
