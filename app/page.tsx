import Link from "next/link";
import { founderStory, site } from "@/content/site";
import { services } from "@/content/services";
import { faqsFor } from "@/content/faqs";
import { reviewById, reviews } from "@/content/reviews";
import { locationBySlug } from "@/content/locations";
import { images, photos } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import { faqNode, websiteNode } from "@/lib/schema";
import { Arch } from "@/components/Arch";
import { ChapterMarker, ScrollProgress, Vine } from "@/components/Vine";
import { FaqList } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { PetalDivider } from "@/components/PetalDivider";
import { PlanningFromAfar } from "@/components/PlanningFromAfar";
import { Steps } from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import { PlanLink } from "@/components/plan/PlanLink";
import { InstagramFeed } from "@/components/InstagramFeed";

export const metadata = pageMeta({
  title: "Oahu Proposal Planner & Floral Design | Bloom & Say Yes",
  description:
    "Bloom & Say Yes plans beach proposals, gender reveals, and intimate elopements across Oahu — florals designed in-house and every vendor coordinated.",
  path: "/",
});

const featured = ["courtney-choy", "elizabeth-merriam", "jasmine-tokeshi", "gracey-boudreaux", "taylor", "adrienne-wu", "patrick-ka"];
const shortNotes = ["elizabeth-merriam", "duc-tran", "gracey-boudreaux"];
const teaserLocations = ["windward-coast", "botanical-gardens", "sunrise-east-shore"];
const homeFaqs = faqsFor("home");

const card = (i: number) => ({ ["--i" as string]: i });

export default function Home() {
  return (
    <>
      <JsonLd data={websiteNode()} />
      <JsonLd data={faqNode(homeFaqs, "/")} />
      <ScrollProgress />

      <div className="vine-track">
        <Vine />

        {/* I. The Moment */}
        <section id="hero" className="relative bg-linen pb-16 pt-8 sm:pt-14 lg:pb-24" data-petal-zone aria-labelledby="hero-heading">
          <div className="wrap wrap-vine">
            <ChapterMarker n="I" label="The Moment" />
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
              <div className="relative z-10 lg:col-span-6">
                <h1 id="hero-heading">
                  <span className="eyebrow block">Oahu Proposal Planner</span>
                  <span className="h1 mt-5 block lg:mr-[-48px]">
                    Forever starts with a <em>single</em> moment.
                  </span>
                </h1>
                <p className="lede mt-8" data-reveal="up-sm" style={{ ...card(0), ["--d" as string]: "250ms" }}>
                  Bloom & Say Yes plans and designs beach proposals, surprise engagements, gender reveals, and intimate
                  elopements across Oahu — with florals built by hand and every vendor handled for you.
                </p>
                <div className="mt-10 flex flex-wrap gap-3" data-reveal="up-sm" style={{ ...card(1), ["--d" as string]: "250ms" }}>
                  <PlanLink source="hero" className="btn">Begin planning <span className="arrow" aria-hidden="true">→</span></PlanLink>
                  <Link href="/gallery" className="btn btn-ghost">See our work</Link>
                </div>
                <ul className="mt-10 flex flex-col gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-dusk-text sm:flex-row sm:flex-wrap sm:gap-x-6" data-reveal="up-sm" style={{ ...card(2), ["--d" as string]: "250ms" }}>
                  {site.trustRow.map((t) => (
                    <li key={t} className="flex items-center gap-2"><span className="text-rose" aria-hidden="true">✿</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6">
                <Arch img={images.hero} priority kenburns sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 92vw" ratio="5 / 6" echo="right" className="mx-auto w-full max-w-[580px] lg:mr-0" />
              </div>
            </div>
          </div>
        </section>

        {/* Answer block — no chapter number */}
        <section className="bg-linen pb-20 sm:pb-28" aria-labelledby="what-heading">
          <div className="wrap wrap-vine">
            <div className="grid gap-6 border-t border-stone pt-12 lg:grid-cols-12">
              <h2 id="what-heading" className="h3 lg:col-span-4" data-reveal="up">What does Bloom & Say Yes do?</h2>
              <p className="answer lg:col-span-8" data-reveal="up" style={card(1)}>
                Bloom & Say Yes is an Oahu proposal planner and floral design studio led by founder Scarlett. We plan
                surprise proposals, gender reveals, and intimate elopements across Honolulu and the island — designing
                every floral arrangement in-house, styling the setting, and hiring and coordinating every vendor, from
                photographers to cake.
              </p>
            </div>
          </div>
        </section>

        {/* II. Meet Scarlett */}
        <PetalDivider from="linen" to="cream" />
        <section className="relative bg-cream py-20 sm:py-28" aria-labelledby="scarlett-heading">
          <div className="wrap wrap-vine">
            <ChapterMarker n="II" label="Meet Scarlett" bg="var(--color-cream)" />
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
              <div className="lg:col-span-7">
                <Arch img={images.scarlettFounder} sizes="(min-width: 1024px) 50vw, 92vw" ratio="4 / 5" parallax echo="left" className="max-w-[600px]" />
              </div>
              <div className="relative z-10 lg:col-span-5 lg:-ml-12">
                <div className="bg-cream lg:py-10 lg:pl-12">
                  <p className="eyebrow" data-reveal="up">Meet Scarlett</p>
                  <h2 id="scarlett-heading" className="h2 mt-4" data-reveal="up">Details matter. <em>Intention</em> matters.</h2>
                  <p className="mt-6" data-reveal="up">{founderStory.short}</p>
                  <p className="mt-4" data-reveal="up">
                    She designs the florals, coordinates every vendor, and makes sure every detail is exactly as it should be.
                  </p>
                  <div className="mt-10 flex items-end gap-5 border-t border-stone pt-8" data-reveal="up">
                    <p className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-mauve">{founderStory.stat.value}</p>
                    <p className="max-w-[16rem] pb-2 text-[0.95rem] leading-snug">{founderStory.stat.caption}</p>
                  </div>
                  <Link href="/about" className="link-quiet mt-8">Read Scarlett&apos;s story <span className="arrow" aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* III. What We Create */}
        <PetalDivider from="cream" to="linen" variant="b" />
        <section className="relative bg-linen py-20 sm:py-28" aria-labelledby="create-heading">
          <div className="wrap wrap-vine">
            <ChapterMarker n="III" label="What We Create" />
            <div className="max-w-2xl">
              <p className="eyebrow">What we create</p>
              <h2 id="create-heading" className="h2 mt-4">Three ways to say <em>yes</em></h2>
            </div>
            <ul className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
              {services.map((s, i) => (
                <li key={s.slug} className={i === 1 ? "md:mt-16" : ""} data-reveal="up" style={card(i)}>
                  <Link href={s.path} className="group block">
                    <Arch img={images[s.image]} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 30vw, 92vw" ratio="3 / 4.3" />
                    <h3 className="mt-7 font-display text-[2rem] leading-tight transition-colors group-hover:text-mauve">{s.name}</h3>
                  </Link>
                  <p className="mt-1 font-display text-xl italic text-dusk-text">{s.promise}</p>
                  <ul className="mt-5 space-y-2 border-t border-stone pt-5 text-[0.98rem]">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3"><span className="text-rose" aria-hidden="true">✿</span>{b}</li>
                    ))}
                  </ul>
                  <Link href={s.path} className="link-quiet mt-5">Explore {s.navLabel.toLowerCase()} <span className="arrow" aria-hidden="true">→</span></Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* IV. How It Unfolds */}
        <PetalDivider from="linen" to="cream" />
        <section className="relative bg-cream py-20 sm:py-28" aria-labelledby="unfolds-heading" style={{ ["--step-bg" as string]: "var(--color-cream)" }}>
          <div className="wrap wrap-vine">
            <ChapterMarker n="IV" label="How It Unfolds" bg="var(--color-cream)" />
            <div className="max-w-2xl">
              <p className="eyebrow">How it unfolds</p>
              <h2 id="unfolds-heading" className="h2 mt-4">You share the vision. <em>We handle the rest.</em></h2>
            </div>
            <div className="mt-16"><Steps /></div>
            <PlanLink source="unfolds_chapter" className="link-quiet mt-12">Start with the one-minute form <span className="arrow" aria-hidden="true">→</span></PlanLink>
          </div>
        </section>

        {/* Portfolio strip */}
        <section className="bg-cream pb-24 pt-6" aria-labelledby="strip-heading">
          <div className="wrap wrap-vine mb-16 flex flex-wrap items-end justify-between gap-4">
            <h2 id="strip-heading" className="h3">From the portfolio</h2>
            <Link href="/gallery" className="link-quiet">View the gallery <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <Marquee items={photos} />
        </section>

        {/* V. Love Notes */}
        <PetalDivider from="cream" to="blush" variant="b" />
        <section className="relative bg-blush py-20 sm:py-28" aria-labelledby="love-heading">
          <div className="wrap wrap-vine">
            <ChapterMarker n="V" label="Love Notes" bg="var(--color-blush)" />
            <p className="eyebrow">Love notes</p>
            <h2 id="love-heading" className="sr-only">Love notes from couples</h2>
            <div className="mt-8 max-w-4xl">
              <Testimonials items={featured.map(reviewById)} />
            </div>
            <ul className="mt-20 grid gap-10 border-t border-stone pt-12 md:grid-cols-3">
              {shortNotes.map((id, i) => {
                const r = reviewById(id);
                return (
                  <li key={id} data-reveal="up" style={card(i)}>
                    <p className="font-display text-[1.35rem] italic leading-snug">“{r.excerpt}”</p>
                    <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em]">{r.name}{r.role ? <span className="caption normal-case tracking-normal"> · {r.role}</span> : null}</p>
                  </li>
                );
              })}
            </ul>
            <Link href="/reviews" className="link-quiet mt-12">Read all {reviews.length} reviews <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </section>

        {/* Instagram */}
        <PetalDivider from="blush" to="linen" />
        <section className="relative z-[12] bg-linen pt-20 sm:pt-28" aria-label="Instagram">
          <div className="wrap wrap-vine">
            <InstagramFeed />
          </div>
        </section>

        {/* Planning from afar */}
        <section className="bg-linen py-20 sm:py-28" aria-label="Planning from afar">
          <div className="wrap wrap-vine">
            <PlanningFromAfar />
          </div>
        </section>

        {/* VI. Where to Say Yes */}
        <PetalDivider from="linen" to="cream" variant="b" />
        <section className="relative bg-cream py-20 sm:py-28" aria-labelledby="where-heading">
          <div className="wrap wrap-vine">
            <ChapterMarker n="VI" label="Where to Say Yes" bg="var(--color-cream)" />
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="eyebrow">Where to say yes</p>
                <h2 id="where-heading" className="h2 mt-4">Where should you propose on <em>Oahu?</em></h2>
              </div>
              <Link href="/oahu-proposal-locations" className="link-quiet">The full location guide <span className="arrow" aria-hidden="true">→</span></Link>
            </div>
            <ul className="mt-14 grid gap-10 sm:grid-cols-3">
              {teaserLocations.map((slug, i) => {
                const l = locationBySlug(slug)!;
                return (
                  <li key={slug} data-reveal="up" style={card(i)}>
                    <Link href={`/oahu-proposal-locations/${slug}`} className="group grid grid-cols-[96px_1fr] items-center gap-5 sm:block">
                      {l.image ? <Arch img={images[l.image]} sizes="(min-width: 640px) 160px, 96px" ratio="3 / 4" className="w-24 sm:w-40" /> : null}
                      <span className="block sm:mt-6">
                        <span className="eyebrow block">{l.region}</span>
                        <span className="mt-1 block font-display text-[1.7rem] leading-tight group-hover:text-mauve">{l.name}</span>
                        <span className="mt-2 block text-[0.95rem]">{l.teaser}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* VII. Questions */}
        <PetalDivider from="cream" to="linen" />
        <section className="relative bg-linen py-20 sm:py-28" aria-labelledby="questions-heading">
          <div className="wrap wrap-vine">
            <ChapterMarker n="VII" label="Questions" />
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow">Questions</p>
                <h2 id="questions-heading" className="h2 mt-4">Before you <em>ask</em></h2>
                <Link href="/faq" className="link-quiet mt-6">See every question <span className="arrow" aria-hidden="true">→</span></Link>
              </div>
              <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
            </div>
          </div>
        </section>

        {/* VIII. Begin */}
        <FinalCta from="linen" chapter />
      </div>
    </>
  );
}
