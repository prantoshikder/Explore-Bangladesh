/** Four "before you fly" cards on the homepage. */
import Link from "@/components/i18n/Link";
import { getEssentials } from "@/data/localized";
import { getLocale, getT } from "@/i18n/server";

export async function EssentialsGrid() {
  const locale = await getLocale();
  const t = await getT();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {getEssentials(locale).map((e) => (
        <Link
          key={e.id}
          href={`/essentials#${e.id}`}
          className="group flex flex-col rounded-3xl bg-white p-6 ring-1 ring-jute transition hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl">{e.emoji}</span>
          <h3 className="mt-5 font-display text-lg font-semibold text-ink">{e.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{e.summary}</p>
          <dl className="mt-5 space-y-1.5 border-t border-jute pt-4 text-xs">
            {e.keyFacts.slice(0, 2).map((k) => (
              <div key={k.label} className="flex justify-between gap-3">
                <dt className="text-muted">{k.label}</dt>
                <dd className="text-right font-semibold text-ink">{k.value}</dd>
              </div>
            ))}
          </dl>
          <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:underline">{t.home.essentials.fullGuide} →</span>
        </Link>
      ))}
    </div>
  );
}
