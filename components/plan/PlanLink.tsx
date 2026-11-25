import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { PlanService } from "@/lib/plan";

const PATHS: Record<PlanService, string> = {
  engagement: "/engagement",
  "gender-reveals": "/gender-reveals",
  "intimate-elopements": "/intimate-elopements",
};

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /**
   * "auto"   → this page's service on service pages, otherwise Step 1 (default)
   * "choose" → always Step 1
   * a slug   → always that service's form
   */
  service?: PlanService | "auto" | "choose";
  /** Reported as `source` on the plan_modal_open event. */
  source: string;
  /** No-JS destination. Defaults to the service page's #plan form, or /contact. */
  href?: string;
  children: ReactNode;
};

/**
 * A "Begin planning" trigger. It's a real link, so it works without JS; once
 * JS loads, the PlanProvider intercepts the click and opens the popup instead.
 */
export function PlanLink({ service = "auto", source, href, children, ...rest }: Props) {
  const fallback = href ?? (service !== "auto" && service !== "choose" ? `${PATHS[service]}#plan` : "/contact");
  return (
    <a href={fallback} data-plan={service} data-plan-source={source} {...rest}>
      {children}
    </a>
  );
}
