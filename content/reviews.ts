/**
 * Real client reviews — VERBATIM. Do not edit wording, spelling, or names.
 * `excerpt` must be an exact substring of `text` (enforced by `npm run check:content`).
 * No star ratings or cities were provided, so none are shown.
 */

export type ReviewTag =
  | "proposal"
  | "florals"
  | "elopement-wedding"
  | "weather"
  | "inclusive"
  | "partner";

export type Review = {
  id: string;
  name: string;
  text: string;
  /** Pull quote — exact sentence from `text`. */
  excerpt: string;
  tags: ReviewTag[];
  /** Optional context line, only when the review itself states it. */
  role?: string;
};

export const reviewTagLabels: Record<ReviewTag, string> = {
  proposal: "Proposals",
  florals: "Florals",
  "elopement-wedding": "Weddings & elopements",
  weather: "Weather",
  inclusive: "Every love",
  partner: "Vendor partners",
};

export const reviews: Review[] = [
  {
    id: "courtney-choy",
    name: "Courtney Choy",
    text: "Scarlett and her team were truly AMAZING to work with from start to finish. The setup was absolutely stunning…gorgeous fresh florals paired with the cutest picnic arrangement right in front of the ocean. I honestly couldn't have imagined a more perfect way to be proposed to!! My fiance was in constant communication with Scarlett throughout the entire planning process, and she exceeded expectations every step of the way with her professionalism, responsiveness, and thoughtful guidance. Everything came together flawlessly. Scarlett's attention to detail, creativity, and warm, calming energy are truly unmatched. I cannot recommend Bloom and Say Yes enough for anyone looking for floral design, proposal planning, or a truly special experience!!",
    excerpt: "Scarlett's attention to detail, creativity, and warm, calming energy are truly unmatched.",
    tags: ["proposal", "florals"],
  },
  {
    id: "adrienne-wu",
    name: "Adrienne Wu",
    text: "I cannot recommend this floral company enough! They created the most beautiful florals for my surprise engagement party, and everything was absolutely perfect. The arrangements were stunning, thoughtfully designed, and truly elevated the entire event. Every detail felt intentional and elegant. I was completely blown away and so grateful for their incredible work. Thank you for making such a special moment even more unforgettable!",
    excerpt: "The arrangements were stunning, thoughtfully designed, and truly elevated the entire event.",
    tags: ["florals"],
  },
  {
    id: "taylor",
    name: "Taylor",
    text: "We are so grateful to have found Scarlett for our small, intimate wedding. The floral arrangements were absolutely elegant and beautiful—every detail was perfect. Scarlett truly brought my vision to life and exceeded all of our expectations. She was incredibly friendly, professional, and clearly knew exactly what she was doing, which made the entire process stress-free and enjoyable. We loved her work so much that we went on to use her for an engagement party and our baby shower as well, and each event was just as stunning. We will absolutely continue to use Scarlett for all of our most special moments. Highly recommend!",
    excerpt: "Scarlett truly brought my vision to life and exceeded all of our expectations.",
    tags: ["elopement-wedding", "florals"],
  },
  {
    id: "elyse-nelson",
    name: "Elyse Nelson",
    text: "Celebrated our wedding in July '24 and had the most beautiful custom bouquet, lei po'o, and maile created by Bloom and Say Yes! I am so grateful to have had an easeful experience with Scarlet! She took out all the guess work and delivered the most beautiful product. Will be using again whenever I need florals!",
    excerpt: "She took out all the guess work and delivered the most beautiful product.",
    tags: ["elopement-wedding", "florals"],
  },
  {
    id: "elizabeth-merriam",
    name: "Elizabeth Merriam",
    text: "My partner proposed to me through Bloom & Say Yes and it was the most magical experience! I can't recommend them enough!! As an lgbtq+ couple we felt so comfortable and welcomed, our love honored and celebrated ❤️ Thank you Bloom & Say Yes!!",
    excerpt: "As an lgbtq+ couple we felt so comfortable and welcomed, our love honored and celebrated ❤️",
    tags: ["proposal", "inclusive"],
  },
  {
    id: "jasmine-tokeshi",
    name: "Jasmine Tokeshi",
    text: "Bloom & say yes planned a very special proposal for my partner and I with zero stress! It was set up beautifully with champagne and cake. The photographer that Scarlett hired for us was also so amazing! Thank you again!!",
    excerpt: "Bloom & say yes planned a very special proposal for my partner and I with zero stress!",
    tags: ["proposal"],
  },
  {
    id: "gregory-belue",
    name: "Gregory Belue",
    text: "Amazing and awesome to work with very nice job and profesional. She also worked with me due to weather would highly recommend to anyone.",
    excerpt: "She also worked with me due to weather would highly recommend to anyone.",
    tags: ["weather"],
  },
  {
    id: "duc-tran",
    name: "Duc Tran",
    text: "Scarlett was very accommodating and made everything work with the crazy weather we had. Our proposal went off without a hitch and turned out beautiful!",
    excerpt: "Scarlett was very accommodating and made everything work with the crazy weather we had.",
    tags: ["proposal", "weather"],
  },
  {
    id: "gracey-boudreaux",
    name: "Gracey-Boudreaux",
    role: "Photographer partner",
    text: "I had the opportunity to work alongside Scarlett and her team at Bloom & Say Yes as the photographer for one of her beach proposal setups. Their team was incredibly kind, easy to work with, and communication felt effortless throughout. Scarlett puts so much care into every detail, always making sure her clients feel comfortable and receive the most thoughtful, meaningful arrangements. Their proposal setups are absolutely stunning! For any couple wanting an effortless proposal experience, she truly takes care of everything so you do not have to worry!! I experienced it firsthand and highly recommend Bloom & Say Yes. I cannot wait to work with them again! 🌺",
    excerpt: "For any couple wanting an effortless proposal experience, she truly takes care of everything so you do not have to worry!!",
    tags: ["partner", "proposal"],
  },
  {
    id: "patrick-ka",
    name: "Patrick Ka",
    text: "We had an amazing experience with Bloom & Say Yes! From start to finish, everything was handled so professionally and thoughtfully. Scarlett and her team made the entire setup feel effortless on our end, and the attention to detail really made the moment special. The setup was beautiful, well-organized, and honestly exceeded our expectations. You can tell they truly care about creating a memorable experience. Communication was smooth, and they made us feel comfortable and taken care of the whole time. Highly recommend to anyone looking to plan something special—you won't be disappointed. Thank you again for helping make such an important moment unforgettable!",
    excerpt: "Scarlett and her team made the entire setup feel effortless on our end, and the attention to detail really made the moment special.",
    tags: [],
  },
];

export const reviewById = (id: string) => {
  const r = reviews.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown review: ${id}`);
  return r;
};

/** Reviews matching any tag, in the order given by `prefer` first. */
export function reviewsFor(tags: ReviewTag[], prefer: string[] = [], limit = 4) {
  const preferred = prefer.map(reviewById);
  const rest = reviews.filter(
    (r) => !prefer.includes(r.id) && r.tags.some((t) => tags.includes(t)),
  );
  return [...preferred, ...rest].slice(0, limit);
}

/** Reviews long enough to need a "Read full review" expand. */
export const isLong = (r: Review) => r.text.length > 260;
