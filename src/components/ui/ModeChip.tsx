"use client";

/**
 * Shows a transport mode with its emoji and a "What's this?" link into the
 * Transport Guide — the core of our "never assume local knowledge" rule.
 */
import Link from "@/components/i18n/Link";
import { getGlossary } from "@/data/localized";
import { useLocale, useT } from "@/i18n/client";
import type { TransportMode } from "@/types/destination";

export function ModeChip({ mode, showExplain = true }: { mode: TransportMode; showExplain?: boolean }) {
  const t = useT();
  const g = getGlossary(useLocale())[mode];
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink ring-1 ring-jute">
        <span aria-hidden>{g.emoji}</span>
        {g.term}
      </span>
      {showExplain && mode !== "walk" && (
        <Link
          href={`/transport-guide#${mode}`}
          title={g.short}
          className="text-xs font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
        >
          {t.common.whatsThis}
        </Link>
      )}
    </span>
  );
}
