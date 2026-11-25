import { LeafSprig } from "./Icons";

/** Deterministic, slightly irregular sine so the stroke feels hand-drawn. */
function vinePath() {
  const pts: [number, number][] = [];
  const N = 160;
  for (let i = 0; i <= N; i++) {
    const y = (i / N) * 1000;
    const wobble = Math.sin(i * 1.15) * 5.5 + Math.sin(i * 0.37 + 1) * 2.5;
    pts.push([16 + wobble, y]);
  }
  let d = `M${pts[0][0].toFixed(2)} 0`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const my = (y0 + y1) / 2;
    d += ` C${x0.toFixed(2)} ${my.toFixed(2)} ${x1.toFixed(2)} ${my.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d;
}
const D = vinePath();

/**
 * The Vine — one continuous rose stroke down the homepage's left gutter on
 * desktop, drawn with scroll progress (CSS scroll-driven animation with a JS
 * fallback). Must be placed inside an element with class "vine-track".
 */
export function Vine() {
  return (
    <div className="vine" aria-hidden="true">
      <div className="vine-draw">
        <svg viewBox="0 0 32 1000" preserveAspectRatio="none" focusable="false">
          <path d={D} />
        </svg>
      </div>
    </div>
  );
}

/** Mobile version of the vine: a thin progress line at the top of the viewport. */
export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

type ChapterProps = { n: string; label: string; bg?: string };

/** Roman-numeral chapter marker that sits on the vine (desktop) or above the heading (mobile). */
export function ChapterMarker({ n, label, bg }: ChapterProps) {
  return (
    <div className="chapter-mark" style={bg ? ({ "--chapter-bg": bg } as React.CSSProperties) : undefined}>
      <span className="numeral" aria-hidden="true">{n}.</span>
      <span className="label" aria-hidden="true">{label}</span>
      <span className="sr-only">Chapter {n}: {label}</span>
      <span className="leaf" data-reveal="leaf"><LeafSprig className="w-full h-full" /></span>
    </div>
  );
}
