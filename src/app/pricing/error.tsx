"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[pricing-error]", error?.message || "Unknown pricing error");
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-start justify-center gap-4 px-4 py-12 sm:px-6">
      <h1>Pricing page temporarily unavailable</h1>
      <p className="text-sm text-muted-foreground">Please retry or open WhatsApp for fast quote support.</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset} type="button">Retry</Button>
        <Button asChild variant="outline"><Link href="/book">Book Free Consultation</Link></Button>
      </div>
    </main>
  );
}
