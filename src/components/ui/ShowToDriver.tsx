"use client";

/**
 * "Show to driver" — opens a full-screen card with the place name in big
 * Bangla letters, so travellers can show their phone to a CNG / rickshaw
 * driver who doesn't read English. Also used by the phrasebook ("Show big").
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";
import { fmt } from "@/i18n/config";

export function BigTextOverlay({
  open,
  onClose,
  big,
  sub,
  english,
}: {
  open: boolean;
  onClose: () => void;
  /** Main Bangla text, shown huge */
  big: string;
  /** Second Bangla line (e.g. district or a request) */
  sub?: string;
  /** Small English reminder for the traveller */
  english?: string;
}) {
  const t = useT();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={t.common.showThisScreen} className="fixed inset-0 z-[120] flex flex-col bg-white text-ink" onClick={onClose}>
      <div className="flex justify-end p-4">
        <button ref={closeRef} type="button" onClick={onClose} className="rounded-full bg-sand px-5 py-2.5 text-sm font-semibold ring-1 ring-jute">
          {t.common.close} ✕
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p lang="bn" className="text-6xl leading-tight font-bold text-brand-700 sm:text-8xl">{big}</p>
        {sub && <p lang="bn" className="mt-6 text-3xl font-semibold text-ink/80 sm:text-5xl">{sub}</p>}
        {english && <p className="mt-10 text-base text-muted">{english}</p>}
      </div>
      <p className="pb-6 text-center text-xs text-muted">{t.common.tapToClose}</p>
    </div>
  );
}

export function ShowToDriverButton({
  bnName,
  bnDistrict,
  name,
  tone = "light",
  className,
}: {
  bnName: string;
  bnDistrict?: string;
  name: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition print:hidden",
          tone === "light" ? "bg-white text-brand-700 shadow-lg hover:bg-brand-50" : "bg-brand-600 text-white hover:bg-brand-700",
          className,
        )}
      >
        <span aria-hidden>🚖</span> {t.common.showToDriver}
      </button>
      <BigTextOverlay
        open={open}
        onClose={() => setOpen(false)}
        big={bnName}
        sub={bnDistrict ? `${bnDistrict} — যাবেন?` : "যাবেন?"}
        english={fmt(t.common.driverEnglish, { name })}
      />
    </>
  );
}
