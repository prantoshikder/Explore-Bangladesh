/** Section 7 — Google Maps embed (no API key needed) + day-by-day itinerary. */
import type { Destination } from "@/types/destination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fmt } from "@/i18n/config";
import { getT } from "@/i18n/server";

export async function MapItinerarySection({ d }: { d: Destination }) {
  const t = await getT();
  const { embedQuery, zoom, lat, lng } = d.map;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(embedQuery)}&z=${zoom}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&origin=Dhaka&destination=${lat},${lng}`;

  return (
    <section>
      <SectionHeading id="map-itinerary" number={7} eyebrow={t.guide.map.eyebrow} title={fmt(t.guide.map.title, { days: d.itinerary.length })} />

      <div className="overflow-hidden rounded-3xl ring-1 ring-jute">
        <iframe
          title={fmt(t.guide.map.mapOf, { name: d.name })}
          src={src}
          className="h-[360px] w-full sm:h-[440px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
        {t.guide.map.directions}
      </a>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {d.itinerary.map((day) => (
          <article key={day.day} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-jute">
            <header className="bg-brand-600 px-6 py-4 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">{fmt(t.guide.map.day, { n: day.day })}</p>
              <h3 className="font-display text-xl font-semibold">{day.title}</h3>
            </header>
            <ol className="flex-1 space-y-4 p-6">
              {day.activities.map((a) => (
                <li key={a.time + a.activity} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                  <span className="font-semibold text-brand-700">{a.time}</span>
                  <span className="leading-relaxed text-ink/85">
                    {a.activity}
                    {a.tip && <span className="mt-1 block text-xs text-amber-800">💡 {a.tip}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <footer className="border-t border-jute bg-sand px-6 py-3 text-xs text-muted">🌙 {t.guide.map.overnight} <strong className="text-ink">{day.overnight}</strong></footer>
          </article>
        ))}
      </div>
    </section>
  );
}
