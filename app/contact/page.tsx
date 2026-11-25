import { site } from "@/content/site";
import { contactForm } from "@/content/services";
import { faqsFor } from "@/content/faqs";
import { pageMeta } from "@/lib/meta";
import { Rich } from "@/lib/confirm";
import { faqNode } from "@/lib/schema";
import { FaqList } from "@/components/Faq";
import { InstagramIcon, MailIcon, PhoneIcon, ChatIcon, TikTokIcon } from "@/components/Icons";
import InquiryForm from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/PageIntro";
import { PetalDivider } from "@/components/PetalDivider";

export const metadata = pageMeta({
  title: "Begin Planning | Contact Bloom & Say Yes, Oahu",
  description:
    "Start planning your Oahu proposal, gender reveal, or elopement. Fill out the one-minute form, or call or text Scarlett at (415) 686-7247.",
  path: "/contact",
});

const contactFaqs = faqsFor("contact");

export default function ContactPage() {
  const ways = [
    { icon: <PhoneIcon />, label: "Call", value: site.phone.display, href: site.phone.href },
    { icon: <ChatIcon />, label: "Text", value: site.phone.display, href: site.phone.sms },
    { icon: <MailIcon />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: <InstagramIcon />, label: "Instagram", value: "@bloom.and.sayyes", href: site.social.instagram, ext: true },
    { icon: <TikTokIcon />, label: "TikTok", value: "@bloom.and.sayyes", href: site.social.tiktok, ext: true },
  ];
  return (
    <>
      <JsonLd data={faqNode(contactFaqs, "/contact")} />
      <PageIntro
        crumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title={<>Begin <em>planning</em></>}
        answer="To plan a proposal, gender reveal, or elopement on Oahu with Bloom & Say Yes, fill out the one-minute form below, or call or text Scarlett at (415) 686-7247. Tell us who you are, what you're celebrating, and your vision, and Scarlett will follow up with ideas and next steps."
      />
      <section id="plan" className="bg-linen pb-24" aria-labelledby="form-heading">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="form-heading" className="h3">Share your vision</h2>
            <p className="mt-4 font-display text-[1.4rem] italic leading-snug">“{site.formIntro}”</p>
            <p className="mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">— Scarlett</p>
            <ul className="mt-10 divide-y divide-stone border-y border-stone">
              {ways.map((w) => (
                <li key={w.label}>
                  <a href={w.href} {...(w.ext ? { target: "_blank", rel: "noopener" } : {})} className="flex min-h-14 items-center gap-4 py-3 hover:text-mauve">
                    <span className="text-mauve">{w.icon}</span>
                    <span><span className="eyebrow block">{w.label}</span><span className="break-all">{w.value}</span></span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.98rem]"><Rich text={site.serviceAreaStatement} /></p>
            <p className="caption mt-4">Response time: <Rich text={site.responseTime} /></p>
            <p className="mt-2"><Rich text={contactForm.note} /></p>
          </div>
          <div className="lg:col-span-8">
            <p className="mb-4 rounded-[14px] border border-stone bg-white p-5 text-[0.98rem]">
              Prefer to talk? Call or text <a className="link" href={site.phone.href}>{site.phone.display}</a> or email{" "}
              <a className="link break-all" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <InquiryForm formId={contactForm.formId} title="Bloom & Say Yes inquiry form" />
          </div>
        </div>
      </section>
      <PetalDivider from="linen" to="cream" />
      <section className="bg-cream py-20" aria-labelledby="cfaq">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 id="cfaq" className="h2 lg:col-span-4">Before you <em>write</em></h2>
          <div className="lg:col-span-8"><FaqList items={contactFaqs} /></div>
        </div>
      </section>
      <PetalDivider from="cream" to="blush" variant="b" />
    </>
  );
}
