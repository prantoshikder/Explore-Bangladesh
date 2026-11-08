"use client";

/**
 * Step-by-step journey cards with a tab per route (Train / Bus / Flight…).
 * Each step is a numbered card connected by a vertical line, showing
 * transport mode (with glossary link), duration, cost and a pro tip.
 */
import { useState } from "react";
import type { Route } from "@/types/destination";
import { ModeChip } from "@/components/ui/ModeChip";
import { Price } from "./Price";
import { cn } from "@/lib/format";
import { useT } from "@/i18n/client";

export function RouteTabs({ routes }: { routes: Route[] }) {
  const t = useT();
  const [activeId, setActiveId] = useState(routes.find((r) => r.recommended)?.id ?? routes[0].id);
  const route = routes.find((r) => r.id === activeId) ?? routes[0];

  return (
    <div>
      <div role="tablist" aria-label={t.guide.reach.routeOptions} className="flex flex-wrap gap-2">
        {routes.map((r) => {
          const active = r.id === activeId;
          return (
            <button
              key={r.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveId(r.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                active ? "bg-ink text-white shadow" : "bg-white text-ink/75 ring-1 ring-jute hover:bg-jute",
              )}
            >
              {r.label}
              {r.recommended && !active && <span className="ml-1.5 text-brand-600">★</span>}
            </button>
          );
        })}
      </div>

      {/* Route summary */}
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 rounded-2xl bg-brand-50 px-5 py-4 text-sm ring-1 ring-brand-100">
        <span><span className="text-muted">{t.guide.reach.totalTime}</span> <strong>{route.totalTime}</strong></span>
        <span><span className="text-muted">{t.guide.reach.oneWay}</span> <Price range={route.totalCost} /></span>
        <span><span className="text-muted">{t.guide.reach.steps}</span> <strong>{route.steps.length}</strong></span>
      </div>

      {/* Steps timeline */}
      <ol role="tabpanel" className="relative mt-8 space-y-5">
        <span aria-hidden className="absolute top-4 bottom-4 left-[1.15rem] w-0.5 bg-gradient-to-b from-brand-500 to-brand-100" />
        {route.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5">
            <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-white shadow-md ring-4 ring-sand">
              {i + 1}
            </span>
            <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-jute">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h4 className="font-semibold text-ink">{s.title}</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {s.duration && <span className="rounded-full bg-sand px-2.5 py-1 font-medium">⏱ {s.duration}</span>}
                  {s.cost && <span className="rounded-full bg-sand px-2.5 py-1"><Price range={s.cost} /></span>}
                </div>
              </div>
              {s.mode && <div className="mt-2"><ModeChip mode={s.mode} /></div>}
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{s.description}</p>
              {s.tip && (
                <p className="mt-3 rounded-xl bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900 ring-1 ring-amber-200">
                  <strong>💡 {t.guide.reach.tip}</strong> {s.tip}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
