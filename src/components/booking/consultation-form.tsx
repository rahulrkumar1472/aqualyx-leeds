"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { createBookingLeadAction, type BookingFormState } from "@/app/book/actions";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/track";

const initialState: BookingFormState = {};

const bookingFaqs = [
  {
    question: "How much does treatment cost?",
    answer:
      "Pricing starts from £99. Final pricing depends on the area and treatment plan confirmed in consultation."
  },
  {
    question: "How quickly will I be contacted?",
    answer: "Our team typically contacts new consultation requests within 24 working hours."
  },
  {
    question: "Is consultation really free?",
    answer:
      "Yes. Consultation is free and used to check suitability, outline options, and provide a tailored plan."
  },
  {
    question: "Can I choose WhatsApp contact?",
    answer: "Yes. Select WhatsApp as your preferred contact method and we will message you first."
  },
  {
    question: "What areas can you assess?",
    answer: "Common areas include chin, stomach, love handles, arms, and thighs."
  },
  {
    question: "Do you guarantee results?",
    answer:
      "No treatment can guarantee identical outcomes. Results vary by person and plan and are discussed in consultation."
  }
];

const stepLabels = [
  { id: 1, label: "Details" },
  { id: 2, label: "Treatment" },
  { id: 3, label: "Preferences" },
  { id: 4, label: "Confirm" }
] as const;

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: "phone" | "email" | "whatsapp";
  treatmentInterest: string;
  targetArea: "chin" | "stomach" | "love-handles" | "arms" | "thighs" | "other";
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
  marketingOptIn: boolean;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full md:w-auto" disabled={pending} type="submit">
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending request...
        </span>
      ) : (
        "Submit consultation request"
      )}
    </Button>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {stepLabels.map((item) => {
        const isActive = item.id === step;
        const isDone = item.id < step;
        return (
          <div
            className={`rounded-xl border px-3 py-2 text-xs ${
              isActive
                ? "border-primary/45 bg-primary/10 text-secondary"
                : isDone
                ? "border-primary/30 bg-primary/5 text-secondary"
                : "border-border/70 bg-card text-muted-foreground"
            }`}
            key={item.id}
          >
            <p className="font-semibold">Step {item.id}</p>
            <p>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}

type ConsultationFormProps = {
  pagePath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export function ConsultationForm({
  pagePath = "/book",
  utmSource,
  utmMedium,
  utmCampaign,
  utmTerm,
  utmContent
}: ConsultationFormProps) {
  const [state, formAction] = useFormState(createBookingLeadAction, initialState);
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState("");
  const [form, setForm] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContactMethod: "whatsapp",
    treatmentInterest: "Aqualyx / Fat Dissolving Injections",
    targetArea: "chin",
    preferredDate: "",
    preferredTime: "",
    message: "",
    consent: false,
    marketingOptIn: false
  });

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const lastTrackedError = useRef<string>("");

  useEffect(() => {
    if (!state.error || state.error === lastTrackedError.current) return;
    lastTrackedError.current = state.error;
    trackEvent("booking_submit", {
      location: "book_form",
      status: "error",
      reason: state.error.toLowerCase().includes("too many") ? "rate_limit" : "validation_or_server"
    });
  }, [state.error]);

  function validateStep(targetStep: number) {
    if (targetStep === 1) {
      if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim()) {
        return "Please complete your core contact details.";
      }
    }
    if (targetStep === 2) {
      if (!form.treatmentInterest.trim() || !form.targetArea) {
        return "Please choose treatment interest and target area.";
      }
    }
    if (targetStep === 4 && !form.consent) {
      return "Please agree to be contacted and confirm the privacy policy.";
    }
    return "";
  }

  function goNext() {
    const error = validateStep(step);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    setStep((prev) => Math.min(4, prev + 1));
  }

  function goPrev() {
    setStepError("");
    setStep((prev) => Math.max(1, prev - 1));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
      <Card className="border-primary/20">
        <CardHeader className="space-y-4">
          <CardTitle>Consultation request form</CardTitle>
          <Stepper step={step} />
        </CardHeader>
        <CardContent>
          <form
            action={formAction}
            className="space-y-5"
            onSubmit={(event) => {
              const error = validateStep(4);
              if (error) {
                event.preventDefault();
                setStepError(error);
                setStep(4);
                return;
              }
              trackEvent("booking_submit", {
                location: "book_form",
                status: "attempt"
              });
            }}
          >
            <input name="source" type="hidden" value="website" />
            <input name="pagePath" type="hidden" value={pagePath} />
            <input name="utmSource" type="hidden" value={utmSource ?? ""} />
            <input name="utmMedium" type="hidden" value={utmMedium ?? ""} />
            <input name="utmCampaign" type="hidden" value={utmCampaign ?? ""} />
            <input name="utmTerm" type="hidden" value={utmTerm ?? ""} />
            <input name="utmContent" type="hidden" value={utmContent ?? ""} />
            <input name="firstName" type="hidden" value={form.firstName} />
            <input name="lastName" type="hidden" value={form.lastName} />
            <input name="email" type="hidden" value={form.email} />
            <input name="phone" type="hidden" value={form.phone} />
            <input name="preferredContactMethod" type="hidden" value={form.preferredContactMethod} />
            <input name="treatmentInterest" type="hidden" value={form.treatmentInterest} />
            <input name="targetArea" type="hidden" value={form.targetArea} />
            <input name="preferredDate" type="hidden" value={form.preferredDate} />
            <input name="preferredTime" type="hidden" value={form.preferredTime} />
            <input name="message" type="hidden" value={form.message} />
            <input name="marketingOptIn" type="hidden" value={form.marketingOptIn ? "on" : ""} />
            <input name="consent" type="hidden" value={form.consent ? "on" : ""} />
            <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <Label htmlFor="companyWebsite">Company website</Label>
              <Input autoComplete="off" id="companyWebsite" name="companyWebsite" tabIndex={-1} />
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Enter your details so the Leeds team can confirm suitability follow-up.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                      value={form.firstName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                      value={form.lastName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      type="email"
                      value={form.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                      value={form.phone}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Tell us your treatment interest and area so we can prepare the right consultation path.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="treatmentInterest">Treatment interest</Label>
                  <Input
                    id="treatmentInterest"
                    onChange={(event) => setForm((prev) => ({ ...prev, treatmentInterest: event.target.value }))}
                    value={form.treatmentInterest}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetArea">Target area</Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        targetArea: value as FormValues["targetArea"]
                      }))
                    }
                    value={form.targetArea}
                  >
                    <SelectTrigger id="targetArea">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chin">Chin</SelectItem>
                      <SelectItem value="stomach">Stomach</SelectItem>
                      <SelectItem value="love-handles">Love handles</SelectItem>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="thighs">Thighs</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add your preferred contact route and appointment preferences.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="preferredContactMethod">Preferred contact method</Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        preferredContactMethod: value as FormValues["preferredContactMethod"]
                      }))
                    }
                    value={form.preferredContactMethod}
                  >
                    <SelectTrigger id="preferredContactMethod">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred date (optional)</Label>
                    <Input
                      id="preferredDate"
                      min={todayIso}
                      onChange={(event) => setForm((prev) => ({ ...prev, preferredDate: event.target.value }))}
                      type="date"
                      value={form.preferredDate}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred time (optional)</Label>
                    <Input
                      id="preferredTime"
                      onChange={(event) => setForm((prev) => ({ ...prev, preferredTime: event.target.value }))}
                      type="time"
                      value={form.preferredTime}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea
                    id="message"
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    placeholder="Tell us anything helpful before your consultation."
                    rows={5}
                    value={form.message}
                  />
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Review your details, then submit. We&apos;ll contact you within 24 working hours.
                </p>
                <div className="rounded-2xl border border-border/70 bg-muted/35 p-4 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Name:</span> {form.firstName} {form.lastName}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Contact:</span> {form.email} / {form.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Treatment:</span> {form.treatmentInterest}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Area:</span> {form.targetArea}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Preferred:</span>{" "}
                    {form.preferredDate || "Flexible"} {form.preferredTime ? `at ${form.preferredTime}` : ""}
                  </p>
                </div>

                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input
                    checked={form.consent}
                    className="mt-1 h-4 w-4 rounded border-border"
                    onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
                    type="checkbox"
                  />
                  <span>I agree to be contacted about my request and confirm I have read the privacy policy.</span>
                </label>

                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input
                    checked={form.marketingOptIn}
                    className="mt-1 h-4 w-4 rounded border-border"
                    onChange={(event) => setForm((prev) => ({ ...prev, marketingOptIn: event.target.checked }))}
                    type="checkbox"
                  />
                  <span>I&apos;m happy to receive occasional treatment updates and offers.</span>
                </label>
              </div>
            ) : null}

            {(stepError || state.error) && <p className="text-sm text-destructive">{stepError || state.error}</p>}

            <div className="flex flex-wrap gap-2">
              {step > 1 ? (
                <Button onClick={goPrev} type="button" variant="outline">
                  Back
                </Button>
              ) : null}
              {step < 4 ? (
                <Button onClick={goNext} type="button">
                  Continue
                </Button>
              ) : (
                <SubmitButton />
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="border-primary/25 bg-primary/5">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-lg">
              <ShieldCheck className="h-4 w-4 text-primary" />
              What happens next
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> We review your request and suitability notes.
            </p>
            <p className="inline-flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> You receive WhatsApp-first contact within 24
              working hours.
            </p>
            <p className="inline-flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> Consultation details and pricing guidance are
              confirmed.
            </p>
            <p className="pt-2">
              Need immediate help?{" "}
              <a
                className="font-medium text-primary underline-offset-4 hover:underline"
                href={siteConfig.whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  Message on WhatsApp
                </span>
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <FaqAccordion items={bookingFaqs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
