import { site } from "@/content/site";
import type { Service } from "@/content/services";
import type { Faq } from "@/content/faqs";
import type { Review } from "@/content/reviews";
import { plain } from "./confirm";
import { images, type SiteImage } from "./images";

const U = site.url;
export const IDS = {
  business: `${U}/#business`,
  founder: `${U}/#scarlett`,
  website: `${U}/#website`,
  logo: `${U}/#logo`,
};
const abs = (p: string) => (p.startsWith("http") ? p : `${U}${p}`);
const sameAs = () =>
  [site.social.instagram, site.social.tiktok, site.social.googleBusinessProfile].filter(Boolean) as string[];

/** Site-wide entity graph: LocalBusiness + Florist + Organization, and its founder. */
export function businessGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Florist", "Organization"],
        "@id": IDS.business,
        name: site.name,
        url: U,
        description: site.description,
        slogan: site.tagline,
        logo: { "@type": "ImageObject", "@id": IDS.logo, url: abs(images.logo.src), width: images.logo.width, height: images.logo.height },
        image: [abs(images.hero.src), abs(images.p01.src), abs(images.aboutScarlett.src)],
        telephone: site.phone.e164,
        email: site.email,
        // Service-area business: no street address published.
        areaServed: [
          { "@type": "City", name: "Honolulu", containedInPlace: { "@type": "State", name: "Hawaii" } },
          { "@type": "Place", name: "Oahu, Hawaii" },
          { "@type": "State", name: "Hawaii" },
        ],
        founder: { "@id": IDS.founder },
        sameAs: sameAs(),
        knowsAbout: site.founder.knowsAbout,
        ...(site.priceRange ? { priceRange: site.priceRange } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: site.phone.e164,
          email: site.email,
          areaServed: "US-HI",
          availableLanguage: ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Proposal, reveal & elopement planning",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Surprise proposal planning", url: `${U}/engagement` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gender reveal planning", url: `${U}/gender-reveals` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Intimate elopement planning", url: `${U}/intimate-elopements` } },
          ],
        },
      },
      personNode(),
    ],
  };
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": IDS.founder,
    name: site.founder.familyName ? `${site.founder.name} ${site.founder.familyName}` : site.founder.name,
    givenName: site.founder.name,
    ...(site.founder.familyName ? { familyName: site.founder.familyName } : {}),
    jobTitle: site.founder.jobTitle,
    worksFor: { "@id": IDS.business },
    url: `${U}/about`,
    image: abs(images.aboutScarlett.src),
    sameAs: [site.social.instagram, site.social.tiktok],
    knowsAbout: site.founder.knowsAbout,
    workLocation: { "@type": "Place", name: "Oahu, Hawaii" },
  };
}

export function websiteNode() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": IDS.website,
    url: U,
    name: site.name,
    description: site.shortDescription,
    publisher: { "@id": IDS.business },
    inLanguage: "en-US",
  };
}

export function aboutPageNode() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${U}/about`,
    name: "About Bloom & Say Yes",
    mainEntity: personNode(),
    about: { "@id": IDS.business },
  };
}

export function serviceNode(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${U}${s.path}#service`,
    name: s.h1,
    serviceType: s.serviceType,
    description: plain(s.answer),
    url: `${U}${s.path}`,
    provider: { "@id": IDS.business },
    areaServed: [
      { "@type": "City", name: "Honolulu" },
      { "@type": "Place", name: "Oahu, Hawaii" },
    ],
    image: abs(images[s.image].src),
    // `offers` added once pricing is confirmed (site.priceRange / service.packages)
    ...(s.packages
      ? {
          offers: s.packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.summary,
            priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", price: p.startingAt },
          })),
        }
      : {}),
  };
}

export function faqNode(list: Faq[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: abs(url),
    dateModified: site.lastUpdated,
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  };
}

export function breadcrumbNode(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

/** Individual Review items — deliberately no AggregateRating (self-serving). */
export function reviewsNode(list: Review[]) {
  return {
    "@context": "https://schema.org",
    "@graph": list.map((r) => ({
      "@type": "Review",
      "@id": `${U}/reviews#${r.id}`,
      itemReviewed: { "@id": IDS.business },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
    })),
  };
}

export function galleryNode(list: SiteImage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    url: `${U}/gallery`,
    name: "Bloom & Say Yes portfolio",
    author: { "@id": IDS.business },
    image: list.map((img) => ({
      "@type": "ImageObject",
      contentUrl: abs(img.src),
      width: img.width,
      height: img.height,
      description: img.alt.startsWith("[CONFIRM") ? img.suggestedAlt : img.alt,
      creditText: site.name,
    })),
  };
}

export function articleNode(opts: { url: string; headline: string; description: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    url: abs(opts.url),
    mainEntityOfPage: abs(opts.url),
    headline: opts.headline,
    description: opts.description,
    dateModified: site.lastUpdated,
    datePublished: site.lastUpdated,
    author: { "@id": IDS.founder },
    publisher: { "@id": IDS.business },
    ...(opts.image ? { image: abs(opts.image) } : {}),
  };
}
