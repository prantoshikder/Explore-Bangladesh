import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import Image from "next/image";
import { TRANSPORT_PHOTOS } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { getGlossary, getGlossaryGroups } from "@/data/localized";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.transport.title, description: t.meta.transport.description, path: "/transport-guide", locale });
}

export default async function TransportGuidePage() {
  const locale = await getLocale();
  const t = await getT();
  const TRANSPORT_GLOSSARY = getGlossary(locale);
  const GLOSSARY_GROUPS = getGlossaryGroups(locale);
  return (
    <>
      <PageHero
        photo={TRANSPORT_PHOTOS.launch!}
        eyebrow={t.transportPage.eyebrow}
        title={t.transportPage.title}
        accent={t.transportPage.titleAccent}
        text={t.transportPage.text}
      />
      <div className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">

      {/* Quick jump index */}
      <div className="mt-8 flex flex-wrap gap-2">
        {Object.values(TRANSPORT_GLOSSARY).filter((g) => g.id !== "walk").map((g) => (
          <a key={g.id} href={`#${g.id}`} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium ring-1 ring-jute hover:bg-jute">
            {g.emoji} {g.term}
          </a>
        ))}
      </div>

      {GLOSSARY_GROUPS.map((group) => (
        <section key={group.title} className="mt-16">
          <h2 className="font-display text-3xl font-semibold">{group.title}</h2>
          <p className="mt-1 text-muted">{group.subtitle}</p>
          <div className="mt-6 space-y-5">
            {group.ids.map((id) => {
              const g = TRANSPORT_GLOSSARY[id];
              return (
                <article key={id} id={id} className="overflow-hidden rounded-3xl bg-white ring-1 ring-jute">
                  {TRANSPORT_PHOTOS[id] && (
                    <div className="group relative h-56 overflow-hidden sm:h-72">
                      <Image src={TRANSPORT_PHOTOS[id]!.src} alt={TRANSPORT_PHOTOS[id]!.alt} fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl">{g.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-semibold">
                        {g.term} {g.localName && <span className="ml-1 text-base font-normal text-muted">{g.localName}</span>}
                      </h3>
                      <p className="mt-1 font-medium text-brand-700">{g.short}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-ink/80">{g.description}</p>
                  <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1.4fr]">
                    <div className="rounded-2xl bg-sand p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">{t.transportPage.typicalFare}</p>
                      <p className="mt-1 font-semibold">{g.typicalFare}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">{t.transportPage.howToUse}</p>
                      <ol className="mt-2 space-y-2 text-sm">
                        {g.howToUse.map((step, i) => (
                          <li key={step} className="flex gap-3">
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-[0.65rem] font-bold text-white">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  {g.watchOut && (
                    <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">⚠️ {g.watchOut}</p>
                  )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
    </>
  );
}
