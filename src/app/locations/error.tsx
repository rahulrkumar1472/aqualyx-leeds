"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LocationsError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("[locations-error]", error?.message || "Unknown locations error");
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-start justify-center gap-4 px-4 py-12 sm:px-6">
      <h1>Location page temporarily unavailable</h1>
      <p className="text-sm text-muted-foreground">Retry now or open the contact page for direct support.</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset} type="button">Retry</Button>
        <Button asChild variant="outline"><Link href="/contact">Contact</Link></Button>
      </div>
    </main>
  );
}
