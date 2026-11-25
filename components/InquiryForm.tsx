"use client";

import { useEffect, useRef, useState } from "react";
import { formSrc } from "@/content/services";

const EMBED_JS = "https://api.opslyautomations.com/js/form_embed.js";

/**
 * LeadConnector inline form. The iframe's height is reserved up front so
 * nothing shifts when it loads. The embed script (which auto-resizes the
 * iframe) loads only when the form nears the viewport.
 *
 * `skeleton` shows a soft shimmer until the iframe loads — used in the popup,
 * where the form is mounted client-side. (Not used inline: without JS it
 * would cover the form.)
 */
export default function InquiryForm({
  formId, title, height = 860, skeleton = false,
}: { formId: string; title: string; height?: number; skeleton?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const load = () => {
      if (document.querySelector(`script[src="${EMBED_JS}"]`)) return;
      const s = document.createElement("script");
      s.src = EMBED_JS;
      s.async = true;
      document.body.appendChild(s);
    };
    if (!("IntersectionObserver" in window)) return load();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative" style={{ minHeight: height }}>
      {skeleton && !loaded ? (
        <div className="absolute inset-0 space-y-4" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="shimmer mb-2 h-3 w-1/3 rounded" />
              <div className="shimmer h-12 rounded" />
            </div>
          ))}
          <div className="shimmer h-28 rounded" />
          <div className="shimmer mx-auto h-12 w-40 rounded-full" />
        </div>
      ) : null}
      <iframe
        src={formSrc(formId)}
        id={`inline-${formId}`}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ width: "100%", height, border: "none", borderRadius: 4, opacity: skeleton && !loaded ? 0 : 1, transition: "opacity .3s ease" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height={String(height)}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
      />
    </div>
  );
}
