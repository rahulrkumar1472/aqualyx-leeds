import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "muted" | "gradient" | "bordered";
  as?: "section" | "div";
};

const variantClasses: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "",
  muted: "rounded-[2rem] border border-border/70 bg-[hsl(var(--muted)/0.48)] shadow-soft",
  gradient:
    "rounded-[2rem] border border-primary/20 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.17),transparent_58%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))] shadow-soft",
  bordered: "border-t border-border/65 pt-8 sm:pt-10"
};

export function Section({
  children,
  className,
  containerClassName,
  variant = "default",
  as = "section"
}: SectionProps) {
  const Tag = as;

  return (
    <Tag className={cn("py-12 sm:py-16 lg:py-20", className)}>
      <Container className={cn(variantClasses[variant], containerClassName)}>{children}</Container>
    </Tag>
  );
}
