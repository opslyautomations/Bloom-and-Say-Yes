import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import { galleryNode } from "@/lib/schema";
import { FinalCta } from "@/components/FinalCta";
import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";

export const metadata = pageMeta({
  title: "Proposal & Floral Gallery, Oahu | Bloom & Say Yes",
  description:
    "Real Oahu proposal setups and florals designed by Bloom & Say Yes — beach picnics, candlelit letters, garden umbrellas, and hand-built arrangements.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={galleryNode(photos)} />
      <PageIntro
        crumbs={[{ name: "Gallery", href: "/gallery" }]}
        eyebrow="Portfolio"
        title={<>Moments we&apos;ve <em>designed</em></>}
        answer="This gallery shows real proposal setups and florals designed by Bloom & Say Yes on Oahu — oceanfront picnics, candlelit beach setups, garden umbrellas, and tropical arrangements built by hand. Every setup was created for one couple, and Scarlett designed and styled each one in-house."
        primary={{ href: "/contact", label: "Begin planning", plan: "choose" }}
      />
      <section className="bg-linen pb-24" aria-label="Photo gallery">
        <div className="wrap">
          <GalleryGrid items={photos} />
        </div>
      </section>
      <FinalCta from="linen" />
    </>
  );
}
