export type FatFreezingPackage = {
  applicators: number;
  priceGbp: number;
  inclusions: string[];
};

export const pricingConfig = {
  currency: "GBP",
  fatFreezingPackages: [
    {
      applicators: 1,
      priceGbp: 49,
      inclusions: []
    },
    {
      applicators: 2,
      priceGbp: 99,
      inclusions: ["FREE Radiofrequency Eye Lift", "FREE Supersonic Chin Reduction"]
    },
    {
      applicators: 4,
      priceGbp: 149,
      inclusions: ["FREE Radiofrequency Eye Lift", "FREE Supersonic Chin Reduction"]
    },
    {
      applicators: 6,
      priceGbp: 199,
      inclusions: [
        "FREE Radiofrequency Eye Lift",
        "FREE Supersonic Chin Reduction",
        "FREE Supersonic Body Fat Melting"
      ]
    },
    {
      applicators: 8,
      priceGbp: 249,
      inclusions: [
        "FREE Radiofrequency Eye Lift",
        "FREE Supersonic Chin Reduction",
        "FREE Supersonic Body Fat Melting"
      ]
    }
  ] as FatFreezingPackage[],
  fatDissolving: {
    pricePerMl: "£99",
    typicalMlRangesByArea: [
      { area: "Double chin", mlRange: "2-6 ml" },
      { area: "Lower abdomen", mlRange: "6-16 ml" },
      { area: "Love handles", mlRange: "6-12 ml" },
      { area: "Upper arms", mlRange: "4-10 ml" },
      { area: "Thighs", mlRange: "8-20 ml" }
    ],
    disclaimer: "Final cost confirmed after assessment"
  },
  cavitationPackages: [
    {
      name: "Starter",
      sessions: 1,
      priceGbp: 59,
      description: "Single-area ultrasound cavitation session"
    },
    {
      name: "Body Sculpt",
      sessions: 4,
      priceGbp: 199,
      description: "Best for visible contouring over a treatment cycle"
    },
    {
      name: "Definition",
      sessions: 8,
      priceGbp: 349,
      description: "Comprehensive plan with progress reviews"
    }
  ]
} as const;
