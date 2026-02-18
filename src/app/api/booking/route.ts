import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const bookingSchema = z.object({
  treatment: z.string().min(2),
  area: z.string().optional(),
  date: z.string().min(10),
  time: z.string().min(4),
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  notes: z.string().optional(),
  source: z.string().default("site")
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = bookingSchema.parse(json);

    const booking = await db.bookingRequest.create({
      data
    });

    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Failed to create booking" }, { status: 500 });
  }
}
