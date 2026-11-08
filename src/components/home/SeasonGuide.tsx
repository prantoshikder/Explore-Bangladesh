/**
 * "When to go" — three seasons with a photo, weather summary and the places
 * that shine in that season. Edit SEASONS to change picks (text lives in the dictionaries); place chips link
 * to full guides when they exist, otherwise to a search for that place.
 */
import Image from "next/image";
import Link from "next/link";
import type { DestinationSummary } from "@/types/destination";
import { getT } from "@/i18n/server";

/* Text (name, months, badge, weather) comes from t.home.seasons.list, in the same order. */
const SEASONS = [
  { photoFrom: "coxs-bazar", picks: ["coxs-bazar", "saint-martins-island", "sundarbans", "old-dhaka", "paharpur"] },
  { photoFrom: "sreemangal", picks: ["sreemangal", "sundarbans", "bandarban"] },
  { photoFrom: "sylhet-jaflong-ratargul", picks: ["sajek-valley", "sylhet-jaflong-ratargul", "bandarban"] },
];

export async function SeasonGuide({ all }: { all: DestinationSummary[] }) {
  const t = await getT();
  const find = (slug: string) => all.find((d) => d.slug === slug);
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {SEASONS.map((season, i) => {
        const s = { ...season, ...t.home.seasons.list[i] };
        const photo = find(s.photoFrom)!.cover;
        return (
          <article key={s.name} className="reveal group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-jute transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-700">{s.badge}</span>
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-sm font-semibold text-white/80">{s.months}</p>
                <h3 className="font-display text-3xl font-semibold">{s.name}</h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm leading-relaxed text-ink/75">{s.weather}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-muted">{t.home.seasons.goTo}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {s.picks.map((slug) => {
                  const d = find(slug);
                  if (!d) return null;
                  return (
                    <Link
                      key={slug}
                      href={d.hasFullGuide ? `/destinations/${slug}` : `/destinations?q=${encodeURIComponent(d.name.split(" (")[0])}`}
                      className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-jute transition hover:bg-brand-600 hover:text-white hover:ring-brand-600"
                    >
                      {d.name.split(" (")[0]}
                    </Link>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
