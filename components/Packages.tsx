import type { Service } from "@/content/services";
import { Rich, SHOW_TODOS, Todo } from "@/lib/confirm";
import { PlanLink } from "./plan/PlanLink";

/**
 * Packages & pricing. Renders real tiers once `service.packages` is filled in.
 * Until then: a 3-tier placeholder layout in development, and an honest
 * "custom quote" panel in production — never invented prices.
 */
export function Packages({ service }: { service: Service }) {
  const tiers = service.packages;
  if (tiers?.length) {
    return (
      <ul className="grid gap-6 md:grid-cols-3">
        {tiers.map((p, i) => (
          <li key={p.name} className={`flex flex-col rounded-t-full border border-stone bg-white px-8 pb-8 pt-16 text-center ${i === 1 ? "md:-translate-y-6" : ""}`}>
            <h3 className="h3">{p.name}</h3>
            <p className="mt-2 eyebrow">Starting at {p.startingAt}</p>
            <p className="mt-4">{p.summary}</p>
            <ul className="mt-6 space-y-2 text-left text-[0.98rem]">
              {p.includes.map((x) => <li key={x} className="flex gap-3"><span className="text-rose" aria-hidden="true">✿</span>{x}</li>)}
            </ul>
            <PlanLink service={service.slug} source="packages" href="#plan" className="btn mt-8 self-center">Begin planning</PlanLink>
          </li>
        ))}
      </ul>
    );
  }

  if (SHOW_TODOS) {
    return (
      <div>
        <p className="mb-6"><Rich text={service.packagesNote} /></p>
        <ul className="grid gap-6 md:grid-cols-3">
          {["Tier one", "Tier two", "Tier three"].map((t, i) => (
            <li key={t} className={`flex flex-col rounded-t-full border border-dashed border-rose bg-white/60 px-8 pb-8 pt-16 text-center ${i === 1 ? "md:-translate-y-6" : ""}`}>
              <h3 className="h3">{t} <Todo>name</Todo></h3>
              <p className="mt-2 eyebrow">Starting at $<Todo>price</Todo></p>
              <p className="mt-4"><Todo>one-line summary</Todo></p>
              <ul className="mt-6 space-y-2 text-left text-[0.98rem]">
                {[1, 2, 3].map((n) => <li key={n}><Todo>inclusion {n}</Todo></li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-8 rounded-t-[999px] border border-stone bg-white px-8 pb-12 pt-24 text-center md:mx-auto md:max-w-3xl">
      <p className="eyebrow">Custom to your vision</p>
      <p className="font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-tight">
        Every setup is designed to order — florals, styling, and vendors shaped around your story.
      </p>
      <p className="mx-auto max-w-xl">
        Share your vision in the one-minute form and Scarlett will reply with options and pricing for your date.
      </p>
      <PlanLink service={service.slug} source="packages" href="#plan" className="btn justify-self-center">Request options <span className="arrow" aria-hidden="true">→</span></PlanLink>
    </div>
  );
}
