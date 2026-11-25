"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/content/reviews";

/**
 * Crossfading pull quotes (7s). Every quote is server-rendered in the HTML;
 * without JS they show as a simple stacked list. Pauses on hover/focus,
 * has prev/next buttons and dots, and is fully keyboard accessible.
 */
export default function Testimonials({ items }: { items: Review[] }) {
  const [i, setI] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const n = items.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    setEnhanced(true);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setUserPaused(true);
  }, []);

  useEffect(() => {
    if (!enhanced || paused || userPaused) return;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [i, enhanced, paused, userPaused, go]);

  return (
    <div
      ref={root}
      className="quotes"
      data-enhanced={enhanced ? "" : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setPaused(false); }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Love notes from couples"
    >
      <ul className="quote-list">
        {items.map((r, idx) => (
          <li
            key={r.id}
            className="quote-item"
            data-active={idx === i ? "" : undefined}
            aria-hidden={enhanced && idx !== i ? true : undefined}
            aria-roledescription={enhanced ? "slide" : undefined}
            aria-label={enhanced ? `${idx + 1} of ${n}` : undefined}
          >
            <figure>
              <blockquote className="pull-quote">
                <p>“{r.excerpt}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-rose" aria-hidden="true" />
                <span className="font-semibold tracking-[0.14em] uppercase text-[0.8rem]">{r.name}</span>
                {r.role ? <span className="caption">· {r.role}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="quote-controls mt-10 flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-stone hover:ring-rose transition" aria-label="Previous love note">
          <span aria-hidden="true">←</span>
        </button>
        <div className="flex items-center gap-1">
          {items.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setI(idx)}
              className="grid h-11 w-7 place-items-center"
              aria-label={`Show love note from ${r.name}`}
              aria-current={idx === i ? "true" : undefined}
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-5 bg-mauve" : "w-1.5 bg-rose"}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-stone hover:ring-rose transition" aria-label="Next love note">
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          className="ml-2 min-h-11 px-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-dusk-text hover:text-ink"
          aria-pressed={userPaused}
        >
          {userPaused ? "Play" : "Pause"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {enhanced ? `Love note ${i + 1} of ${n}, from ${items[i].name}` : ""}
      </p>
    </div>
  );
}
