import type { ReactNode } from "react";
import { Typewriter } from "@/components/ui/typewriter";
import { CTAActions } from "@/components/site/cta-actions";
import { ProofRow } from "@/components/layout/ProofRow";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

type HeroShellProps = {
  eyebrow?: string;
  title: string;
  subline: string;
  typewriterPhrases: string[];
  priceTeaser?: string;
  visual?: ReactNode;
  ctaCluster?: ReactNode;
  trustPills?: string[];
  footnote?: string;
  className?: string;
};

export function HeroShell({
  eyebrow = "Aqualyx Leeds",
  title,
  subline,
  typewriterPhrases,
  priceTeaser,
  visual,
  ctaCluster,
  trustPills = ["Leeds clinic (LS11)", "Transparent pricing", "Consultation-led", "WhatsApp replies"],
  footnote,
  className
}: HeroShellProps) {
  return (
    <Section
      className={cn("pt-10 sm:pt-14", className)}
      containerClassName="hero-shell rounded-[2rem] border border-primary/20 bg-card/88 p-6 shadow-soft sm:p-10"
      variant="gradient"
    >
      <div className="relative z-[1] grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="max-w-4xl text-balance">{title}</h1>
          <p className="lead text-[1.05rem]">{subline}</p>
          {priceTeaser ? <p className="text-sm font-semibold text-secondary">{priceTeaser}</p> : null}
          <div className="typewriter-pill">
            <Typewriter phrases={typewriterPhrases} />
          </div>
          {ctaCluster ?? <CTAActions trackingLocation="hero_shell" />}
          <ProofRow items={trustPills} />
          {footnote ? <p className="text-xs text-muted-foreground">{footnote}</p> : null}
        </div>
        {visual ? <div className="relative">{visual}</div> : null}
      </div>
    </Section>
  );
}
