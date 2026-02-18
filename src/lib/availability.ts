import { addDays, format, isBefore, setHours, setMinutes, startOfDay } from "date-fns";
import { availabilityConfig, type WeekDay } from "@/content/availability";

const dayMap: WeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

function parseTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

export function isClosedDate(date: Date) {
  const weekDay = dayMap[date.getDay()];
  return availabilityConfig.closedDays.includes(weekDay);
}

export function nextBookableDates(daysAhead = 45) {
  const today = startOfDay(new Date());

  return Array.from({ length: daysAhead })
    .map((_, index) => addDays(today, index))
    .filter((date) => !isClosedDate(date));
}

export function slotsForDate(date: Date) {
  const weekDay = dayMap[date.getDay()];
  const windows = availabilityConfig.openingHours[weekDay] ?? [];

  if (!windows.length) return [];

  const slots: string[] = [];

  for (const window of windows) {
    const start = parseTime(window.start);
    const end = parseTime(window.end);

    let current = setMinutes(setHours(new Date(date), start.hour), start.minute);
    const cutoff = setMinutes(setHours(new Date(date), end.hour), end.minute);

    while (isBefore(current, cutoff)) {
      const slotLabel = format(current, "HH:mm");
      const now = new Date();
      const isPastToday = format(now, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && isBefore(current, now);

      if (!isPastToday) {
        slots.push(slotLabel);
      }

      current = new Date(current.getTime() + availabilityConfig.slotDurationMinutes * 60000);
    }
  }

  return slots;
}
