"use client";

/**
 * "My Trip" saved-spots store.
 *
 * Saved spot slugs live in this browser's localStorage (no account needed).
 * Every read/write is wrapped in try/catch: private windows or blocked storage
 * simply behave as "nothing saved" instead of crashing.
 * useSyncExternalStore keeps every heart button + the navbar badge in sync,
 * including across tabs (via the `storage` event).
 */
import { useCallback, useSyncExternalStore } from "react";

const KEY = "eb:saved-spots";
const CHANGE = "eb:saved-change";
const EMPTY: string[] = [];

let cacheRaw: string | null | undefined;
let cache: string[] = EMPTY;

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): string[] {
  const raw = readRaw();
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      const v = JSON.parse(raw ?? "[]");
      cache = Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : EMPTY;
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

function write(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(list))));
  } catch {
    /* storage unavailable — ignore */
  }
  window.dispatchEvent(new Event(CHANGE));
}

export function useSavedSpots() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);
  const toggle = useCallback((slug: string) => write(saved.includes(slug) ? saved.filter((s) => s !== slug) : [...saved, slug]), [saved]);
  const addMany = useCallback((slugs: string[]) => write([...saved, ...slugs]), [saved]);
  const remove = useCallback((slug: string) => write(saved.filter((s) => s !== slug)), [saved]);
  const clear = useCallback(() => write([]), []);
  return { saved, isSaved, toggle, addMany, remove, clear };
}
