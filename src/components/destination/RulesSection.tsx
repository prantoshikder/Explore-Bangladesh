/** Section 6 — customs, dress code, permits and safety, colour-coded by severity. */
import type { Destination, RuleGroup } from "@/types/destination";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/format";
import { getT } from "@/i18n/server";

const SEVERITY: Record<RuleGroup["severity"], { box: string; label: string; icon: string }> = {
  critical: { box: "bg-rose-50 ring-rose-200", label: "bg-rose-600 text-white", icon: "⛔" },
  warning: { box: "bg-amber-50 ring-amber-200", label: "bg-amber-400 text-amber-950", icon: "⚠️" },
  info: { box: "bg-white ring-jute", label: "bg-jute text-ink", icon: "ℹ️" },
};

const ORDER: RuleGroup["severity"][] = ["critical", "warning", "info"];

export async function RulesSection({ d }: { d: Destination }) {
  const t = await getT();
  const groups = [...d.rules].sort((a, b) => ORDER.indexOf(a.severity) - ORDER.indexOf(b.severity));
  return (
    <section>
      <SectionHeading id="rules" number={6} eyebrow={t.guide.rules.eyebrow} title={t.guide.rules.title} intro={t.guide.rules.intro} />
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => {
          const s = SEVERITY[g.severity];
          return (
            <article key={g.category} className={cn("rounded-2xl p-6 ring-1", s.box, g.severity === "critical" && "md:col-span-2")}>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold", s.label)}>
                <span aria-hidden>{s.icon}</span>{t.labels.ruleCategory[g.category]}
              </span>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/85">
                {g.items.map((i) => <li key={i} className="flex gap-2.5"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />{i}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
