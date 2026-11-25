import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { Todo } from "@/lib/confirm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  ...pageMeta({ title: "Terms of Service | Bloom & Say Yes", description: "Terms of Service for bloomandsayyes.com.", path: "/terms" }),
  robots: { index: false, follow: true },
};

/** Paste the existing legal text from the current site here. Nothing is invented. */
export default function Page() {
  return (
    <section className="bg-linen py-16 sm:py-24">
      <div className="wrap max-w-3xl">
        <Breadcrumbs trail={[{ name: "Terms of Service", href: "/terms" }]} />
        <h1 className="h1-sm">Terms of Service</h1>
        <div className="prose-body mt-10 measure">
          <p><Todo>paste existing Terms of Service copy from the current site</Todo></p>
          <p>
            Questions? Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a className="link" href={site.phone.href}>{site.phone.display}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
