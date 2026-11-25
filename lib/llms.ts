import { faqGroups, faqs } from "@/content/faqs";
import { locations } from "@/content/locations";
import { reviews } from "@/content/reviews";
import { services } from "@/content/services";
import { founderStory, promise, site } from "@/content/site";
import { plain } from "./confirm";
import { routes } from "./routes";

const U = site.url;

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Website: ${U}`,
    `- Phone (call or text): ${site.phone.display} (${site.phone.e164})`,
    `- Email: ${site.email}`,
    `- Instagram: ${site.social.instagram}`,
    `- TikTok: ${site.social.tiktok}`,
    `- Founder: ${site.founder.name}, ${site.founder.jobTitle}`,
    `- Service area: ${plain(site.serviceAreaStatement)}`,
    `- Location type: Service-area business on Oahu, Hawaii (no public storefront)`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.h1}](${U}${s.path}): ${plain(s.answer)}`),
    "",
    "## Key facts",
    "",
    "- All florals are designed and built in-house by Scarlett.",
    `- Longest hanging floral installation built for a beach proposal: ${founderStory.stat.value}.`,
    "- Bloom & Say Yes hires and coordinates every outside vendor: photographers, food, cake, balloons.",
    `- ${promise.inclusivity}`,
    "- Proposals can be planned remotely by phone, text, and email (useful when planning from outside Hawaii).",
    "",
  ];
}

export function llmsTxt() {
  return [
    ...header(),
    "## Pages",
    "",
    ...routes.map((r) => `- [${r.title}](${U}${r.path === "/" ? "" : r.path}): ${r.summary}`),
    "",
    `Full content: ${U}/llms-full.txt`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const out = [...header()];
  out.push("## About Scarlett", "", ...founderStory.paragraphs.map((p) => p + "\n"), `"${founderStory.signOff}" — Scarlett`, "");
  for (const s of services) {
    out.push(`## ${s.h1}`, "", `URL: ${U}${s.path}`, "", plain(s.answer), "", s.intro, "", `### ${s.includedHeading}`, "", plain(s.includedAnswer), "");
    s.included.forEach((x) => out.push(`- **${x.title}:** ${plain(x.body)}`));
    out.push("");
  }
  out.push("## Frequently asked questions", "");
  for (const g of faqGroups) {
    out.push(`### ${g}`, "");
    faqs.filter((f) => f.group === g).forEach((f) => out.push(`**${f.q}**`, "", plain(f.a), ""));
  }
  out.push("## Oahu proposal locations", "");
  locations.forEach((l) => out.push(`### ${l.question}`, "", `URL: ${U}/oahu-proposal-locations/${l.slug}`, "", plain(l.answer), ""));
  out.push("## Reviews (verbatim)", "");
  reviews.forEach((r) => out.push(`> ${r.text}`, `> — ${r.name}${r.role ? `, ${r.role}` : ""}`, ""));
  out.push(`Last updated: ${site.lastUpdated}`, "");
  return out.join("\n");
}
