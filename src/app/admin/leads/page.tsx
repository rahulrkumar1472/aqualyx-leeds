import { revalidatePath } from "next/cache";
import { updateLeadStatusAction } from "@/app/book/actions";
import { db } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  ...buildMetadata({
    title: "Admin Leads",
    description: "Aqualyx Leeds leads dashboard",
    path: "/admin/leads"
  }),
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

const statuses = ["NEW", "CONTACTED", "BOOKED", "CLOSED"] as const;

export default async function AdminLeadsPage() {
  const leads = await db.lead.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 250
  });

  async function updateStatus(formData: FormData) {
    "use server";
    await updateLeadStatusAction(formData);
    revalidatePath("/admin/leads");
  }

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <SectionHeading
          eyebrow="Admin"
          subtext="Most recent consultation leads first. Update statuses as contact progresses."
          title="Lead Management"
        />
        <Card>
          <CardHeader>
            <CardTitle>Leads ({leads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1024px] text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Created</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Interest</th>
                    <th className="px-3 py-2">Area</th>
                    <th className="px-3 py-2">Preferred</th>
                    <th className="px-3 py-2">Source / UTM</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr className="border-t border-border/60 align-top" key={lead.id}>
                      <td className="px-3 py-2 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        <p className="font-medium">{lead.firstName} {lead.lastName}</p>
                        <p className="text-xs text-muted-foreground">Ref: AL-{lead.id.slice(-8).toUpperCase()}</p>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <p>{lead.email}</p>
                        <p>{lead.phone}</p>
                        <p className="text-xs uppercase">{lead.preferredContactMethod}</p>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{lead.treatmentInterest}</td>
                      <td className="px-3 py-2 text-muted-foreground">{lead.targetArea}</td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <p>{lead.preferredDate || "-"}</p>
                        <p>{lead.preferredTime || "-"}</p>
                      </td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">
                        <p>Source: {lead.source}</p>
                        <p>Path: {lead.pagePath || "-"}</p>
                        <p>utm_source: {lead.utmSource || "-"}</p>
                        <p>utm_medium: {lead.utmMedium || "-"}</p>
                        <p>utm_campaign: {lead.utmCampaign || "-"}</p>
                      </td>
                      <td className="px-3 py-2">
                        <form action={updateStatus} className="flex items-center gap-2">
                          <input name="leadId" type="hidden" value={lead.id} />
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
                          <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted" type="submit">
                            Save
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
