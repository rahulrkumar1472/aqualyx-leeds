import { Star } from "lucide-react";
import { SurfaceCard } from "@/components/ui/surface-card";

type TestimonialCardProps = {
  quote: string;
  name: string;
  city?: string;
};

export function TestimonialCard({ quote, name, city = "Leeds" }: TestimonialCardProps) {
  return (
    <SurfaceCard className="h-full p-5" variant="glass">
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star className="h-4 w-4 fill-primary text-primary" key={`${name}-star-${i}`} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{quote}</p>
      <p className="mt-4 text-sm font-semibold text-foreground">
        {name} <span className="font-normal text-muted-foreground">• {city}</span>
      </p>
    </SurfaceCard>
  );
}
