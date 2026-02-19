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
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          source: "quick_form",
          pagePath: pathname,
          interest: "Consultation request"
        })
      });

      if (!response.ok) throw new Error("Lead request failed");
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
      window.open(siteConfig.whatsappUrl, "_blank", "noopener,noreferrer");
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
    <form className={`grid gap-2 sm:grid-cols-2 ${className ?? ""}`} onSubmit={onSubmit}>
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
      <Button className="sm:col-span-2" disabled={loading} type="submit">
        {loading ? "Sending..." : "Request call back"}
      </Button>
    </form>
  );
}
