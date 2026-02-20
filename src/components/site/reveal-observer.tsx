"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js-enabled");

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-section"));
    if (!elements.length) return;

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    elements.forEach((element) => element.classList.add("is-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.16
      }
    );

    elements.forEach((element) => observer.observe(element));

    const failSafeTimer = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add("is-visible"));
    }, 1400);

    return () => {
      window.clearTimeout(failSafeTimer);
      observer.disconnect();
    };
  }, []);

  return null;
}
