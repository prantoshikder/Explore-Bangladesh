"use client";

/**
 * Heart button that saves a spot to "My Trip".
 *  - variant "icon": round button for photo cards
 *  - variant "pill": labelled button for page heroes
 */
import { useSavedSpots } from "@/lib/saved-spots";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";
import { fmt } from "@/i18n/config";

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 20.5s-7.5-4.6-9.3-9.1C1.5 8.3 3.6 5 7 5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.4 0 5.5 3.3 4.3 6.4-1.8 4.5-9.3 9.1-9.3 9.1z" />
    </svg>
  );
}

export function SaveButton({ slug, name, variant = "icon", className }: { slug: string; name: string; variant?: "icon" | "pill"; className?: string }) {
  const t = useT();
  const { isSaved, toggle } = useSavedSpots();
  const saved = isSaved(slug);
  const label = fmt(saved ? t.common.removeAria : t.common.saveAria, { name });

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={label}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition print:hidden",
          saved ? "bg-sun text-white shadow-lg shadow-sun/30" : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25",
          className,
        )}
      >
        <Heart filled={saved} />
        {saved ? t.common.savedToTrip : t.common.saveToTrip}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full shadow-lg transition hover:scale-110 active:scale-95 print:hidden",
        saved ? "bg-sun text-white" : "bg-white/90 text-ink backdrop-blur hover:text-sun",
        className,
      )}
    >
      <Heart filled={saved} />
    </button>
  );
}
