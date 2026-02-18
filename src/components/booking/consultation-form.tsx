"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2, ShieldCheck } from "lucide-react";
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
  },
  {
    question: "Do I need to commit on the day?",
    answer: "No. Consultation is for assessment and informed decision-making."
  },
  {
    question: "Where is the clinic?",
    answer: "Aqualyx Leeds is based on Tunstall Road, Leeds, LS11 5HL."
  }
];

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
        "Book Free Consultation"
      )}
    </Button>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-xs text-destructive">{error}</p>;
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
  const todayIso = new Date().toISOString().slice(0, 10);
  const lastTrackedError = useRef<string>("");

  useEffect(() => {
    if (!state.error || state.error === lastTrackedError.current) return;
    lastTrackedError.current = state.error;
    trackEvent("lead_submit_error", {
      location: "book_form",
      reason: state.error.toLowerCase().includes("too many") ? "rate_limit" : "validation_or_server"
    });
  }, [state.error]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Consultation request form</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <input name="source" type="hidden" value="website" />
            <input name="pagePath" type="hidden" value={pagePath} />
            <input name="utmSource" type="hidden" value={utmSource ?? ""} />
            <input name="utmMedium" type="hidden" value={utmMedium ?? ""} />
            <input name="utmCampaign" type="hidden" value={utmCampaign ?? ""} />
            <input name="utmTerm" type="hidden" value={utmTerm ?? ""} />
            <input name="utmContent" type="hidden" value={utmContent ?? ""} />
            <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <Label htmlFor="companyWebsite">Company website</Label>
              <Input autoComplete="off" id="companyWebsite" name="companyWebsite" tabIndex={-1} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="firstName" required />
                <FieldError error={state.fieldErrors?.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" required />
                <FieldError error={state.fieldErrors?.lastName} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" required type="email" />
                <FieldError error={state.fieldErrors?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required />
                <FieldError error={state.fieldErrors?.phone} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredContactMethod">Preferred contact method</Label>
              <Select defaultValue="whatsapp" name="preferredContactMethod">
                <SelectTrigger id="preferredContactMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              <FieldError error={state.fieldErrors?.preferredContactMethod} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatmentInterest">Treatment interest</Label>
              <Input
                defaultValue="Aqualyx / Fat Dissolving Injections"
                id="treatmentInterest"
                name="treatmentInterest"
                required
              />
              <FieldError error={state.fieldErrors?.treatmentInterest} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetArea">Target area</Label>
              <Select defaultValue="chin" name="targetArea">
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
              <FieldError error={state.fieldErrors?.targetArea} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred date (optional)</Label>
                <Input id="preferredDate" min={todayIso} name="preferredDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred time (optional)</Label>
                <Input id="preferredTime" name="preferredTime" type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea id="message" name="message" rows={4} />
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input className="mt-1 h-4 w-4 rounded border-border" name="consent" required type="checkbox" />
              <span>
                I agree to be contacted about my consultation request and have read the privacy policy.
              </span>
            </label>
            <FieldError error={state.fieldErrors?.consent} />

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input className="mt-1 h-4 w-4 rounded border-border" name="marketingOptIn" type="checkbox" />
              <span>I would like occasional treatment updates and offers.</span>
            </label>

            {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="border-primary/25 bg-primary/5">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-lg">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Why book with Aqualyx Leeds?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Leeds clinic (LS11)</p>
            <p>Transparent pricing from £99</p>
            <p>Free consultation</p>
            <p className="pt-2">
              Need a quick answer first?{" "}
              <a className="font-medium text-primary underline-offset-4 hover:underline" href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                Message us on WhatsApp
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
