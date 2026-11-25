import { sendGAEvent } from "@next/third-parties/google";

/** GA4 event helper — no-op until NEXT_PUBLIC_GA_ID is set. */
export function track(name: string, params: Record<string, string> = {}) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    /* analytics must never break the UI */
  }
}
