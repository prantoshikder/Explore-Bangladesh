"use client";

/**
 * Share bar: native share sheet on mobile (Web Share API), otherwise
 * WhatsApp / Facebook / X / copy link. Word of mouth is the cheapest marketing.
 * URLs are read at click time so they're always the real page address.
 */
import { useState } from "react";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";
import { fmt } from "@/i18n/config";

type Network = "whatsapp" | "facebook" | "x";

const NETWORKS: { id: Network; label: string; icon: string; build: (url: string, text: string) => string }[] = [
  { id: "whatsapp", label: "WhatsApp", icon: "💬", build: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
  { id: "facebook", label: "Facebook", icon: "📘", build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: "x", label: "X", icon: "𝕏", build: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
];

export function ShareButtons({ text, tone = "light", className }: { text: string; tone?: "light" | "dark"; className?: string }) {
  const tr = useT();
  const [copied, setCopied] = useState(false);
  const btn = cn(
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition",
    tone === "light" ? "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25" : "bg-white text-ink ring-1 ring-jute hover:bg-jute",
  );

  const share = async (n?: (typeof NETWORKS)[number]) => {
    const url = window.location.href.split("#")[0];
    if (!n) {
      // Mobile: open the OS share sheet when available
      if (navigator.share) {
        try {
          await navigator.share({ title: document.title, text, url });
        } catch {
          /* user cancelled */
        }
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard blocked — nothing else to do */
      }
      return;
    }
    window.open(n.build(url, text), "_blank", "noopener,noreferrer,width=640,height=560");
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2 print:hidden", className)}>
      <span className={cn("mr-1 text-xs font-bold uppercase tracking-wider", tone === "light" ? "text-white/70" : "text-muted")}>{tr.common.share}</span>
      {NETWORKS.map((n) => (
        <button key={n.id} type="button" onClick={() => share(n)} className={btn} aria-label={fmt(tr.common.shareOn, { network: n.label })}>
          <span aria-hidden>{n.icon}</span>
          {n.label}
        </button>
      ))}
      <button type="button" onClick={() => share()} className={btn}>
        <span aria-hidden>🔗</span>
        {copied ? tr.common.linkCopied : tr.common.copyMore}
      </button>
    </div>
  );
}
