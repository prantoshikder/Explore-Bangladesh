/** Eyebrow + heading (+ optional "see all" link) used by every homepage section. */
import Link from "@/components/i18n/Link";
import { cn } from "@/lib/format";

export function SectionIntro({
  eyebrow,
  title,
  text,
  link,
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  link?: { href: string; label: string };
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        <p className={cn("flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]", light ? "text-brand-200" : "text-brand-600")}>
          <span aria-hidden className={cn("h-px w-8", light ? "bg-brand-200" : "bg-brand-600")} />
          {eyebrow}
        </p>
        <h2 className={cn("mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl", light ? "text-white" : "text-ink")}>{title}</h2>
        {text && <p className={cn("mt-3 text-lg leading-relaxed", light ? "text-brand-100/85" : "text-muted")}>{text}</p>}
      </div>
      {link && (
        <Link href={link.href} className={cn("group text-sm font-semibold", light ? "text-white" : "text-brand-600")}>
          {link.label} <span className="inline-block transition group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}
