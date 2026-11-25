type Bg = "linen" | "cream" | "blush" | "white" | "ink";
const COLORS: Record<Bg, string> = {
  linen: "var(--color-linen)",
  cream: "var(--color-cream)",
  blush: "var(--color-blush)",
  white: "var(--color-white)",
  ink: "var(--color-ink)",
};

const W = 1200;
function scallops(n: number) {
  const w = W / n;
  let d = `M0 24 L0 17`;
  for (let i = 0; i < n; i++) d += ` Q${(i * w + w / 2).toFixed(1)} 3 ${((i + 1) * w).toFixed(1)} 17`;
  return d + ` L${W} 24 Z`;
}
function petals(n: number) {
  const w = W / n;
  let d = `M0 24 L0 18`;
  for (let i = 0; i < n; i++) {
    const x = i * w;
    const top = i % 2 ? 9 : 2;
    d += ` C${(x + w * 0.18).toFixed(1)} 18 ${(x + w * 0.32).toFixed(1)} ${top} ${(x + w / 2).toFixed(1)} ${top}`;
    d += ` C${(x + w * 0.68).toFixed(1)} ${top} ${(x + w * 0.82).toFixed(1)} 18 ${(x + w).toFixed(1)} 18`;
  }
  return d + ` L${W} 24 Z`;
}
const PATHS = { a: scallops(28), b: petals(22) };

/** Scalloped / petal-edge boundary between two section backgrounds (24px tall). */
export function PetalDivider({ from, to, variant = "a" }: { from: Bg; to: Bg; variant?: "a" | "b" }) {
  return (
    <svg className="petal-divider" viewBox={`0 0 ${W} 24`} preserveAspectRatio="none" aria-hidden="true" focusable="false" style={{ background: COLORS[from], marginBottom: -1 }}>
      <path d={PATHS[variant]} fill={COLORS[to]} />
    </svg>
  );
}
