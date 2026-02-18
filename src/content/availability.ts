export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OpeningWindow = {
  start: string;
  end: string;
};

export const availabilityConfig: {
  slotDurationMinutes: number;
  closedDays: WeekDay[];
  openingHours: Record<WeekDay, OpeningWindow[]>;
} = {
  slotDurationMinutes: 30,
  closedDays: ["sunday"],
  openingHours: {
    monday: [{ start: "09:30", end: "18:00" }],
    tuesday: [{ start: "09:30", end: "18:00" }],
    wednesday: [{ start: "09:30", end: "19:00" }],
    thursday: [{ start: "09:30", end: "19:00" }],
    friday: [{ start: "09:30", end: "18:00" }],
    saturday: [{ start: "10:00", end: "15:00" }],
    sunday: []
  }
};
