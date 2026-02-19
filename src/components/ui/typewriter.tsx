"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  phrases: string[];
  className?: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
};

export function Typewriter({
  phrases,
  className,
  typingSpeedMs = 46,
  deletingSpeedMs = 30,
  pauseMs = 1650
}: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const currentPhrase = useMemo(() => phrases[phraseIndex % phrases.length] ?? "", [phrases, phraseIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const rotate = window.setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2800);
      return () => window.clearInterval(rotate);
    }

    const complete = text === currentPhrase;
    const empty = text.length === 0;

    const delay = complete && !isDeleting ? pauseMs : isDeleting ? deletingSpeedMs : typingSpeedMs;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (!complete) {
          setText(currentPhrase.slice(0, text.length + 1));
        } else {
          setIsDeleting(true);
        }
        return;
      }

      if (!empty) {
        setText((prev) => prev.slice(0, -1));
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    currentPhrase,
    deletingSpeedMs,
    isDeleting,
    pauseMs,
    phrases.length,
    reduceMotion,
    text,
    typingSpeedMs
  ]);

  if (!phrases.length) return null;

  const display = reduceMotion ? currentPhrase : text;

  return (
    <p
      aria-live="polite"
      className={cn(
        "h-[1.75rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-secondary sm:h-[1.9rem] sm:text-base",
        className
      )}
    >
      {display}
      <span
        aria-hidden="true"
        className={cn(
          "ml-1 inline-block h-[1.02em] w-[0.075em] translate-y-0.5 bg-primary/85",
          reduceMotion ? "" : "animate-caret"
        )}
      />
    </p>
  );
}
