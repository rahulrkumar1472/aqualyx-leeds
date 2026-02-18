import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtext?: string;
  eyebrow?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({
  title,
  subtext,
  eyebrow,
  align = "left",
  actions,
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between",
        align === "center" ? "items-center text-center md:flex-col md:items-center" : "",
        className
      )}
    >
      <div className={cn("space-y-2.5", align === "center" ? "mx-auto" : "")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="max-w-4xl text-balance text-[2.05rem] font-semibold leading-[1.1] text-foreground sm:text-[3rem]">
          {title}
        </h2>
        {subtext ? <p className="lead">{subtext}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
