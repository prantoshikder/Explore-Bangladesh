/**
 * Translation checker: compares an English data file with its Bangla copy.
 *
 *   node scripts/check-translation.mjs <en-file> <bn-file> [enExport] [bnExport]
 *
 * Works with .json files and .ts modules (Node strips the types). For .ts files
 * pass the export names, e.g. SPOTS_A SPOTS_A_BN.
 *
 * Rules:
 *  - Same structure: same object keys, same array lengths.
 *  - Numbers and booleans must be identical (prices, coordinates, ratings…).
 *  - "Locked" fields (ids, enums, image paths, credits…) must be identical.
 *  - Every other string must be non-empty; an English-looking string that is
 *    unchanged is reported as a warning (it may simply be a proper noun).
 * Exits with code 1 when there are errors.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const LOCKED = new Set([
  "slug", "division", "district", "tripTypes", "difficulty", "budgetLevel", "coverGradient", "coverEmoji",
  "mode", "verdict", "tier", "hygiene", "category", "severity", "id", "src", "source", "author", "license",
  "authorUrl", "lastVerified", "categories", "lat", "lng", "zoom", "embedQuery", "guideSlug", "position", "localName",
]);

const [enPath, bnPath, enExport, bnExport] = process.argv.slice(2);
if (!enPath || !bnPath) {
  console.error("Usage: node scripts/check-translation.mjs <en-file> <bn-file> [enExport] [bnExport]");
  process.exit(2);
}

async function load(p, exportName) {
  if (p.endsWith(".json")) return JSON.parse(readFileSync(p, "utf8"));
  const mod = await import(pathToFileURL(resolve(p)).href);
  if (!exportName || !(exportName in mod)) throw new Error(`Export "${exportName}" not found in ${p}. Exports: ${Object.keys(mod).join(", ")}`);
  return mod[exportName];
}

const errors = [];
const warnings = [];

function check(en, bn, path, lockedParent) {
  const where = path || "(root)";
  if (Array.isArray(en)) {
    if (!Array.isArray(bn)) return errors.push(`${where}: expected array`);
    if (en.length !== bn.length) return errors.push(`${where}: array length ${bn.length}, expected ${en.length}`);
    en.forEach((v, i) => check(v, bn[i], `${path}[${i}]`, lockedParent));
    return;
  }
  if (en !== null && typeof en === "object") {
    if (bn === null || typeof bn !== "object" || Array.isArray(bn)) return errors.push(`${where}: expected object`);
    const ek = Object.keys(en).sort().join(",");
    const bk = Object.keys(bn).sort().join(",");
    if (ek !== bk) errors.push(`${where}: keys differ\n    en: ${ek}\n    bn: ${bk}`);
    for (const k of Object.keys(en)) if (k in bn) check(en[k], bn[k], path ? `${path}.${k}` : k, lockedParent || LOCKED.has(k));
    return;
  }
  if (typeof en === "number" || typeof en === "boolean") {
    if (en !== bn) errors.push(`${where}: value ${JSON.stringify(bn)} must equal ${JSON.stringify(en)}`);
    return;
  }
  if (typeof en === "string") {
    if (typeof bn !== "string") return errors.push(`${where}: expected string`);
    if (lockedParent) {
      if (en !== bn) errors.push(`${where}: locked field changed ("${en}" → "${bn}")`);
      return;
    }
    if (en.trim() && !bn.trim()) errors.push(`${where}: empty translation`);
    else if (en === bn && /[a-z]{4,}/i.test(en) && !/[ঀ-৿]/.test(bn)) warnings.push(`${where}: unchanged English "${en.slice(0, 60)}"`);
  }
}

const en = await load(enPath, enExport);
const bn = await load(bnPath, bnExport);
check(en, bn, "", false);

for (const w of warnings) console.log("⚠️ ", w);
for (const e of errors) console.log("✖ ", e);
console.log(`\n${errors.length ? "✖ FAILED" : "✓ OK"} — ${errors.length} error(s), ${warnings.length} warning(s) · ${bnPath}`);
process.exit(errors.length ? 1 : 0);
