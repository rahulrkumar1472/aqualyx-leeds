"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

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
        <Button asChild>
          <Link href="/book">Book Free Consultation</Link>
        </Button>
        <Button asChild variant="ctaSecondary">
          <a href={siteConfig.whatsappUrl} rel="noopener noreferrer" target="_blank">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </span>
          </a>
        </Button>
        <Button asChild variant="ctaTertiary">
          <a href={siteConfig.phoneHref}>
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4" /> Call {siteConfig.phoneDisplay}
            </span>
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Homepage</Link>
        </Button>
      </div>
    </main>
  );
}
