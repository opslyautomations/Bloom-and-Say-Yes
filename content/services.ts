import type { ImageKey } from "@/lib/images";
import type { ReviewTag } from "./reviews";

export type ServiceSlug = "engagement" | "gender-reveals" | "intimate-elopements";

export type Package = {
  name: string;
  startingAt: string;
  summary: string;
  includes: string[];
};

export type Service = {
  slug: ServiceSlug;
  path: `/${ServiceSlug}`;
  name: string;
  navLabel: string;
  serviceType: string;
  eyebrow: string;
  h1: string;
  title: string;
  metaDescription: string;
  /** 40–60 word answer paragraph under the H1. */
  answer: string;
  promise: string;
  bullets: [string, string, string];
  intro: string;
  includedHeading: string;
  includedAnswer: string;
  included: { title: string; body: string }[];
  image: ImageKey;
  secondaryImage: ImageKey;
  galleryTags: ("proposal" | "florals" | "elopement" | "reveal" | "garden" | "beach")[];
  reviewTags: ReviewTag[];
  preferredReviews: string[];
  /**
   * LeadConnector form ID — the single source of truth for both the inline
   * form on the service page and the "Plan Your Perfect Day" popup.
   */
  formId: string;
  formTitle: string;
  /** Reserved iframe height in px (prevents layout shift while it loads). */
  formHeight?: number;
  /** Row shown in Step 1 ("Choose Your Service") of the popup. */
  plan: { label: string; blurb: string; icon: "heart" | "reveal" | "sparkle" };
  packages: Package[] | null;
  packagesNote: string;
};

export const services: Service[] = [
  {
    slug: "engagement",
    path: "/engagement",
    name: "Proposal Planning",
    navLabel: "Proposals",
    serviceType: "Proposal planning",
    eyebrow: "Engagement & surprise proposals",
    h1: "Surprise Proposal Planning in Honolulu & Oahu",
    title: "Surprise Proposal Planning in Honolulu | Bloom & Say Yes",
    metaDescription:
      "Oahu proposal planner Scarlett designs custom florals, styles the setup, and coordinates your photographer and every vendor. Plan your surprise proposal.",
    answer:
      "Bloom & Say Yes plans surprise proposals across Honolulu and Oahu, from first idea to the final “yes.” Founder Scarlett designs custom florals in-house, styles the full setup, and hires and coordinates every vendor — photographer, cake, champagne, picnic — so you can sit back, breathe, and simply show up for the moment.",
    promise: "One day, one moment, to last forever.",
    bullets: ["Custom floral arrangements", "Full ambiance styling", "Vendor coordination & photography"],
    intro:
      "A proposal is one day and one moment that you'll carry forever. We design it around your story — the setting, the flowers, the little details only the two of you would notice — and then we handle every piece of it, so the only thing on your mind is the question.",
    includedHeading: "What's included in a Bloom & Say Yes proposal?",
    includedAnswer:
      "Every Bloom & Say Yes proposal on Oahu brings together custom florals built by hand, full ambiance styling of your setting, and coordination of every outside vendor, including your photographer. Couples have added touches like champagne, cake, and an oceanfront picnic. Each setup is designed for one couple, so no two are alike.",
    included: [
      {
        title: "Custom florals, designed in-house",
        body: "Every arrangement is designed and built by Scarlett — from a single long-stem rose with its thorns clipped to elaborate hanging installations up to 60 feet long.",
      },
      {
        title: "Full ambiance styling",
        body: "The whole setting is styled around your vision. Setups in our gallery include oceanfront picnics, cushions, candlelight, lettered signs, and garden umbrellas.",
      },
      {
        title: "Photographer coordination",
        body: "Scarlett hires and coordinates your photographer so the moment is captured without you having to arrange a thing.",
      },
      {
        title: "Champagne, cake & picnic touches",
        body: "Couples have celebrated with champagne, cake, and a picnic right in front of the ocean. Tell us what feels like you.",
      },
      {
        title: "Every vendor, handled",
        body: "Food, cake, balloons, photography — we find, hire, and coordinate every outside vendor, and keep you updated every step of the way.",
      },
      {
        title: "A calm, detail-obsessed day",
        body: "Scarlett makes sure every detail is exactly as it should be before you arrive. You sit back, breathe, and let us take care of the rest.",
      },
    ],
    image: "p01",
    secondaryImage: "p05",
    galleryTags: ["proposal"],
    reviewTags: ["proposal", "weather", "inclusive", "partner"],
    preferredReviews: ["courtney-choy", "jasmine-tokeshi", "elizabeth-merriam", "duc-tran", "gracey-boudreaux", "patrick-ka"],
    formId: "oyDn3nA9SeS1ZuBWEn7O",
    formTitle: "Engagement planning inquiry form",
    plan: { label: "Engagement Planning", blurb: "Create the perfect proposal moment", icon: "heart" },
    packages: null,
    packagesNote: "{{CONFIRM: package names, inclusions, and starting prices}}",
  },
  {
    slug: "gender-reveals",
    path: "/gender-reveals",
    name: "Gender Reveal Planning",
    navLabel: "Gender Reveals",
    serviceType: "Gender reveal planning",
    eyebrow: "Private gender reveals",
    h1: "Gender Reveal Planning in Honolulu",
    title: "Gender Reveal Planning in Honolulu, Oahu | Bloom & Say Yes",
    metaDescription:
      "Private gender reveals in Honolulu and across Oahu — florals designed in-house, plus cake, balloons, photographer and food vendors coordinated for you.",
    answer:
      "Bloom & Say Yes plans private gender reveals in Honolulu and across Oahu for you and the people you love most. Scarlett designs the florals in-house and coordinates the cake, balloons, photographer, and food vendors, so your reveal is beautiful, personal, and completely handled — all you have to do is be there.",
    promise: "A private reveal for you and your loved ones.",
    bullets: ["Cakes, balloons & flowers", "Photographer coordination", "Food vendor coordination"],
    intro:
      "Some news deserves a moment of its own. We create private reveals for you and your loved ones — styled, floral-filled, and quietly organized behind the scenes so you can be fully present when the secret comes out.",
    includedHeading: "What's included in a gender reveal?",
    includedAnswer:
      "A Bloom & Say Yes gender reveal on Oahu includes a private styled setup, florals designed in-house, and coordination of the cake, balloons, photographer, and food vendors. Scarlett plans the details and manages every vendor, so you and your loved ones can simply gather and celebrate.",
    included: [
      {
        title: "A private setup",
        body: "A reveal designed for you and the people you choose — intimate, personal, and styled around your vision.",
      },
      {
        title: "Cakes, balloons & flowers",
        body: "The centerpieces of the reveal, coordinated and styled together so everything feels of a piece.",
      },
      {
        title: "Florals designed in-house",
        body: "Every arrangement is designed and built by Scarlett for your celebration.",
      },
      {
        title: "Photographer & food vendors",
        body: "We coordinate the photographer and food vendors so the moment is captured and your guests are cared for.",
      },
    ],
    image: "p03",
    secondaryImage: "p08",
    galleryTags: ["reveal", "florals"],
    reviewTags: ["florals"],
    preferredReviews: ["taylor", "adrienne-wu", "patrick-ka"],
    formId: "50LHHPGjufTMFJHgi3cD",
    formTitle: "Gender reveal inquiry form",
    formHeight: 1507,
    plan: { label: "Gender Reveals", blurb: "Celebrate your special surprise", icon: "reveal" },
    packages: null,
    packagesNote: "{{CONFIRM: gender reveal packages and starting prices}}",
  },
  {
    slug: "intimate-elopements",
    path: "/intimate-elopements",
    name: "Intimate Elopements",
    navLabel: "Elopements",
    serviceType: "Elopement planning",
    eyebrow: "Intimate elopements",
    h1: "Intimate Elopements on Oahu",
    title: "Intimate Elopements on Oahu | Bloom & Say Yes",
    metaDescription:
      "Plan an intimate Oahu elopement — private beach or botanical garden setups, florals and décor designed in-house, and every vendor coordinated.",
    answer:
      "Bloom & Say Yes plans intimate elopements on Oahu — just the two of you or a small circle of loved ones. Scarlett designs the florals and décor in-house, creates private beach and botanical garden setups, and coordinates every vendor, so your day feels calm, personal, and beautifully considered from start to finish.",
    promise: "Just the two of you, or a small circle.",
    bullets: ["Private beach setups", "Botanical garden settings", "Florals, décor & vendor coordination"],
    intro:
      "An elopement strips a wedding back to what matters: the two of you, the promise, and a setting that takes your breath away. Wherever you plan to say yes — a private stretch of beach, a botanical garden — we bring the florals, the décor, and the coordination.",
    includedHeading: "What's included in an Oahu elopement?",
    includedAnswer:
      "A Bloom & Say Yes elopement on Oahu includes a private beach or botanical garden setup, florals and décor designed in-house, and coordination of every outside vendor. Couples have had custom bouquets, lei poʻo, and maile created for their day. It's designed for two people, or a small circle of family and friends.",
    included: [
      {
        title: "Private beach & garden setups",
        body: "A private beach setup, a botanical garden, or wherever you plan to say yes — styled for just the two of you or your small circle.",
      },
      {
        title: "Bouquets, lei poʻo & maile",
        body: "Wedding florals designed and built in-house. Couples have had custom bouquets, lei poʻo, and maile created for their day.",
      },
      {
        title: "Florals & décor",
        body: "Arrangements and décor designed together, so your setting feels intentional from every angle.",
      },
      {
        title: "Vendor coordination",
        body: "Photographer and any other outside vendors are hired and coordinated for you. {{CONFIRM: whether officiant booking is included}}",
      },
    ],
    image: "p04",
    secondaryImage: "aboutFlorals",
    galleryTags: ["elopement", "florals", "garden"],
    reviewTags: ["elopement-wedding", "florals"],
    preferredReviews: ["taylor", "elyse-nelson", "adrienne-wu"],
    formId: "9KIhNlxC0j7eABEKCtLJ",
    formTitle: "Intimate elopement inquiry form",
    plan: { label: "Intimate Elopements", blurb: "Say yes to forever, your way", icon: "sparkle" },
    packages: null,
    packagesNote: "{{CONFIRM: elopement packages and starting prices}}",
  },
];

export const serviceBySlug = (slug: ServiceSlug) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
};

/**
 * /contact inline form: uses the engagement form until a general form ID is
 * supplied. (The popup on /contact opens at Step 1 and uses each service's own form.)
 */
export const contactForm = {
  formId: "oyDn3nA9SeS1ZuBWEn7O",
  title: "Inquiry form",
  note: "{{CONFIRM: general contact form ID — currently using the proposal form}}",
};

export const formSrc = (id: string) => `https://api.opslyautomations.com/widget/form/${id}`;
