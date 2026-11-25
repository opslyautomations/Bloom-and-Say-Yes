"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; alt: string; width: number; height: number };

/**
 * Enhances the server-rendered gallery: links to full-size images open in an
 * accessible <dialog> lightbox (native focus trap + Esc), with arrow-key
 * navigation. Without JS, each thumbnail simply links to the image file.
 */
export default function GalleryLightbox({ items, rootId }: { items: Item[]; rootId: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [idx, setIdx] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible = useCallback(() => {
    const root = document.getElementById(rootId);
    if (!root) return items.map((_, i) => i);
    return Array.from(root.querySelectorAll<HTMLElement>("[data-lightbox-index]"))
      .filter((a) => a.offsetParent !== null)
      .map((a) => Number(a.dataset.lightboxIndex));
  }, [items, rootId]);

  const step = useCallback(
    (d: number) => {
      setIdx((cur) => {
        if (cur === null) return cur;
        const list = visible();
        const pos = list.indexOf(cur);
        return list[(pos + d + list.length) % list.length];
      });
    },
    [visible],
  );

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox-index]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      opener.current = a;
      setIdx(Number(a.dataset.lightboxIndex));
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [rootId]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (idx !== null && !d.open) d.showModal();
    if (idx === null && d.open) d.close();
  }, [idx]);

  const item = idx !== null ? items[idx] : null;

  return (
    <dialog
      ref={dlg}
      className="lightbox"
      aria-label="Photo viewer"
      onClose={() => {
        setIdx(null);
        opener.current?.focus();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIdx(null);
      }}
    >
      {item ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size view of an already-optimized image */}
          <img
            src={`/_next/image?url=${encodeURIComponent(item.src)}&w=1920&q=80`}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="max-h-[78dvh] w-auto max-w-full rounded-[10px] object-contain"
          />
          <p className="max-w-2xl text-center text-sm text-cream/85">{item.alt}</p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-cream/40 hover:ring-cream" aria-label="Previous photo">←</button>
            <button type="button" onClick={() => setIdx(null)} className="min-h-12 rounded-full px-6 ring-1 ring-cream/40 hover:ring-cream text-xs font-semibold uppercase tracking-[0.16em]" autoFocus>Close</button>
            <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-cream/40 hover:ring-cream" aria-label="Next photo">→</button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
