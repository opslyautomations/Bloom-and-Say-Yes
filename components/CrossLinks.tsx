import Link from "next/link";
import { services, type ServiceSlug } from "@/content/services";
import { locations } from "@/content/locations";
import { images } from "@/lib/images";
import { Arch } from "./Arch";

/** Internal links from a service page: the other two services, 2+ location guides, gallery, FAQ. */
export function CrossLinks({ current, locationSlugs }: { current: ServiceSlug; locationSlugs: string[] }) {
  const others = services.filter((s) => s.slug !== current);
  const locs = locationSlugs.map((s) => locations.find((l) => l.slug === s)!).filter(Boolean);
  return (
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h2 className="h3">Also from Bloom & Say Yes</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={s.path} className="group block">
                <Arch img={images[s.image]} sizes="(min-width: 1024px) 22vw, 45vw" ratio="4 / 5" className="max-w-[260px]" />
                <p className="mt-4 font-display text-2xl group-hover:text-mauve">{s.name}</p>
                <p className="text-[0.95rem]">{s.promise}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <h2 className="h3">Keep exploring</h2>
        <ul className="mt-6 divide-y divide-stone border-y border-stone">
          {locs.map((l) => (
            <li key={l.slug}>
              <Link href={`/oahu-proposal-locations/${l.slug}`} className="flex min-h-14 items-center justify-between gap-4 py-3 hover:text-mauve">
                <span><span className="block font-display text-xl">{l.name}</span><span className="caption">Oahu location guide</span></span>
                <span aria-hidden="true" className="text-rose">→</span>
              </Link>
            </li>
          ))}
          <li><Link href="/gallery" className="flex min-h-14 items-center justify-between py-3 font-display text-xl hover:text-mauve">View the gallery <span aria-hidden="true" className="text-rose">→</span></Link></li>
          <li><Link href="/faq" className="flex min-h-14 items-center justify-between py-3 font-display text-xl hover:text-mauve">All questions <span aria-hidden="true" className="text-rose">→</span></Link></li>
          <li><Link href="/reviews" className="flex min-h-14 items-center justify-between py-3 font-display text-xl hover:text-mauve">Read every love note <span aria-hidden="true" className="text-rose">→</span></Link></li>
        </ul>
      </div>
    </div>
  );
}
