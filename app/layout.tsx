import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/content/site";
import { businessGraph } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import MotionController from "@/components/MotionController";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import PlanProvider from "@/components/plan/PlanProvider";
import { services } from "@/content/services";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Oahu Proposal Planner & Floral Design | Bloom & Say Yes", template: "%s | Bloom & Say Yes" },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: "Scarlett", url: `${site.url}/about` }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

export const viewport: Viewport = {
  themeColor: "#F5F2F0",
  width: "device-width",
  initialScale: 1,
};

/**
 * Sets html.motion-ready before first paint so in-view reveals don't flash.
 * Safety net: if the motion controller never boots (JS error), the class is
 * removed after 3.5s so content can never stay hidden.
 */
const motionBoot = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ready');setTimeout(function(){if(!window.__motion)d.classList.remove('motion-ready')},3500)})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-US" className={`${cormorant.variable} ${raleway.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <JsonLd data={businessGraph()} />
      </head>
      <body>
        <PlanProvider
          options={services.map((s) => ({ slug: s.slug, label: s.plan.label, blurb: s.plan.blurb, icon: s.plan.icon, formId: s.formId, formTitle: s.formTitle }))}
          intro={site.formIntro}
          phone={{ display: site.phone.display, href: site.phone.href, sms: site.phone.sms }}
          email={site.email}
        >
          <a href="#main" className="skip-link">Skip to content</a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <StickyCta />
        </PlanProvider>
        <MotionController />
        <Analytics />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
