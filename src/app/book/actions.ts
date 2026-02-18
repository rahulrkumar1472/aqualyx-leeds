"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";

const bookingLeadSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required."),
  lastName: z.string().trim().min(2, "Last name is required."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(24, "Enter a valid phone number."),
  preferredContactMethod: z.enum(["phone", "email", "whatsapp"]),
  treatmentInterest: z.string().trim().min(2, "Treatment interest is required."),
  targetArea: z.enum(["chin", "stomach", "love-handles", "arms", "thighs", "other"]),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(1200).optional(),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Please agree to be contacted and confirm the privacy policy." })
  }),
  marketingOptIn: z.enum(["on"]).optional(),
  source: z.string().default("website"),
  pagePath: z.string().optional(),
  companyWebsite: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional()
});

export type BookingFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const MAX_SUBMITS_PER_HOUR = 5;

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function resolveClientIpFromHeaders() {
  const headerStore = headers();
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = headerStore.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

export async function createBookingLeadAction(
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const honeypotValue = getString(formData, "companyWebsite");
  if (honeypotValue) {
    const maskedName = getString(formData, "firstName") || "there";
    redirect(
      `/book/confirm?ref=${encodeURIComponent("AL-REQUESTED")}&name=${encodeURIComponent(maskedName)}`
    );
  }

  const payload = {
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    preferredContactMethod: getString(formData, "preferredContactMethod"),
    treatmentInterest:
      getString(formData, "treatmentInterest") || "Aqualyx / Fat Dissolving Injections",
    targetArea: getString(formData, "targetArea"),
    preferredDate: getString(formData, "preferredDate") || undefined,
    preferredTime: getString(formData, "preferredTime") || undefined,
    message: getString(formData, "message") || undefined,
    consent: formData.get("consent") ? "on" : undefined,
    marketingOptIn: formData.get("marketingOptIn") ? "on" : undefined,
    source: getString(formData, "source") || "website",
    pagePath: getString(formData, "pagePath") || "/book",
    companyWebsite: getString(formData, "companyWebsite") || undefined,
    utmSource: getString(formData, "utmSource") || undefined,
    utmMedium: getString(formData, "utmMedium") || undefined,
    utmCampaign: getString(formData, "utmCampaign") || undefined,
    utmTerm: getString(formData, "utmTerm") || undefined,
    utmContent: getString(formData, "utmContent") || undefined
  };

  const parsed = bookingLeadSchema.safeParse(payload);

  if (!parsed.success) {
    const firstErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([field, errors]) => [
        field,
        errors?.[0] ?? "Invalid value"
      ])
    );

    return {
      error: "Please check the highlighted fields and try again.",
      fieldErrors: firstErrors
    };
  }

  const clientIp = resolveClientIpFromHeaders();
  const currentWindow = new Date();
  currentWindow.setMinutes(0, 0, 0);

  try {
    const rate = await db.rateLimit.upsert({
      where: {
        ip_windowStart: {
          ip: clientIp,
          windowStart: currentWindow
        }
      },
      create: {
        ip: clientIp,
        windowStart: currentWindow,
        count: 1
      },
      update: {
        count: {
          increment: 1
        }
      }
    });

    if (rate.count > MAX_SUBMITS_PER_HOUR) {
      return {
        error:
          "Too many requests from this network. Please wait up to 1 hour or contact us on WhatsApp."
      };
    }
  } catch {
    return {
      error: "We couldn't validate your request right now. Please try again or contact us on WhatsApp."
    };
  }

  let leadId = "";
  let leadFirstName = "";

  try {
    const lead = await db.lead.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        preferredContactMethod: parsed.data.preferredContactMethod,
        treatmentInterest: parsed.data.treatmentInterest,
        targetArea: parsed.data.targetArea,
        preferredDate: parsed.data.preferredDate,
        preferredTime: parsed.data.preferredTime,
        message: parsed.data.message,
        consent: true,
        marketingOptIn: parsed.data.marketingOptIn === "on",
        source: parsed.data.source,
        pagePath: parsed.data.pagePath,
        utmSource: parsed.data.utmSource,
        utmMedium: parsed.data.utmMedium,
        utmCampaign: parsed.data.utmCampaign,
        utmTerm: parsed.data.utmTerm,
        utmContent: parsed.data.utmContent
      }
    });
    leadId = lead.id;
    leadFirstName = lead.firstName;
  } catch {
    return {
      error: "We couldn't submit your request right now. Please try again or contact us on WhatsApp."
    };
  }

  const reference = `AL-${leadId.slice(-8).toUpperCase()}`;
  redirect(`/book/confirm?ref=${encodeURIComponent(reference)}&name=${encodeURIComponent(leadFirstName)}`);
}

const statusSchema = z.object({
  leadId: z.string().min(4),
  status: z.enum(["NEW", "CONTACTED", "BOOKED", "CLOSED"])
});

export async function updateLeadStatusAction(formData: FormData) {
  const parsed = statusSchema.safeParse({
    leadId: getString(formData, "leadId"),
    status: getString(formData, "status")
  });

  if (!parsed.success) return;

  await db.lead.update({
    where: { id: parsed.data.leadId },
    data: { status: parsed.data.status }
  });
}
