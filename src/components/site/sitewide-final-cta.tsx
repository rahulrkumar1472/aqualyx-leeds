"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { FinalCTASection } from "@/components/site/final-cta";

export function SitewideFinalCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/book")) return null;

  return (
    <section className="reveal-section py-12 sm:py-14 lg:py-16">
      <Container>
        <FinalCTASection
          description="Consultation-led guidance, transparent pricing, and quick WhatsApp support from the Leeds team."
          title="Ready to secure your consultation?"
        />
      </Container>
    </section>
  );
}
