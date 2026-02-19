import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatTile = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
};

type StatTilesProps = {
  items: StatTile[];
};

export function StatTiles({ items }: StatTilesProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card className="border-primary/15 bg-card/90" key={item.label}>
          <CardContent className="space-y-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-semibold text-foreground">{item.value}</p>
            {item.helper ? <p className="text-xs text-muted-foreground">{item.helper}</p> : null}
            {item.icon ? <div className="pt-1">{item.icon}</div> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
