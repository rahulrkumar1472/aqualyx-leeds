export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoLandingConfig = {
  path: string;
  title: string;
  description: string;
  h1: string;
  benefitLine: string;
  intro: string;
  illustration: "aqualyx" | "lemonBottle" | "fatFreezing" | "cavitation" | "clinic" | "generic";
  whoFor: string[];
  whoNotFor: string[];
  sessions: string[];
  timeline: { stage: string; detail: string }[];
  expect: string[];
  aftercare: string[];
  risks: string[];
  faqs: SeoFaq[];
  relatedLinks: { href: string; label: string; description: string }[];
};

export const areaCoverage = [
  "Leeds",
  "Holbeck",
  "Hunslet",
  "Leeds City Centre",
  "Headingley",
  "Chapel Allerton",
  "Roundhay",
  "Pudsey",
  "West Yorkshire"
] as const;

const baseFaqs: SeoFaq[] = [
  {
    question: "How much does treatment cost in Leeds?",
    answer: "Prices start from £99. Final price depends on area and plan confirmed in consultation."
  },
  {
    question: "Is consultation required?",
    answer: "Yes. Consultation is required to assess suitability, explain options, and confirm treatment planning."
  },
  {
    question: "How many sessions are typically discussed?",
    answer:
      "Session plans vary by area and baseline profile. A staged plan is usually discussed in consultation."
  },
  {
    question: "When do people usually notice changes?",
    answer:
      "Changes are usually gradual over several weeks. Individual response differs, so timelines are reviewed case by case."
  },
  {
    question: "Can results be guaranteed?",
    answer: "No. Outcomes vary by person, target area, and adherence to aftercare guidance."
  },
  {
    question: "Is this treatment for weight loss?",
    answer:
      "No. These pathways are generally used for localised contouring goals rather than overall weight reduction."
  },
  {
    question: "Can I contact the clinic on WhatsApp first?",
    answer:
      "Yes. WhatsApp is available for quick questions before you submit your booking request."
  },
  {
    question: "Where is the clinic?",
    answer: "Aqualyx Leeds is based on Tunstall Road, Leeds, LS11 5HL."
  }
];

export const seoLandings: SeoLandingConfig[] = [
  {
    path: "/aqualyx-leeds",
    title: "Aqualyx Leeds",
    description:
      "Primary Aqualyx Leeds hub page covering treatment suitability, sessions, timeline, aftercare, pricing from £99 and booking.",
    h1: "Aqualyx Leeds: Fat Dissolving Injections in Leeds",
    benefitLine: "Consultation-led treatment plans • Transparent pricing from £99 • Free consultation",
    intro:
      "Aqualyx Leeds provides a premium, consultation-first pathway for localised fat dissolving treatment in Leeds.",
    illustration: "aqualyx",
    whoFor: [
      "Adults close to a stable weight with localised stubborn fat pockets",
      "People seeking non-surgical contouring options with realistic expectations",
      "Clients ready to follow aftercare and review guidance"
    ],
    whoNotFor: [
      "Anyone looking for guaranteed or instant body transformation",
      "People seeking broad medical weight-loss treatment rather than local contouring",
      "Clients who have contraindications identified in consultation"
    ],
    sessions: [
      "Consultation and suitability review",
      "Area planning and treatment schedule",
      "Follow-up review and staged progression where advised"
    ],
    timeline: [
      { stage: "Week 0", detail: "Consultation, suitability checks, and tailored plan confirmation." },
      { stage: "Week 1", detail: "Early response monitoring and aftercare focus." },
      { stage: "Weeks 2-6", detail: "Gradual visible contour change may develop." },
      { stage: "Review", detail: "Progress review and next-step recommendation." }
    ],
    expect: [
      "A structured consultation before treatment decisions",
      "Balanced discussion of benefits and limits",
      "Realistic timeline guidance with no guarantee claims"
    ],
    aftercare: [
      "Follow clinic aftercare instructions exactly",
      "Report persistent or unusual symptoms promptly",
      "Attend scheduled review to optimise planning"
    ],
    risks: [
      "Side effects and response can vary by person",
      "Treatment may be deferred if suitability criteria are not met",
      "No treatment pathway can promise identical outcomes"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/fat-dissolving-injections-leeds",
        label: "Fat dissolving injections Leeds",
        description: "Detailed treatment overview and suitability notes."
      },
      {
        href: "/aqualyx-aftercare",
        label: "Aqualyx aftercare",
        description: "What to expect after treatment and follow-up."
      }
    ]
  },
  {
    path: "/fat-dissolving-injections-leeds",
    title: "Fat Dissolving Injections Leeds",
    description:
      "Complete guide to fat dissolving injections in Leeds, including suitability, side effects, aftercare, and pricing from £99.",
    h1: "Fat Dissolving Injections in Leeds",
    benefitLine: "Targeted contour pathways • Consultation required • Pricing from £99",
    intro:
      "This page explains how fat dissolving injections are typically planned at Aqualyx Leeds.",
    illustration: "aqualyx",
    whoFor: [
      "People with localised pockets in areas such as chin, stomach, or flanks",
      "Clients who prefer consultation-led body contour planning",
      "Adults prepared for staged session planning where needed"
    ],
    whoNotFor: [
      "People expecting full-body weight-loss treatment",
      "Anyone unable to attend follow-up review where advised",
      "Clients with contraindications identified in consultation"
    ],
    sessions: [
      "Consultation-first planning session",
      "Treatment session(s) by area",
      "Follow-up review and adaptation if required"
    ],
    timeline: [
      { stage: "Assessment", detail: "Suitability and area-specific plan agreed." },
      { stage: "Early period", detail: "Recovery and aftercare guidance followed." },
      { stage: "Mid-term", detail: "Gradual contour development over weeks." },
      { stage: "Review", detail: "Outcome reviewed and further treatment discussed if needed." }
    ],
    expect: [
      "Area mapping and realistic planning discussion",
      "Clear explanation of variable timelines",
      "Transparent cost guidance before decisions"
    ],
    aftercare: [
      "Use clinic guidance as your primary reference",
      "Follow communication plan for follow-up",
      "Raise concerns early rather than waiting"
    ],
    risks: [
      "Individual response and side effects vary",
      "Multiple sessions may be advised for some areas",
      "Treatment may not be suitable for all clients"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-side-effects",
        label: "Aqualyx side effects",
        description: "High-level safety notes and escalation guidance."
      },
      {
        href: "/aqualyx-vs-fat-freezing",
        label: "Aqualyx vs fat freezing",
        description: "Compare treatment pathways by area and goal."
      }
    ]
  },
  {
    path: "/aqualyx-double-chin-leeds",
    title: "Aqualyx Double Chin Leeds",
    description:
      "Aqualyx double chin treatment in Leeds with consultation-led planning, realistic timeline guidance, and pricing from £99.",
    h1: "Aqualyx for Double Chin in Leeds",
    benefitLine: "Submental contour planning • Free consultation • Transparent pricing from £99",
    intro:
      "Double-chin treatment is one of the most requested areas at Aqualyx Leeds.",
    illustration: "aqualyx",
    whoFor: [
      "Clients with localised submental fullness suitable for contour planning",
      "People seeking a non-surgical jawline improvement pathway",
      "Those comfortable with staged treatment where needed"
    ],
    whoNotFor: [
      "People expecting immediate sharp jawline change from one session",
      "Clients with contraindications identified at assessment",
      "Anyone seeking broad weight-loss treatment instead of local contouring"
    ],
    sessions: [
      "Consultation and baseline discussion",
      "Area-focused session planning",
      "Follow-up and staged recommendations"
    ],
    timeline: [
      { stage: "Week 0", detail: "Submental suitability and planning." },
      { stage: "Week 1", detail: "Early aftercare period." },
      { stage: "Weeks 2-6", detail: "Gradual contour response may become visible." },
      { stage: "Review", detail: "Progress evaluation and further planning if advised." }
    ],
    expect: [
      "Realistic outcome discussion for profile and jawline goals",
      "Area-specific dosage planning",
      "Structured follow-up communication"
    ],
    aftercare: [
      "Follow provided instructions for the submental area",
      "Attend review for reassessment",
      "Contact clinic if symptoms are concerning"
    ],
    risks: [
      "Response differs between individuals",
      "A staged plan may be needed for best progression",
      "No guaranteed timeline can be offered"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-stomach-leeds",
        label: "Aqualyx for stomach",
        description: "See abdominal planning guidance."
      },
      {
        href: "/aqualyx-aftercare",
        label: "Aqualyx aftercare",
        description: "Recovery and follow-up expectations."
      }
    ]
  },
  {
    path: "/aqualyx-stomach-leeds",
    title: "Aqualyx Stomach Leeds",
    description:
      "Aqualyx stomach-area planning in Leeds with realistic session expectations, timeline guidance, and consultation-first safety.",
    h1: "Aqualyx for Stomach Fat in Leeds",
    benefitLine: "Area-led planning • Structured sessions • Pricing from £99",
    intro:
      "Stomach-area contour planning is generally approached with staged, area-specific treatment logic.",
    illustration: "aqualyx",
    whoFor: [
      "Clients with localised abdominal pockets near stable weight",
      "People seeking contour support rather than weight-loss treatment",
      "Clients able to follow follow-up recommendations"
    ],
    whoNotFor: [
      "Anyone expecting total body change from one treatment cycle",
      "People with contraindications identified during assessment",
      "Clients unable to commit to review where required"
    ],
    sessions: [
      "Consultation and abdominal area mapping",
      "Staged treatment delivery where advised",
      "Review-led progression planning"
    ],
    timeline: [
      { stage: "Planning", detail: "Area suitability and staged approach." },
      { stage: "Early response", detail: "Aftercare and monitoring period." },
      { stage: "Weeks 2-8", detail: "Gradual contour changes may become clearer." },
      { stage: "Review", detail: "Outcome assessment and next steps." }
    ],
    expect: [
      "Measured, realistic plan discussion",
      "Transparent dosage and session rationale",
      "Clinical suitability review before decisions"
    ],
    aftercare: [
      "Follow clinic advice specific to abdomen area",
      "Keep communication open during recovery",
      "Attend review to refine plan if needed"
    ],
    risks: [
      "No one-size-fits-all response timeline",
      "Multiple sessions may be discussed",
      "Not all abdominal presentations are suitable"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-love-handles-leeds",
        label: "Aqualyx for love handles",
        description: "Flank contour planning guidance."
      },
      {
        href: "/aqualyx-vs-fat-freezing",
        label: "Aqualyx vs fat freezing",
        description: "Compare options for stubborn areas."
      }
    ]
  },
  {
    path: "/aqualyx-love-handles-leeds",
    title: "Aqualyx Love Handles Leeds",
    description:
      "Aqualyx love-handles treatment planning in Leeds with consultation-led suitability checks and staged timeline guidance.",
    h1: "Aqualyx for Love Handles in Leeds",
    benefitLine: "Targeted flank contouring • Consultation required • Pricing from £99",
    intro:
      "Love-handle treatment is often planned as a staged process based on baseline contour and goals.",
    illustration: "aqualyx",
    whoFor: [
      "Clients with localised flank fullness suitable for treatment planning",
      "People seeking non-surgical contour pathways",
      "Those who can follow aftercare and review recommendations"
    ],
    whoNotFor: [
      "Clients expecting guaranteed rapid outcomes",
      "People with contraindications requiring alternative advice",
      "Those seeking broad medical weight management"
    ],
    sessions: [
      "Consultation and flank mapping",
      "Treatment plan by side and contour goal",
      "Review-based refinement"
    ],
    timeline: [
      { stage: "Consult", detail: "Suitability and realistic outcome setting." },
      { stage: "Early phase", detail: "Aftercare and monitoring." },
      { stage: "Weeks 2-8", detail: "Gradual contour change may appear." },
      { stage: "Review", detail: "Decision on further progression." }
    ],
    expect: [
      "Clear area-based planning",
      "Balanced benefit and limitation discussion",
      "Transparent pricing approach"
    ],
    aftercare: [
      "Follow instructed recovery guidance",
      "Use WhatsApp or phone for concerns",
      "Attend follow-up review"
    ],
    risks: [
      "Variable response by baseline and area",
      "Potential need for additional staged sessions",
      "No uniform results timeline across clients"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-stomach-leeds",
        label: "Aqualyx for stomach",
        description: "Abdominal planning comparison."
      },
      {
        href: "/aqualyx-aftercare",
        label: "Aqualyx aftercare",
        description: "Post-treatment guidance overview."
      }
    ]
  },
  {
    path: "/aqualyx-aftercare",
    title: "Aqualyx Aftercare",
    description:
      "Aqualyx aftercare guide for Leeds clients: what to expect, recovery priorities, and when to contact the clinic.",
    h1: "Aqualyx Aftercare Guide (Leeds)",
    benefitLine: "Clear recovery guidance • Review support • Consultation-led follow-up",
    intro:
      "Aftercare is a key part of treatment quality and helps keep expectations realistic and safe.",
    illustration: "clinic",
    whoFor: [
      "Clients preparing for or recovering from treatment",
      "People who want clear recovery expectations",
      "Anyone planning follow-up and review"
    ],
    whoNotFor: [
      "People looking for medical diagnosis online",
      "Anyone with urgent symptoms needing emergency care",
      "Clients replacing clinician advice with generic internet advice"
    ],
    sessions: [
      "Aftercare briefing after treatment",
      "Check-in communication",
      "Review appointment where advised"
    ],
    timeline: [
      { stage: "Day 0-2", detail: "Initial aftercare and area monitoring." },
      { stage: "Day 3-7", detail: "Continue guidance and track response." },
      { stage: "Weeks 2-6", detail: "Gradual progression for many clients." },
      { stage: "Review", detail: "Clinician-led progress check." }
    ],
    expect: [
      "Clear advice tailored to treatment area",
      "Support channels if concerns arise",
      "Realistic pace discussion during review"
    ],
    aftercare: [
      "Follow all instructions provided by your practitioner",
      "Use clinic channels if symptoms are unusual",
      "Attend planned follow-up"
    ],
    risks: [
      "Recovery experience varies by person",
      "Unexpected symptoms should be escalated promptly",
      "No online guide replaces direct clinical assessment"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-side-effects",
        label: "Aqualyx side effects",
        description: "High-level safety guidance."
      },
      {
        href: "/aqualyx-leeds",
        label: "Aqualyx Leeds hub",
        description: "Main treatment planning overview."
      }
    ]
  },
  {
    path: "/aqualyx-side-effects",
    title: "Aqualyx Side Effects",
    description:
      "A balanced overview of Aqualyx side effects and response variability, including when to contact your clinic.",
    h1: "Aqualyx Side Effects: What Leeds Clients Should Know",
    benefitLine: "Balanced safety guidance • Consultation-first • No exaggerated claims",
    intro:
      "Understanding side effects is part of informed consent and helps set safer expectations.",
    illustration: "clinic",
    whoFor: [
      "Clients considering treatment and wanting realistic safety context",
      "Clients preparing for consultation questions",
      "People comparing treatment options responsibly"
    ],
    whoNotFor: [
      "Anyone needing urgent medical diagnosis online",
      "Clients using web content instead of direct clinical advice",
      "People expecting zero-variability outcomes"
    ],
    sessions: [
      "Safety discussion in consultation",
      "Post-treatment aftercare explanation",
      "Follow-up review of response"
    ],
    timeline: [
      { stage: "Pre-treatment", detail: "Contraindications and risks reviewed." },
      { stage: "Immediate period", detail: "Expected response discussed and monitored." },
      { stage: "Following weeks", detail: "Progress and symptom resolution reviewed." },
      { stage: "Escalation", detail: "Prompt clinic contact if concerns persist." }
    ],
    expect: [
      "Transparent discussion of potential side effects",
      "Practical escalation advice",
      "Review-led safety follow-up"
    ],
    aftercare: [
      "Follow aftercare instructions from your clinician",
      "Keep contact details available for quick support",
      "Report prolonged or concerning symptoms"
    ],
    risks: [
      "Side effects and timeline vary by individual",
      "Not every client is suitable for treatment",
      "Clinical judgement determines safe progression"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-aftercare",
        label: "Aqualyx aftercare",
        description: "Recovery steps and follow-up expectations."
      },
      {
        href: "/aqualyx-vs-lemon-bottle",
        label: "Aqualyx vs Lemon Bottle",
        description: "Comparison guide for consultation."
      }
    ]
  },
  {
    path: "/aqualyx-vs-lemon-bottle",
    title: "Aqualyx vs Lemon Bottle",
    description:
      "Aqualyx vs Lemon Bottle comparison in Leeds, with suitability, planning style, and realistic expectation guidance.",
    h1: "Aqualyx vs Lemon Bottle in Leeds",
    benefitLine: "Evidence-led comparison • Consultation required • Pricing from £99",
    intro:
      "This comparison focuses on safe decision-making rather than marketing promises.",
    illustration: "lemonBottle",
    whoFor: [
      "Clients comparing treatment pathways before booking",
      "People who want practical planning context",
      "Those who value transparent suitability checks"
    ],
    whoNotFor: [
      "Anyone expecting one product to fit all scenarios",
      "People seeking guaranteed outcomes",
      "Clients bypassing consultation"
    ],
    sessions: [
      "Consultation and suitability screening",
      "Pathway selection based on area and baseline",
      "Staged follow-up planning"
    ],
    timeline: [
      { stage: "Consultation", detail: "Compare options against goals and suitability." },
      { stage: "Planning", detail: "Choose route and define staged approach." },
      { stage: "Treatment cycle", detail: "Review response over weeks." },
      { stage: "Review", detail: "Adjust plan if needed." }
    ],
    expect: [
      "Clear explanation of differences and limitations",
      "Area-led recommendation, not guesswork",
      "Transparent pricing logic"
    ],
    aftercare: [
      "Aftercare aligns to the selected pathway",
      "Follow-up remains part of planning",
      "Escalate concerns promptly"
    ],
    risks: [
      "Neither route guarantees identical outcomes",
      "Suitability can differ by area and individual factors",
      "Treatment may be deferred where not appropriate"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-vs-fat-freezing",
        label: "Aqualyx vs Fat Freezing",
        description: "Compare injectable and non-invasive options."
      },
      {
        href: "/fat-dissolving-injections-leeds",
        label: "Fat dissolving injections Leeds",
        description: "Core treatment overview."
      }
    ]
  },
  {
    path: "/aqualyx-vs-fat-freezing",
    title: "Aqualyx vs Fat Freezing",
    description:
      "Aqualyx vs fat freezing comparison for Leeds clients with suitability, sessions, and timeline guidance.",
    h1: "Aqualyx vs Fat Freezing in Leeds",
    benefitLine: "Compare pathways safely • Consultation-led planning • Pricing from £99",
    intro:
      "Use this page to compare injectable and non-invasive pathways by goal and suitability.",
    illustration: "fatFreezing",
    whoFor: [
      "Clients deciding between injection and cooling pathways",
      "People wanting realistic comparison before booking",
      "Those who value structured follow-up"
    ],
    whoNotFor: [
      "People choosing based only on social media claims",
      "Clients expecting identical timelines for all areas",
      "Anyone avoiding consultation screening"
    ],
    sessions: [
      "Consultation and area suitability checks",
      "Pathway recommendation",
      "Progress review over treatment cycle"
    ],
    timeline: [
      { stage: "Consultation", detail: "Match modality to area and baseline." },
      { stage: "Treatment period", detail: "Follow pathway-specific schedule." },
      { stage: "Weeks after", detail: "Monitor gradual change and response." },
      { stage: "Review", detail: "Confirm next-step recommendation." }
    ],
    expect: [
      "Balanced comparison of modality differences",
      "Transparent discussion of cost and timeline",
      "Practical advice for decision-making"
    ],
    aftercare: [
      "Aftercare depends on selected modality",
      "Review attendance supports safer progression",
      "Prompt contact if concerns persist"
    ],
    risks: [
      "Both pathways have variable response by individual",
      "Not all areas are ideal for each modality",
      "No treatment can guarantee uniform outcomes"
    ],
    faqs: baseFaqs,
    relatedLinks: [
      {
        href: "/aqualyx-vs-lemon-bottle",
        label: "Aqualyx vs Lemon Bottle",
        description: "Compare injectable pathway alternatives."
      },
      {
        href: "/prices",
        label: "Prices",
        description: "Transparent pricing overview."
      }
    ]
  }
];

export function seoLandingByPath(path: string) {
  return seoLandings.find((item) => item.path === path);
}
