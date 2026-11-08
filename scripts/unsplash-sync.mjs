/**
 * ============================================================================
 *  npm run unsplash:sync  — pick Unsplash photos for the site
 * ============================================================================
 *  Needs UNSPLASH_ACCESS_KEY in .env.local (free: https://unsplash.com/developers
 *  → New Application → copy the "Access Key").
 *
 *  For every TARGET below it searches the official Unsplash API, keeps up to 3
 *  high-resolution landscape candidates in src/data/unsplash.json, and selects
 *  the first one whose description/tags mention one of the target's `must`
 *  words (so we don't show the wrong place). Then it writes
 *  unsplash-review.html so you can eyeball every choice.
 *
 *  Options:
 *    --only=dest:coxs-bazar,food:biryani   process just these slots
 *    --refresh                             search again even if already saved
 *    --ping                                only report selections to Unsplash
 *                                          (run after changing `selected` by hand)
 *
 *  Rate limits: demo keys allow 50 requests/hour (1 search + 1 download ping per
 *  slot). The script stops cleanly when the limit is near — just run it again
 *  later; finished slots are skipped. Apply for "Production" on the Unsplash
 *  developer dashboard for 5,000/hour.
 *
 *  API rules followed: photos are hotlinked (never re-hosted), photographer +
 *  Unsplash are credited with links, and the download endpoint is pinged when
 *  a photo is selected.
 * ============================================================================
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(ROOT, "src/data/unsplash.json");
const REVIEW = join(ROOT, "unsplash-review.html");
const KEY = process.env.UNSPLASH_ACCESS_KEY?.trim();
// UNSPLASH_API_BASE is only for local testing against a mock server.
const API = process.env.UNSPLASH_API_BASE ?? "https://api.unsplash.com";

/** slot → what to search. `must`: at least one word must appear in the photo's text/tags. */
const TARGETS = [
  { slot: "hero:home", label: "Bangladesh landscape", query: "Bangladesh landscape river", must: ["bangladesh"] },
  // Destination covers
  { slot: "dest:coxs-bazar", label: "Cox's Bazar beach", query: "Cox's Bazar beach", must: ["cox"] },
  { slot: "dest:sajek-valley", label: "Sajek Valley", query: "Sajek Valley", must: ["sajek"] },
  { slot: "dest:sundarbans", label: "Sundarbans", query: "Sundarbans mangrove forest", must: ["sundarban"] },
  { slot: "dest:sylhet-jaflong-ratargul", label: "Sylhet", query: "Sylhet Bangladesh", must: ["sylhet", "jaflong", "ratargul"] },
  { slot: "dest:sreemangal", label: "Sreemangal tea garden", query: "Sreemangal tea garden", must: ["sreemangal", "srimangal", "moulvibazar"] },
  { slot: "dest:saint-martins-island", label: "Saint Martin's Island", query: "Saint Martin island Bangladesh", must: ["bangladesh", "teknaf", "cox"] },
  { slot: "dest:bandarban", label: "Bandarban hills", query: "Bandarban", must: ["bandarban"] },
  { slot: "dest:old-dhaka", label: "Old Dhaka", query: "Old Dhaka", must: ["dhaka"] },
  { slot: "dest:paharpur", label: "Paharpur", query: "Paharpur Somapura Mahavihara", must: ["paharpur", "somapura"] },
  // Spots
  { slot: "spot:laboni-beach", label: "Laboni Beach", query: "Cox's Bazar sea beach sunset", must: ["cox"] },
  { slot: "spot:inani-beach", label: "Inani Beach", query: "Inani beach", must: ["inani"] },
  { slot: "spot:himchari", label: "Himchari", query: "Himchari", must: ["himchari"] },
  { slot: "spot:marine-drive", label: "Marine Drive", query: "Marine Drive Cox's Bazar", must: ["cox", "teknaf", "marine drive"] },
  { slot: "spot:nilgiri", label: "Nilgiri", query: "Nilgiri Bandarban", must: ["nilgiri", "bandarban"] },
  { slot: "spot:boga-lake", label: "Boga Lake", query: "Boga lake Bandarban", must: ["boga"] },
  { slot: "spot:nafakhum", label: "Nafakhum", query: "Nafakhum waterfall", must: ["nafakhum"] },
  { slot: "spot:kaptai-lake", label: "Kaptai Lake", query: "Kaptai lake Rangamati", must: ["kaptai", "rangamati"] },
  { slot: "spot:rangamati-hanging-bridge", label: "Rangamati Hanging Bridge", query: "Rangamati hanging bridge", must: ["rangamati"] },
  { slot: "spot:jaflong", label: "Jaflong", query: "Jaflong", must: ["jaflong"] },
  { slot: "spot:ratargul", label: "Ratargul swamp forest", query: "Ratargul swamp forest", must: ["ratargul"] },
  { slot: "spot:lalakhal", label: "Lalakhal", query: "Lalakhal Sylhet", must: ["lalakhal"] },
  { slot: "spot:bisnakandi", label: "Bisnakandi", query: "Bisnakandi", must: ["bisnakandi"] },
  { slot: "spot:sreemangal-tea-gardens", label: "Tea gardens", query: "tea garden Bangladesh", must: ["bangladesh", "sylhet", "sreemangal", "srimangal"] },
  { slot: "spot:lawachara", label: "Lawachara forest", query: "Lawachara national park", must: ["lawachara"] },
  { slot: "spot:tanguar-haor", label: "Tanguar Haor", query: "Tanguar Haor", must: ["tanguar", "haor"] },
  { slot: "spot:lalbagh-fort", label: "Lalbagh Fort", query: "Lalbagh Fort Dhaka", must: ["lalbagh"] },
  { slot: "spot:ahsan-manzil", label: "Ahsan Manzil", query: "Ahsan Manzil", must: ["ahsan"] },
  { slot: "spot:star-mosque", label: "Star Mosque", query: "Star Mosque Dhaka", must: ["star mosque", "tara masjid"] },
  { slot: "spot:sadarghat", label: "Sadarghat", query: "Sadarghat Dhaka boats", must: ["sadarghat", "buriganga"] },
  { slot: "spot:national-parliament", label: "National Parliament House", query: "National Parliament House Dhaka Louis Kahn", must: ["parliament", "sangsad", "kahn"] },
  { slot: "spot:sixty-dome-mosque", label: "Sixty Dome Mosque", query: "Sixty Dome Mosque Bagerhat", must: ["sixty dome", "shat gombuj", "bagerhat"] },
  { slot: "spot:sundarbans", label: "Sundarbans", query: "Sundarbans", must: ["sundarban"] },
  { slot: "spot:kuakata", label: "Kuakata beach", query: "Kuakata", must: ["kuakata"] },
  { slot: "spot:panam-nagar", label: "Panam Nagar", query: "Panam Nagar Sonargaon", must: ["panam", "sonargaon"] },
  // Food (dishes look the same anywhere — no place filter, except hilsa)
  { slot: "food:biryani", label: "Kacchi Biryani", query: "kacchi biryani", must: [] },
  { slot: "food:fuchka", label: "Fuchka", query: "fuchka panipuri", must: [] },
  { slot: "food:hilsa", label: "Ilish curry", query: "hilsa fish curry", must: ["hilsa", "ilish"] },
  { slot: "food:pitha", label: "Pitha", query: "pitha bangladeshi cake", must: ["pitha"] },
  { slot: "food:tea", label: "Tea", query: "seven layer tea Bangladesh", must: ["tea", "cha"] },
  { slot: "food:thali", label: "Bangla thali", query: "bengali thali rice fish", must: [] },
  { slot: "food:jilapi", label: "Jilapi", query: "jalebi sweets", must: [] },
  // Transport
  { slot: "transport:rickshaw", label: "Cycle-rickshaws", query: "rickshaw Dhaka", must: ["dhaka", "bangladesh"] },
  { slot: "transport:cng", label: "CNG auto-rickshaw", query: "CNG auto rickshaw Bangladesh", must: ["bangladesh", "dhaka", "cng"] },
  { slot: "transport:launch", label: "Launch ferry", query: "launch ferry Sadarghat Bangladesh", must: ["bangladesh", "dhaka", "sadarghat"] },
  { slot: "transport:train", label: "Bangladesh train", query: "Bangladesh railway train", must: ["bangladesh"] },
];

/* ------------------------------------------------------------------------- */

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith("--only=")) ?? "").replace("--only=", "").split(",").filter(Boolean);
const refresh = args.includes("--refresh");
const pingOnly = args.includes("--ping");

if (!KEY) {
  console.error(`
  ✋ UNSPLASH_ACCESS_KEY is empty.

  1. Go to https://unsplash.com/developers → "Your apps" → "New Application"
  2. Copy the "Access Key" (NOT the Secret key)
  3. Put it in .env.local:   UNSPLASH_ACCESS_KEY=your_key_here
  4. Run again:              npm run unsplash:sync

  The site keeps working with its current photos until then.
`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
manifest.photos ??= {};
let remaining = Infinity;

function save() {
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
}

async function api(path) {
  if (remaining <= 1) throw Object.assign(new Error("rate"), { rate: true });
  const res = await fetch(path.startsWith("http") ? path : `${API}${path}`, {
    headers: { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" },
  });
  const left = Number(res.headers.get("x-ratelimit-remaining"));
  if (!Number.isNaN(left)) remaining = left;
  if (res.status === 401) throw new Error("401 Unauthorized — check UNSPLASH_ACCESS_KEY (use the Access Key, not the Secret).");
  if (res.status === 403 && remaining <= 0) throw Object.assign(new Error("rate"), { rate: true });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
  return res.json();
}

/** Text we can check `must` words against. */
function photoText(p) {
  return [p.description, p.alt_description, ...(p.tags ?? []).map((t) => t.title), p.location?.name, p.location?.city, p.location?.country]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

async function ping(c) {
  if (c.pinged || !c.downloadLocation) return;
  await api(c.downloadLocation);
  c.pinged = true;
}

async function syncSlot(t) {
  const q = new URLSearchParams({ query: t.query, orientation: "landscape", content_filter: "high", per_page: "20" });
  const data = await api(`/search/photos?${q}`);
  const results = (data.results ?? []).filter((p) => p.width >= 2400);
  const toCandidate = (p) => ({
    id: p.id,
    raw: p.urls.raw,
    thumb: p.urls.small,
    alt: p.alt_description ?? p.description ?? t.label,
    color: p.color,
    width: p.width,
    height: p.height,
    author: p.user?.name ?? "Unknown",
    authorUrl: p.user?.links?.html ?? "https://unsplash.com",
    pageUrl: p.links.html,
    downloadLocation: p.links.download_location,
    matches: t.must.length === 0 || t.must.some((w) => photoText(p).includes(w)),
  });
  // Matching photos first, then the rest (for review only)
  const sorted = [...results.filter((p) => toCandidate(p).matches), ...results.filter((p) => !toCandidate(p).matches)];
  const candidates = sorted.slice(0, 3).map(toCandidate);
  const selected = candidates.length && candidates[0].matches ? 0 : null;
  const caption = manifest.photos[t.slot]?.caption; // keep a caption written after review
  manifest.photos[t.slot] = { label: t.label, query: t.query, selected, candidates, ...(caption ? { caption } : {}) };
  if (selected !== null) await ping(candidates[selected]);
  save();
  const status = selected === null ? (candidates.length ? "⚠️  no confident match — kept current photo (see review)" : "—  no results") : `✓  ${candidates[0].author}`;
  console.log(`${t.slot.padEnd(34)} ${status}`);
}

function writeReview() {
  const rows = Object.entries(manifest.photos)
    .map(([slot, e]) => {
      const cells = e.candidates
        .map((c, i) => `<figure class="${i === e.selected ? "sel" : ""}${c.matches ? "" : " miss"}">
          <img src="${c.thumb ?? c.raw + "&w=400"}" loading="lazy" alt="">
          <figcaption><b>${i}</b> ${c.author}${c.matches ? "" : " · no keyword match"}${i === e.selected ? " · <b>SELECTED</b>" : ""}<br><a href="${c.pageUrl}" target="_blank">open on Unsplash</a></figcaption>
        </figure>`)
        .join("");
      return `<section><h2>${slot} <small>${e.label} · “${e.query}” · selected: ${e.selected ?? "none (current photo kept)"}</small></h2><div class="row">${cells || "<p>No results.</p>"}</div></section>`;
    })
    .join("");
  writeFileSync(
    REVIEW,
    `<!doctype html><meta charset="utf-8"><title>Unsplash review</title>
<style>body{font:14px system-ui;margin:24px;background:#faf6ef;color:#1c2321}h1{margin:0 0 4px}section{margin:28px 0}h2{font-size:16px;margin:0 0 8px}h2 small{font-weight:400;color:#5b6662}
.row{display:flex;gap:12px;flex-wrap:wrap}figure{margin:0;width:300px;background:#fff;border-radius:12px;overflow:hidden;border:3px solid transparent}
figure.sel{border-color:#006a4e}figure.miss{opacity:.6}img{width:100%;height:190px;object-fit:cover;display:block}figcaption{padding:8px 10px;font-size:12px}</style>
<h1>Unsplash photo review</h1>
<p>Green border = used on the site. Faded = its description/tags didn't mention the place, so it isn't used automatically.<br>
To change a pick: edit <code>selected</code> for that slot in <code>src/data/unsplash.json</code> (0, 1, 2 or null), then run <code>npm run unsplash:sync -- --ping</code> and restart the dev server.</p>${rows}`,
  );
}

/* ------------------------------------------------------------------------- */

try {
  if (pingOnly) {
    for (const e of Object.values(manifest.photos)) if (e.selected !== null && e.candidates[e.selected]) await ping(e.candidates[e.selected]);
    save();
    console.log("✓ Reported all selected photos to Unsplash.");
  } else {
    const todo = TARGETS.filter((t) => (only.length ? only.includes(t.slot) : true)).filter((t) => refresh || only.length || !manifest.photos[t.slot]);
    console.log(`Unsplash sync: ${todo.length} slot(s) to search.\n`);
    for (const t of todo) await syncSlot(t);
  }
} catch (e) {
  if (e.rate) console.log("\n⏸  Unsplash hourly rate limit reached. Progress is saved — run `npm run unsplash:sync` again in an hour.");
  else {
    console.error(`\n✖ ${e.message}`);
    process.exitCode = 1;
  }
} finally {
  writeReview();
  const used = Object.values(manifest.photos).filter((e) => e.selected !== null).length;
  console.log(`\n${used} Unsplash photo(s) in use · review: unsplash-review.html · restart \`npm run dev\` to see changes.`);
}
