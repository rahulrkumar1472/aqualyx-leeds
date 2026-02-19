import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { pricingConfig } from "@/content/pricing";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FatDissolvingPricingBlock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <Card className="border-border/70 shadow-soft">
        <CardHeader>
          <CardTitle>Price per ml: {pricingConfig.fatDissolving.pricePerMl}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="max-h-[330px] overflow-auto rounded-2xl border border-border/70 bg-muted/35">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-muted/85 text-xs uppercase tracking-wide backdrop-blur">
                <tr>
                  <th className="px-3 py-2">Area</th>
                  <th className="px-3 py-2">Typical ml range</th>
                </tr>
              </thead>
              <tbody>
                {pricingConfig.fatDissolving.typicalMlRangesByArea.map((entry) => (
                  <tr className="border-t border-border/60" key={entry.area}>
                    <td className="px-3 py-2">{entry.area}</td>
                    <td className="px-3 py-2">{entry.mlRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs">{pricingConfig.fatDissolving.disclaimer}. Consultation-led, clinically guided, Leeds clinic (LS11).</p>
          <details className="rounded-xl border border-border/70 bg-card/80 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-foreground">What affects cost?</summary>
            <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <p>• Area size and treatment complexity.</p>
              <p>• Estimated ml range based on consultation findings.</p>
              <p>• Whether staged sessions are recommended.</p>
            </div>
          </details>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button asChild>
              <Link href="/book">Book Free Consultation</Link>
            </Button>
            <Button asChild variant="ctaSecondary">
              <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                WhatsApp
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/70 shadow-soft">
        <CardHeader>
          <CardTitle>What&apos;s included</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Consultation and suitability check
          </p>
          <p className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Area-by-area dosage planning
          </p>
          <p className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Clear aftercare and review guidance
          </p>
          <p className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> WhatsApp support for quick questions
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs">
            <p className="font-semibold text-foreground">Quick estimate</p>
            Most chin consultations often discuss lower ml ranges than larger abdomen areas. Final quote is confirmed in
            person.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FatFreezingPricingBlock() {
  const bestValueApplicators = 6;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {pricingConfig.fatFreezingPackages.map((pkg) => (
        <Card
          className={`border-border/70 shadow-soft ${
            pkg.applicators === bestValueApplicators ? "border-primary/40 bg-primary/5" : ""
          }`}
          key={pkg.applicators}
        >
          <CardHeader>
            <CardTitle>
              {pkg.applicators} applicator{pkg.applicators > 1 ? "s" : ""} — £{pkg.priceGbp}
            </CardTitle>
            {pkg.applicators === bestValueApplicators ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Best value package</p>
            ) : null}
            <p className="text-xs text-muted-foreground">Final recommendation confirmed after consultation.</p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {pkg.inclusions.length ? (
              <ul className="space-y-1">
                {pkg.inclusions.map((inclusion) => (
                  <li className="inline-flex items-start gap-2" key={inclusion}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    {inclusion}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bundled extras.</p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button asChild className="w-full">
                <Link href="/book">Book Free Consultation</Link>
              </Button>
              <Button asChild className="w-full" variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CavitationPricingBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {pricingConfig.cavitationPackages.map((pkg, index) => (
        <Card
          className={`border-border/70 shadow-soft ${index === 1 ? "border-primary/40 bg-primary/5" : ""}`}
          key={pkg.name}
        >
          <CardHeader>
            <CardTitle>{pkg.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>{pkg.sessions} session package</p>
            <p className="text-2xl font-semibold text-foreground">£{pkg.priceGbp}</p>
            <p>{pkg.description}</p>
            <details className="rounded-xl border border-border/70 bg-card/80 p-3">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-foreground">
                What affects final plan
              </summary>
              <div className="mt-2 space-y-1 text-xs">
                <p>• Area profile and suitability findings</p>
                <p>• Session cadence and review windows</p>
                <p>• Combined pathway decisions, if appropriate</p>
              </div>
            </details>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/book">Book Free Consultation</Link>
              </Button>
              <Button asChild className="w-full" variant="ctaSecondary">
                <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
