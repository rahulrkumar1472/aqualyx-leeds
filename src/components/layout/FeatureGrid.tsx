import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FeatureGridItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FeatureGridProps = {
  items: FeatureGridItem[];
  className?: string;
};

export function FeatureGrid({ items, className }: FeatureGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map((item) => (
        <Card className="border-border/70 shadow-soft" key={item.title}>
          <CardContent className="space-y-3 p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <item.icon className="h-4.5 w-4.5 text-primary" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
