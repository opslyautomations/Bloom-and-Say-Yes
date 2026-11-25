"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive enhancement for the native <details> mobile menu rendered by the
 * Header (which works without JS). Closes on navigation and on Escape.
 */
export default function MobileMenu({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details
      ref={ref}
      className="mobile-menu group lg:hidden"
      onClick={(e) => {
        if ((e.target as Element).closest("[data-plan]") && ref.current) ref.current.open = false;
      }}
    >
      {children}
    </details>
  );
}
