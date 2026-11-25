import { serviceBySlug } from "@/content/services";
import { pageMeta } from "@/lib/meta";
import { ServicePage } from "@/components/ServicePage";

const s = serviceBySlug("gender-reveals");
export const metadata = pageMeta({ title: s.title, description: s.metaDescription, path: s.path });

export default function GenderRevealsPage() {
  return (
    <ServicePage
      service={s}
      emphasis="Gender Reveal"
      reviewCount={3}
      locationSlugs={["botanical-gardens", "kahala"]}
    />
  );
}
