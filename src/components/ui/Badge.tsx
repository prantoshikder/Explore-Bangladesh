"use client";

/**
 * Small pill badges. `DifficultyBadge` colour-codes Easy / Moderate / Trekking
 * so travellers can judge physical effort at a glance.
 */
import type { Difficulty } from "@/types/destination";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";

const DIFFICULTY_STYLES: Record<Difficulty, { cls: string; icon: string }> = {
  Easy: { cls: "bg-emerald-100 text-emerald-800 ring-emerald-600/20", icon: "●" },
  Moderate: { cls: "bg-amber-100 text-amber-800 ring-amber-600/20", icon: "▲" },
  Trekking: { cls: "bg-rose-100 text-rose-800 ring-rose-600/20", icon: "◆" },
};

export function DifficultyBadge({ level, className }: { level: Difficulty; className?: string }) {
  const t = useT();
  const s = DIFFICULTY_STYLES[level];
  return (
    <span
      title={t.labels.difficultyHint[level]}
      className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset", s.cls, className)}
    >
      <span aria-hidden className="text-[0.6rem]">{s.icon}</span>
      {t.labels.difficulty[level]}
    </span>
  );
}

type Tone = "neutral" | "brand" | "light" | "warn";
const TONES: Record<Tone, string> = {
  neutral: "bg-jute text-ink/80",
  brand: "bg-brand-100 text-brand-700",
  light: "bg-white/20 text-white ring-1 ring-inset ring-white/30 backdrop-blur",
  warn: "bg-amber-100 text-amber-800",
};

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", TONES[tone], className)}>
      {children}
    </span>
  );
}
