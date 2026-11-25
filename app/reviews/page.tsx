import { reviews, reviewTagLabels, type ReviewTag } from "@/content/reviews";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { reviewsNode } from "@/lib/schema";
import { Todo } from "@/lib/confirm";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { ReviewCard } from "@/components/ReviewCard";

export const metadata = pageMeta({
  title: "Reviews & Love Notes | Bloom & Say Yes, Oahu",
  description:
    "Read what couples, families, and vendor partners say about Bloom & Say Yes — Oahu proposal planning, florals, elopements, and calm service.",
  path: "/reviews",
});

const tags = (Object.keys(reviewTagLabels) as ReviewTag[]).filter((t) => reviews.some((r) => r.tags.includes(t)));
const css = tags.map((t) => `#reviews-list:has(#rf-${t}:checked) .rl > li:not([data-tags~="${t}"]){display:none}`).join("");

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={reviewsNode(reviews)} />
      <PageIntro
        crumbs={[{ name: "Reviews", href: "/reviews" }]}
        eyebrow="Love notes"
        title={<>Every word, <em>verbatim</em></>}
        answer="Couples describe Bloom & Say Yes as calm, responsive, and obsessed with detail. These are their reviews, word for word: proposals planned with zero stress, florals that elevated weddings and parties, setups that adapted to Oahu weather, and LGBTQ+ couples who felt welcomed and celebrated."
      >
        <div className="mt-10">
          {site.social.googleReviewLink ? (
            <a href={site.social.googleReviewLink} className="btn btn-ghost" target="_blank" rel="noopener">Leave a review on Google</a>
          ) : (
            <span className="btn btn-ghost pointer-events-none opacity-60" aria-hidden="true">Leave a review on Google <Todo>GBP review link</Todo></span>
          )}
        </div>
      </PageIntro>

      <section id="reviews-list" className="bg-linen pb-24" aria-label="All reviews">
        <style>{css}</style>
        <div className="wrap">
          <fieldset>
            <legend className="sr-only">Filter reviews</legend>
            <div className="mb-14 flex flex-wrap gap-2">
              <input type="radio" name="rf" id="rf-all" className="filter-input" defaultChecked />
              <label htmlFor="rf-all" className="chip">All</label>
              {tags.map((t) => (
                <span key={t} className="contents">
                  <input type="radio" name="rf" id={`rf-${t}`} className="filter-input" />
                  <label htmlFor={`rf-${t}`} className="chip">{reviewTagLabels[t]}</label>
                </span>
              ))}
            </div>
          </fieldset>
          <ul className="rl grid gap-x-14 gap-y-16 md:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.id} data-tags={r.tags.join(" ")} className="border-t border-stone pt-8">
                <ReviewCard r={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta from="linen" />
    </>
  );
}
