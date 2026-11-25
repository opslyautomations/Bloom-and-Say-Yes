import { isLong, type Review } from "@/content/reviews";

/** A single love note: long reviews show a pull-quote plus a native "Read full review" expand. */
export function ReviewCard({ r, size = "md" }: { r: Review; size?: "md" | "lg" }) {
  const long = isLong(r);
  return (
    <figure id={r.id} className="flex h-full flex-col">
      <span aria-hidden="true" className="font-display text-6xl leading-none text-rose">“</span>
      <blockquote className="-mt-4">
        <p className={size === "lg" ? "pull-quote" : "font-display text-[1.55rem] italic leading-snug text-ink"}>
          {long ? r.excerpt : r.text}
        </p>
      </blockquote>
      {long ? (
        <details className="read-more mt-3">
          <summary className="link-quiet">
            <span className="read-more-closed">Read full review</span>
            <span className="read-more-open">Hide full review</span>
          </summary>
          <p className="mt-2 text-[0.98rem] text-ink/90">{r.text}</p>
        </details>
      ) : null}
      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        <span className="h-px w-8 bg-rose" aria-hidden="true" />
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.14em]">{r.name}</span>
        {r.role ? <span className="caption">· {r.role}</span> : null}
      </figcaption>
    </figure>
  );
}

export function ReviewGrid({ items }: { items: Review[] }) {
  return (
    <ul className="grid gap-x-12 gap-y-14 md:grid-cols-2">
      {items.map((r, i) => (
        <li key={r.id} data-reveal="up" style={{ ["--i" as string]: i % 2 }} className="border-t border-stone pt-8">
          <ReviewCard r={r} />
        </li>
      ))}
    </ul>
  );
}
