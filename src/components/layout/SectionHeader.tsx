import type { ReactNode } from "react";
import { SectionHeading } from "@/components/layout/SectionHeading";

type SectionHeaderProps = {
  title: string;
  subtext?: string;
  eyebrow?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export function SectionHeader(props: SectionHeaderProps) {
  return <SectionHeading {...props} />;
}
