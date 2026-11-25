import Link from "next/link";
import { locations } from "@/content/locations";

/** Approximate coastline points (lon, lat), clockwise from Kaʻena Point. Stylized, not survey-accurate. */
const COAST: [number, number][] = [
  [-158.281, 21.575], [-158.24, 21.585], [-158.19, 21.588], [-158.13, 21.596], [-158.1, 21.6], [-158.06, 21.64],
  [-158.03, 21.68], [-157.99, 21.71], [-157.96, 21.705], [-157.925, 21.655], [-157.89, 21.6], [-157.86, 21.56],
  [-157.84, 21.52], [-157.82, 21.47], [-157.79, 21.44], [-157.75, 21.46], [-157.72, 21.45], [-157.73, 21.41],
  [-157.72, 21.38], [-157.7, 21.34], [-157.655, 21.31], [-157.67, 21.28], [-157.7, 21.265], [-157.76, 21.265],
  [-157.81, 21.255], [-157.83, 21.27], [-157.87, 21.29], [-157.92, 21.31], [-157.97, 21.32], [-158.02, 21.31],
  [-158.11, 21.3], [-158.12, 21.33], [-158.15, 21.37], [-158.19, 21.42], [-158.22, 21.47], [-158.24, 21.52],
];

const W = 620, H = 500;
const proj = ([lon, lat]: [number, number]): [number, number] => [
  ((lon + 158.31) / 0.69) * (W - 40) + 20,
  ((21.74 - lat) / 0.5) * (H - 40) + 20,
];

/** Closed Catmull-Rom → cubic Bézier for a soft, hand-drawn coastline. */
function smooth(points: [number, number][]) {
  const p = points.map(proj);
  const n = p.length;
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}
const ISLAND = smooth(COAST);

/** Short marker labels and placement (dx, dy, anchor) so south-shore labels never collide. */
const LABELS: Record<string, [string, number, number, "start" | "end"]> = {
  "windward-coast": ["Windward Coast", 16, 4, "start"],
  "ko-olina": ["Ko Olina", -16, 4, "end"],
  waikiki: ["Waikiki", -14, 26, "end"],
  kahala: ["Kahala", 14, 26, "start"],
  "sunrise-east-shore": ["Sunrise · East", 8, -20, "end"],
};

/** Stylized illustrated Oahu map (inline SVG, no map API) with linked markers. */
export function OahuMap() {
  const marked = locations.filter((l) => l.coords);
  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label={`Illustrated map of Oahu marking proposal locations: ${marked.map((l) => l.name).join(", ")}`}>
        <defs>
          <pattern id="waves" width="28" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 8 Q7 2 14 8 T28 8" fill="none" stroke="var(--color-rose)" strokeOpacity=".25" strokeWidth=".8" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#waves)" />
        <path d={ISLAND} fill="var(--color-cream)" stroke="var(--color-rose)" strokeWidth="1.25" />
        <path d={ISLAND} fill="none" stroke="var(--color-rose)" strokeOpacity=".35" strokeWidth=".8" transform="translate(6 6)" />
        {/* Koʻolau & Waiʻanae ranges, suggested with soft ridgelines */}
        <path d={`M${proj([-158.2, 21.53]).join(" ")} C ${proj([-158.17, 21.48]).join(" ")} ${proj([-158.14, 21.43]).join(" ")} ${proj([-158.1, 21.39]).join(" ")}`} fill="none" stroke="var(--color-stone)" strokeWidth="6" strokeLinecap="round" />
        <path d={`M${proj([-157.97, 21.66]).join(" ")} C ${proj([-157.9, 21.55]).join(" ")} ${proj([-157.8, 21.4]).join(" ")} ${proj([-157.72, 21.33]).join(" ")}`} fill="none" stroke="var(--color-stone)" strokeWidth="6" strokeLinecap="round" />
        <text x="22" y="40" fontFamily="var(--font-display)" fontStyle="italic" fontSize="26" fill="var(--color-mauve)">Oʻahu</text>
        {marked.map((l) => {
          const [x, y] = proj(l.coords!);
          const [label, dx, dy, anchor] = LABELS[l.slug] ?? [l.name, 16, 4, "start"];
          return (
            <a key={l.slug} href={`/oahu-proposal-locations/${l.slug}`} aria-label={l.name}>
              <g className="group cursor-pointer">
                <circle cx={x} cy={y} r="16" fill="transparent" />
                <circle cx={x} cy={y} r="9" fill="var(--color-blush)" stroke="var(--color-mauve)" strokeWidth="1.2" />
                <circle cx={x} cy={y} r="3.2" fill="var(--color-mauve)" />
                <text x={x + dx} y={y + dy} textAnchor={anchor} fontFamily="var(--font-sans)" fontWeight="600" fontSize="12" letterSpacing="1.2" fill="var(--color-ink)">
                  {label.toUpperCase()}
                </text>
              </g>
            </a>
          );
        })}
      </svg>
      <figcaption className="caption mt-3">Stylized map — markers are approximate. Botanical gardens are found island-wide.</figcaption>
    </figure>
  );
}

export function LocationList() {
  return (
    <ul className="divide-y divide-stone border-y border-stone">
      {locations.map((l) => (
        <li key={l.slug}>
          <Link href={`/oahu-proposal-locations/${l.slug}`} className="group flex min-h-16 items-center justify-between gap-6 py-5">
            <span>
              <span className="eyebrow block">{l.region}</span>
              <span className="mt-1 block font-display text-[1.7rem] leading-tight group-hover:text-mauve">{l.name}</span>
              <span className="mt-1 block text-[0.95rem]">{l.teaser}</span>
            </span>
            <span aria-hidden="true" className="text-xl text-rose transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
