import { site } from "@/content/site";

export function LastUpdated() {
  const d = new Date(`${site.lastUpdated}T12:00:00Z`);
  const label = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  return (
    <p className="caption">
      Last updated <time dateTime={site.lastUpdated}>{label}</time>
    </p>
  );
}
