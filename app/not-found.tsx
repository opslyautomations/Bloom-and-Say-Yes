import Link from "next/link";
import { services } from "@/content/services";
import { LeafSprig } from "@/components/Icons";
import { PlanLink } from "@/components/plan/PlanLink";

export default function NotFound() {
  return (
    <section className="bg-linen py-24 sm:py-32">
      <div className="wrap max-w-3xl text-center">
        <div className="flex justify-center gap-1" aria-hidden="true"><LeafSprig className="h-8 w-10" /><LeafSprig className="h-8 w-10" flip /></div>
        <p className="eyebrow mt-6">Page not found</p>
        <h1 className="h1-sm mt-4">This path hasn&apos;t <em>bloomed</em> yet.</h1>
        <p className="mx-auto mt-6 max-w-xl">The page you&apos;re looking for may have moved. Here&apos;s where to find everything else.</p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}><Link href={s.path} className="btn btn-ghost w-full">{s.navLabel}</Link></li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8">
          <Link href="/" className="link-quiet">Home <span className="arrow" aria-hidden="true">→</span></Link>
          <Link href="/gallery" className="link-quiet">Gallery <span className="arrow" aria-hidden="true">→</span></Link>
          <PlanLink service="choose" source="not_found" className="link-quiet">Begin planning <span className="arrow" aria-hidden="true">→</span></PlanLink>
        </div>
      </div>
    </section>
  );
}
