import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/images";
import { Rich } from "@/lib/confirm";
import { Arch } from "./Arch";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { PlanLink } from "./plan/PlanLink";
import type { PlanService } from "@/lib/plan";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  /** 40–60 word answer paragraph directly under the H1. */
  answer: string;
  image?: SiteImage;
  /** Primary CTA. With `plan`, it opens the popup (href is the no-JS fallback). */
  primary?: { href: string; label: string; plan?: PlanService | "auto" | "choose" };
  secondary?: { href: string; label: string };
  children?: ReactNode;
  bg?: "linen" | "cream";
};

/** Hero for every non-home page: breadcrumbs → eyebrow → H1 → answer paragraph. */
export function PageIntro({ crumbs, eyebrow, title, answer, image, primary, secondary, children, bg = "linen" }: Props) {
  return (
    <section id="hero" className={`${bg === "cream" ? "bg-cream" : "bg-linen"} pb-16 pt-6 sm:pb-24 sm:pt-10`} data-petal-zone>
      <div className={`wrap grid items-center gap-12 ${image ? "lg:grid-cols-12" : ""}`}>
        <div className={image ? "lg:col-span-6 xl:col-span-6" : "max-w-4xl"}>
          <Breadcrumbs trail={crumbs} />
          <p className="eyebrow" data-reveal="up-sm">{eyebrow}</p>
          <h1 className="h1-sm mt-4">{title}</h1>
          <p className="answer mt-8" data-reveal="up-sm" style={{ ["--i" as string]: 1 }}>
            <Rich text={answer} />
          </p>
          {primary || secondary ? (
            <div className="mt-10 flex flex-wrap gap-3" data-reveal="up-sm" style={{ ["--i" as string]: 2 }}>
              {primary ? (primary.plan ? (
                <PlanLink service={primary.plan} source="hero" href={primary.href} className="btn">{primary.label} <span className="arrow" aria-hidden="true">→</span></PlanLink>
              ) : (
                <Link href={primary.href} className="btn">{primary.label} <span className="arrow" aria-hidden="true">→</span></Link>
              )) : null}
              {secondary ? <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link> : null}
            </div>
          ) : null}
          {children}
        </div>
        {image ? (
          <div className="lg:col-span-5 lg:col-start-8">
            <Arch img={image} sizes="(min-width: 1024px) 38vw, 90vw" priority ratio="4 / 5" echo="right" className="mx-auto max-w-[520px]" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
