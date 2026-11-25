"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { formSrc } from "@/content/services";

const EMBED_JS = "https://api.opslyautomations.com/js/form_embed.js";
const LOAD_TIMEOUT_MS = 8000;

export type FormStatus = "loading" | "loaded" | "failed";

type Props = {
  formId: string;
  title: string;
  /** Reserved height (px) until the form loads, so nothing shifts. */
  height?: number;
  /**
   * Popup mode: shows a shimmer skeleton while loading, and `fallback` if the
   * form fails (no load event within 8s, an iframe error, or the form host
   * being unreachable). Not used inline, where the server-rendered iframe must
   * stay visible without JS.
   */
  skeleton?: boolean;
  fallback?: ReactNode;
  onStatus?: (s: FormStatus) => void;
};

/**
 * LeadConnector inline form. The embed script (which auto-resizes the iframe
 * for multi-step forms and validation errors) loads only when the form nears
 * the viewport. Height is never clamped after load.
 */
export default function InquiryForm({ formId, title, height = 860, skeleton = false, fallback, onStatus }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("loading");
  const statusRef = useRef<FormStatus>("loading");
  const set = (s: FormStatus) => {
    if (statusRef.current === "failed") return; // failure is final
    statusRef.current = s;
    setStatus(s);
    onStatus?.(s);
  };

  // Load form_embed.js when the form nears the viewport
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

  // Failure detection (popup only). A blocked iframe can still fire `load`
  // (the browser's error page), so we also probe the form host directly.
  useEffect(() => {
    if (!skeleton) return;
    let alive = true;
    const timer = setTimeout(() => {
      if (alive && statusRef.current === "loading") set("failed");
    }, LOAD_TIMEOUT_MS);
    fetch(formSrc(formId), { mode: "no-cors", cache: "no-store" }).catch(() => {
      if (alive) set("failed");
    });
    return () => {
      alive = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId, skeleton]);

  const failed = skeleton && status === "failed";

  return (
    <div ref={ref} className="relative" style={{ minHeight: status === "loading" ? height : undefined }}>
      {skeleton && status === "loading" ? (
        <div className="absolute inset-0 space-y-4 overflow-hidden" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="shimmer mb-2 h-3 w-1/3 rounded" />
              <div className="shimmer h-12 rounded" />
            </div>
          ))}
          <div className="shimmer h-28 rounded" />
          <div className="shimmer mx-auto h-12 w-40 rounded-full" />
        </div>
      ) : null}
      {failed ? fallback : null}
      <iframe
        src={formSrc(formId)}
        id={`inline-${formId}`}
        title={title}
        loading="lazy"
        onLoad={() => set("loaded")}
        onError={() => set("failed")}
        style={{
          width: "100%",
          height,
          border: "none",
          borderRadius: 4,
          display: failed ? "none" : undefined,
          opacity: skeleton && status === "loading" ? 0 : 1,
          transition: "opacity .3s ease",
        }}
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
