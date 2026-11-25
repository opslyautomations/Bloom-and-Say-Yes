/**
 * FAQs — one source for every page, FAQPage schema, and llms-full.txt.
 * Answers use only known facts (existing copy + reviews). Unknown specifics are
 * {{CONFIRM}} markers, stripped in production so the answer still reads cleanly.
 * Each answer opens with a complete, quotable sentence (answer-first).
 */

export type FaqGroup =
  | "Planning"
  | "Pricing"
  | "Florals"
  | "Weather"
  | "Locations"
  | "Gender Reveals"
  | "Elopements";

export type Faq = {
  id: string;
  group: FaqGroup;
  q: string;
  a: string;
  link?: { href: string; label: string };
};

export const faqGroups: FaqGroup[] = [
  "Planning",
  "Pricing",
  "Florals",
  "Weather",
  "Locations",
  "Gender Reveals",
  "Elopements",
];

export const faqs: Faq[] = [
  // Planning
  {
    id: "plan-from-afar",
    group: "Planning",
    q: "Can you plan my proposal if I live outside Hawaii?",
    a: "Yes. Bloom & Say Yes plans proposals for people who live outside Hawaii, and everything can be handled remotely by phone, text, and email. You share your vision in the one-minute form, Scarlett designs the setup and coordinates every vendor on Oahu, and you simply arrive for the moment. {{CONFIRM: remote planning process — calls, approvals, day-of logistics}}",
  },
  {
    id: "secret",
    group: "Planning",
    q: "How do you keep the proposal a secret?",
    a: "Everything runs between you and Scarlett. You plan by phone, text, or email, and Bloom & Say Yes books and coordinates every vendor directly — photographer, florals, food — so your partner never needs to be involved until the moment itself. Your partner will never know. {{CONFIRM: any additional secrecy steps}}",
  },
  {
    id: "how-far-advance",
    group: "Planning",
    q: "How far in advance should I book my Oahu proposal?",
    a: "Reach out as soon as you have a date or season in mind — the earlier Bloom & Say Yes hears from you, the more flexibility there is for your preferred date, time, and setting on Oahu. {{CONFIRM: recommended booking lead time and minimum notice}}",
  },
  {
    id: "photographer",
    group: "Planning",
    q: "Do you coordinate the photographer?",
    a: "Yes. Bloom & Say Yes hires and coordinates your photographer as part of planning, along with food, cake, balloons, and any other outside vendors. One couple, Jasmine Tokeshi, wrote that “the photographer that Scarlett hired for us was also so amazing!”",
  },
  {
    id: "what-included",
    group: "Planning",
    q: "What's included in a beach proposal setup?",
    a: "Every Bloom & Say Yes beach proposal is custom, combining florals built by hand in-house, full ambiance styling, and coordinated vendors such as your photographer. Couples have added champagne, cake, and an oceanfront picnic. {{CONFIRM: standard inclusions by package}}",
    link: { href: "/engagement", label: "See proposal planning" },
  },
  {
    id: "diy-vs-planner",
    group: "Planning",
    q: "Should I hire a proposal planner or plan it myself?",
    a: "If your idea is simple and you know the spot well, a DIY proposal can be lovely. A planner earns their place when you want florals, a styled setup, a photographer, and food coordinated without your partner noticing — or when you're planning from outside Hawaii and can't scout locations yourself. Bloom & Say Yes handles all of it on Oahu, so you can stay present instead of managing logistics.",
  },
  {
    id: "lgbtq",
    group: "Planning",
    q: "Do you work with LGBTQ+ couples?",
    a: "Yes, always. Bloom & Say Yes is an inclusive, welcoming space for every couple, every family, and every love. Elizabeth Merriam wrote: “As an lgbtq+ couple we felt so comfortable and welcomed, our love honored and celebrated.”",
  },
  {
    id: "all-services",
    group: "Planning",
    q: "Do you plan gender reveals and elopements too?",
    a: "Yes. Alongside surprise proposals, Bloom & Say Yes plans private gender reveals and intimate elopements across Oahu, with the same in-house florals and full vendor coordination.",
    link: { href: "/gender-reveals", label: "Gender reveals" },
  },
  {
    id: "response-time",
    group: "Planning",
    q: "How quickly will Scarlett reply to my inquiry?",
    a: "Inquiries go straight to Scarlett, whether you use the one-minute form, text, or email. {{CONFIRM: typical reply time}}",
  },
  {
    id: "what-to-include",
    group: "Planning",
    q: "What should I include in my inquiry?",
    a: "Just the basics: who you are, what you're celebrating, and your vision — a date or season, a setting you love, colors, or a feeling you want. The form takes about a minute, and Scarlett will follow up with ideas and next steps.",
  },
  // Pricing
  {
    id: "cost",
    group: "Pricing",
    q: "How much does it cost to hire a proposal planner on Oahu?",
    a: "Bloom & Say Yes designs every proposal to order, so the cost depends on the florals, the scale of the setup, and the vendors you'd like included, such as a photographer, cake, or champagne. {{CONFIRM: starting price or package range}} Share your vision in the one-minute form and Scarlett will reply with options for your budget.",
  },
  {
    id: "gr-cost",
    group: "Pricing",
    q: "How much does a gender reveal cost?",
    a: "Each Bloom & Say Yes gender reveal is designed around your vision, so pricing depends on the setup, florals, and vendors — cake, balloons, photographer, food — you'd like coordinated. {{CONFIRM: gender reveal starting price}}",
  },
  {
    id: "el-cost",
    group: "Pricing",
    q: "How much does an Oahu elopement cost?",
    a: "Bloom & Say Yes elopements are custom, so pricing reflects your setting, the florals and décor, and the vendors you'd like coordinated. {{CONFIRM: elopement starting price}}",
  },
  // Florals
  {
    id: "florals-inhouse",
    group: "Florals",
    q: "Do you design the florals yourselves?",
    a: "Yes. Every arrangement is designed and built in-house by founder Scarlett — work that ranges from clipping the thorns off a single long-stem rose to building elaborate 60-foot hanging floral installations for beach proposals.",
  },
  {
    id: "event-florals",
    group: "Florals",
    q: "Do you create florals for weddings and parties?",
    a: "Yes. Couples have booked Bloom & Say Yes for wedding florals — including a custom bouquet, lei poʻo, and maile — as well as for engagement parties and a baby shower. {{CONFIRM: whether standalone event florals are offered and how to request them}}",
  },
  // Weather
  {
    id: "weather",
    group: "Weather",
    q: "What happens if it rains or the weather turns?",
    a: "Oahu weather can change quickly, and Bloom & Say Yes adapts. Couples have written that Scarlett “worked with me due to weather” and “made everything work with the crazy weather we had” — their proposals still went off beautifully. {{CONFIRM: rain plan, rescheduling, and backup-location policy}}",
  },
  {
    id: "best-time",
    group: "Weather",
    q: "What time of day is best for a beach proposal on Oahu?",
    a: "It depends on your setting. East-facing shores like the Windward Coast catch sunrise and soft morning light, while west-facing shores glow at sunset. Early mornings tend to be quieter on popular beaches. Scarlett will recommend timing that suits your location and the feeling you want.",
  },
  // Locations
  {
    id: "best-places",
    group: "Locations",
    q: "Where are the best places to propose on Oahu?",
    a: "The best place to propose on Oahu depends on the feeling you want: windward beaches with mountain backdrops, the quieter South Shore, the energy of Waikiki, West Side sunsets, a sunrise on the east shore, or a lush botanical garden. Our Oahu proposal location guide walks through each one.",
    link: { href: "/oahu-proposal-locations", label: "Explore the location guide" },
  },
  {
    id: "permit",
    group: "Locations",
    q: "Do you need a permit for a beach proposal on Oahu?",
    a: "Ask Scarlett about your chosen location when you inquire. {{CONFIRM: permit guidance from Scarlett — no legal claims until supplied}}",
  },
  {
    id: "neighbor-islands",
    group: "Locations",
    q: "Do you travel to other Hawaiian islands?",
    a: "Bloom & Say Yes is based on Oahu and serves Honolulu and the whole island. {{CONFIRM: neighbor-island availability and travel fees}}",
  },
  // Gender reveals
  {
    id: "gr-what",
    group: "Gender Reveals",
    q: "What's included in a gender reveal with Bloom & Say Yes?",
    a: "A Bloom & Say Yes gender reveal includes a private setup for you and your loved ones, florals designed in-house, and coordination of cakes, balloons, photographers, and food vendors — so the planning is handled and you can simply celebrate.",
  },
  {
    id: "gr-where",
    group: "Gender Reveals",
    q: "Where can we host a gender reveal on Oahu?",
    a: "Anywhere that feels like you — Bloom & Say Yes creates private reveals across Oahu for you and your loved ones. {{CONFIRM: typical gender reveal settings (beach, park, home, venue)}}",
  },
  // Elopements
  {
    id: "el-what",
    group: "Elopements",
    q: "What's included in an intimate elopement?",
    a: "A Bloom & Say Yes elopement includes a private setup — on a beach, in a botanical garden, or wherever you plan to say yes — plus florals and décor designed in-house and coordination of every outside vendor.",
  },
  {
    id: "el-guests",
    group: "Elopements",
    q: "Can we bring guests to our elopement?",
    a: "Yes. Bloom & Say Yes plans elopements for just the two of you or a small circle of loved ones. {{CONFIRM: maximum guest count}}",
  },
  {
    id: "el-permit",
    group: "Elopements",
    q: "Do we need a permit to elope on an Oahu beach?",
    a: "Ask Scarlett about your chosen setting when you inquire. {{CONFIRM: permit guidance from Scarlett — no legal claims until supplied}}",
  },
];

export const faqById = (id: string) => {
  const f = faqs.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown FAQ: ${id}`);
  return f;
};

export const faqSets = {
  home: ["cost", "plan-from-afar", "secret", "photographer", "weather", "lgbtq"],
  engagement: ["cost", "how-far-advance", "plan-from-afar", "secret", "what-included", "photographer", "weather", "permit"],
  "gender-reveals": ["gr-what", "gr-cost", "gr-where", "photographer", "how-far-advance"],
  "intimate-elopements": ["el-what", "el-guests", "el-cost", "el-permit", "event-florals", "weather"],
  contact: ["response-time", "what-to-include", "plan-from-afar"],
} as const;

export const faqsFor = (set: keyof typeof faqSets) => faqSets[set].map(faqById);
