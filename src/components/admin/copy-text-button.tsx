"use client";

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyTextButtonProps = {
  text: string;
};

export function CopyTextButton({ text }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button onClick={onCopy} size="sm" type="button" variant="outline">
      {copied ? (
        <span className="inline-flex items-center gap-1">
          <CopyCheck className="h-3.5 w-3.5" />
          Copied
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <Copy className="h-3.5 w-3.5" />
          Copy
        </span>
      )}
    </Button>
  );
}
