import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { images } from "@/lib/images";
import { InstagramIcon, LeafSprig, MailIcon, PhoneIcon, TikTokIcon } from "./Icons";

const company = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/oahu-proposal-locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-blush pb-28 pt-16 sm:pb-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site footer</h2>
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src={images.logo.src} alt={site.name} width={images.logo.width} height={images.logo.height} className="h-20 w-auto" sizes="122px" />
          <p className="mt-5 font-display text-2xl italic text-ink">{site.tagline}</p>
          <p className="caption mt-3">{site.serviceAreaLine}</p>
        </div>

        <nav aria-label="Services" className="md:col-span-2">
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-1">
            {services.map((s) => (
              <li key={s.slug}><Link className="inline-flex min-h-11 items-center hover:text-mauve" href={s.path}>{s.navLabel}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <p className="eyebrow mb-4">Company</p>
          <ul className="space-y-1">
            {company.map((l) => (
              <li key={l.href}><Link className="inline-flex min-h-11 items-center hover:text-mauve" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-4">Say hello</p>
          <ul className="space-y-1">
            <li><a className="inline-flex min-h-11 items-center gap-3 hover:text-mauve" href={site.phone.href}><PhoneIcon /> {site.phone.display}</a></li>
            <li><a className="inline-flex min-h-11 items-center gap-3 break-all hover:text-mauve" href={`mailto:${site.email}`}><MailIcon /> {site.email}</a></li>
            <li><a className="inline-flex min-h-11 items-center gap-3 hover:text-mauve" href={site.social.instagram} rel="noopener" target="_blank"><InstagramIcon /> Instagram<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a className="inline-flex min-h-11 items-center gap-3 hover:text-mauve" href={site.social.tiktok} rel="noopener" target="_blank"><TikTokIcon /> TikTok<span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </div>
      </div>

      <div className="wrap mt-14">
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-stone" />
          <LeafSprig className="h-6 w-8" />
          <LeafSprig className="h-6 w-8" flip />
          <span className="h-px flex-1 bg-stone" />
        </div>
        <div className="mt-6 flex flex-col gap-3 text-sm text-dusk-text sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link className="inline-flex min-h-11 items-center hover:text-ink" href="/privacy">Privacy</Link></li>
            <li><Link className="inline-flex min-h-11 items-center hover:text-ink" href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
