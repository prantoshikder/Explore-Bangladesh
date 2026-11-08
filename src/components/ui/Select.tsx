"use client";

/**
 * Custom dropdown (replaces the native <select>, whose open menu can't be styled).
 *
 * Accessibility (WAI-ARIA "select-only combobox" pattern):
 *  - Trigger: role="combobox", aria-expanded, aria-controls, aria-activedescendant
 *  - Menu: role="listbox" with role="option" items + aria-selected
 *  - Keyboard: ↑/↓ open & move · Home/End · Enter/Space select · Esc close ·
 *    Tab closes · typing a letter jumps to the first matching option
 *  - Click outside closes. Focus always stays on the trigger.
 *
 * Usage:
 *   <Select value={v} onChange={setV} ariaLabel="Division" icon="📍"
 *           options={[{ value: "", label: "Any division" }, { value: "Dhaka", label: "Dhaka" }]} />
 */
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/format";

export interface SelectOption {
  value: string;
  label: string;
  /** Optional second line, e.g. "< $25 per day" */
  description?: string;
  /** Optional emoji/icon shown before the label */
  icon?: string;
}

export function Select({
  value,
  onChange,
  options,
  ariaLabel,
  icon,
  variant = "sand",
  className,
  menuClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  ariaLabel: string;
  /** Leading icon in the trigger (falls back to the selected option's icon). */
  icon?: string;
  /** Background of the closed trigger: "sand" on white cards, "white" on tinted bars. */
  variant?: "sand" | "white";
  className?: string;
  menuClassName?: string;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-opt-${i}`;

  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const [active, setActive] = useState(selectedIndex);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selected = options[selectedIndex];

  /* Close when clicking anywhere outside the component. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  /* Keep the highlighted option visible while moving with the keyboard. */
  useEffect(() => {
    if (open) listRef.current?.querySelector(`#${CSS.escape(optionId(active))}`)?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  const openMenu = (index = selectedIndex) => {
    setActive(index);
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setActive((a) => Math.min(last, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        if (open) { e.preventDefault(); setActive(0); }
        break;
      case "End":
        if (open) { e.preventDefault(); setActive(last); }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openMenu();
        break;
      case "Escape":
        if (open) { e.preventDefault(); setOpen(false); }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Type-ahead: jump to the first option starting with the typed letter
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const k = e.key.toLowerCase();
          const from = open ? active + 1 : 0;
          const order = [...options.slice(from), ...options.slice(0, from)];
          const hit = order.find((o) => o.label.toLowerCase().startsWith(k));
          if (hit) {
            const i = options.indexOf(hit);
            if (open) setActive(i);
            else openMenu(i);
          }
        }
    }
  };

  const triggerIcon = icon ?? selected?.icon;

  return (
    <div ref={rootRef} className={cn("relative", open && "z-50", className)}>
      <button
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-xl px-3.5 py-3 text-left text-sm font-medium text-ink ring-1 transition outline-none",
          variant === "sand" ? "bg-sand ring-jute hover:bg-jute/60" : "bg-white ring-jute hover:ring-brand-200",
          "focus-visible:ring-2 focus-visible:ring-brand-500",
          open && "ring-2 ring-brand-500",
        )}
      >
        {triggerIcon && <span aria-hidden className="text-base leading-none">{triggerIcon}</span>}
        <span className="min-w-0 flex-1 truncate">
          {selected?.label}
        </span>
        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className={cn("shrink-0 text-muted transition-transform duration-200", open && "rotate-180 text-brand-600")}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Menu — always rendered so the transition can play; hidden from AT when closed */}
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={cn(
          "absolute left-0 z-50 mt-2 max-h-72 w-full min-w-56 origin-top overflow-auto rounded-2xl bg-white p-1.5 shadow-2xl shadow-brand-900/15 ring-1 ring-jute transition duration-150 ease-out",
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0",
          menuClassName,
        )}
      >
        {options.map((o, i) => {
          const isSelected = i === selectedIndex;
          const isActive = i === active;
          return (
            <li
              key={o.value || "__any"}
              id={optionId(i)}
              role="option"
              aria-selected={isSelected}
              onPointerEnter={() => setActive(i)}
              // pointerdown + preventDefault keeps focus on the trigger
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                isActive ? "bg-brand-50" : "bg-transparent",
                isSelected ? "font-semibold text-brand-700" : "text-ink",
              )}
            >
              {o.icon && <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sand text-base">{o.icon}</span>}
              <span className="min-w-0 flex-1">
                <span className="block truncate">{o.label}</span>
                {o.description && <span className="block truncate text-xs font-normal text-muted">{o.description}</span>}
              </span>
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                className={cn("shrink-0 text-brand-600", isSelected ? "opacity-100" : "opacity-0")}>
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
