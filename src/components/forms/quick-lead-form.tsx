"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/track";
import { siteConfig } from "@/content/site";

type QuickLeadFormProps = {
  className?: string;
};

export function QuickLeadForm({ className }: QuickLeadFormProps) {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("double-chin");
  const [preferredContactMethod, setPreferredContactMethod] = useState("whatsapp");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    if (companyWebsite.trim()) {
      setDone(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          area,
          preferredContactMethod,
          companyWebsite,
          source: "quick_form",
          pagePath: pathname,
          interest: `Quick lead (${area})`,
          message: `Preferred contact: ${preferredContactMethod}`
        })
      });

      const payload = (await response.json()) as { ok?: boolean };
      if (!response.ok || !payload.ok) throw new Error("Lead request failed");
      setDone(true);
      trackEvent("lead_submit_success", {
        location: "quick_form",
        page: pathname
      });
    } catch {
      trackEvent("lead_submit_error", {
        location: "quick_form",
        page: pathname
      });
      const fallbackMessage = encodeURIComponent(
        `Hi, I want a consultation. Name: ${name}. Phone: ${phone}. Email: ${email}. Area: ${area}. Preferred contact: ${preferredContactMethod}.`
      );
      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${fallbackMessage}`, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className={`rounded-2xl border border-primary/25 bg-primary/10 p-3 text-xs text-secondary ${className ?? ""}`}>
        Thanks, we&apos;ve received your request and will follow up shortly.
      </div>
    );
  }

  return (
    <form className={`relative grid gap-2 sm:grid-cols-2 ${className ?? ""}`} onSubmit={onSubmit}>
      <Input
        name="quickName"
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        required
        value={name}
      />
      <Input
        name="quickPhone"
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone"
        required
        value={phone}
      />
      <Input
        className="sm:col-span-2"
        name="quickEmail"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
        type="email"
        value={email}
      />
      <label className="space-y-1 text-xs text-muted-foreground sm:col-span-2">
        Area of concern
        <select
          className="h-11 w-full rounded-2xl border border-input/90 bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary/45"
          name="quickArea"
          onChange={(event) => setArea(event.target.value)}
          value={area}
        >
          <option value="double-chin">Double chin</option>
          <option value="lower-stomach">Lower stomach</option>
          <option value="love-handles">Love handles</option>
          <option value="arms">Arms</option>
          <option value="thighs">Thighs</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="space-y-1 text-xs text-muted-foreground sm:col-span-2">
        Preferred contact method
        <select
          className="h-11 w-full rounded-2xl border border-input/90 bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary/45"
          name="quickPreferredContact"
          onChange={(event) => setPreferredContactMethod(event.target.value)}
          value={preferredContactMethod}
        >
          <option value="whatsapp">WhatsApp</option>
          <option value="call">Call</option>
          <option value="email">Email</option>
        </select>
      </label>
      <input
        aria-hidden
        autoComplete="off"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        name="companyWebsite"
        onChange={(event) => setCompanyWebsite(event.target.value)}
        tabIndex={-1}
        value={companyWebsite}
      />
      <Button className="sm:col-span-2" disabled={loading} type="submit">
        {loading ? "Sending..." : "Request call back"}
      </Button>
    </form>
  );
}
