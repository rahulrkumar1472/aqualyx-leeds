"use client";

type EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function normalizeEvent(name: string, params: EventParams) {
  if (name === "cta_book_click") return { name: "cta_click", params: { ...params, type: "book" } };
  if (name === "cta_call_click") return { name: "cta_click", params: { ...params, type: "call" } };
  if (name === "cta_whatsapp_click") return { name: "cta_click", params: { ...params, type: "whatsapp" } };
  if (name === "lead_submit_success") return { name: "booking_submit", params: { ...params, status: "success" } };
  if (name === "lead_submit_error") return { name: "booking_submit", params: { ...params, status: "error" } };
  return { name, params };
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const normalized = normalizeEvent(name, params);

  if (process.env.NODE_ENV !== "production") {
    // Keep hooks visible in dev while analytics is not connected.
    console.log("[event]", normalized.name, normalized.params);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", normalized.name, normalized.params);
  }
}
