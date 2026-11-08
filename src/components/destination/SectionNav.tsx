/** Sticky in-page table of contents (desktop sidebar / mobile scroll strip). */
import { getT } from "@/i18n/server";
import type { Dictionary } from "@/i18n/dictionaries";

/** Anchor id → label key in t.guide.sections */
export const GUIDE_SECTIONS: { id: string; key: keyof Dictionary["guide"]["sections"] }[] = [
  { id: "overview", key: "overview" },
  { id: "how-to-reach", key: "reach" },
  { id: "budget", key: "budget" },
  { id: "stay", key: "stay" },
  { id: "food", key: "food" },
  { id: "rules", key: "rules" },
  { id: "map-itinerary", key: "map" },
  { id: "faq", key: "faq" },
];

export async function SectionNav() {
  const t = await getT();
  return (
    <>
      {/* Mobile: horizontal chips */}
      <nav aria-label={t.guide.sectionsAria} className="no-scrollbar sticky top-[5.25rem] z-30 -mx-4 flex gap-2 overflow-x-auto border-b border-jute bg-sand/90 px-4 py-3 backdrop-blur lg:hidden">
        {GUIDE_SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink ring-1 ring-jute">
            {t.guide.sections[s.key]}
          </a>
        ))}
      </nav>

      {/* Desktop: numbered sidebar */}
      <nav aria-label={t.guide.sectionsAria} className="sticky top-28 hidden lg:block">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">{t.guide.inThisGuide}</p>
        <ol className="space-y-1 border-l-2 border-jute">
          {GUIDE_SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="-ml-0.5 flex items-center gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted transition hover:border-brand-600 hover:text-ink">
                <span className="text-xs font-bold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                {t.guide.sections[s.key]}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
