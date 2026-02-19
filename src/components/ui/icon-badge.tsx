import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: ReactNode;
  label: string;
  className?: string;
};

export function IconBadge({ icon, label, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "luxury-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-secondary",
        className
      )}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
        {icon}
      </span>
      {label}
    </span>
  );
}
