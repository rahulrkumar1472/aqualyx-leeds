import { redirect } from "next/navigation";

export default function LegacyAdminLeadsRoute() {
  redirect("/admin?tab=leads");
}
