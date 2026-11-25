import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const asset = (...p: string[]) => readFile(path.join(process.cwd(), "assets", ...p));

/** Brand OG card: cream ground, arch-cropped photo, Cormorant title, rose vine. */
export async function renderOg({ eyebrow, title, photo = "hero-beach-proposal" }: { eyebrow: string; title: string; photo?: string }) {
  const [serif, serifItalic, sans, img] = await Promise.all([
    asset("fonts", "cormorant-500-normal.woff"),
    asset("fonts", "cormorant-500-italic.woff"),
    asset("fonts", "raleway-600-normal.woff"),
    asset("og", `${photo}.jpg`),
  ]);
  const src = `data:image/jpeg;base64,${img.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FAF5F4", position: "relative" }}>
        <svg width="60" height="630" viewBox="0 0 60 630" style={{ position: "absolute", left: 40, top: 0 }}>
          <path d="M30 0 C 14 80, 46 160, 30 240 S 14 400, 30 470 S 46 580, 30 630" fill="none" stroke="#B78C8A" strokeWidth="1.5" />
          <path d="M30 240 C 44 226, 58 228, 60 214 C 46 212, 36 222, 30 240 Z" fill="none" stroke="#B78C8A" strokeWidth="1.2" />
          <path d="M30 470 C 16 456, 2 458, 0 444 C 14 442, 24 452, 30 470 Z" fill="none" stroke="#B78C8A" strokeWidth="1.2" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px 0 130px", width: 720 }}>
          <div style={{ fontFamily: "Raleway", fontSize: 20, letterSpacing: 5, color: "#8E6461", textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontFamily: "Cormorant", fontSize: title.length > 48 ? 62 : 74, lineHeight: 1.04, color: "#4A3438", marginTop: 22 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 36 }}>
            <div style={{ width: 48, height: 1, background: "#B78C8A" }} />
            <div style={{ fontFamily: "CormorantItalic", fontSize: 30, color: "#83636A", marginLeft: 16 }}>Bloom & Say Yes · Oahu</div>
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: 64, top: 56, width: 390, height: 574, borderTopLeftRadius: 195, borderTopRightRadius: 195, border: "1.5px solid #B78C8A", borderBottom: "none" }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- satori needs a plain img */}
        <img alt="" src={src} width={390} height={560} style={{ position: "absolute", right: 80, top: 70, width: 390, height: 560, objectFit: "cover", borderTopLeftRadius: 195, borderTopRightRadius: 195 }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Cormorant", data: serif, weight: 500, style: "normal" },
        { name: "CormorantItalic", data: serifItalic, weight: 500, style: "italic" },
        { name: "Raleway", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
