import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { adminUnauthorizedJson, isAdminApiRequest } from "@/lib/admin-auth";

const bookingSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6),
  preferredContactMethod: z.enum(["phone", "email", "whatsapp"]),
  treatmentInterest: z.string().trim().min(2),
  targetArea: z.enum(["chin", "stomach", "love-handles", "arms", "thighs", "other"]),
  preferredDate: z.string().trim().optional(),
  preferredTime: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().min(2).default("website"),
  pagePath: z.string().trim().optional(),
  utmSource: z.string().trim().optional(),
  utmMedium: z.string().trim().optional(),
  utmCampaign: z.string().trim().optional(),
  utmTerm: z.string().trim().optional(),
  utmContent: z.string().trim().optional()
});

const patchBookingSchema = z.object({
  id: z.string().min(4),
  status: z.enum(["NEW", "CONTACTED", "BOOKED", "CLOSED"])
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = bookingSchema.parse(json);

    const booking = await db.booking.create({
      data
    });

    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Failed to create booking." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!isAdminApiRequest(request)) return adminUnauthorizedJson();

  const bookings = await db.booking.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 500
  });

  return NextResponse.json({ ok: true, bookings });
}

export async function PATCH(request: Request) {
  if (!isAdminApiRequest(request)) return adminUnauthorizedJson();

  try {
    const json = await request.json();
    const data = patchBookingSchema.parse(json);

    const updated = await db.booking.update({
      where: { id: data.id },
      data: { status: data.status }
    });

    return NextResponse.json({ ok: true, id: updated.id, status: updated.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Unable to update booking status." }, { status: 500 });
  }
}
