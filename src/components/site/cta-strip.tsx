import { FinalCTASection } from "@/components/site/final-cta";

type CtaStripProps = {
  title?: string;
  description?: string;
};

export function CtaStrip({
  title = "Book your free consultation with Aqualyx Leeds",
  description = "Get a treatment plan, pricing estimate, and suitability review in one appointment."
}: CtaStripProps) {
  return <FinalCTASection description={description} title={title} />;
}
