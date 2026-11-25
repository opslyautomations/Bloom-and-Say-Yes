import Link from "next/link";
import type { ReactNode } from "react";
import type { Service } from "@/content/services";
import { faqById, faqsFor } from "@/content/faqs";
import { reviewsFor } from "@/content/reviews";
import { site } from "@/content/site";
import { images, photos } from "@/lib/images";
import { Rich } from "@/lib/confirm";
import { faqNode, serviceNode } from "@/lib/schema";
import { Arch } from "./Arch";
import { CrossLinks } from "./CrossLinks";
import { FaqList } from "./Faq";
import { FinalCta } from "./FinalCta";
import { InquirySection } from "./InquirySection";
import { JsonLd } from "./JsonLd";
import { Packages } from "./Packages";
import { PageIntro } from "./PageIntro";
import { PetalDivider } from "./PetalDivider";
import { Photo } from "./Photo";
import { PlanLink } from "./plan/PlanLink";
import { ReviewGrid } from "./ReviewCard";
import { Steps } from "./Steps";

const COST_FAQ: Record<Service["slug"], { id: string; q: string }> = {
  engagement: { id: "cost", q: "How much does a proposal planner cost on Oahu?" },
  "gender-reveals": { id: "gr-cost", q: "How much does a gender reveal cost in Honolulu?" },
  "intimate-elopements": { id: "el-cost", q: "How much does an Oahu elopement cost?" },
};

type Props = {
  service: Service;
  /** Extra sections after reviews (e.g. planning from afar, weather, permits). Each renders on its own band. */
  extras?: { id: string; node: ReactNode }[];
  locationSlugs: string[];
  reviewCount?: number;
  emphasis?: string;
};

/** Shared template for the three service pages, driven entirely by /content. */
export function ServicePage({ service: s, extras = [], locationSlugs, reviewCount = 4, emphasis }: Props) {
  const faqList = faqsFor(s.slug);
  const cost = COST_FAQ[s.slug];
  const costFaq = faqById(cost.id);
  const tagged = photos.filter((p) => s.galleryTags.some((t) => (p.tags as string[]).includes(t)));
  // 1 tall tile + 4 = a full 3×2 / 2×3 grid with no orphans
  const strip = tagged.slice(0, 5);
  const reviewList = reviewsFor(s.reviewTags, s.preferredReviews, reviewCount);
  const [before, after] = emphasis ? s.h1.split(emphasis) : [s.h1, ""];
  // Distinct anchor text for #plan links (header "Begin planning" goes to /contact)
  const planLabel = `Plan your ${s.slug === "engagement" ? "proposal" : s.slug === "gender-reveals" ? "reveal" : "elopement"}`;

  return (
    <>
      <JsonLd data={serviceNode(s)} />
      <JsonLd data={faqNode(faqList, s.path)} />

      <PageIntro
        crumbs={[{ name: s.navLabel, href: s.path }]}
        eyebrow={s.eyebrow}
        title={emphasis ? <>{before}<em>{emphasis}</em>{after}</> : s.h1}
        answer={s.answer}
        image={images[s.image]}
        primary={{ href: "#plan", label: planLabel, plan: s.slug }}
        secondary={{ href: "#work", label: "See the work" }}
      >
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-dusk-text">
          {site.trustRow.map((t) => (
            <li key={t} className="flex items-center gap-2"><span className="text-rose" aria-hidden="true">✿</span>{t}</li>
          ))}
        </ul>
      </PageIntro>

      {/* What's included */}
      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20 sm:py-28" aria-labelledby="included-heading">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-6 lg:pr-0">
            <div className="relative lg:sticky lg:top-28">
              <Arch img={images[s.secondaryImage]} sizes="(min-width: 1024px) 46vw, 92vw" ratio="4 / 5" parallax echo="left" className="max-w-[560px]" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:-ml-12 lg:pt-24 relative z-10">
            <div className="bg-cream lg:pl-12 lg:pt-10">
              <p className="eyebrow" data-reveal="up">{s.promise}</p>
              <h2 id="included-heading" className="h2 mt-4" data-reveal="up">{s.includedHeading}</h2>
              <p className="answer mt-6" data-reveal="up"><Rich text={s.includedAnswer} /></p>
              <p className="mt-6 measure">{s.intro}</p>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:pl-12">
              {s.included.map((x, i) => (
                <li key={x.title} className="border-t border-stone pt-5" data-reveal="up" style={{ ["--i" as string]: i % 2 }}>
                  <h3 className="font-display text-[1.55rem] leading-tight">{x.title}</h3>
                  <p className="mt-2 text-[0.98rem]"><Rich text={x.body} /></p>
                </li>
              ))}
            </ul>
            <p className="mt-12 lg:pl-12"><PlanLink service={s.slug} source="included_chapter" href="#plan" className="link-quiet">Tell us your vision <span className="arrow" aria-hidden="true">→</span></PlanLink></p>
          </div>
        </div>
      </section>

      {/* Packages & pricing */}
      <PetalDivider from="cream" to="linen" variant="b" />
      <section className="bg-linen py-20 sm:py-28" aria-labelledby="pricing-heading">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Packages & pricing</p>
            <h2 id="pricing-heading" className="h2 mt-4">{cost.q}</h2>
            <p className="answer mt-6"><Rich text={costFaq.a} /></p>
          </div>
          <div className="mt-16"><Packages service={s} /></div>
        </div>
      </section>

      {/* How it unfolds */}
      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20 sm:py-28" aria-labelledby="process-heading">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">How it unfolds</p>
            <h2 id="process-heading" className="h2 mt-4">How does planning with Bloom & Say Yes work?</h2>
            <p className="answer mt-6">
              Planning with Bloom & Say Yes takes five calm steps: share your vision in a one-minute form, talk it
              through with Scarlett, approve the design and florals, let us coordinate every vendor, and then simply
              arrive for your moment on Oahu. You&apos;re kept in the loop the whole way.
            </p>
          </div>
          <div className="mt-16"><Steps /></div>
        </div>
      </section>

      {/* Gallery */}
      <PetalDivider from="cream" to="linen" variant="b" />
      <section id="work" className="scroll-mt-24 bg-linen py-20 sm:py-28" aria-labelledby="work-heading">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The work</p>
              <h2 id="work-heading" className="h2 mt-4">Setups we&apos;ve <em>designed</em></h2>
            </div>
            <Link href="/gallery" className="link-quiet">View the full gallery <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {strip.map((img, i) => (
              <li key={img.id} className={`soft relative ${i === 0 ? "row-span-2 aspect-[3/4.4] lg:aspect-auto" : "aspect-[4/5]"}`} data-reveal="up" style={{ ["--i" as string]: i % 3 }}>
                <Photo img={img} sizes={i === 0 ? "(min-width: 1024px) 31vw, 48vw" : "(min-width: 1024px) 31vw, 48vw"} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <PetalDivider from="linen" to="blush" />
      <section className="bg-blush py-20 sm:py-28" aria-labelledby="reviews-heading">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Love notes</p>
              <h2 id="reviews-heading" className="h2 mt-4">What couples say</h2>
            </div>
            <Link href="/reviews" className="link-quiet">All reviews <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <div className="mt-14"><ReviewGrid items={reviewList} /></div>
        </div>
      </section>

      {extras.map((x, i) => {
        const bg = i % 2 === 0 ? "linen" : "cream";
        const prev = i === 0 ? "blush" : i % 2 === 1 ? "linen" : "cream";
        return (
          <div key={x.id}>
            <PetalDivider from={prev} to={bg} variant={i % 2 ? "b" : "a"} />
            <section id={x.id} className={`${bg === "linen" ? "bg-linen" : "bg-cream"} py-20 sm:py-28`}>
              <div className="wrap">{x.node}</div>
            </section>
          </div>
        );
      })}

      {/* FAQs */}
      {(() => {
        const prev = extras.length === 0 ? "blush" : extras.length % 2 === 1 ? "linen" : "cream";
        const bg = prev === "cream" ? "linen" : "cream";
        return (
          <>
            <PetalDivider from={prev} to={bg} />
            <section className={`${bg === "cream" ? "bg-cream" : "bg-linen"} py-20 sm:py-28`} aria-labelledby="faq-heading">
              <div className="wrap grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="eyebrow">Questions</p>
                  <h2 id="faq-heading" className="h2 mt-4">{s.navLabel}, <em>answered</em></h2>
                  <p className="mt-6"><Link href="/faq" className="link-quiet">Every question <span className="arrow" aria-hidden="true">→</span></Link></p>
                </div>
                <div className="lg:col-span-8"><FaqList items={faqList} /></div>
              </div>
            </section>
            <PetalDivider from={bg} to="linen" variant="b" />
          </>
        );
      })()}

      <section className="bg-linen py-20 sm:py-24" aria-label="Related pages">
        <div className="wrap">
          <CrossLinks current={s.slug} locationSlugs={locationSlugs} />
        </div>
      </section>

      <PetalDivider from="linen" to="cream" />
      <InquirySection
        formId={s.formId}
        formTitle={s.formTitle}
        formHeight={s.formHeight}
        heading={`Plan your ${s.slug === "engagement" ? "proposal" : s.slug === "gender-reveals" ? "reveal" : "elopement"}`}
      />

      <FinalCta from="cream" href="#plan" service={s.slug} label={planLabel} />
    </>
  );
}
