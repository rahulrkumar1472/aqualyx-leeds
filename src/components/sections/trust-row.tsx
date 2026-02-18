import { BadgeCheck, CircleDollarSign, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";

const trustItems = [
  { label: siteConfig.trustPillars[0], icon: CircleDollarSign },
  { label: siteConfig.trustPillars[1], icon: MapPin },
  { label: siteConfig.trustPillars[2], icon: BadgeCheck }
];

export function TrustRow() {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {trustItems.map((item) => (
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm" key={item.label}>
          <item.icon className="h-4 w-4 text-primary" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
