/**
 * Explore Bangladesh logo: a circular "landscape badge" mark
 * (red sun from the flag rising over green hills and a river)
 * plus a two-line wordmark. The same mark is used as the favicon
 * (src/app/icon.svg) — keep them in sync if you change the artwork.
 *
 * `idPrefix` keeps SVG <defs> ids unique when the logo appears twice on a page.
 */
import { cn } from "@/lib/format";

export function LogoMark({ idPrefix = "logo", className }: { idPrefix?: string; className?: string }) {
  const clip = `${idPrefix}-clip`;
  const sky = `${idPrefix}-sky`;
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4e2" />
          <stop offset="1" stopColor="#ffd9b8" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="64" height="64" fill={`url(#${sky})`} />
        <circle cx="38" cy="25" r="11" fill="#f42a41" />
        <path d="M-2 44 L17 22 L29 35 L39 26 L66 48 V66 H-2Z" fill="#0a8f63" />
        <path d="M-2 47 Q16 33 31 42 T66 41 V66 H-2Z" fill="#006a4e" />
        <path d="M-2 55 Q12 49 24 54 T48 54 T66 52" fill="none" stroke="#e8f7f1" strokeWidth="3.2" strokeLinecap="round" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="#043326" strokeOpacity=".12" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ idPrefix, tone = "dark", className }: { idPrefix?: string; tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark idPrefix={idPrefix} className="h-10 w-10 shrink-0 drop-shadow-sm transition group-hover:rotate-[-6deg]" />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[0.62rem] font-bold uppercase tracking-[0.32em]", light ? "text-brand-200" : "text-sun")}>Explore</span>
        <span className={cn("font-display text-[1.4rem] font-semibold tracking-tight", light ? "text-white" : "text-brand-700")}>Bangladesh</span>
      </span>
    </span>
  );
}
