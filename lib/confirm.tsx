import { Fragment, type ReactNode } from "react";

/**
 * {{CONFIRM: note}} markers flag facts the business hasn't published.
 * - development (or NEXT_PUBLIC_SHOW_TODOS=1): rendered as a visible .todo badge
 * - production: removed entirely, so no placeholder text ever ships
 */
export const SHOW_TODOS =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_TODOS === "1";

const MARKER = /\{\{CONFIRM(?::\s*([^}]*))?\}\}/g;

export function hasConfirm(text: string) {
  MARKER.lastIndex = 0;
  return MARKER.test(text);
}

/** Plain text with all markers removed — for schema, metadata, llms.txt. */
export function plain(text: string): string {
  return text.replace(MARKER, "").replace(/\s{2,}/g, " ").replace(/\s+([.,;:!?])/g, "$1").trim();
}

/** Inline dev badge. Renders nothing in production. */
export function Todo({ children }: { children?: ReactNode }) {
  if (!SHOW_TODOS) return null;
  return (
    <span className="todo" role="note">
      CONFIRM{children ? <>: {children}</> : null}
    </span>
  );
}

/** Render a content string, turning markers into badges (dev) or nothing (prod). */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  MARKER.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MARKER.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<Todo key={m.index}>{m[1]?.trim()}</Todo>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  if (!SHOW_TODOS) return <>{plain(text)}</>;
  return (
    <>
      {out.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  );
}

/** True when a string is *only* a marker (nothing to show in production). */
export function isOnlyConfirm(text: string | null | undefined) {
  return !text || plain(text) === "";
}
