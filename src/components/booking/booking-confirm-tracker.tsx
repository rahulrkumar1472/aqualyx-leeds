"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

type BookingConfirmTrackerProps = {
  reference: string;
};

export function BookingConfirmTracker({ reference }: BookingConfirmTrackerProps) {
  useEffect(() => {
    trackEvent("booking_submit", {
      location: "book_confirm",
      status: "success",
      reference
    });
  }, [reference]);

  return null;
}
