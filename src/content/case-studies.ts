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
  },
  {
    title: "Upper arms contour example",
    concern: "Client wanted support for localised upper-arm fullness and improved clothing confidence.",
    plan: [
      "Suitability screening and arm-area assessment",
      "Conservative dose planning with staged review",
      "Aftercare checklist and follow-up booking"
    ],
    sessions: "Planned over multiple review windows as clinically appropriate.",
    outcomeNotes: [
      "Progress was monitored gradually rather than judged in the first days.",
      "Timeline remained individual and dependent on baseline profile."
    ],
    nextSteps: "Consultation confirms whether an arm-focused route is suitable for you.",
    illustrative: true,
    image: "/images/results/result-4.jpg"
  },
  {
    title: "Thigh-area planning example",
    concern: "Client requested non-surgical support for localised thigh contour goals.",
    plan: [
      "Area mapping and expectation setting",
      "Staged treatment discussion with review checkpoints",
      "Aftercare adherence support"
    ],
    sessions: "Session spacing discussed after first response and follow-up review.",
    outcomeNotes: [
      "Changes were assessed over weeks, not days.",
      "Final recommendations depended on response and safety profile."
    ],
    nextSteps: "Book for a tailored plan if you are considering thigh-area treatment.",
    illustrative: true,
    image: "/images/results/result-5.jpg"
  },
  {
    title: "Back-fat contour pathway",
    concern: "Client wanted to address localised back-area fullness with a staged clinical plan.",
    plan: [
      "Consultation and suitability screening",
      "Area-specific dosing estimate and timeline guidance",
      "Follow-up progress review and next-step decision"
    ],
    sessions: "Usually discussed as staged care based on review findings.",
    outcomeNotes: [
      "Gradual response profile with realistic expectation setting.",
      "No guaranteed outcomes; review used to refine progression."
    ],
    nextSteps: "Speak to the clinic team on WhatsApp before booking if you have questions.",
    illustrative: true,
    image: "/images/results/result-6.webp"
  },
  {
    title: "Combination planning example",
    concern: "Client needed guidance comparing Aqualyx with non-invasive alternatives before choosing.",
    plan: [
      "Comparison discussion during consultation",
      "Route selection based on suitability and goals",
      "Structured aftercare and reassessment"
    ],
    sessions: "Session structure depends on selected route and review outcomes.",
    outcomeNotes: [
      "Clarity improved once options were explained side-by-side.",
      "Chosen plan focused on realistic, staged progression."
    ],
    nextSteps: "Use consultation to compare options and decide the safest route.",
    illustrative: true,
    image: "/images/results/result-7.webp"
  },
  {
    title: "Timeline-focused review example",
    concern: "Client wanted clearer expectation management on when changes may become noticeable.",
    plan: [
      "Baseline assessment and timeframe discussion",
      "Treatment planning with staged review checkpoints",
      "Documented progress and decision points"
    ],
    sessions: "Planned around response windows and practical scheduling.",
    outcomeNotes: [
      "Early-stage interpretation was avoided to reduce unrealistic expectations.",
      "Outcome notes focused on trend over time rather than single snapshots."
    ],
    nextSteps: "Book if you want a realistic timeline mapped before committing.",
    illustrative: true,
    image: "/images/results/result-8.webp"
  },
  {
    title: "Aftercare-led pathway example",
    concern: "Client wanted stronger support around aftercare and symptom monitoring.",
    plan: [
      "Aftercare education before treatment decision",
      "Structured contact points for reassurance",
      "Scheduled review and progression update"
    ],
    sessions: "Session and review cadence tailored to comfort and suitability.",
    outcomeNotes: [
      "Clear aftercare communication improved confidence and adherence.",
      "Progress discussion remained balanced and non-promissory."
    ],
    nextSteps: "Contact us if you need extra aftercare clarity before booking.",
    illustrative: true,
    image: "/images/results/result-9.webp"
  }
];
