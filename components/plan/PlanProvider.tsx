"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { fromParam, serviceForPath, toParam, type PlanOption, type PlanService } from "@/lib/plan";
import { track } from "@/lib/track";
import PlanModal from "./PlanModal";

type Ctx = { openPlan: (service?: PlanService | null, source?: string) => void };
const PlanContext = createContext<Ctx>({ openPlan: () => {} });

/** Any client component can open the popup: `usePlan().openPlan("engagement", "my-button")`. */
export const usePlan = () => useContext(PlanContext);

function setPlanParam(value: string | null, mode: "push" | "replace") {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set("plan", value);
  else url.searchParams.delete("plan");
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}

type Props = {
  children: ReactNode;
  options: PlanOption[];
  intro: string;
  phone: { display: string; href: string; sms: string };
  email: string;
};

/**
 * Owns popup state. Opens from:
 *  - clicks on any [data-plan] link (rendered by <PlanLink>, works without JS)
 *  - usePlan().openPlan()
 *  - deep links: ?plan=open | engagement | gender-reveals | elopements
 * Opening pushes ?plan=… so the browser Back button closes the popup.
 */
export default function PlanProvider({ children, options, intro, phone, email }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<PlanService | null>(null);
  const [openedDirect, setOpenedDirect] = useState(false);
  const openRef = useRef(false);
  const pushedRef = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  openRef.current = open;

  const show = useCallback((svc: PlanService | null, source: string, opts: { fromUrl?: boolean; opener?: Element | null } = {}) => {
    openerRef.current = (opts.opener as HTMLElement) ?? (document.activeElement as HTMLElement | null);
    setService(svc);
    setOpenedDirect(svc !== null);
    setOpen(true);
    track("plan_modal_open", { source, service: svc ?? "choose", page_path: window.location.pathname });
    if (opts.fromUrl) {
      setPlanParam(toParam(svc), "replace");
      pushedRef.current = false;
    } else if (!openRef.current) {
      setPlanParam(toParam(svc), "push");
      pushedRef.current = true;
    }
  }, []);

  const openPlan = useCallback((svc?: PlanService | null, source = "api") => show(svc ?? null, source), [show]);

  const select = useCallback((svc: PlanService) => {
    setService(svc);
    track("plan_service_select", { service: svc });
    setPlanParam(toParam(svc), "replace");
  }, []);

  const back = useCallback(() => {
    setService(null);
    setPlanParam("open", "replace");
  }, []);

  const requestClose = useCallback(() => {
    if (!openRef.current) return;
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back(); // popstate below finishes the close
    } else {
      setPlanParam(null, "replace");
      setOpen(false);
    }
  }, []);

  // Intercept [data-plan] links (only once JS has loaded — otherwise they navigate normally)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as Element | null)?.closest?.("[data-plan]");
      if (!el) return;
      e.preventDefault();
      const v = el.getAttribute("data-plan");
      const svc = v === "auto" ? serviceForPath(window.location.pathname) : v === "choose" ? null : (v as PlanService);
      show(svc, el.getAttribute("data-plan-source") || "button", { opener: el });
    };
    // Capture phase: runs before any framework click handler can navigate
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  // Back/forward buttons
  useEffect(() => {
    const onPop = () => {
      const p = fromParam(new URL(window.location.href).searchParams.get("plan"));
      if (p === undefined && openRef.current) {
        pushedRef.current = false;
        setOpen(false);
      } else if (p !== undefined && !openRef.current) {
        show(p, "history", { fromUrl: true });
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [show]);

  // Deep links on page load / client navigation
  useEffect(() => {
    const p = fromParam(new URL(window.location.href).searchParams.get("plan"));
    if (p !== undefined) show(p, "deep_link", { fromUrl: true, opener: document.body });
    else if (openRef.current) setOpen(false);
  }, [pathname, show]);

  const value = useMemo(() => ({ openPlan }), [openPlan]);

  return (
    <PlanContext.Provider value={value}>
      {children}
      <PlanModal
        open={open}
        service={service}
        openedDirect={openedDirect}
        options={options}
        intro={intro}
        phone={phone}
        email={email}
        openerRef={openerRef}
        onSelect={select}
        onBack={back}
        onRequestClose={requestClose}
      />
    </PlanContext.Provider>
  );
}
