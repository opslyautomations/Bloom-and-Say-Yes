"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject, type PointerEvent as RPointerEvent } from "react";
import type { PlanOption, PlanService } from "@/lib/plan";
import InquiryForm from "../InquiryForm";

const FORM_ORIGIN = "https://api.opslyautomations.com";

type Props = {
  open: boolean;
  service: PlanService | null;
  openedDirect: boolean;
  options: PlanOption[];
  intro: string;
  phone: { display: string; href: string; sms: string };
  email: string;
  openerRef: MutableRefObject<HTMLElement | null>;
  onSelect: (s: PlanService) => void;
  onBack: () => void;
  onRequestClose: () => void;
};

type Phase = "closed" | "open" | "closing";
type Leaving = { step: 1 | 2; service: PlanService | null; dir: "fwd" | "back" } | null;

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function Icon({ name }: { name: PlanOption["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "heart")
    return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path {...common} d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>;
  if (name === "reveal")
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path {...common} d="M9 3.5c2.8 0 4.5 2.3 4.5 5 0 3.2-2.4 5.5-4.5 5.5S4.5 11.7 4.5 8.5c0-2.7 1.7-5 4.5-5Z" />
        <path {...common} d="M9 14l-1 1.5h2L9 14Zm0 1.5c0 2 1.5 2.5 1.5 4.5" />
        <path {...common} d="M16.5 6.5c1.9 0 3 1.6 3 3.4 0 2.2-1.6 3.7-3 3.7" />
        <path {...common} d="M17 13.6c0 1.7 1 2.2 1 3.9" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path {...common} d="M12 3.5l1.6 4.9 4.9 1.6-4.9 1.6L12 16.5l-1.6-4.9L5.5 10l4.9-1.6L12 3.5Z" />
      <path {...common} d="M18.5 15.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9Z" />
    </svg>
  );
}

/**
 * "Plan Your Perfect Day" popup. Native <dialog> + showModal() (focus
 * containment, Esc, inert page). Step 1 chooses a service; Step 2 shows that
 * service's LeadConnector form, mounted only when Step 2 opens.
 * Bottom sheet below 640px with swipe-to-close.
 */
export default function PlanModal({
  open, service, openedDirect, options, intro, phone, email, openerRef, onSelect, onBack, onRequestClose,
}: Props) {
  const dlg = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [leaving, setLeaving] = useState<Leaving>(null);
  const step: 1 | 2 = service ? 2 : 1;
  const prev = useRef<{ step: 1 | 2; service: PlanService | null }>({ step, service });
  const openProp = useRef(open);
  openProp.current = open;
  const body = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [formFailed, setFormFailed] = useState(false);

  // New step / service: reset the failure flag and start at the top of the body
  useEffect(() => {
    setFormFailed(false);
    body.current?.scrollTo({ top: 0 });
    setScrolled(false);
  }, [step, service]);

  // After a successful submit, scroll the panel back up so the thank-you message is visible
  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== FORM_ORIGIN) return;
      const raw = typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      if (/submit|submitted|form-submit|formSubmit/i.test(raw)) {
        body.current?.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open]);

  const focusTitle = () => title.current?.focus({ preventScroll: true });

  // Open / close with animation
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const html = document.documentElement;
    if (open && !d.open) {
      prev.current = { step, service };
      d.showModal();
      html.classList.add("plan-open");
      requestAnimationFrame(() => {
        setPhase("open");
        focusTitle();
      });
    } else if (!open && d.open) {
      setPhase("closing");
      const t = setTimeout(() => d.close(), reduced() ? 120 : 200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Tag the service for generate_lead while the popup is open
  useEffect(() => {
    const html = document.documentElement;
    if (open && service) html.dataset.planService = service;
    else delete html.dataset.planService;
  }, [open, service]);

  // Step transitions: slide the old step out while the new one slides in
  useLayoutEffect(() => {
    if (phase !== "open") {
      prev.current = { step, service };
      return;
    }
    const p = prev.current;
    prev.current = { step, service };
    if (p.step === step && p.service === service) return;
    setLeaving({ ...p, dir: step === 2 ? "fwd" : "back" });
    focusTitle();
    const t = setTimeout(() => setLeaving(null), 300);
    return () => clearTimeout(t);
  }, [step, service, phase]);

  const finish = () => {
    document.documentElement.classList.remove("plan-open");
    setPhase("closed");
    setLeaving(null);
    const o = openerRef.current;
    if (o && o !== document.body && document.contains(o)) o.focus({ preventScroll: true });
    // The dialog can also be closed natively (e.g. a second Esc) — keep state in sync
    if (openProp.current) onRequestClose();
  };

  // Swipe down to close (bottom sheet)
  // Capture only once the finger actually moves, and never from a button,
  // so taps on "All services" / Close still register as clicks.
  const drag = useRef<{ y: number; dy: number; id: number; captured: boolean } | null>(null);
  const onDown = (e: RPointerEvent) => {
    if (window.innerWidth >= 640) return;
    if ((e.target as Element).closest("button, a")) return;
    drag.current = { y: e.clientY, dy: 0, id: e.pointerId, captured: false };
  };
  const onMove = (e: RPointerEvent) => {
    if (!drag.current || !panel.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.y);
    if (!drag.current.captured) {
      if (drag.current.dy < 6) return;
      drag.current.captured = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    panel.current.style.transition = "none";
    panel.current.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onUp = () => {
    if (!drag.current || !panel.current) return;
    const { dy } = drag.current;
    drag.current = null;
    panel.current.style.transition = "";
    panel.current.style.transform = "";
    if (dy > 90) onRequestClose();
  };

  const opt = (s: PlanService | null) => options.find((o) => o.slug === s) ?? null;

  /** Shown only if a form fails to load (8s timeout, iframe error, or host unreachable). */
  const fallbackCard = (
    <div className="rounded-[8px] border border-stone bg-white p-6 text-center" role="status">
      <p className="font-display text-[1.35rem]">Let&apos;s plan it together</p>
      <p className="mt-2 text-[0.95rem]">
        The form didn&apos;t load, but Scarlett is easy to reach. Call or text{" "}
        <a className="link whitespace-nowrap" href={phone.href}>{phone.display}</a>, or email{" "}
        <span className="whitespace-nowrap max-[399px]:mt-1 max-[399px]:block">
          <a className="link" href={`mailto:${email}`}>{email}</a>
        </span>
      </p>
    </div>
  );

  const talk = (
    <p className="mt-6 text-center text-[0.92rem] text-dusk-text">
      Prefer to talk? Call or text{" "}
      <a href={phone.href} className="link whitespace-nowrap">{phone.display}</a>
    </p>
  );

  const renderStep = (s: 1 | 2, svc: PlanService | null, ghost = false) => {
    if (s === 1) {
      return (
        <div className="px-5 pb-7 sm:px-8 sm:pb-9">
          <ul className="space-y-3" role="list">
            {options.map((o) => (
              <li key={o.slug}>
                <button type="button" className="plan-option group" onClick={() => onSelect(o.slug)} tabIndex={ghost ? -1 : undefined}>
                  <span className="plan-icon"><Icon name={o.icon} /></span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block font-display text-[1.35rem] font-semibold leading-tight text-ink">{o.label}</span>
                    <span className="block text-[0.92rem] text-dusk-text">{o.blurb}</span>
                  </span>
                  <span className="plan-chevron" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
          {talk}
        </div>
      );
    }
    const o = opt(svc);
    return (
      <div className="px-5 pb-7 sm:px-8 sm:pb-9">
        <p className="mx-auto max-w-md text-center font-display text-[1.15rem] italic leading-snug text-ink">“{intro}”</p>
        <div className="mt-6">
          {ghost ? (
            <div className="shimmer h-[520px] rounded" aria-hidden="true" />
          ) : o ? (
            <InquiryForm
              key={o.formId}
              formId={o.formId}
              title={o.formTitle}
              height={o.formHeight ?? 760}
              skeleton
              fallback={fallbackCard}
              onStatus={(st) => setFormFailed(st === "failed")}
            />
          ) : null}
        </div>
        {/* One phone line only: the fallback card already carries it */}
        {ghost || formFailed ? null : talk}
      </div>
    );
  };

  const current = opt(service);

  return (
    <dialog
      ref={dlg}
      className="plan-dialog"
      data-state={phase}
      aria-labelledby="plan-title"
      onCancel={(e) => {
        e.preventDefault();
        onRequestClose();
      }}
      onClose={finish}
    >
      <div className="plan-overlay" onClick={() => step === 1 && onRequestClose()} aria-hidden="true" />
      <div className="plan-frame" onClick={(e) => { if (e.target === e.currentTarget && step === 1) onRequestClose(); }}>
        <div ref={panel} className="plan-panel">
          {/* Header: drag handle (mobile), arch motif, title, close */}
          <div className="plan-head" data-scrolled={scrolled ? "" : undefined} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
            <span className="plan-handle" aria-hidden="true" />
            <span className="plan-arch" aria-hidden="true" />
            <button type="button" className="plan-close" onClick={onRequestClose} aria-label="Close">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            {step === 2 ? (
              <button type="button" className="plan-back" onClick={onBack}>
                <span aria-hidden="true">←</span> {openedDirect ? "Choose a different service" : "All services"}
              </button>
            ) : null}
            <p className="eyebrow relative text-center">Plan your perfect day</p>
            <h2 id="plan-title" ref={title} tabIndex={-1} className="relative mt-2 text-center font-display text-[2rem] font-semibold leading-tight text-ink outline-none sm:text-[2.3rem]">
              {step === 1 ? "Choose Your Service" : current?.label}
            </h2>
          </div>

          <div
            ref={body}
            className="plan-body"
            onScroll={(e) => {
              const y = (e.currentTarget as HTMLDivElement).scrollTop > 4;
              if (y !== scrolled) setScrolled(y);
            }}
          >
          <div className="plan-steps">
            {leaving ? (
              <div className={`plan-step plan-leave-${leaving.dir}`} aria-hidden="true" inert>
                {renderStep(leaving.step, leaving.service, true)}
              </div>
            ) : null}
            <div key={`${step}-${service ?? ""}`} className={`plan-step ${leaving ? `plan-enter-${leaving.dir}` : ""}`}>
              {phase !== "closed" || open ? renderStep(step, service) : null}
            </div>
          </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
