"use client";

/**
 * Interactive Bangla phrasebook.
 *  - Filter box (searches English, Bangla and pronunciation)
 *  - 🔊 Listen: uses the device's Bangla text-to-speech voice when one exists
 *    (hidden otherwise, so nobody hears a wrong-language voice)
 *  - Copy, and "Show big" to hold the phone up to a shopkeeper or driver
 */
import { useEffect, useMemo, useState } from "react";
import type { PhraseGroup } from "@/data/phrases";
import { BigTextOverlay } from "@/components/ui/ShowToDriver";
import { cn } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { useT } from "@/i18n/client";

function useBanglaVoice() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const pick = () => setVoice(window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("bn")) ?? null);
    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", pick);
  }, []);
  return voice;
}

export function Phrasebook({ groups }: { groups: PhraseGroup[] }) {
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [big, setBig] = useState<{ bn: string; en: string } | null>(null);
  const voice = useBanglaVoice();
  const t = useT();

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return groups;
    return groups
      .map((g) => ({ ...g, phrases: g.phrases.filter((p) => `${p.en} ${p.bn} ${p.say} ${p.note ?? ""}`.toLowerCase().includes(n)) }))
      .filter((g) => g.phrases.length);
  }, [q, groups]);

  const speak = (text: string) => {
    if (!voice) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  const btn = "inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink/80 ring-1 ring-jute transition hover:bg-brand-600 hover:text-white";

  return (
    <div>
      {/* Toolbar */}
      <div className="sticky top-[5.25rem] z-20 -mx-4 bg-sand/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-3xl sm:px-4 print:hidden">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-60 flex-1">
            <span className="sr-only">{t.phrasesPage.find}</span>
            <svg aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.phrasesPage.findPlaceholder} className="w-full rounded-full bg-white py-3 pr-4 pl-11 text-sm ring-1 ring-jute focus:ring-2 focus:ring-brand-500 focus:outline-none" />
          </label>
          <nav aria-label={t.phrasesPage.groups} className="no-scrollbar flex gap-2 overflow-x-auto">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-semibold ring-1 ring-jute hover:bg-jute">
                <span aria-hidden>{g.icon}</span> {g.title}
              </a>
            ))}
          </nav>
        </div>
        {!voice && (
          <p className="mt-2 px-1 text-xs text-muted">{t.phrasesPage.voiceNote}</p>
        )}
      </div>

      {filtered.length === 0 && <p className="mt-16 text-center text-muted">{fmt(t.phrasesPage.noMatch, { q })}</p>}

      <div className="mt-10 space-y-16">
        {filtered.map((g) => (
          <section key={g.id} id={g.id}>
            <h2 className="flex items-center gap-3 font-display text-3xl font-semibold tracking-tight">
              <span aria-hidden className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl">{g.icon}</span>
              {g.title}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {g.phrases.map((p) => (
                <li key={p.en} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-jute transition hover:shadow-lg">
                  <p className="text-sm font-semibold text-muted">{p.en}</p>
                  <p lang="bn" className="mt-2 text-3xl leading-snug font-semibold text-brand-700">{p.bn}</p>
                  <p className="mt-1 font-medium text-ink/80 italic">&ldquo;{p.say}&rdquo;</p>
                  {p.note && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900 ring-1 ring-amber-200">💡 {p.note}</p>}
                  <div className="mt-auto flex flex-wrap gap-2 pt-5 print:hidden">
                    {voice && (
                      <button type="button" onClick={() => speak(p.bn)} className={btn} aria-label={fmt(t.phrasesPage.listenAria, { en: p.en })}>
                        {t.phrasesPage.listen}
                      </button>
                    )}
                    <button type="button" onClick={() => copy(p.bn)} className={cn(btn, copied === p.bn && "bg-brand-600 text-white")}>
                      {copied === p.bn ? t.phrasesPage.copied : t.phrasesPage.copy}
                    </button>
                    <button type="button" onClick={() => setBig({ bn: p.bn, en: p.en })} className={btn}>
                      {t.phrasesPage.showBig}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <BigTextOverlay open={big !== null} onClose={() => setBig(null)} big={big?.bn ?? ""} english={big?.en} />
    </div>
  );
}
