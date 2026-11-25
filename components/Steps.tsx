import { steps } from "@/content/site";
import { Rich, isOnlyConfirm, SHOW_TODOS } from "@/lib/confirm";

const ROMAN = ["i", "ii", "iii", "iv", "v"];

/** How it unfolds — horizontal timeline on desktop, vertical on mobile. */
export function Steps() {
  return (
    <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
      <span aria-hidden="true" className="absolute left-[21px] top-2 bottom-2 w-px bg-rose/60 lg:left-0 lg:right-0 lg:top-[21px] lg:bottom-auto lg:h-px lg:w-auto" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[44px_1fr] gap-5 lg:block" data-reveal="up" style={{ ["--i" as string]: i }}>
          <span className="numeral relative grid h-11 w-11 place-items-center rounded-full bg-[var(--step-bg,var(--color-cream))] text-xl ring-1 ring-rose" aria-hidden="true">
            {ROMAN[i]}
          </span>
          <div className="lg:mt-6">
            <h3 className="h3 !text-[1.6rem]"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
            <p className="mt-2 text-[0.98rem]">{s.body}</p>
            {s.timing && (SHOW_TODOS || !isOnlyConfirm(s.timing)) ? (
              <p className="caption mt-2"><Rich text={s.timing} /></p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
