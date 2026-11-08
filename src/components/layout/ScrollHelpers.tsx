"use client";

/**
 * Site-wide "back to top" button that appears after scrolling down.
 * Hidden when printing.
 */
import { useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";

export function ScrollHelpers() {
  const t = useT();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShowTop(window.scrollY > 900);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="print:hidden">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t.common.backToTop}
        tabIndex={showTop ? 0 : -1}
        className={cn(
          "fixed right-4 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-xl text-white shadow-xl shadow-brand-900/30 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 sm:right-6 sm:bottom-6",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        ↑
      </button>
    </div>
  );
}
