import Link from "next/link";
import { locations } from "@/content/locations";
import { faqById } from "@/content/faqs";
import { pageMeta } from "@/lib/meta";
import { articleNode, faqNode } from "@/lib/schema";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { LocationList, OahuMap } from "@/components/OahuMap";
import { PageIntro } from "@/components/PageIntro";
import { PetalDivider } from "@/components/PetalDivider";
import { FaqList } from "@/components/Faq";

export const metadata = pageMeta({
  title: "Best Places to Propose on Oahu | Bloom & Say Yes",
  description:
    "An Oahu proposal location guide: windward beaches, Kahala, Waikiki, Ko Olina, botanical gardens, and sunrise spots — with timing and setup ideas.",
  path: "/oahu-proposal-locations",
});

const hubFaqs = ["best-places", "best-time", "diy-vs-planner", "permit"].map(faqById);

export default function LocationsHub() {
  return (
    <>
      <JsonLd data={articleNode({ url: "/oahu-proposal-locations", headline: "Best places to propose on Oahu", description: "Oahu proposal location guide by Bloom & Say Yes." })} />
      <JsonLd data={faqNode(hubFaqs, "/oahu-proposal-locations")} />
      <PageIntro
        crumbs={[{ name: "Locations", href: "/oahu-proposal-locations" }]}
        eyebrow="Oahu location guide"
        title={<>Where to say <em>yes</em> on Oahu</>}
        answer="The best place to propose on Oahu depends on the feeling you want. Windward beaches offer mountain backdrops and morning light, Kahala is calm and close to Honolulu, Waikiki is iconic, Ko Olina catches sunsets, and gardens feel lush and private. Bloom & Say Yes designs setups for each."
      >
        <div className="mt-8"><LastUpdated /></div>
      </PageIntro>
      <section className="bg-linen pb-24" aria-label="Locations">
        <div className="wrap grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:sticky lg:top-28"><OahuMap /></div>
          <div className="lg:col-span-6"><LocationList /></div>
        </div>
      </section>
      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20" aria-labelledby="hub-faq">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="hub-faq" className="h2">Choosing your <em>setting</em></h2>
            <Link href="/engagement" className="link-quiet mt-6">How proposal planning works <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
          <div className="lg:col-span-8"><FaqList items={hubFaqs} /></div>
        </div>
      </section>
      <p className="sr-only">{locations.length} location guides</p>
      <FinalCta from="cream" service="choose" />
    </>
  );
}
