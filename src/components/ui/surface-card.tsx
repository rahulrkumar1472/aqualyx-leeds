import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "soft" | "solid" | "glass";
};

const variants: Record<NonNullable<SurfaceCardProps["variant"]>, string> = {
  soft: "rounded-[1.6rem] border border-border/70 bg-card/92 shadow-soft",
  solid: "rounded-[1.6rem] border border-primary/20 bg-background shadow-soft",
  glass: "glass-surface rounded-[1.7rem]"
};

export function SurfaceCard({ children, className, variant = "soft" }: SurfaceCardProps) {
  return <div className={cn(variants[variant], className)}>{children}</div>;
}
