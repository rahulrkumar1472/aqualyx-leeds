import { CTACluster } from "@/components/layout/CTACluster";

type CtaActionsProps = {
  includeCall?: boolean;
  compact?: boolean;
  bookHref?: string;
};

export function CtaActions({ includeCall = true, compact = false, bookHref = "/book" }: CtaActionsProps) {
  return <CTACluster bookHref={bookHref} compact={compact} includeCall={includeCall} />;
}
