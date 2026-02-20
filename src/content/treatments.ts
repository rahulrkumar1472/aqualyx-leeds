export const treatments = {
  aqualyx: {
    name: "Aqualyx",
    slug: "aqualyx",
    category: "Fat Dissolving Injections",
    short: "Targeted fat dissolving injections for stubborn pockets of fat.",
    areas: ["Double chin", "Lower stomach", "Love handles", "Thighs", "Arms", "Back fat"],
    suitability: [
      "Adults near goal weight with localised fat pockets",
      "Patients seeking non-surgical contouring",
      "Those who can follow aftercare guidance"
    ],
    timeline: [
      "Consultation and assessment",
      "Treatment session with area mapping",
      "Gradual change over following weeks",
      "Review and tailored follow-up"
    ]
  },
  lemonBottle: {
    name: "Lemon Bottle",
    slug: "lemon-bottle",
    category: "Fat Dissolving Injections",
    short: "A supporting fat dissolving option for selected treatment areas.",
    areas: ["Chin", "Arms", "Abdomen", "Flanks", "Thighs"],
    suitability: [
      "Adults with localised fat areas",
      "Patients wanting staged treatment plans",
      "Those suitable after consultation"
    ],
    timeline: ["Assessment", "Session", "Monitoring", "Review"]
  },
  fatFreezing: {
    name: "Fat Freezing (Cryolipolysis)",
    slug: "fat-freezing",
    category: "Non-invasive Fat Reduction",
    short: "Cooling-based fat reduction for pinchable fat areas.",
    areas: ["Abdomen", "Flanks", "Back", "Thighs", "Arms"],
    suitability: [
      "Patients with pinchable localised fat",
      "Non-surgical body contouring preference",
      "Suitable skin integrity after assessment"
    ],
    timeline: [
      "Consultation",
      "Applicator placement",
      "Post-session massage",
      "Progress review"
    ]
  },
  cavitation: {
    name: "Ultrasound Cavitation",
    slug: "ultrasound-cavitation",
    category: "Non-invasive Fat Reduction",
    short: "Ultrasound body contouring sessions supporting reduction plans.",
    areas: ["Abdomen", "Waist", "Thighs", "Hips", "Arms"],
    suitability: [
      "Those preferring non-injection options",
      "Patients committed to package sessions",
      "Suitable candidates after consultation"
    ],
    timeline: [
      "Assessment",
      "Session series",
      "Lifestyle support",
      "Review checkpoints"
    ]
  }
} as const;

export const treatmentNavigation = [
  {
    section: "Fat Dissolving Injections",
    href: "/treatments/fat-dissolving-injections",
    items: [
      { title: "Aqualyx", href: "/treatments/aqualyx" },
      { title: "Lemon Bottle", href: "/treatments/lemon-bottle" }
    ]
  },
  {
    section: "Non-invasive Fat Reduction",
    href: "/treatments/non-invasive-fat-reduction",
    items: [
      { title: "Fat Freezing (Cryolipolysis)", href: "/treatments/fat-freezing" },
      { title: "Ultrasound Cavitation", href: "/treatments/ultrasound-cavitation" }
    ]
  }
] as const;
