"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  placeholderLabel?: string;
};

export function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  width = 1200,
  height = 800,
  fill = false,
  priority = false,
  sizes,
  placeholderLabel
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  const showPlaceholder = useMemo(() => !src || failed, [src, failed]);
  const safeSrc = src ?? "";

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.5rem] border border-border/75 bg-gradient-to-br from-primary/18 via-accent/55 to-background shadow-soft",
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.6),transparent_50%)]" />
        <div className="relative flex h-full min-h-[220px] items-center justify-center p-6">
          <svg aria-hidden className="h-full max-h-[220px] w-full max-w-[320px]" viewBox="0 0 320 220">
            <defs>
              <linearGradient id="smart-image-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.75)" />
                <stop offset="100%" stopColor="hsl(var(--secondary) / 0.85)" />
              </linearGradient>
            </defs>
            <rect fill="hsl(var(--background) / 0.75)" height="220" rx="28" width="320" />
            <path
              d="M50 168C82 138 124 138 156 168C188 198 230 198 270 164"
              fill="none"
              stroke="url(#smart-image-gradient)"
              strokeLinecap="round"
              strokeWidth="10"
            />
            <path
              d="M50 122C82 92 124 92 156 122C188 152 230 152 270 118"
              fill="none"
              stroke="hsl(var(--secondary) / 0.4)"
              strokeLinecap="round"
              strokeWidth="10"
            />
            <circle cx="160" cy="82" fill="hsl(var(--background))" r="26" stroke="url(#smart-image-gradient)" strokeWidth="8" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border/70 bg-background/80 px-3 py-2">
          <p className="text-xs font-medium text-secondary/90">{placeholderLabel ?? alt}</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border", className)}>
        <Image
          alt={alt}
          className={cn("object-cover", imageClassName)}
          fill
          onError={() => setFailed(true)}
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          src={safeSrc}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border", className)}>
      <Image
        alt={alt}
        className={cn("h-full w-full object-cover", imageClassName)}
        height={height}
        onError={() => setFailed(true)}
        priority={priority}
        sizes={sizes ?? "100vw"}
        src={safeSrc}
        width={width}
      />
    </div>
  );
}
