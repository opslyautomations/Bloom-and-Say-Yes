import Link from "next/link";
import type { Faq } from "@/content/faqs";
import { Rich } from "@/lib/confirm";

/**
 * FAQ list on native <details>/<summary> — every answer is in the HTML,
 * no JS required. Pair with faqNode() for FAQPage schema.
 */
export function FaqList({ items, level = 3 }: { items: Faq[]; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.id} id={f.id}>
          <summary>
            <H className="font-[inherit] text-[length:inherit] leading-[inherit]">{f.q}</H>
            <span className="plus" aria-hidden="true" />
          </summary>
          <div className="answer-body">
            <p><Rich text={f.a} /></p>
            {f.link ? (
              <p className="mt-3">
                <Link href={f.link.href} className="link">{f.link.label}</Link>
              </p>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
