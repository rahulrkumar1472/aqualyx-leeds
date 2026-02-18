"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

type BookingConfirmTrackerProps = {
  reference: string;
};

export function BookingConfirmTracker({ reference }: BookingConfirmTrackerProps) {
  useEffect(() => {
    trackEvent("lead_submit_success", {
      location: "book_confirm",
      reference
    });
  }, [reference]);

  return null;
}

