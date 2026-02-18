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
          "relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/25 via-accent/40 to-muted",
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_55%)]" />
        <div className="relative flex h-full min-h-[220px] items-end p-4">
          <p className="text-sm font-medium text-secondary/90">{placeholderLabel ?? alt}</p>
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
