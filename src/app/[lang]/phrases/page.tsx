/** /phrases — Bangla phrasebook for travellers. */
import type { Metadata } from "next";
import { Phrasebook } from "@/components/phrases/Phrasebook";
import { PageHero } from "@/components/ui/PageHero";
import { getPhraseGroups } from "@/data/localized";
import { TRANSPORT_PHOTOS } from "@/data/media";
import { pageMetadata } from "@/lib/seo";
import { fmt } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT();
  return pageMetadata({ title: t.meta.phrases.title, description: t.meta.phrases.description, path: "/phrases", locale });
}

export default async function PhrasesPage() {
  const locale = await getLocale();
  const t = await getT();
  const PHRASE_GROUPS = getPhraseGroups(locale);
  const count = PHRASE_GROUPS.reduce((n, g) => n + g.phrases.length, 0);
  return (
    <>
      <PageHero
        photo={TRANSPORT_PHOTOS.rickshaw!}
        eyebrow={t.phrasesPage.eyebrow}
        title={t.phrasesPage.title}
        accent={t.phrasesPage.titleAccent}
        text={fmt(t.phrasesPage.text, { count })}
      />
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <Phrasebook groups={PHRASE_GROUPS} />
      </div>
    </>
  );
}
