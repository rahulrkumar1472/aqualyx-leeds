"use client";

import { useMemo, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/track";

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  marketingOptIn: boolean;
};

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
    marketingOptIn: false
  });

  const whatsappFallback = useMemo(() => {
    const msg = encodeURIComponent(
      `Hi, my name is ${form.name || "there"}. I would like to ask about Aqualyx in Leeds. Phone: ${form.phone || "-"}`
    );
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
  }, [form.name, form.phone]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          interest: "Contact enquiry",
          source: "contact_form",
          pagePath: "/contact",
          consentMarketing: form.marketingOptIn
        })
      });

      if (!response.ok) {
        throw new Error("Unable to submit enquiry");
      }

      setSuccess(true);
      trackEvent("popup_submit", {
        location: "contact_form"
      });
    } catch {
      setError("We couldn't send your message right now. Please message us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-4 rounded-2xl border border-primary/25 bg-primary/5 p-5">
        <h3 className="text-xl font-semibold">Thanks, we&apos;ve received your message.</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ll get back to you shortly. If your enquiry is urgent, message us on WhatsApp now.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={whatsappFallback} rel="noopener noreferrer" target="_blank">
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" /> WhatsApp us now
              </span>
            </a>
          </Button>
          <Button asChild variant="ctaTertiary">
            <a href={siteConfig.phoneHref}>Call {siteConfig.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
          value={form.name}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            required
            value={form.phone}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
            type="email"
            value={form.email}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          placeholder="Tell us your treatment goal and preferred area."
          rows={5}
          value={form.message}
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          checked={form.marketingOptIn}
          className="mt-1 h-4 w-4 rounded border-border"
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              marketingOptIn: event.target.checked
            }))
          }
          type="checkbox"
        />
        <span>I&apos;m happy to receive occasional clinic updates and offers.</span>
      </label>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <Button disabled={loading} type="submit">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <Button asChild type="button" variant="ctaSecondary">
          <a href={whatsappFallback} rel="noopener noreferrer" target="_blank">
            WhatsApp instead
          </a>
        </Button>
      </div>
    </form>
  );
}
