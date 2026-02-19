import { revalidatePath } from "next/cache";
import Link from "next/link";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CopyTextButton } from "@/components/admin/copy-text-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminSearchParams = {
  tab?: string | string[];
  status?: string | string[];
  source?: string | string[];
  from?: string | string[];
  to?: string | string[];
};

const statuses = ["NEW", "CONTACTED", "BOOKED", "CLOSED"] as const;

function isStatus(value: string): value is (typeof statuses)[number] {
  return statuses.includes(value as (typeof statuses)[number]);
}

function parseDate(value: string | undefined) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function paramValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function toAdminWhatsApp(name: string) {
  const text = encodeURIComponent(`Hi ${name}, thanks for your request with Aqualyx Leeds. How can we help next?`);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export const metadata = {
  ...buildMetadata({
    title: "Admin Dashboard",
    description: "Protected Aqualyx Leeds lead and booking dashboard.",
    path: "/admin"
  }),
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams?: AdminSearchParams;
}) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfSevenDays = new Date(now);
  startOfSevenDays.setDate(now.getDate() - 6);
  startOfSevenDays.setHours(0, 0, 0, 0);

  const activeTab = paramValue(searchParams?.tab) === "bookings" ? "bookings" : "leads";
  const sourceFilter = paramValue(searchParams?.source)?.trim();
  const statusFilter = paramValue(searchParams?.status)?.trim();
  const fromDate = parseDate(paramValue(searchParams?.from));
  const toDate = parseDate(paramValue(searchParams?.to));
  const hasDateFilter = Boolean(fromDate || toDate);

  const createdAtWhere = hasDateFilter
    ? {
        gte: fromDate ?? undefined,
        lte: toDate
          ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999)
          : undefined
      }
    : undefined;

  const leadWhere = {
    status: statusFilter && isStatus(statusFilter) ? statusFilter : undefined,
    source: sourceFilter || undefined,
    createdAt: createdAtWhere
  };

  const bookingWhere = {
    status: statusFilter && isStatus(statusFilter) ? statusFilter : undefined,
    source: sourceFilter || undefined,
    createdAt: createdAtWhere
  };

  const [
    leadCount,
    bookingCount,
    leadsToday,
    bookingsToday,
    leadsLast7Days,
    bookingsLast7Days,
    leads,
    bookings
  ] = await Promise.all([
    db.lead.count(),
    db.booking.count(),
    db.lead.count({
      where: {
        createdAt: {
          gte: startOfToday
        }
      }
    }),
    db.booking.count({
      where: {
        createdAt: {
          gte: startOfToday
        }
      }
    }),
    db.lead.count({
      where: {
        createdAt: {
          gte: startOfSevenDays
        }
      }
    }),
    db.booking.count({
      where: {
        createdAt: {
          gte: startOfSevenDays
        }
      }
    }),
    activeTab === "leads"
      ? db.lead.findMany({
          where: leadWhere,
          orderBy: { createdAt: "desc" },
          take: 250
        })
      : Promise.resolve([]),
    activeTab === "bookings"
      ? db.booking.findMany({
          where: bookingWhere,
          orderBy: { createdAt: "desc" },
          take: 250
        })
      : Promise.resolve([])
  ]);

  async function updateLeadStatus(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const status = String(formData.get("status") ?? "");
    if (!id || !isStatus(status)) return;

    await db.lead.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin");
  }

  async function updateBookingStatus(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const status = String(formData.get("status") ?? "");
    if (!id || !isStatus(status)) return;

    await db.booking.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin");
  }

  return (
    <Section className="pt-10 sm:pt-14">
      <SectionHeading
        eyebrow="Admin"
        title="Leads & Bookings"
        subtext="Protected dashboard for incoming popup leads, contact requests, and consultation bookings."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total leads</p>
            <p className="text-2xl font-semibold">{leadCount}</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total bookings</p>
            <p className="text-2xl font-semibold">{bookingCount}</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Leads today</p>
            <p className="text-2xl font-semibold">{leadsToday}</p>
            <p className="text-xs text-muted-foreground">Last 7 days: {leadsLast7Days}</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Bookings today</p>
            <p className="text-2xl font-semibold">{bookingsToday}</p>
            <p className="text-xs text-muted-foreground">Last 7 days: {bookingsLast7Days}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant={activeTab === "leads" ? "default" : "outline"}>
              <Link href="/admin?tab=leads">Leads</Link>
            </Button>
            <Button asChild variant={activeTab === "bookings" ? "default" : "outline"}>
              <Link href="/admin?tab=bookings">Bookings</Link>
            </Button>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={`/api/admin/export?type=${activeTab}`} rel="noreferrer">
                  Export CSV
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-5">
            <input name="tab" type="hidden" value={activeTab} />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="status">
                Status
              </label>
              <select
                className="h-11 w-full rounded-xl border border-border/75 bg-background px-3 text-sm"
                defaultValue={statusFilter || ""}
                id="status"
                name="status"
              >
                <option value="">All statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="source">
                Source
              </label>
              <input
                className="h-11 w-full rounded-xl border border-border/75 bg-background px-3 text-sm"
                defaultValue={sourceFilter || ""}
                id="source"
                name="source"
                placeholder="website / popup / contact_form"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="from">
                From
              </label>
              <input
                className="h-11 w-full rounded-xl border border-border/75 bg-background px-3 text-sm"
                defaultValue={paramValue(searchParams?.from) || ""}
                id="from"
                name="from"
                type="date"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="to">
                To
              </label>
              <input
                className="h-11 w-full rounded-xl border border-border/75 bg-background px-3 text-sm"
                defaultValue={paramValue(searchParams?.to) || ""}
                id="to"
                name="to"
                type="date"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit">Apply</Button>
              <Button asChild type="button" variant="outline">
                <Link href={`/admin?tab=${activeTab}`}>Reset</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{activeTab === "leads" ? `Leads (${leads.length})` : `Bookings (${bookings.length})`}</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === "leads" ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Created</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Interest</th>
                    <th className="px-3 py-2">Source</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr className="border-t border-border/60 align-top" key={lead.id}>
                      <td className="px-3 py-2 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">Ref: AL-{lead.id.slice(-8).toUpperCase()}</p>
                      </td>
                      <td className="space-y-2 px-3 py-2 text-muted-foreground">
                        <p>{lead.email}</p>
                        <p>{lead.phone}</p>
                        <div className="flex flex-wrap gap-1.5">
                          <CopyTextButton text={lead.email} />
                          <CopyTextButton text={lead.phone} />
                        </div>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <p>{lead.interest || "General lead"}</p>
                        <p className="text-xs">Path: {lead.pagePath || "-"}</p>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <Badge variant="outline">{lead.source}</Badge>
                      </td>
                      <td className="px-3 py-2">
                        <form action={updateLeadStatus} className="flex items-center gap-2">
                          <input name="id" type="hidden" value={lead.id} />
                          <select
                            className="h-10 rounded-lg border border-border bg-background px-2 text-sm"
                            defaultValue={lead.status}
                            name="status"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <Button size="sm" type="submit" variant="outline">
                            Save
                          </Button>
                        </form>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1.5">
                          <Button asChild size="sm" variant="ctaSecondary">
                            <a href={toAdminWhatsApp(lead.name)} rel="noreferrer" target="_blank">
                              Open WhatsApp
                            </a>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Created</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Treatment</th>
                    <th className="px-3 py-2">Area</th>
                    <th className="px-3 py-2">Preferred</th>
                    <th className="px-3 py-2">Source</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const fullName = `${booking.firstName} ${booking.lastName}`.trim();
                    return (
                      <tr className="border-t border-border/60 align-top" key={booking.id}>
                        <td className="px-3 py-2 text-muted-foreground">
                          {new Date(booking.createdAt).toLocaleString("en-GB")}
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-medium">{fullName}</p>
                          <p className="text-xs text-muted-foreground">Ref: AL-{booking.id.slice(-8).toUpperCase()}</p>
                        </td>
                        <td className="space-y-2 px-3 py-2 text-muted-foreground">
                          <p>{booking.email}</p>
                          <p>{booking.phone}</p>
                          <p className="text-xs uppercase">{booking.preferredContactMethod}</p>
                          <div className="flex flex-wrap gap-1.5">
                            <CopyTextButton text={booking.email} />
                            <CopyTextButton text={booking.phone} />
                          </div>
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">{booking.treatmentInterest}</td>
                        <td className="px-3 py-2 text-muted-foreground">{booking.targetArea}</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          <p>{booking.preferredDate || "-"}</p>
                          <p>{booking.preferredTime || "-"}</p>
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          <Badge variant="outline">{booking.source}</Badge>
                          <p className="mt-1 text-xs">Path: {booking.pagePath || "-"}</p>
                        </td>
                        <td className="px-3 py-2">
                          <form action={updateBookingStatus} className="flex items-center gap-2">
                            <input name="id" type="hidden" value={booking.id} />
                            <select
                              className="h-10 rounded-lg border border-border bg-background px-2 text-sm"
                              defaultValue={booking.status}
                              name="status"
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <Button size="sm" type="submit" variant="outline">
                              Save
                            </Button>
                          </form>
                        </td>
                        <td className="px-3 py-2">
                          <Button asChild size="sm" variant="ctaSecondary">
                            <a href={toAdminWhatsApp(fullName || booking.firstName)} rel="noreferrer" target="_blank">
                              Open WhatsApp
                            </a>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </Section>
  );
}
