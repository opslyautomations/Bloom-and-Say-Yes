import { founderStory, site } from "@/content/site";
import { ChapterMarker } from "./Vine";
import { PetalDivider } from "./PetalDivider";
import { PlanLink } from "./plan/PlanLink";
import type { PlanService } from "@/lib/plan";

type Bg = "linen" | "cream" | "blush";

/** Five-petal line-art flower that blooms around the button (stroke draw, 1.2s). */
function Bloom() {
  const petal = "M-20 -64 C-58 -104 -40 -156 0 -166 C40 -156 58 -104 20 -64";
  return (
    <svg className="bloom" viewBox="-170 -170 340 340" aria-hidden="true" focusable="false">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={petal} transform={`rotate(${i * 72 + 36})`} pathLength={1} style={{ ["--i" as string]: i }} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={`v${i}`} d="M0 -72 C4 -96 -4 -120 0 -140" transform={`rotate(${i * 72 + 36})`} pathLength={1} style={{ ["--i" as string]: i + 5 }} />
      ))}
    </svg>
  );
}

/**
 * The single dark section on every page: the closing "Begin" band.
 * On the homepage it is Chapter VIII and the vine blooms here.
 */
export function FinalCta({
  from = "linen", chapter = false, href, service = "auto", label = "Begin planning",
}: { from?: Bg; chapter?: boolean; href?: string; service?: PlanService | "auto" | "choose"; label?: string }) {
  return (
    <>
      <PetalDivider from={from} to="ink" variant="b" />
      <section className="on-dark relative overflow-hidden bg-ink py-24 text-cream sm:py-32" aria-labelledby="final-cta-heading" data-petal-zone>
        <div className={`wrap ${chapter ? "wrap-vine" : ""}`}>
          {chapter ? <ChapterMarker n="VIII" label="Begin" bg="var(--color-ink)" /> : null}
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow" data-reveal="up">Begin</p>
            <h2 id="final-cta-heading" className="h2 mt-4" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              Let&apos;s make it <em>beautiful.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-display text-[1.5rem] italic leading-snug text-blush" data-reveal="up" style={{ ["--i" as string]: 2 }}>
              “{founderStory.signOff}”
              <span className="mt-2 block font-sans text-[0.8rem] font-semibold not-italic uppercase tracking-[0.16em] text-rose-light">— Scarlett</span>
            </p>
            <div className="relative mx-auto mt-14 grid h-[340px] place-items-center">
              <Bloom />
              <PlanLink service={service} source="final_cta" href={href} className="btn relative z-10 !min-h-[60px] !px-9">
                {label} <span className="arrow" aria-hidden="true">→</span>
              </PlanLink>
            </div>
            <p className="mt-4 text-[0.98rem] text-blush">
              Or call / text <a className="link" href={site.phone.href}>{site.phone.display}</a>
              <span aria-hidden="true" className="mx-2 text-rose">·</span>
              <a className="link break-all" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </section>
      <PetalDivider from="ink" to="blush" variant="a" />
    </>
  );
}
