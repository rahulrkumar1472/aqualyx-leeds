export type ServiceContent = {
  slug: string;
  name: string;
  overview: string;
  benefits: string[];
  suitability: string[];
  contraindications: string[];
  aftercare: string[];
  pricingFactors: string[];
  timelineRows: { stage: string; detail: string }[];
};

export const servicesContent: Record<string, ServiceContent> = {
  aqualyx: {
    slug: "aqualyx",
    name: "Aqualyx",
    overview:
      "Aqualyx is a consultation-led treatment pathway for localised stubborn fat pockets. It is designed for targeted contouring, not overall weight-loss care.",
    benefits: [
      "Area-focused treatment planning",
      "Transparent per-ml quote pathway",
      "Structured aftercare and review checkpoints"
    ],
    suitability: [
      "Adults close to target weight with localised fat concerns",
      "Clients looking for non-surgical contour support",
      "People able to follow aftercare and review appointments"
    ],
    contraindications: [
      "Anyone flagged as unsuitable during medical screening",
      "Clients seeking guaranteed or instant results",
      "People requiring broader medical weight-management support"
    ],
    aftercare: [
      "Follow clinician guidance and review notes",
      "Monitor the area and report unexpected symptoms",
      "Attend follow-up to assess progression"
    ],
    pricingFactors: [
      "Area size and dosage estimate",
      "Session count and spacing",
      "Clinical suitability findings"
    ],
    timelineRows: [
      { stage: "Day 0", detail: "Consultation and treatment planning context." },
      { stage: "Week 1", detail: "Aftercare is prioritised and early response monitored." },
      { stage: "Weeks 2-4", detail: "Gradual contour changes may become visible." },
      { stage: "Weeks 6-8", detail: "Review appointment confirms progress and next steps." }
    ]
  },
  lemonBottle: {
    slug: "lemon-bottle",
    name: "Lemon Bottle",
    overview:
      "Lemon Bottle is discussed as a supporting fat dissolving option where clinically suitable after consultation.",
    benefits: ["Alternative route discussion", "Consultation-led suitability checks", "Structured follow-up plan"],
    suitability: [
      "Clients suitable for injection-based contour pathways",
      "People needing area-specific planning and review"
    ],
    contraindications: [
      "Unsuitable screening outcome",
      "Expectation of guaranteed outcomes"
    ],
    aftercare: ["Follow post-care guidance", "Attend review appointments", "Contact clinic if symptoms concern you"],
    pricingFactors: ["Area profile", "Dosage estimate", "Session planning"],
    timelineRows: [
      { stage: "Consultation", detail: "Suitability and route confirmed." },
      { stage: "Early follow-up", detail: "Aftercare and response reviewed." },
      { stage: "Review window", detail: "Progress discussed and next steps set." }
    ]
  },
  fatFreezing: {
    slug: "fat-freezing",
    name: "Fat Freezing",
    overview: "Cooling-based non-invasive contour support for suitable pinchable fat areas.",
    benefits: ["Package pricing clarity", "Non-injection approach", "Session-based review structure"],
    suitability: ["Clients with suitable pinchable fat areas", "People preferring non-injection route"],
    contraindications: ["Unsuitable screening profile", "Expecting immediate guaranteed change"],
    aftercare: ["Follow post-session instructions", "Keep review appointments", "Report concerns promptly"],
    pricingFactors: ["Package tier", "Applicator count", "Review needs"],
    timelineRows: [
      { stage: "Session day", detail: "Applicator placement and post-session guidance." },
      { stage: "Weeks 2-4", detail: "Gradual contour response may begin." },
      { stage: "Weeks 6-12", detail: "Review and package progression discussion." }
    ]
  },
  cavitation: {
    slug: "ultrasound-cavitation",
    name: "Ultrasound Cavitation",
    overview: "Session-based ultrasound contour support with package-led planning.",
    benefits: ["Non-invasive route", "Package structure", "Consultation-led recommendations"],
    suitability: ["Clients seeking non-injection option", "Those able to attend staged sessions"],
    contraindications: ["Unsuitable screening outcomes", "Expecting instant guaranteed results"],
    aftercare: ["Hydration guidance", "Session consistency", "Progress review checkpoints"],
    pricingFactors: ["Package size", "Area complexity", "Session cadence"],
    timelineRows: [
      { stage: "Start", detail: "Consultation and package recommendation." },
      { stage: "Mid-plan", detail: "Progress checks and plan adjustment." },
      { stage: "Review", detail: "Outcome review and maintenance strategy." }
    ]
  }
};

export type AqualyxAreaContent = {
  slug: string;
  areaName: string;
  intro: string;
  whoFor: string[];
  whoNotFor: string[];
  mlRange: string;
  timeline: { stage: string; detail: string }[];
  faqs: { question: string; answer: string }[];
};

export const aqualyxAreaPages: AqualyxAreaContent[] = [
  {
    slug: "double-chin",
    areaName: "Double Chin",
    intro:
      "Aqualyx for the double chin is commonly discussed for localised submental fullness after suitability review.",
    whoFor: [
      "Adults with localised fullness under the chin",
      "Clients seeking non-surgical contour support"
    ],
    whoNotFor: [
      "Clients with unsuitable screening outcomes",
      "Those seeking guaranteed instant change"
    ],
    mlRange: "Typical consultation discussion: 2-6 ml range guidance",
    timeline: [
      { stage: "Consultation", detail: "Submental area mapped and suitability reviewed." },
      { stage: "Week 1", detail: "Aftercare focus and early response monitoring." },
      { stage: "Weeks 2-6", detail: "Gradual contour progression may become visible." }
    ],
    faqs: [
      {
        question: "How many sessions may be discussed?",
        answer: "Session count varies by baseline profile and is confirmed in consultation."
      },
      {
        question: "Is consultation required?",
        answer: "Yes. Suitability, dose, and expected timeline are confirmed during consultation."
      }
    ]
  },
  {
    slug: "love-handles",
    areaName: "Love Handles",
    intro:
      "Aqualyx for love handles is planned area-by-area with realistic timelines and staged review where appropriate.",
    whoFor: ["Clients with localised flank fat pockets", "People wanting contour guidance with clear pricing"],
    whoNotFor: ["Unsuitable screening profile", "Expectation of guaranteed fat-loss outcomes"],
    mlRange: "Typical consultation discussion: 6-12 ml range guidance",
    timeline: [
      { stage: "Consultation", detail: "Flank mapping and dosage estimate discussion." },
      { stage: "Weeks 2-4", detail: "Gradual treatment response may develop." },
      { stage: "Weeks 4-8", detail: "Review and staged planning if suitable." }
    ],
    faqs: [
      {
        question: "Does one session suit everyone?",
        answer: "No. Session planning depends on area profile and consultation findings."
      },
      {
        question: "Can I get exact cost online?",
        answer: "Guide pricing is available online; final quote is confirmed in person."
      }
    ]
  },
  {
    slug: "lower-stomach",
    areaName: "Lower Stomach",
    intro:
      "Aqualyx lower-stomach planning is built after suitability checks and realistic response timeline discussion.",
    whoFor: ["Clients with localised lower abdominal pockets", "Those seeking consultation-led non-surgical options"],
    whoNotFor: ["Clients needing medical weight-management pathways", "Unsuitable screening outcome"],
    mlRange: "Typical consultation discussion: 6-16 ml range guidance",
    timeline: [
      { stage: "Consultation", detail: "Lower-stomach area assessed and plan discussed." },
      { stage: "Weeks 2-4", detail: "Response monitored with aftercare adherence." },
      { stage: "Weeks 4-8", detail: "Review checkpoint and next-step planning." }
    ],
    faqs: [
      {
        question: "Is this for weight loss?",
        answer: "No. It is aimed at localised contouring, not overall weight-loss treatment."
      },
      {
        question: "Why does dosage vary?",
        answer: "Area size and baseline profile affect final dosing recommendations."
      }
    ]
  },
  {
    slug: "thighs",
    areaName: "Thighs",
    intro:
      "Aqualyx thighs planning focuses on localised contour goals with staged review and clear expectations.",
    whoFor: ["Clients with localised thigh-area concerns", "People seeking consultation-led non-surgical support"],
    whoNotFor: ["Unsuitable screening profile", "Clients expecting guaranteed fast outcomes"],
    mlRange: "Typical consultation discussion: 8-20 ml range guidance",
    timeline: [
      { stage: "Consultation", detail: "Thigh profile reviewed and suitable plan mapped." },
      { stage: "Weeks 2-6", detail: "Gradual response may develop with aftercare adherence." },
      { stage: "Weeks 6-10", detail: "Review confirms progress and next-step timing." }
    ],
    faqs: [
      {
        question: "Can both thighs be treated in one plan?",
        answer: "Plans are individualised and based on your consultation findings."
      },
      {
        question: "How quickly do changes show?",
        answer: "Response is gradual and varies by person and treatment plan."
      }
    ]
  },
  {
    slug: "arms",
    areaName: "Arms",
    intro:
      "Aqualyx for arms is discussed where localised upper arm concerns are suitable for treatment planning.",
    whoFor: ["Clients with localised upper arm pockets", "People seeking consultation-led contour support"],
    whoNotFor: ["Unsuitable screening findings", "Expectation of guaranteed fixed outcomes"],
    mlRange: "Typical consultation discussion: 4-10 ml range guidance",
    timeline: [
      { stage: "Consultation", detail: "Upper arm area reviewed with suitable treatment pathway." },
      { stage: "Weeks 2-4", detail: "Gradual response may appear with aftercare." },
      { stage: "Weeks 4-8", detail: "Review and staged plan update if needed." }
    ],
    faqs: [
      {
        question: "Are treatment plans identical for both arms?",
        answer: "Not always. Each side may be reviewed individually during planning."
      },
      {
        question: "Do results vary?",
        answer: "Yes. Individual response differs by baseline profile and adherence."
      }
    ]
  },
  {
    slug: "back-fat",
    areaName: "Back Fat",
    intro:
      "Aqualyx back-fat planning focuses on localised contour concerns with consultation-led safety checks.",
    whoFor: ["Clients with localised back-area pockets", "People wanting targeted contour guidance"],
    whoNotFor: ["Unsuitable consultation outcome", "Expectation of immediate guaranteed results"],
    mlRange: "Typical consultation discussion: 8-20 ml range guidance",
    timeline: [
      { stage: "Consultation", detail: "Area assessment and staged plan discussion." },
      { stage: "Weeks 2-6", detail: "Gradual response may be monitored over review windows." },
      { stage: "Weeks 6-10", detail: "Review and adjustment if clinically appropriate." }
    ],
    faqs: [
      {
        question: "Is staging common for this area?",
        answer: "Staging may be recommended depending on area profile and consultation findings."
      },
      {
        question: "Can I combine with other treatments?",
        answer: "Combined pathways may be discussed only when clinically suitable."
      }
    ]
  }
];
