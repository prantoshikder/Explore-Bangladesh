/** Section 5 — must-try dishes, trusted eating spots and food-safety tips. */
import Image from "next/image";
import type { Destination, EatingSpot } from "@/types/destination";
import { foodPhotoFor } from "@/data/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Price } from "./Price";
import { getDestinationBySlug } from "@/data/destinations";
import { getLocale, getT } from "@/i18n/server";

const HYGIENE: Record<EatingSpot["hygiene"], string> = {
  Excellent: "bg-emerald-100 text-emerald-800",
  Good: "bg-sky-100 text-sky-800",
  Street: "bg-amber-100 text-amber-800",
};

export async function FoodSection({ d }: { d: Destination }) {
  const locale = await getLocale();
  const t = await getT();
  // Photos are matched on English dish names; Bangla guides keep the same dish order.
  const enDishes = locale === "en" ? d.food.dishes : (getDestinationBySlug(d.slug, "en")?.food.dishes ?? []);
  return (
    <section>
      <SectionHeading id="food" number={5} eyebrow={t.guide.food.eyebrow} title={t.guide.food.title} />
      <div className="grid gap-4 sm:grid-cols-2">
        {d.food.dishes.map((f, i) => {
          const photo = foodPhotoFor(enDishes[i]?.name ?? f.name);
          return (
          <article key={f.name} className="group overflow-hidden rounded-2xl bg-white ring-1 ring-jute">
            {photo ? (
              <div className="relative h-48 overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ) : (
              /* No photo yet: warm illustrated banner so the grid stays even */
              <div aria-hidden className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100">
                <span className="absolute -right-4 -bottom-8 text-[9rem] opacity-20 transition duration-700 group-hover:scale-110">🍽️</span>
                <span className="relative font-display text-3xl font-semibold text-amber-900/70">{f.localName ?? f.name}</span>
              </div>
            )}
            <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-ink">{f.name} {f.spicy && <span title={t.guide.food.spicy}>🌶️</span>}</h3>
                {f.localName && <p className="text-sm text-muted">{f.localName}</p>}
              </div>
              <span className="text-xs whitespace-nowrap"><Price range={f.priceRange} /></span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{f.description}</p>
            </div>
          </article>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-semibold">{t.guide.food.spots}</h3>
          <ul className="mt-4 divide-y divide-jute rounded-2xl bg-white ring-1 ring-jute">
            {d.food.spots.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-muted">{s.area} · {s.knownFor}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${HYGIENE[s.hygiene]}`}>{t.labels.hygiene[s.hygiene]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
          <h3 className="font-display text-xl font-semibold text-amber-950">{t.guide.food.safety}</h3>
          <ul className="mt-4 space-y-3 text-sm text-amber-950/85">
            {d.food.safetyTips.map((t) => <li key={t} className="flex gap-2"><span aria-hidden>•</span>{t}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
