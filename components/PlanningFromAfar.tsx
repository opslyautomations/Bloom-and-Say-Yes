import { PlanLink } from "./plan/PlanLink";
import { reviewById } from "@/content/reviews";
import { Rich } from "@/lib/confirm";
import { PhoneIcon, MailIcon, ChatIcon } from "./Icons";

const quote = "My fiance was in constant communication with Scarlett throughout the entire planning process";

/** Reassurance for the person planning a secret, often from out of state. */
export function PlanningFromAfar({ headingLevel = 2, cta }: { headingLevel?: 2 | 3; cta?: string }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const courtney = reviewById("courtney-choy");
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7" data-reveal="up">
        <p className="eyebrow">Planning from afar?</p>
        <H className="h2 mt-4">Plan it from anywhere. <em>Your partner will never know.</em></H>
        <p className="answer mt-6">
          You don&apos;t need to be on Oahu to plan a proposal here. With Bloom & Say Yes, everything can be handled
          remotely by phone, text, and email, while Scarlett designs the florals, styles the setup, and coordinates
          every vendor on the island — so the secret stays between the two of you.{" "}
          <Rich text="{{CONFIRM: remote planning process details}}" />
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          <li className="flex flex-col gap-2"><ChatIcon className="h-6 w-6 text-mauve" /><span className="font-semibold">One-minute form</span><span className="text-[0.95rem]">Tell us who you are and what you&apos;re dreaming of.</span></li>
          <li className="flex flex-col gap-2"><PhoneIcon className="h-6 w-6 text-mauve" /><span className="font-semibold">Phone, text & email</span><span className="text-[0.95rem]">Plan on your schedule, from wherever you are.</span></li>
          <li className="flex flex-col gap-2"><MailIcon className="h-6 w-6 text-mauve" /><span className="font-semibold">Every vendor handled</span><span className="text-[0.95rem]">No group chats your partner might see.</span></li>
        </ul>
        <PlanLink source="planning_from_afar" href={cta} className="link-quiet mt-8">Start planning quietly <span className="arrow" aria-hidden="true">→</span></PlanLink>
      </div>
      <figure className="self-end border-l border-rose pl-8 lg:col-span-5" data-reveal="up" style={{ ["--i" as string]: 1 }}>
        <blockquote className="pull-quote !text-[clamp(1.5rem,2.4vw,2rem)]">
          <p>“{courtney.text.includes(quote) ? quote : courtney.excerpt}…”</p>
        </blockquote>
        <figcaption className="mt-5 text-[0.8rem] font-semibold uppercase tracking-[0.14em]">{courtney.name}</figcaption>
      </figure>
    </div>
  );
}
