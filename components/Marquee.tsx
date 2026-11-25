import type { SiteImage } from "@/lib/images";
import { Photo } from "./Photo";

function Row({ items, reverse }: { items: SiteImage[]; reverse?: boolean }) {
  const tile = (img: SiteImage, key: string, hidden = false) => {
    const landscape = img.width > img.height;
    return (
      <li key={key} className={`soft relative h-56 shrink-0 sm:h-72 ${landscape ? "w-[21rem] sm:w-[27rem]" : "w-[10.5rem] sm:w-[13.5rem]"}`} aria-hidden={hidden || undefined}>
        <Photo img={img} sizes={landscape ? "432px" : "216px"} />
      </li>
    );
  };
  return (
    <ul className="marquee-track" data-dir={reverse ? "reverse" : undefined}>
      {items.map((img) => tile(img, img.id))}
      {items.map((img) => tile(img, `${img.id}-dup`, true))}
    </ul>
  );
}

/**
 * Portfolio strip: two rows drifting in opposite directions (CSS-only, 60s).
 * Pauses on hover/focus, and the Pause toggle is a CSS checkbox — no JS.
 * Scales to any number of photos.
 */
export function Marquee({ items }: { items: SiteImage[] }) {
  const half = Math.ceil(items.length / 2);
  const a = items.slice(0, half);
  const b = items.slice(half).length ? items.slice(half) : items;
  return (
    <div className="relative z-[12]">
      <input type="checkbox" id="marquee-pause" className="peer sr-only" />
      <label htmlFor="marquee-pause" className="absolute -top-14 right-4 z-10 inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-dusk-text hover:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-rose-text sm:right-10 [&_.on]:hidden peer-checked:[&_.on]:inline peer-checked:[&_.off]:hidden">
        <span className="off">Pause motion</span>
        <span className="on">Play motion</span>
      </label>
      <div className="marquee space-y-4 peer-checked:[&_.marquee-track]:[animation-play-state:paused]" aria-label="Portfolio highlights" role="region">
        <Row items={a} />
        <Row items={b} reverse />
      </div>
    </div>
  );
}
