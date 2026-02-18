import { CTACluster } from "@/components/layout/CTACluster";

type CtaStripProps = {
  title?: string;
  description?: string;
};

export function CtaStrip({
  title = "Book your free consultation with Aqualyx Leeds",
  description = "Get a treatment plan, pricing estimate, and suitability review in one appointment."
}: CtaStripProps) {
  return (
    <section className="rounded-[2rem] border border-secondary/20 bg-gradient-to-r from-secondary to-secondary/90 p-6 text-secondary-foreground shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-secondary-foreground/85">{description}</p>
        </div>
        <CTACluster compact />
      </div>
    </section>
  );
}
