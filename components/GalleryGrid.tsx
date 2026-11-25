import { altFor, galleryCategories, type SiteImage } from "@/lib/images";
import { Photo } from "./Photo";
import { Rich, SHOW_TODOS, isOnlyConfirm } from "@/lib/confirm";
import GalleryLightbox from "./GalleryLightbox";

/**
 * Masonry portfolio with filter chips. Filtering is pure CSS (radio inputs +
 * generated :has() selectors) so it works without JS; categories with no
 * photos are hidden automatically. Lightbox is a progressive enhancement.
 */
export function GalleryGrid({ items, id = "gallery" }: { items: SiteImage[]; id?: string }) {
  const cats = galleryCategories.filter((c) => items.some((i) => i.category === c.id));
  const css = cats
    .map((c) => `#${id}:has(#${id}-f-${c.id}:checked) .masonry > :not([data-cat="${c.id}"]){display:none}`)
    .join("");

  return (
    <div id={id}>
      <style>{css}</style>
      <fieldset className="contents">
        <legend className="sr-only">Filter photos</legend>
        <div className="mb-10 flex flex-wrap gap-2">
          <input type="radio" name={`${id}-filter`} id={`${id}-f-all`} className="filter-input" defaultChecked />
          <label htmlFor={`${id}-f-all`} className="chip">All</label>
          {cats.map((c) => (
            <span key={c.id} className="contents">
              <input type="radio" name={`${id}-filter`} id={`${id}-f-${c.id}`} className="filter-input" />
              <label htmlFor={`${id}-f-${c.id}`} className="chip">{c.label}</label>
            </span>
          ))}
        </div>
      </fieldset>
      <ul className="masonry">
        {items.map((img, i) => (
          <li key={img.id} data-cat={img.category} data-reveal="up" style={{ ["--i" as string]: i % 3 }}>
            <a href={img.src} data-lightbox-index={i} className="soft group relative block" aria-label={`Open photo: ${altFor(img)}`}>
              <Photo img={img} fill={false} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
            </a>
            {img.caption && (SHOW_TODOS || !isOnlyConfirm(img.caption)) ? (
              <p className="caption mt-2"><Rich text={img.caption} /></p>
            ) : null}
          </li>
        ))}
      </ul>
      <GalleryLightbox rootId={id} items={items.map((i) => ({ src: i.src, alt: altFor(i), width: i.width, height: i.height }))} />
    </div>
  );
}
