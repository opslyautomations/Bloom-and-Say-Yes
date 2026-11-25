import Image from "next/image";
import { photos, altFor } from "@/lib/images";
import { canOptimize, getInstagramFeed, IG_PROFILE_URL, IG_USERNAME, type IgPost } from "@/lib/instagram";
import { InstagramIcon } from "./Icons";
import { Photo } from "./Photo";

const SIZES = "(min-width: 1024px) 22vw, (min-width: 640px) 31vw, 46vw";

function excerpt(caption: string, n = 110) {
  const c = caption.replace(/\s+/g, " ").trim();
  return c.length > n ? `${c.slice(0, n).replace(/\s+\S*$/, "")}…` : c;
}

function TypeBadge({ type }: { type: IgPost["type"] }) {
  if (type === "image") return null;
  return (
    <span className="absolute right-2.5 top-2.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-ink/45 text-cream backdrop-blur-sm" aria-hidden="true">
      {type === "video" ? (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="7" y="7" width="13" height="13" rx="2" /><path d="M4 16V5a1 1 0 0 1 1-1h11" /></svg>
      )}
    </span>
  );
}

/**
 * "Follow along" Instagram section. Shows the latest posts when a feed source
 * is connected (see lib/instagram.ts); otherwise the site's own portfolio
 * photos linking to the profile — never presented as a live feed.
 */
export async function InstagramFeed({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const feed = await getInstagramFeed();
  const H = headingLevel === 2 ? "h2" : "h3";
  const tile = "soft group relative block aspect-square overflow-hidden";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          {feed?.avatar ? (
            <Image src={feed.avatar} alt="" width={56} height={56} unoptimized={!canOptimize(feed.avatar)} className="h-14 w-14 rounded-full ring-1 ring-rose ring-offset-2 ring-offset-[var(--color-linen)]" />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-full bg-blush text-mauve ring-1 ring-rose ring-offset-2 ring-offset-[var(--color-linen)]" aria-hidden="true">
              <InstagramIcon className="h-6 w-6" />
            </span>
          )}
          <div>
            <p className="eyebrow">{feed ? "Latest on Instagram" : "On Instagram"}</p>
            <H className="mt-1 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight">
              Follow along <em className="text-mauve">@{feed?.username ?? IG_USERNAME}</em>
            </H>
          </div>
        </div>
        <a href={IG_PROFILE_URL} target="_blank" rel="noopener" className="btn btn-ghost">
          <InstagramIcon className="h-4 w-4" /> Follow on Instagram<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {feed ? (
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {feed.posts.map((p, i) => {
            const text = excerpt(p.caption);
            return (
              <li key={p.id} className={i >= 6 ? "hidden lg:block" : undefined}>
                <a href={p.permalink} target="_blank" rel="noopener" className={tile}>
                  <Image
                    src={p.src}
                    alt={text ? `Instagram post: ${text}` : "Instagram post by Bloom & Say Yes"}
                    fill
                    sizes={SIZES}
                    unoptimized={!canOptimize(p.src)}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <TypeBadge type={p.type} />
                  {text ? (
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-4 text-[0.85rem] leading-snug text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                      {text}
                    </span>
                  ) : null}
                  <span className="sr-only"> (opens Instagram in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {photos.slice(0, 8).map((img, i) => (
            <li key={img.id} className={i >= 6 ? "hidden lg:block" : undefined}>
              <a href={IG_PROFILE_URL} target="_blank" rel="noopener" className={tile} aria-label={`${altFor(img)} — see more on Instagram (opens in a new tab)`}>
                <Photo img={img} sizes={SIZES} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-cream opacity-0 transition-all duration-300 group-hover:bg-ink/35 group-hover:opacity-100" aria-hidden="true">
                  <InstagramIcon className="h-7 w-7" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
