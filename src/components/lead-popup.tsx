"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePercent, CalendarClock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/site";

type LeadState = {
  name: string;
  phone: string;
  email: string;
};

const SHOWN_KEY = "aqualyx_leeds_popup_shown_session";
const SUBMITTED_KEY = "aqualyx_leeds_popup_submitted";
const OPEN_EVENT = "aqualyx-open-offer";

export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [form, setForm] = useState<LeadState>({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (pathname.startsWith("/book")) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);

    const hasSubmittedBefore = window.localStorage.getItem(SUBMITTED_KEY);
    const shownThisSession = window.sessionStorage.getItem(SHOWN_KEY);
    if (hasSubmittedBefore || shownThisSession) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      window.sessionStorage.setItem(SHOWN_KEY, "1");
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function onOpenRequest() {
      if (pathname.startsWith("/book")) return;
      const hasSubmittedBefore = window.localStorage.getItem(SUBMITTED_KEY);
      if (hasSubmittedBefore) return;
      setOpen(true);
      window.sessionStorage.setItem(SHOWN_KEY, "1");
    }

    window.addEventListener(OPEN_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_EVENT, onOpenRequest);
  }, [pathname]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interest: "Aqualyx",
          source: "popup"
        })
      });

      if (!response.ok) {
        throw new Error("Unable to save lead");
      }

      window.localStorage.setItem(SUBMITTED_KEY, "1");
      setSubmitted(true);
    } catch {
      // Keep UX resilient and direct users to WhatsApp if API fails.
      window.localStorage.setItem(SUBMITTED_KEY, "1");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className={reducedMotion ? "transition-none sm:max-w-3xl" : "sm:max-w-3xl"}>
        {submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>You’re in — we’ll message you shortly.</DialogTitle>
              <DialogDescription>Choose your next step while we prepare your consultation follow-up.</DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/book">Book Now</Link>
              </Button>
              <Button asChild variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="grid gap-5 sm:grid-cols-[1.1fr_1fr]">
            <div className="space-y-4 rounded-2xl border border-primary/20 bg-hero-mesh p-5">
              <DialogHeader className="space-y-3 text-left">
                <Badge className="w-fit" variant="secondary">
                  Limited availability
                </Badge>
                <DialogTitle>Claim an extra 25% off your first treatment</DialogTitle>
                <DialogDescription className="text-sm text-secondary/90">
                  Join Aqualyx Leeds updates to unlock 25% off your first treatment.
                  <br />
                  Plus free personal coaching to help you hit your body goals.
                </DialogDescription>
              </DialogHeader>
              <ul className="space-y-2 text-sm">
                <li className="inline-flex items-center gap-2">
                  <BadgePercent className="h-4 w-4 text-primary" /> Extra 25% off
                </li>
                <li className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> Free coaching
                </li>
                <li className="inline-flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-primary" /> Priority slots
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">Discount applied after consultation. Results vary.</p>
            </div>

            <form className="space-y-3 rounded-2xl border bg-card p-4 shadow-soft" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="lead-name">Name</Label>
                <Input
                  id="lead-name"
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                  value={form.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-phone">Mobile number</Label>
                <Input
                  id="lead-phone"
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  required
                  value={form.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-email">Email</Label>
                <Input
                  id="lead-email"
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                  type="email"
                  value={form.email}
                />
              </div>
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Submitting..." : "Claim 25% Off"}
              </Button>
              <Button asChild className="w-full" type="button" variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp Us Instead
                </a>
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
