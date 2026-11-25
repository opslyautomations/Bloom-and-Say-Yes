/**
 * Business facts — the single source of truth for NAP (name/phone/email),
 * service area, and entity description. Pages, JSON-LD schema, and llms.txt
 * all read from here, so edit facts in this file only.
 *
 * Strings may contain {{CONFIRM: note}} markers for facts the business has not
 * published yet. In development they render as yellow badges; in production
 * they are stripped. Run `npm run todo` to list every remaining marker.
 */

export const site = {
  name: "Bloom & Say Yes",
  url: "https://bloomandsayyes.com",
  tagline: "Forever starts with a single moment.",
  /** Entity description — keep identical to Google Business Profile, Instagram & TikTok bios. */
  description:
    "Bloom & Say Yes is an Oahu proposal planner and floral designer. Founder Scarlett plans surprise proposals, gender reveals, and intimate elopements across Honolulu and Oahu, designs every floral arrangement in-house, and coordinates every outside vendor.",
  shortDescription:
    "Oahu proposal planning, gender reveals, and intimate elopements — with florals designed in-house and every vendor coordinated.",
  phone: {
    display: "(415) 686-7247",
    e164: "+14156867247",
    href: "tel:+14156867247",
    sms: "sms:+14156867247",
  },
  email: "scarlett@bloomandsayyes.com",
  social: {
    instagram: "https://www.instagram.com/bloom.and.sayyes/",
    tiktok: "https://www.tiktok.com/@bloom.and.sayyes",
    /** {{CONFIRM}} Google Business Profile URL — add when available. */
    googleBusinessProfile: null as string | null,
    /** {{CONFIRM}} Direct "write a review" link from Google Business Profile. */
    googleReviewLink: null as string | null,
  },
  founder: {
    name: "Scarlett",
    /** {{CONFIRM}} surname not yet published */
    familyName: null as string | null,
    jobTitle: "Founder & Lead Proposal Planner",
    knowsAbout: [
      "Proposal planning",
      "Surprise engagement planning",
      "Floral design",
      "Event coordination",
      "Gender reveal planning",
      "Elopement planning",
      "Oahu",
      "Honolulu",
    ],
  },
  areaServed: ["Honolulu", "Oahu", "Hawaii"],
  serviceAreaLine: "Serving Honolulu & all of Oahu",
  serviceAreaStatement:
    "Bloom & Say Yes is based on Oahu and plans proposals, reveals, and elopements in Honolulu and across the whole island. We're a service-area business with no public storefront — we come to your setting. {{CONFIRM: neighbor-island travel (Maui, Kauai, Big Island)}}",
  /** {{CONFIRM}} e.g. "$$" — leave null until pricing is published. */
  priceRange: null as string | null,
  trustRow: [
    "Florals designed in-house",
    "Every vendor coordinated",
    "Welcoming every love",
  ],
  formIntro:
    "This should take no more than a minute! This is to find out who you are, what your vision is, and how I can help you!",
  /** Shown as "Last updated" on FAQ & location guides and used as schema dateModified. */
  lastUpdated: "2026-11-24",
  responseTime: "{{CONFIRM: typical reply time to an inquiry}}",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/engagement", label: "Proposals" },
  { href: "/gender-reveals", label: "Gender Reveals" },
  { href: "/intimate-elopements", label: "Elopements" },
  { href: "/gallery", label: "Gallery" },
  { href: "/oahu-proposal-locations", label: "Locations" },
  { href: "/faq", label: "FAQ" },
] as const;

export const founderStory = {
  short:
    "Scarlett grew up with a keen eye for beauty and detail. After college she began custom-building floral arrangements and coordinating luxury destination weddings on Oahu. Bloom & Say Yes was born from one belief: details matter, intention matters, and love deserves to be celebrated beautifully.",
  paragraphs: [
    "I grew up with a keen eye for beauty and detail. After college I began custom-building floral arrangements and coordinating luxury destination weddings here on Oahu.",
    "My work ranges from clipping the thorns off a single long-stem rose to building elaborate 60-foot hanging floral installations for beach proposals. Every piece is designed and built by hand, for one couple and one moment.",
    "Bloom & Say Yes was born from one belief: details matter, intention matters, and love deserves to be celebrated beautifully. I design the florals, coordinate every vendor, and make sure every detail is exactly as it should be — so the only thing you have to do is be present.",
  ],
  signOff: "I am so honored to be trusted with your forever. Let's make it beautiful.",
  stat: {
    value: "60 ft",
    caption: "the longest hanging floral installation Scarlett has built for a beach proposal",
  },
} as const;

export const promise = {
  body: "We obsess over the details, communicate every step of the way, and don't rest until your moment is everything it was meant to be.",
  quote: "You deserve more than beautiful. You deserve unforgettable.",
  inclusivity: "An inclusive, welcoming space for every couple, every family, and every love.",
} as const;

/** Shared five-step process. Steps 3–5 come from existing copy; timings are unconfirmed. */
export const steps = [
  {
    title: "Share your vision",
    body: "Fill out the one-minute form — who you are, what you're celebrating, and what you're dreaming of.",
    timing: "{{CONFIRM: reply timing}}",
  },
  {
    title: "Consultation",
    body: "Scarlett talks through your story, setting, and style with you and shapes a plan around it.",
    timing: "{{CONFIRM: consultation format & length}}",
  },
  {
    title: "Design & florals",
    body: "Custom floral arrangements and full ambiance styling, designed and built by hand in-house.",
    timing: "{{CONFIRM: when the design is finalized}}",
  },
  {
    title: "Vendor coordination",
    body: "Photographer, cake, champagne, balloons, food — Scarlett hires and coordinates every outside vendor for you.",
    timing: null,
  },
  {
    title: "Your moment",
    body: "Everything is set exactly as it should be. You sit back, breathe, and let us take care of the rest.",
    timing: null,
  },
] as const;
