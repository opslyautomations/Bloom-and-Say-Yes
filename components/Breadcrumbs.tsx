import Link from "next/link";
import { breadcrumbNode } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; href: string };

/** Visible breadcrumbs + BreadcrumbList schema. Home is prepended automatically. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-dusk-text">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-mauve">{c.name}</Link>
                  <span aria-hidden="true" className="text-rose">/</span>
                </>
              ) : (
                <span aria-current="page" className="inline-flex min-h-11 items-center text-ink">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbNode(all)} />
    </>
  );
}
