import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUnauthorizedJson, isAdminApiRequest } from "@/lib/admin-auth";

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

export async function GET(request: Request) {
  if (!isAdminApiRequest(request)) return adminUnauthorizedJson();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type === "leads") {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 2000
    });

    const header = [
      "id",
      "createdAt",
      "name",
      "phone",
      "email",
      "interest",
      "source",
      "pagePath",
      "status",
      "utmSource",
      "utmMedium",
      "utmCampaign"
    ];
    const lines = [
      header.join(","),
      ...leads.map((lead) =>
        [
          lead.id,
          lead.createdAt.toISOString(),
          lead.name,
          lead.phone,
          lead.email,
          lead.interest ?? "",
          lead.source,
          lead.pagePath ?? "",
          lead.status,
          lead.utmSource ?? "",
          lead.utmMedium ?? "",
          lead.utmCampaign ?? ""
        ]
          .map(csvEscape)
          .join(",")
      )
    ];

    return new NextResponse(lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=leads.csv",
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    });
  }

  const bookings = await db.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 2000
  });

  const header = [
    "id",
    "createdAt",
    "firstName",
    "lastName",
    "email",
    "phone",
    "preferredContactMethod",
    "treatmentInterest",
    "targetArea",
    "preferredDate",
    "preferredTime",
    "status",
    "source",
    "utmSource",
    "utmMedium",
    "utmCampaign"
  ];
  const lines = [
    header.join(","),
    ...bookings.map((booking) =>
      [
        booking.id,
        booking.createdAt.toISOString(),
        booking.firstName,
        booking.lastName,
        booking.email,
        booking.phone,
        booking.preferredContactMethod,
        booking.treatmentInterest,
        booking.targetArea,
        booking.preferredDate ?? "",
        booking.preferredTime ?? "",
        booking.status,
        booking.source,
        booking.utmSource ?? "",
        booking.utmMedium ?? "",
        booking.utmCampaign ?? ""
      ]
        .map(csvEscape)
        .join(",")
    )
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=bookings.csv",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
