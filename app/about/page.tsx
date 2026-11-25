import Link from "next/link";
import { founderStory, promise } from "@/content/site";
import { services } from "@/content/services";
import { reviewsFor } from "@/content/reviews";
import { images } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import { Rich } from "@/lib/confirm";
import { aboutPageNode } from "@/lib/schema";
import { Arch } from "@/components/Arch";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { PetalDivider } from "@/components/PetalDivider";
import { Photo } from "@/components/Photo";
import { ReviewGrid } from "@/components/ReviewCard";
import { PlanLink } from "@/components/plan/PlanLink";

export const metadata = pageMeta({
  title: "Meet Scarlett, Oahu Proposal Planner | Bloom & Say Yes",
  description:
    "Meet Scarlett, founder of Bloom & Say Yes — an Oahu proposal planner and floral designer who builds every arrangement by hand and coordinates every vendor.",
  path: "/about",
});

const why = [
  { t: "Florals designed in-house", b: "Every arrangement is designed and built by Scarlett — from a single long-stem rose to 60-foot hanging installations." },
  { t: "Every vendor coordinated", b: "Photographers, food, cake, balloons: we hire and coordinate every outside vendor, so you don't juggle a thing." },
  { t: "No two setups alike", b: "Each moment is designed for one couple or family, around their story, their setting, and their style." },
  { t: "Welcoming every love", b: promise.inclusivity },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageNode()} />
      <PageIntro
        crumbs={[{ name: "About", href: "/about" }]}
        eyebrow="About Bloom & Say Yes"
        title={<>Meet Scarlett, <em>Oahu</em> proposal planner</>}
        answer="Bloom & Say Yes is an Oahu proposal planning and floral design studio founded by Scarlett, who began custom-building floral arrangements and coordinating luxury destination weddings on Oahu after college. Today she plans proposals, gender reveals, and elopements across Honolulu and the island, designing every floral piece herself."
        image={images.aboutScarlett}
        primary={{ href: "/contact", label: "Begin planning", plan: "choose" }}
      />

      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20 sm:py-28" aria-labelledby="story-heading">
        <div className="wrap grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="soft relative aspect-[2/3] max-w-[440px]" data-reveal="up">
              <Photo img={images.aboutFlorals} sizes="(min-width: 1024px) 36vw, 92vw" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">In her words</p>
            <h2 id="story-heading" className="h2 mt-4">A keen eye for <em>beauty</em> and detail</h2>
            <div className="prose-body mt-8 measure">
              {founderStory.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <figure className="mt-12 border-l border-rose pl-6">
              <blockquote className="pull-quote"><p>“{founderStory.signOff}”</p></blockquote>
              <figcaption className="mt-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">— Scarlett, founder</figcaption>
            </figure>
            <div className="mt-12 flex items-end gap-5 border-t border-stone pt-8">
              <p className="font-display text-[clamp(3.5rem,7vw,5rem)] leading-none text-mauve">{founderStory.stat.value}</p>
              <p className="max-w-[18rem] pb-2 text-[0.95rem] leading-snug">{founderStory.stat.caption}</p>
            </div>
          </div>
        </div>
      </section>

      <PetalDivider from="cream" to="linen" variant="b" />
      <section className="bg-linen py-20 sm:py-28" aria-labelledby="what-heading">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2 id="what-heading" className="h2 mt-4 max-w-2xl">What does Bloom & Say Yes plan?</h2>
          <div className="mt-16 space-y-24">
            {services.map((s, i) => (
              <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <Arch img={images[s.image]} sizes="(min-width: 1024px) 40vw, 92vw" ratio="4 / 5" parallax echo={i % 2 ? "right" : "left"} className="mx-auto max-w-[460px]" />
                </div>
                <div className={`relative z-10 lg:col-span-5 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <h3 className="h2">{s.name}</h3>
                  <p className="mt-2 font-display text-xl italic text-dusk-text">{s.promise}</p>
                  <p className="mt-6">{s.intro}</p>
                  <Link href={s.path} className="link-quiet mt-6">Explore {s.navLabel.toLowerCase()} <span className="arrow" aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-24 rounded-[14px] border border-stone bg-white p-8 sm:p-10">
            <p className="eyebrow">Also from the studio</p>
            <h3 className="h3 mt-3">Wedding & event florals</h3>
            <p className="mt-4 measure">
              Couples have booked Bloom & Say Yes for wedding florals — a custom bouquet, lei poʻo, and maile — and for
              engagement parties and a baby shower.{" "}
              <Rich text="{{CONFIRM: whether to list event florals as a standalone service}}" />
            </p>
            <PlanLink service="choose" source="about_florals" className="link-quiet mt-4">Ask about florals <span className="arrow" aria-hidden="true">→</span></PlanLink>
          </div>
        </div>
      </section>

      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20 sm:py-28" aria-labelledby="why-heading">
        <div className="wrap">
          <p className="eyebrow">Why choose us</p>
          <h2 id="why-heading" className="h2 mt-4 max-w-3xl">Why choose Bloom & Say Yes for your Oahu proposal?</h2>
          <p className="answer mt-6">
            Couples choose Bloom & Say Yes because one person handles everything: Scarlett designs the florals in-house,
            styles the setting, and coordinates every outside vendor, so nothing falls through the cracks. Every setup is
            designed for one couple, and every couple, family, and love is welcome.
          </p>
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <li key={w.t} className="border-t border-stone pt-6" data-reveal="up" style={{ ["--i" as string]: i }}>
                <h3 className="font-display text-[1.6rem] leading-tight">{w.t}</h3>
                <p className="mt-3 text-[0.98rem]">{w.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PetalDivider from="cream" to="blush" variant="b" />
      <section className="bg-blush py-20 sm:py-28" aria-labelledby="promise-heading">
        <div className="wrap max-w-4xl text-center">
          <p className="eyebrow">Our promise</p>
          <h2 id="promise-heading" className="sr-only">Our promise</h2>
          <p className="pull-quote mt-6">“{promise.quote}”</p>
          <p className="mx-auto mt-8 max-w-2xl">{promise.body}</p>
        </div>
        <div className="wrap mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">Love <em>notes</em></h2>
            <Link href="/reviews" className="link-quiet">All reviews <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <div className="mt-12">
            <ReviewGrid items={reviewsFor(["proposal", "florals", "inclusive"], ["courtney-choy", "taylor", "elizabeth-merriam", "gracey-boudreaux"], 4)} />
          </div>
        </div>
      </section>

      <FinalCta from="blush" />
    </>
  );
}
