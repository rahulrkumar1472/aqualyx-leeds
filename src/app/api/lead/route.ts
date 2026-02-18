import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  interest: z.string().min(2),
  source: z.string().default("site")
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = leadSchema.parse(json);

    const lead = await db.leadCapture.create({
      data
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ ok: false, message: "Failed to capture lead" }, { status: 500 });
  }
}
