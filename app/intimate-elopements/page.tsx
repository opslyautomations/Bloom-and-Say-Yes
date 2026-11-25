import Link from "next/link";
import { serviceBySlug } from "@/content/services";
import { pageMeta } from "@/lib/meta";
import { Rich } from "@/lib/confirm";
import { ServicePage } from "@/components/ServicePage";

const s = serviceBySlug("intimate-elopements");
export const metadata = pageMeta({ title: s.title, description: s.metaDescription, path: s.path });

function Settings() {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="eyebrow">Where to elope</p>
        <h2 className="h2 mt-4">Where can you elope on Oahu?</h2>
        <p className="answer mt-6">
          Bloom & Say Yes creates elopement setups wherever you plan to say yes on Oahu — most often a private stretch of
          beach or a botanical garden. Scarlett styles the setting with florals and décor designed in-house, sized for
          just the two of you or a small circle of loved ones.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8">
          <Link href="/oahu-proposal-locations/botanical-gardens" className="link-quiet">Garden settings <span className="arrow" aria-hidden="true">→</span></Link>
          <Link href="/oahu-proposal-locations/windward-coast" className="link-quiet">Windward beaches <span className="arrow" aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <h2 className="h3">Do you need a permit to elope on an Oahu beach?</h2>
        <p className="mt-4">
          Ask Scarlett about your chosen setting when you inquire.{" "}
          <Rich text="{{CONFIRM: permit guidance from Scarlett — no legal or permit rules are stated until supplied}}" />
        </p>
      </div>
    </div>
  );
}

export default function ElopementsPage() {
  return (
    <ServicePage
      service={s}
      emphasis="Intimate"
      reviewCount={3}
      locationSlugs={["botanical-gardens", "windward-coast", "kahala"]}
      extras={[{ id: "settings", node: <Settings /> }]}
    />
  );
}
