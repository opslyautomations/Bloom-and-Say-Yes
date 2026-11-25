import type { ServiceSlug } from "@/content/services";

/** Popup helpers shared by the provider, modal, and analytics (client-safe, no content imports). */
export type PlanService = ServiceSlug;

const TO_PARAM: Record<PlanService, string> = {
  engagement: "engagement",
  "gender-reveals": "gender-reveals",
  "intimate-elopements": "elopements",
};

/** ?plan= value → service (null = Step 1), or undefined when not a plan link. */
export function fromParam(p: string | null): PlanService | null | undefined {
  if (p === "open") return null;
  if (p === "engagement" || p === "gender-reveals") return p;
  if (p === "elopements" || p === "intimate-elopements") return "intimate-elopements";
  return undefined;
}

export const toParam = (s: PlanService | null) => (s ? TO_PARAM[s] : "open");

/** On a service page the popup skips Step 1 and opens that page's form. */
export function serviceForPath(path: string): PlanService | null {
  if (path === "/engagement") return "engagement";
  if (path === "/gender-reveals") return "gender-reveals";
  if (path === "/intimate-elopements") return "intimate-elopements";
  return null;
}

export type PlanOption = {
  slug: PlanService;
  label: string;
  blurb: string;
  icon: "heart" | "reveal" | "sparkle";
  formId: string;
  formTitle: string;
  formHeight?: number;
};
