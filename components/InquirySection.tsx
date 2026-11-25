import { site } from "@/content/site";
import InquiryForm from "./InquiryForm";

type Props = {
  formId: string;
  formTitle: string;
  formHeight?: number;
  heading?: string;
  eyebrow?: string;
};

/** The booking block (#plan): friendly intro, visible phone/email fallback, then the embed. */
export function InquirySection({ formId, formTitle, formHeight, heading = "Share your vision", eyebrow = "Begin planning" }: Props) {
  return (
    <section id="plan" aria-labelledby="plan-heading" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="plan-heading" className="h2 mt-4">{heading}</h2>
          <p className="mt-6 font-display text-[1.45rem] italic leading-snug text-ink">“{site.formIntro}”</p>
          <p className="mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">— Scarlett</p>
          <div className="mt-10 rounded-[14px] border border-stone bg-white p-6">
            <p className="font-semibold">Prefer to talk?</p>
            <p className="mt-1 text-[0.98rem]">
              Call or text <a className="link" href={site.phone.href}>{site.phone.display}</a> or email{" "}
              <a className="link break-all" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <InquiryForm formId={formId} title={formTitle} height={formHeight} />
        </div>
      </div>
    </section>
  );
}
