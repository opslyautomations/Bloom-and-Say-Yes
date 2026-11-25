import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { Todo } from "@/lib/confirm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  ...pageMeta({ title: "Privacy Policy | Bloom & Say Yes", description: "Privacy Policy for bloomandsayyes.com.", path: "/privacy" }),
  robots: { index: false, follow: true },
};

/** Paste the existing legal text from the current site here. Nothing is invented. */
export default function Page() {
  return (
    <section className="bg-linen py-16 sm:py-24">
      <div className="wrap max-w-3xl">
        <Breadcrumbs trail={[{ name: "Privacy Policy", href: "/privacy" }]} />
        <h1 className="h1-sm">Privacy Policy</h1>
        <div className="prose-body mt-10 measure">
          <p><Todo>paste existing Privacy Policy copy from the current site</Todo></p>
          <p>
            Questions? Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a className="link" href={site.phone.href}>{site.phone.display}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
