import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureGridProps = {
  children: ReactNode;
  className?: string;
};

export function FeatureGrid({ children, className }: FeatureGridProps) {
  return <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>{children}</div>;
}
