"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TreatmentsError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[treatments-error]", error?.message || "Unknown treatments error");
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-start justify-center gap-4 px-4 py-12 sm:px-6">
      <h1>We couldn&apos;t load treatment details</h1>
      <p className="text-sm text-muted-foreground">Retry now or contact the clinic team on WhatsApp.</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset} type="button">Retry</Button>
        <Button asChild variant="outline"><Link href="/treatments/aqualyx">Open Aqualyx page</Link></Button>
      </div>
    </main>
  );
}
