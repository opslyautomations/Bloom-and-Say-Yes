"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { track } from "@/lib/track";
import { serviceForPath } from "@/lib/plan";

const CHAT_ID = process.env.NEXT_PUBLIC_LC_CHAT_WIDGET_ID;
const FORM_ORIGIN = "https://api.opslyautomations.com";

/**
 * - click_to_call / click_to_email events on tel: and mailto: links
 * - generate_lead when a LeadConnector form posts a submit message
 * - LeadConnector chat widget, loaded only after first interaction or 8s
 */
export default function Analytics() {
  const [loadChat, setLoadChat] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:") || href.startsWith("sms:")) track("click_to_call", { link_url: href, page_path: location.pathname });
      else if (href.startsWith("mailto:")) track("click_to_email", { link_url: href, page_path: location.pathname });
    };

    // {{CONFIRM}} Verify the exact postMessage payload LeadConnector sends on submit.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== FORM_ORIGIN) return;
      const raw = typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      if (/submit|submitted|form-submit|formSubmit/i.test(raw)) {
        // Tag the lead with its service: the popup's current service while it's open, else the page's.
        const fromModal = document.documentElement.dataset.planService;
        track("generate_lead", {
          page_path: location.pathname,
          service: fromModal || serviceForPath(location.pathname) || "general",
          form_location: fromModal ? "plan_modal" : "inline",
        });
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const kick = () => setLoadChat(true);
    if (CHAT_ID) {
      timer = setTimeout(kick, 8000);
      ["pointerdown", "keydown", "scroll", "touchstart"].forEach((ev) =>
        window.addEventListener(ev, kick, { once: true, passive: true }),
      );
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
      if (timer) clearTimeout(timer);
      ["pointerdown", "keydown", "scroll", "touchstart"].forEach((ev) => window.removeEventListener(ev, kick));
    };
  }, []);

  if (!CHAT_ID || !loadChat) return null;
  return (
    <Script
      id="lc-chat"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={CHAT_ID}
      strategy="lazyOnload"
    />
  );
}
