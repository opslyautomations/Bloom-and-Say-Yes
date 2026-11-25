import { site } from "@/content/site";
import { Rich } from "@/lib/confirm";
import InquiryForm from "./InquiryForm";

type Props = {
  formId: string | null;
  formTitle: string;
  heading?: string;
  eyebrow?: string;
  missingNote?: string;
};

/** The booking block (#plan): friendly intro, visible phone/email fallback, then the embed. */
export function InquirySection({ formId, formTitle, heading = "Share your vision", eyebrow = "Begin planning", missingNote }: Props) {
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
          {!formId && missingNote ? <p className="mt-4"><Rich text={missingNote} /></p> : null}
        </div>
        <div className="lg:col-span-8">
          {formId ? (
            <InquiryForm formId={formId} title={formTitle} />
          ) : (
            // No form ID yet: no stand-in form — just the direct ways to reach Scarlett.
            <div className="grid min-h-[320px] place-items-center rounded-[14px] border border-stone bg-white p-8 text-center">
              <div>
                <p className="font-display text-[1.8rem] leading-tight">Let&apos;s plan it together</p>
                <p className="mx-auto mt-3 max-w-md">
                  Call or text <a className="link" href={site.phone.href}>{site.phone.display}</a>, or email{" "}
                  <a className="link break-all" href={`mailto:${site.email}`}>{site.email}</a> with your date and vision.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href={site.phone.sms} className="btn">Text Scarlett</a>
                  <a href={`mailto:${site.email}`} className="btn btn-ghost">Email</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
