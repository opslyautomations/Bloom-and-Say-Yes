import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { locationBySlug, locations, type LocationSection } from "@/content/locations";
import { images } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import { Rich, SHOW_TODOS } from "@/lib/confirm";
import { articleNode } from "@/lib/schema";
import { Arch } from "@/components/Arch";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { PageIntro } from "@/components/PageIntro";
import { PetalDivider } from "@/components/PetalDivider";

type Params = { slug: string };

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const l = locationBySlug(slug);
  if (!l) return {};
  return pageMeta({ title: l.title, description: l.metaDescription, path: `/oahu-proposal-locations/${l.slug}`, type: "article" });
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const l = locationBySlug(slug);
  if (!l) notFound();
  const path = `/oahu-proposal-locations/${l.slug}`;
  const others = locations.filter((x) => x.slug !== l.slug).slice(0, 3);

  const blocks: Record<LocationSection, ReactNode> = {
    feel: (
      <>
        <h2 className="h3">What does {l.name.replace(/ Beaches$/, "")} feel like?</h2>
        <p className="mt-4"><Rich text={l.feel} /></p>
      </>
    ),
    time: (
      <>
        <h2 className="h3">{l.time.heading}</h2>
        <p className="mt-4"><Rich text={l.time.body} /></p>
      </>
    ),
    styles: (
      <>
        <h2 className="h3">{l.styles.heading}</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {l.styles.items.map((s) => (
            <li key={s.title} className="border-t border-stone pt-4">
              <h3 className="font-display text-[1.4rem]">{s.title}</h3>
              <p className="mt-1 text-[0.98rem]">{s.body}</p>
            </li>
          ))}
        </ul>
      </>
    ),
    privacy: (
      <>
        <h2 className="h3">How private is it?</h2>
        <p className="mt-4"><Rich text={l.privacy} /></p>
      </>
    ),
    consider: (
      <>
        <h2 className="h3">Good to know</h2>
        <p className="mt-4"><Rich text={l.consider} /></p>
      </>
    ),
  };

  return (
    <>
      <JsonLd data={articleNode({ url: path, headline: l.question, description: l.metaDescription, image: l.image ? images[l.image].src : undefined })} />
      <PageIntro
        crumbs={[{ name: "Locations", href: "/oahu-proposal-locations" }, { name: l.name, href: path }]}
        eyebrow={`${l.region} · Location guide`}
        title={l.question}
        answer={l.answer}
        image={l.image ? images[l.image] : undefined}
        primary={{ href: "/engagement#plan", label: "Plan a proposal here", plan: "engagement" }}
      >
        <div className="mt-8"><LastUpdated /></div>
      </PageIntro>

      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20 sm:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-7">
            {l.order.map((k) => (
              <div key={k} data-reveal="up">{blocks[k]}</div>
            ))}
            {l.imageNote && SHOW_TODOS ? <p><Rich text={l.imageNote} /></p> : null}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28 rounded-[14px] border border-stone bg-white p-8">
              <p className="eyebrow">Plan it with Scarlett</p>
              <p className="mt-3 font-display text-[1.6rem] leading-snug">Florals, styling, photographer — every vendor handled.</p>
              <Link href="/engagement" className="btn mt-6 w-full">Proposal planning <span className="arrow" aria-hidden="true">→</span></Link>
              <Link href="/intimate-elopements" className="link-quiet mt-4">Or plan an elopement <span className="arrow" aria-hidden="true">→</span></Link>
            </div>
          </aside>
        </div>
      </section>

      <PetalDivider from="cream" to="linen" variant="b" />
      <section className="bg-linen py-20" aria-labelledby="more-loc">
        <div className="wrap">
          <h2 id="more-loc" className="h2">More places to say <em>yes</em></h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/oahu-proposal-locations/${o.slug}`} className="group block">
                  {o.image ? <Arch img={images[o.image]} sizes="200px" ratio="3 / 4" className="mb-5 w-36" reveal={false} /> : null}
                  <span className="eyebrow block">{o.region}</span>
                  <span className="mt-1 block font-display text-[1.6rem] group-hover:text-mauve">{o.name}</span>
                  <span className="mt-1 block text-[0.95rem]">{o.teaser}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/oahu-proposal-locations" className="link-quiet mt-10">All Oahu locations <span className="arrow" aria-hidden="true">→</span></Link>
        </div>
      </section>
      <FinalCta from="linen" service="choose" />
    </>
  );
}
