import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { images } from "@/lib/images";
import { PhoneIcon } from "./Icons";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { PlanLink } from "./plan/PlanLink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone/70 bg-linen/92 backdrop-blur-md supports-[backdrop-filter]:bg-linen/80">
      <div className="wrap flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image src={images.logo.src} alt={`${site.name} Hawaii — home`} width={images.logo.width} height={images.logo.height} className="h-[54px] w-auto" priority sizes="82px" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={site.phone.href} className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-blush hover:text-mauve">
            <PhoneIcon />
            <span className="sr-only">Call or text {site.phone.display}</span>
          </a>
          <PlanLink source="header" className="btn btn-sm hidden sm:inline-flex">Begin planning</PlanLink>

          <MobileMenu>
            <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full hover:bg-blush [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className="absolute inset-x-0 top-0 h-px bg-ink transition-transform duration-300 group-open:translate-y-1.5 group-open:rotate-45" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-300 group-open:-translate-y-1.5 group-open:-rotate-45" />
              </span>
            </summary>
            <div className="absolute inset-x-0 top-[76px] h-[calc(100dvh-76px)] overflow-y-auto border-t border-stone bg-linen">
              <nav aria-label="Mobile" className="wrap py-6">
                <NavLinks variant="mobile" />
                <div className="mt-8 grid gap-3">
                  <PlanLink source="mobile_menu" className="btn">Begin planning <span className="arrow" aria-hidden="true">→</span></PlanLink>
                  <a href={site.phone.href} className="btn btn-ghost">Call {site.phone.display}</a>
                </div>
              </nav>
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
