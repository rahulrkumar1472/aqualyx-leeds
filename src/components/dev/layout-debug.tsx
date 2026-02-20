"use client";

import { useEffect, useState } from "react";

export function LayoutDebug() {
  const [active, setActive] = useState(false);
  const [metrics, setMetrics] = useState<{ viewport: number; scroll: number; offenders: string[] } | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const enabled = url.searchParams.get("layoutDebug") === "1";
    const stored = window.localStorage.getItem("aqualyx-layout-debug") === "1";
    const isActive = enabled || stored;
    setActive(isActive);
    if (enabled) window.localStorage.setItem("aqualyx-layout-debug", "1");
  }, []);

  useEffect(() => {
    if (!active) return;

    const inspect = () => {
      const viewport = document.documentElement.clientWidth;
      const scroll = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      const offenders: string[] = [];

      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > viewport + 1) {
          el.style.outline = "1px solid hsl(var(--destructive) / 0.6)";
          if (offenders.length < 6) {
            const id = el.id ? `#${el.id}` : "";
            const className = el.className && typeof el.className === "string" ? `.${el.className.split(" ").filter(Boolean).join(".")}` : "";
            offenders.push(`${el.tagName.toLowerCase()}${id}${className}`.slice(0, 80));
          }
        } else if (el.style.outline.includes("destructive")) {
          el.style.outline = "";
        }
      });

      setMetrics({ viewport, scroll, offenders });
    };

    inspect();
    window.addEventListener("resize", inspect);
    window.addEventListener("load", inspect);
    return () => {
      window.removeEventListener("resize", inspect);
      window.removeEventListener("load", inspect);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div className="mx-auto h-full max-w-7xl border-x border-primary/40 px-4 sm:px-6 lg:px-8" />
      <div className="absolute left-2 top-2 max-w-[min(88vw,560px)] rounded border border-primary/50 bg-background/90 px-2 py-1 text-[10px] font-semibold text-primary">
        <p>Layout debug enabled</p>
        {metrics ? (
          <>
            <p>
              vw: {metrics.viewport}px | scroll: {metrics.scroll}px
            </p>
            {metrics.offenders.length ? <p className="truncate">offenders: {metrics.offenders.join(" | ")}</p> : <p>offenders: none</p>}
          </>
        ) : null}
      </div>
    </div>
  );
}
