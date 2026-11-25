import { locations } from "@/content/locations";
import { services } from "@/content/services";

/** Every public route with a one-line description — used by sitemap.ts and llms.txt. */
export const routes: { path: string; title: string; summary: string; priority: number }[] = [
  { path: "/", title: "Home", summary: "Oahu proposal planner & floral design studio — overview of services, founder, process, and reviews.", priority: 1 },
  ...services.map((s) => ({ path: s.path, title: s.h1, summary: s.metaDescription, priority: s.slug === "engagement" ? 0.95 : 0.85 })),
  { path: "/about", title: "Meet Scarlett", summary: "Founder story, what Bloom & Say Yes does, and why couples choose us.", priority: 0.8 },
  { path: "/gallery", title: "Gallery", summary: "Portfolio of real proposal setups and florals.", priority: 0.7 },
  { path: "/reviews", title: "Reviews", summary: "All client and vendor-partner reviews, verbatim.", priority: 0.7 },
  { path: "/faq", title: "FAQ", summary: "Answers on cost, booking, planning from out of state, secrecy, weather, florals, and locations.", priority: 0.8 },
  { path: "/oahu-proposal-locations", title: "Oahu proposal location guide", summary: "Where to propose on Oahu, with an illustrated map.", priority: 0.8 },
  ...locations.map((l) => ({ path: `/oahu-proposal-locations/${l.slug}`, title: l.question, summary: l.teaser, priority: 0.6 })),
  { path: "/contact", title: "Begin planning", summary: "Inquiry form, phone, text, email, and social links.", priority: 0.9 },
];
