export type CaseStudyItem = {
  title: string;
  concern: string;
  plan: string[];
  sessions: string;
  outcomeNotes: string[];
  nextSteps: string;
  illustrative: boolean;
  image: string;
};

export const caseStudies: CaseStudyItem[] = [
  {
    title: "Double chin contour pathway",
    concern: "Client wanted clearer jawline definition with a staged, consultation-led approach.",
    plan: [
      "Suitability screening and area mapping",
      "Per-area dosage planning and aftercare guidance",
      "Review checkpoint to assess progression"
    ],
    sessions: "Typically discussed as staged sessions over several weeks.",
    outcomeNotes: [
      "Gradual contour changes may become clearer after review windows.",
      "Treatment response varies and depends on baseline profile and aftercare."
    ],
    nextSteps: "Book consultation for a personalised suitability and dosage discussion.",
    illustrative: true,
    image: "/images/results/result-1.jpg"
  },
  {
    title: "Lower stomach planning example",
    concern: "Client wanted support for localised lower abdominal fat.",
    plan: [
      "Consultation-led suitability and expectation setting",
      "Dose planning with timeline and review points",
      "Aftercare support and staged follow-up"
    ],
    sessions: "Session count and spacing confirmed in consultation.",
    outcomeNotes: [
      "Visible progress may be gradual across review intervals.",
      "Final outcomes vary by area profile and plan adherence."
    ],
    nextSteps: "Message us on WhatsApp for quick pre-booking guidance.",
    illustrative: true,
    image: "/images/results/result-2.jpg"
  },
  {
    title: "Love handles treatment pathway",
    concern: "Client sought flank contour support with clear pricing visibility.",
    plan: [
      "Clinical screening and area-specific planning",
      "Transparent per-ml estimate before treatment",
      "Follow-up review with timeline adjustments if needed"
    ],
    sessions: "Usually planned as a staged pathway based on suitability.",
    outcomeNotes: [
      "Response windows differ between clients.",
      "Consultation confirms realistic goals and treatment limits."
    ],
    nextSteps: "Book a free consultation to confirm suitability and quote range.",
    illustrative: true,
    image: "/images/results/result-3.jpg"
  }
];
