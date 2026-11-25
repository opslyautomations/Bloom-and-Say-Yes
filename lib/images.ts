/**
 * Image manifest. Every <Image> on the site reads from here.
 *
 * ALT TEXT RULE: `alt` stays "[CONFIRM: describe photo]" until a human has
 * looked at the photo and approved a description. `suggestedAlt` is a draft
 * written from a visual review during the build — copy it into `alt` once
 * verified (and add the location if known). Never use generic alt text.
 *
 * To add photos: drop the file in /public/images, add an entry below with real
 * width/height, tags, and a gallery `category`. Galleries scale automatically.
 */

export type ImageTag =
  | "proposal"
  | "florals"
  | "founder"
  | "beach"
  | "garden"
  | "detail"
  | "elopement"
  | "reveal";

export type GalleryCategory = "proposals" | "florals" | "elopements" | "reveals";

export type SiteImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  suggestedAlt: string;
  /** CSS object-position, e.g. "60% 40%" */
  focalPoint: string;
  tags: ImageTag[];
  category?: GalleryCategory;
  /** Gallery caption (location / couple) — needs consent before publishing. */
  caption?: string;
};

const PENDING = "[CONFIRM: describe photo]";

export const images = {
  logo: {
    id: "logo",
    src: "/images/logo.png",
    width: 440,
    height: 291,
    alt: "Bloom & Say Yes Hawaii",
    suggestedAlt: "Bloom & Say Yes Hawaii",
    focalPoint: "50% 50%",
    tags: [],
  },
  hero: {
    id: "hero",
    src: "/images/hero-beach-proposal.jpg",
    width: 1920,
    height: 1280,
    alt: PENDING,
    suggestedAlt:
      "Close-up of a partner sliding a diamond engagement ring onto a woman's finger, her hand resting on his tattooed hand",
    focalPoint: "64% 45%",
    tags: ["proposal", "detail"],
    category: "proposals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  scarlettFounder: {
    id: "scarlett-founder",
    src: "/images/scarlett-founder.jpg",
    width: 2560,
    height: 1706,
    alt: PENDING,
    suggestedAlt:
      "Scarlett kneeling on a white blanket on a lawn, arranging a picnic setup with a fringed umbrella, cake, champagne, and white and blue floral arrangements",
    focalPoint: "58% 60%",
    tags: ["founder", "florals", "garden", "proposal"],
    category: "florals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  aboutScarlett: {
    id: "about-scarlett",
    src: "/images/about-scarlett.jpeg",
    width: 1920,
    height: 1280,
    alt: PENDING,
    suggestedAlt:
      "Scarlett on the sand arranging a tropical floral centerpiece of monstera leaves, protea, and hydrangea, with a small island offshore behind her",
    focalPoint: "62% 60%",
    tags: ["founder", "florals", "beach", "proposal"],
    category: "florals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  aboutFlorals: {
    id: "about-florals",
    src: "/images/about-florals.jpeg",
    width: 1216,
    height: 1824,
    alt: PENDING,
    suggestedAlt:
      "Scarlett crouching on the grass with a woven basket, scattering a path of white petals beside a blanket and cushions",
    focalPoint: "40% 50%",
    tags: ["founder", "florals", "garden"],
    category: "florals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p01: {
    id: "portfolio-01",
    src: "/images/portfolio-01.jpeg",
    width: 1706,
    height: 2560,
    alt: PENDING,
    suggestedAlt:
      "A man on one knee on the sand proposing to a woman in a red dress who covers her face in surprise, with a floral and candle setup and a small island behind them",
    focalPoint: "50% 62%",
    tags: ["proposal", "beach"],
    category: "proposals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p02: {
    id: "portfolio-02",
    src: "/images/portfolio-02.jpg",
    width: 1706,
    height: 2560,
    alt: PENDING,
    suggestedAlt: "Close-up of hands as an engagement ring is placed on a finger",
    focalPoint: "55% 50%",
    tags: ["proposal", "detail"],
    category: "proposals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p03: {
    id: "portfolio-03",
    src: "/images/portfolio-03.jpg",
    width: 1706,
    height: 2560,
    alt: PENDING,
    suggestedAlt:
      "Two women laughing as champagne sprays from a bottle at a garden picnic under a fringed umbrella, surrounded by white and blue flowers",
    focalPoint: "55% 55%",
    tags: ["florals", "garden"],
    category: "florals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p04: {
    id: "portfolio-04",
    src: "/images/portfolio-04.jpeg",
    width: 1706,
    height: 2560,
    alt: PENDING,
    suggestedAlt:
      "A woman's hands wearing an engagement ring wrapped around a man's shoulders as they look out at the ocean toward a small island",
    focalPoint: "50% 45%",
    tags: ["proposal", "beach"],
    category: "proposals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p05: {
    id: "portfolio-05",
    src: "/images/portfolio-05.jpeg",
    width: 2560,
    height: 1706,
    alt: PENDING,
    suggestedAlt:
      "A couple embracing at dusk behind a beach proposal setup of candles, lettered blocks, cushions, and a tropical floral arrangement",
    focalPoint: "50% 55%",
    tags: ["proposal", "beach", "florals"],
    category: "proposals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p06: {
    id: "portfolio-06",
    src: "/images/portfolio-06.jpeg",
    width: 1706,
    height: 2560,
    alt: PENDING,
    suggestedAlt:
      "Two flutes of prosecco beside a bottle, a 'Ring for a kiss' bell, and a cheese board in front of red protea and tropical leaves",
    focalPoint: "50% 50%",
    tags: ["florals", "detail", "proposal"],
    category: "florals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p07: {
    id: "portfolio-07",
    src: "/images/portfolio-07.jpg",
    width: 2560,
    height: 1706,
    alt: PENDING,
    suggestedAlt:
      "A couple and a young girl hugging on a coastal path lined with white flowers, with waves and a sea cliff behind them",
    focalPoint: "50% 62%",
    tags: ["proposal", "beach", "florals"],
    category: "proposals",
    caption: "{{CONFIRM: caption & consent}}",
  },
  p08: {
    id: "portfolio-08",
    src: "/images/portfolio-08.jpg",
    width: 1706,
    height: 2560,
    alt: PENDING,
    suggestedAlt:
      "A small naked cake topped with yellow flowers beside two ring boxes, champagne, and a vase of yellow blooms on a picnic table in a grassy park",
    focalPoint: "50% 55%",
    tags: ["florals", "detail", "proposal", "garden"],
    category: "florals",
    caption: "{{CONFIRM: caption & consent}}",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** All photos (excludes the logo). */
export const photos: SiteImage[] = Object.values(images).filter((i) => i.id !== "logo");

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "proposals", label: "Proposals" },
  { id: "florals", label: "Florals" },
  { id: "elopements", label: "Elopements" },
  { id: "reveals", label: "Reveals" },
];

export const photosByTag = (tag: ImageTag) => photos.filter((p) => p.tags.includes(tag));

/**
 * Alt text to render. Unapproved alt shows the [CONFIRM] marker in development
 * so it gets reviewed; production falls back to the visually-written draft
 * rather than shipping a placeholder to screen-reader users.
 */
export function altFor(img: SiteImage) {
  if (img.alt !== PENDING) return img.alt;
  const dev =
    process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_TODOS === "1";
  return dev ? `${PENDING} ${img.suggestedAlt}` : img.suggestedAlt;
}
