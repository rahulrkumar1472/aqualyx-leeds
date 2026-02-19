import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { adminUnauthorizedJson, isAdminApiRequest } from "@/lib/admin-auth";

const createLeadSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().min(6),
  email: z.string().trim().email(),
  interest: z.string().trim().min(2).optional(),
  source: z.string().trim().min(2).default("website"),
  pagePath: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
  consentMarketing: z.boolean().optional(),
  utmSource: z.string().trim().optional(),
  utmMedium: z.string().trim().optional(),
  utmCampaign: z.string().trim().optional(),
  utmTerm: z.string().trim().optional(),
  utmContent: z.string().trim().optional()
});

const patchLeadSchema = z.object({
  id: z.string().min(4),
  status: z.enum(["NEW", "CONTACTED", "BOOKED", "CLOSED"])
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = createLeadSchema.parse(json);

    const lead = await db.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        interest: data.interest,
        source: data.source,
        pagePath: data.pagePath,
        message: data.message,
        consentMarketing: Boolean(data.consentMarketing),
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmTerm: data.utmTerm,
        utmContent: data.utmContent
      }
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Failed to capture lead" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!isAdminApiRequest(request)) return adminUnauthorizedJson();

  const leads = await db.lead.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 500
  });

  return NextResponse.json({ ok: true, leads });
}

export async function PATCH(request: Request) {
  if (!isAdminApiRequest(request)) return adminUnauthorizedJson();

  try {
    const json = await request.json();
    const data = patchLeadSchema.parse(json);

    const updated = await db.lead.update({
      where: { id: data.id },
      data: { status: data.status }
    });

    return NextResponse.json({ ok: true, id: updated.id, status: updated.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Unable to update lead status." }, { status: 500 });
  }
}
