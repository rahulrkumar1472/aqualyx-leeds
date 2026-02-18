import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ProofRowProps = {
  items: string[];
  className?: string;
};

export function ProofRow({ items, className }: ProofRowProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-border/75 bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground"
          key={item}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          {item}
        </span>
      ))}
    </div>
  );
}

