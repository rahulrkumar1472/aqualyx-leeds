import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type InlineNoticeProps = {
  children: ReactNode;
  className?: string;
};

export function InlineNotice({ children, className }: InlineNoticeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-start gap-2 rounded-xl border border-border/70 bg-muted/45 px-3 py-2 text-xs text-muted-foreground",
        className
      )}
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-primary" />
      <span>{children}</span>
    </p>
  );
}

