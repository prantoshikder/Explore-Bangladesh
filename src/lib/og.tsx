/**
 * Shared renderer for Open Graph share images (1200×630) — what people see
 * when a link is shared on Facebook, WhatsApp, X, LinkedIn, Slack…
 * Uses the real destination photo + logo so every share looks on-brand.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Load an image as a data URI (Satori needs inline images).
 * Accepts a /public path or a remote URL (Unsplash photos are hotlinked).
 */
export async function publicDataUri(publicPath: string, mime: string): Promise<string> {
  if (/^https?:\/\//.test(publicPath)) {
    // Ask Unsplash's CDN for a share-image-sized JPEG instead of the 2400px original
    const url = publicPath.includes("images.unsplash.com") ? publicPath.replace(/([?&])w=\d+/, "$1w=1200") : publicPath;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OG image fetch failed (${res.status}): ${url}`);
    const type = res.headers.get("content-type") ?? mime;
    return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
  }
  const data = await readFile(join(process.cwd(), "public", publicPath), "base64");
  return `data:${mime};base64,${data}`;
}

const logoPromise = readFile(join(process.cwd(), "src/app/icon.svg"), "base64").then(
  (b64) => `data:image/svg+xml;base64,${b64}`,
);

export async function renderOgImage({
  photo,
  eyebrow,
  title,
  subtitle,
  chips = [],
}: {
  photo: string; // data URI
  eyebrow: string;
  title: string;
  subtitle: string;
  chips?: string[];
}) {
  const logo = await logoPromise;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori only supports <img> */}
        <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            // Satori ignores the `inset` shorthand — use explicit box values.
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(4,51,38,0.95) 0%, rgba(4,51,38,0.8) 50%, rgba(4,51,38,0.3) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
          {/* Brand row */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={64} height={64} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 16, letterSpacing: 6, color: "#ff6b7a", fontWeight: 700 }}>EXPLORE</span>
              <span style={{ fontSize: 34, color: "white", fontWeight: 700, marginTop: -2 }}>Bangladesh</span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <span style={{ fontSize: 24, color: "#a7f3d0", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</span>
            <span style={{ fontSize: title.length > 22 ? 64 : 84, color: "white", fontWeight: 800, lineHeight: 1.02, marginTop: 10 }}>{title}</span>
            <span style={{ fontSize: 28, color: "rgba(255,255,255,0.88)", marginTop: 18, lineHeight: 1.3 }}>{subtitle}</span>
          </div>

          {/* Chips */}
          <div style={{ display: "flex", gap: 12 }}>
            {chips.map((c) => (
              <span
                key={c}
                style={{ display: "flex", fontSize: 22, color: "white", padding: "10px 20px", borderRadius: 999, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.35)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
