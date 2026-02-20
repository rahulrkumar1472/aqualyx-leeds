import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatsBarItem = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

type StatsBarProps = {
  items: StatsBarItem[];
  className?: string;
};

export function StatsBar({ items, className }: StatsBarProps) {
  return (
    <div className={cn("grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((item) => (
        <div
          className="glass-surface rounded-2xl border border-border/70 px-4 py-3 shadow-soft"
          key={`${item.label}-${item.value}`}
        >
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary/85">
            {item.icon ? <item.icon className="h-3.5 w-3.5" /> : null}
            {item.label}
          </p>
          <p className="mt-1.5 text-sm font-semibold text-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
