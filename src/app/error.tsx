"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Minimal runtime diagnostics without PII.
    console.error("[route-error]", error?.message || "Unknown route error");
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-4 py-16 sm:px-6">
      <p className="eyebrow">Something went wrong</p>
      <h1>We couldn&apos;t load this page right now</h1>
      <p className="text-sm text-muted-foreground">
        Please retry. If the issue continues, contact Aqualyx Leeds on WhatsApp or phone for immediate support.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset} type="button">
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go to homepage</Link>
        </Button>
      </div>
    </main>
  );
}
