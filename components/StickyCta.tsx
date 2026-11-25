"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SERVICE_PATHS = ["/engagement", "/gender-reveals", "/intimate-elopements"];

/**
 * "Begin planning" pill — bottom-right on desktop, full-width bar on mobile.
 * Appears once the hero (#hero, or the first 70% of the viewport) scrolls out.
 * On service pages it jumps to that page's inquiry form (#plan).
 */
export default function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const onService = SERVICE_PATHS.includes(pathname);
  const hidden = pathname === "/contact";
  const href = onService ? "#plan" : "/contact";
  const label = !onService ? "Begin planning" : pathname === "/engagement" ? "Plan your proposal" : pathname === "/gender-reveals" ? "Plan your reveal" : "Plan your elopement";

  useEffect(() => {
    setShow(false);
    const hero = document.getElementById("hero");
    const plan = document.getElementById("plan");
    let heroGone = false;
    let planVisible = false;
    const sync = () => setShow(heroGone && !planVisible);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target.id === "hero") heroGone = !e.isIntersecting;
        if (e.target.id === "plan") planVisible = e.isIntersecting;
      }
      sync();
    });
    if (hero) io.observe(hero);
    if (plan) io.observe(plan);

    let onScroll: (() => void) | undefined;
    if (!hero) {
      onScroll = () => {
        heroGone = scrollY > innerHeight * 0.7;
        sync();
      };
      onScroll();
      addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      if (onScroll) removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (hidden) return null;

  return (
    <div
      className="sticky-cta inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6"
      data-hidden={show ? undefined : ""}
      aria-hidden={show ? undefined : true}
    >
      {/* Plain <a> (not next/link) so the PlanProvider can intercept it before any router navigation */}
      <a
        href={href}
        data-plan="auto"
        data-plan-source="sticky_cta"
        className="btn w-full rounded-none sm:w-auto sm:rounded-full shadow-[0_10px_30px_-12px_rgba(74,52,56,0.55)]"
        style={{ minHeight: 56 }}
        tabIndex={show ? 0 : -1}
      >
        {label} <span className="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
