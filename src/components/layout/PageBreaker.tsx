import { cn } from "@/lib/utils";

type PageBreakerProps = {
  className?: string;
  subtle?: boolean;
};

export function PageBreaker({ className, subtle = false }: PageBreakerProps) {
  return (
    <div className={cn("py-2 sm:py-3", className)}>
      <div
        className={cn(
          "mx-auto h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-primary/35 to-transparent",
          subtle ? "via-border/80" : ""
        )}
      />
    </div>
  );
}
