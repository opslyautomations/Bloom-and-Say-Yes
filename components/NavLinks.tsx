"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

/** Main nav links with aria-current (needs the pathname, hence client). */
export default function NavLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  if (variant === "desktop") {
    return (
      <ul className="flex items-center gap-1 xl:gap-3">
        {nav.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className="relative inline-flex min-h-11 items-center px-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-mauve aria-[current=page]:text-mauve after:absolute after:inset-x-2 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-rose after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="divide-y divide-stone">
      {nav.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            aria-current={isCurrent(l.href) ? "page" : undefined}
            className="flex min-h-14 items-center justify-between font-display text-[1.6rem] text-ink aria-[current=page]:text-mauve"
          >
            {l.label}
            <span aria-hidden="true" className="text-rose">→</span>
          </Link>
        </li>
      ))}
      <li>
        <Link href="/reviews" className="flex min-h-14 items-center justify-between font-display text-[1.6rem] text-ink">
          Reviews <span aria-hidden="true" className="text-rose">→</span>
        </Link>
      </li>
    </ul>
  );
}
