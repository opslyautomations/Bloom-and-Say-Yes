"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The only motion JS on the site (~1.5KB gzipped). It:
 *  - marks html.motion-ready (also set pre-paint by an inline script in <head>)
 *  - reveals [data-reveal] / .bloom elements once, when they enter the viewport
 *  - drives the vine + progress bar where CSS scroll-driven animations are unsupported
 *  - shows a small petal cursor over [data-petal-zone] on fine-pointer devices
 */
export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    (window as unknown as { __motion: number }).__motion = 1;
    html.classList.add("motion-ready");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), .bloom:not(.is-in)");
    const off: (() => void)[] = [];

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    off.push(() => io.disconnect());

    // Fallback for browsers without animation-timeline (Safari/Firefox today)
    if (!CSS.supports("animation-timeline: view()")) {
      const track = document.querySelector<HTMLElement>(".vine-track");
      let raf = 0;
      const update = () => {
        const V = innerHeight;
        const max = Math.max(1, html.scrollHeight - V);
        html.style.setProperty("--page-p", String(Math.min(1, scrollY / max)));
        if (track) {
          const r = track.getBoundingClientRect();
          const p = (0.6 * V - r.top) / Math.max(1, r.height - 0.4 * V);
          track.style.setProperty("--vine-p", String(Math.min(1, Math.max(0, p))));
        }
      };
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      };
      update();
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
      off.push(() => {
        removeEventListener("scroll", onScroll);
        removeEventListener("resize", onScroll);
      });
    }

    // Petal cursor accent (desktop, hero + final CTA only)
    const zones = document.querySelectorAll<HTMLElement>("[data-petal-zone]");
    if (zones.length && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const petal = document.createElement("div");
      petal.className = "petal-cursor";
      petal.setAttribute("aria-hidden", "true");
      petal.innerHTML =
        '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 1C15 6 15 13 10 19 5 13 5 6 10 1Z" fill="#E2C3C0" stroke="#B78C8A" stroke-width=".8"/></svg>';
      document.body.appendChild(petal);
      let x = 0, y = 0, cx = 0, cy = 0, frame = 0;
      const tick = () => {
        cx += (x - cx) * 0.14;
        cy += (y - cy) * 0.14;
        petal.style.transform = `translate(${cx + 14}px, ${cy + 10}px) rotate(${(x - cx) * 0.8}deg)`;
        frame = requestAnimationFrame(tick);
      };
      const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
      const enter = () => { petal.setAttribute("data-on", ""); if (!frame) frame = requestAnimationFrame(tick); };
      const leave = () => { petal.removeAttribute("data-on"); cancelAnimationFrame(frame); frame = 0; };
      zones.forEach((z) => {
        z.addEventListener("pointerenter", enter);
        z.addEventListener("pointerleave", leave);
      });
      addEventListener("pointermove", move, { passive: true });
      off.push(() => {
        leave();
        petal.remove();
        removeEventListener("pointermove", move);
        zones.forEach((z) => {
          z.removeEventListener("pointerenter", enter);
          z.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => off.forEach((f) => f());
  }, [pathname]);

  return null;
}
