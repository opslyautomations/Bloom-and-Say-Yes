import Link from "next/link";
import { faqGroups, faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/meta";
import { faqNode } from "@/lib/schema";
import { FaqList } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { PageIntro } from "@/components/PageIntro";

export const metadata = pageMeta({
  title: "Oahu Proposal Planning FAQ | Bloom & Say Yes",
  description:
    "Answers about planning an Oahu proposal: cost, booking ahead, planning from out of state, secrecy, weather, florals, locations, reveals, and elopements.",
  path: "/faq",
});

const slug = (g: string) => g.toLowerCase().replace(/\s+/g, "-");

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqNode(faqs, "/faq")} />
      <PageIntro
        crumbs={[{ name: "FAQ", href: "/faq" }]}
        eyebrow="Questions"
        title={<>Oahu proposal planning, <em>answered</em></>}
        answer="Here are answers to the questions people ask Bloom & Say Yes most about planning a proposal, gender reveal, or elopement on Oahu: cost, how far ahead to book, planning from outside Hawaii, keeping it secret, weather, florals, and where to propose. Can't find yours? Scarlett is a text away."
      >
        <div className="mt-8"><LastUpdated /></div>
      </PageIntro>
      <section className="bg-linen pb-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-0">
              {faqGroups.map((g) => (
                <li key={g}><Link href={`#${slug(g)}`} className="chip lg:rounded-none lg:px-0 lg:shadow-none hover:text-mauve">{g}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20 lg:col-span-9">
            {faqGroups.map((g) => (
              <section key={g} id={slug(g)} aria-labelledby={`${slug(g)}-h`} className="scroll-mt-28">
                <h2 id={`${slug(g)}-h`} className="h2 mb-6">{g}</h2>
                <FaqList items={faqs.filter((f) => f.group === g)} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <FinalCta from="linen" />
    </>
  );
}
