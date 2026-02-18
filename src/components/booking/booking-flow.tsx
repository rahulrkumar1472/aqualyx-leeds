"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { availabilityConfig } from "@/content/availability";
import { siteConfig } from "@/content/site";
import { nextBookableDates, slotsForDate } from "@/lib/availability";

type BookingForm = {
  treatment: string;
  area: string;
  date: Date | undefined;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const treatments = ["Aqualyx", "Lemon Bottle", "Fat Freezing", "Ultrasound Cavitation"];
const areaOptions = [
  "Double chin",
  "Jawline",
  "Arms",
  "Abdomen",
  "Flanks",
  "Thighs",
  "Other"
];

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BookingForm>({
    treatment: "Aqualyx",
    area: "",
    date: undefined,
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const bookableDates = useMemo(() => nextBookableDates(45), []);
  const availableSlots = form.date ? slotsForDate(form.date) : [];
  const progressPercent = Math.round((step / 6) * 100);

  const nameError = step === 5 && form.name.trim().length > 0 && form.name.trim().length < 2;
  const phoneError = step === 5 && form.phone.trim().length > 0 && form.phone.trim().length < 6;
  const emailError = step === 5 && form.email.trim().length > 0 && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email);

  function next() {
    setStep((prev) => Math.min(prev + 1, 6));
  }

  function previous() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function submitBooking() {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("Please complete name, phone and email before submitting.");
      return;
    }

    if (nameError || phoneError || emailError) {
      setError("Please check your details and try again.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          treatment: form.treatment,
          area: form.area || undefined,
          date: form.date ? format(form.date, "yyyy-MM-dd") : "",
          time: form.time,
          name: form.name,
          phone: form.phone,
          email: form.email,
          notes: form.notes || undefined,
          source: "site"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      setStep(6);
    } catch {
      setError("Unable to submit right now. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Step {step} of 6</CardTitle>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">{progressPercent}% complete</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-3">
            <Label>Choose treatment</Label>
            <Select onValueChange={(value) => setForm((prev) => ({ ...prev, treatment: value }))} value={form.treatment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {treatments.map((treatment) => (
                  <SelectItem key={treatment} value={treatment}>
                    {treatment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={next}>Continue</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Label>Choose area (optional)</Label>
            <Select
              onValueChange={(value) => setForm((prev) => ({ ...prev, area: value === "none" ? "" : value }))}
              value={form.area || "none"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No specific area yet</SelectItem>
                {areaOptions.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={previous} variant="outline">
                Back
              </Button>
              <Button onClick={next}>Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Label>Choose date</Label>
            <Calendar
              disabled={(date) => !bookableDates.some((item) => format(item, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))}
              mode="single"
              onSelect={(date) => setForm((prev) => ({ ...prev, date, time: "" }))}
              selected={form.date}
            />
            <p className="text-xs text-muted-foreground">Slot length: {availabilityConfig.slotDurationMinutes} minutes.</p>
            <div className="flex gap-2">
              <Button onClick={previous} variant="outline">
                Back
              </Button>
              <Button disabled={!form.date} onClick={next}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <Label>Choose time</Label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {availableSlots.map((slot) => (
                <Button
                  key={slot}
                  onClick={() => setForm((prev) => ({ ...prev, time: slot }))}
                  type="button"
                  variant={form.time === slot ? "default" : "outline"}
                >
                  {slot}
                </Button>
              ))}
            </div>
            {!availableSlots.length && <p className="text-sm text-muted-foreground">No slots available for this date. Please choose another date.</p>}
            <div className="flex gap-2">
              <Button onClick={previous} variant="outline">
                Back
              </Button>
              <Button disabled={!form.time} onClick={next}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
                value={form.name}
              />
              {nameError ? <p className="text-xs text-destructive">Please enter at least 2 characters.</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                required
                value={form.phone}
              />
              {phoneError ? <p className="text-xs text-destructive">Please enter a valid phone number.</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
                type="email"
                value={form.email}
              />
              {emailError ? <p className="text-xs text-destructive">Please enter a valid email address.</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                value={form.notes}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={previous} type="button" variant="outline">
                Back
              </Button>
              <Button disabled={isSubmitting || !form.name || !form.phone || !form.email} onClick={submitBooking} type="button">
                {isSubmitting ? "Submitting..." : "Submit Booking"}
              </Button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Thanks — we’ve received your booking request.</h2>
            <p className="text-sm text-muted-foreground">A member of the clinic team will review and confirm your appointment details.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp us
                </a>
              </Button>
              <Button asChild variant="ctaTertiary">
                <a href={siteConfig.phoneHref}>Call us</a>
              </Button>
              <Button asChild variant="ctaSecondary">
                <a href={siteConfig.mapQueryUrl} rel="noopener noreferrer" target="_blank">
                  View directions
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
