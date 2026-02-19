const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const envPhone = process.env.NEXT_PUBLIC_PHONE?.trim();
const envWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP?.trim();
const envAddress = process.env.NEXT_PUBLIC_CLINIC_ADDRESS?.trim();
const envGbp = process.env.NEXT_PUBLIC_GBP_URL?.trim();

const defaultPhoneDisplay = "0113 323 4896";
const defaultPhoneHref = "tel:01133234896";
const defaultWhatsApp =
  "https://wa.me/447886084321?text=Hi%2C%20I%20would%20like%20to%20find%20out%20more%20about%20Aqualyx%20in%20Leeds%20and%20book";
const defaultAddress = "Tunstall Road, Leeds, LS11 5HL, United Kingdom";

function normalizePhoneHref(value: string | undefined) {
  if (!value) return defaultPhoneHref;
  if (value.startsWith("tel:")) return value;
  const digits = value.replace(/[^\d+]/g, "");
  return `tel:${digits.replace(/\+/g, "")}`;
}

function normalizeWhatsAppNumberFromUrl(url: string) {
  const match = url.match(/wa\.me\/(\d+)/);
  return match?.[1] ?? "447886084321";
}

function formatWhatsAppDisplay(number: string) {
  if (number === "447886084321") return "+44 7886 084321";
  if (number.startsWith("44") && number.length > 4) {
    return `+${number.slice(0, 2)} ${number.slice(2)}`;
  }
  return `+${number}`;
}

export const siteConfig = {
  name: "Aqualyx Leeds",
  domain: "aqualyxleeds.com",
  siteUrl: envSiteUrl && /^https?:\/\//.test(envSiteUrl) ? envSiteUrl : "https://aqualyxleeds.com",
  bookingPath: "/book",
  offerCopy: "Limited availability: claim 25% off + free personal coaching",
  address: envAddress || defaultAddress,
  addressStructured: {
    streetAddress: "Tunstall Road",
    addressLocality: "Leeds",
    postalCode: "LS11 5HL",
    addressCountry: "GB"
  },
  mapQueryUrl: "https://www.google.com/maps?q=Tunstall+Road+Leeds+LS11+5HL",
  mapEmbedUrl: "https://www.google.com/maps?q=Tunstall+Road+Leeds+LS11+5HL&output=embed",
  phoneDisplay: envPhone || defaultPhoneDisplay,
  phoneHref: normalizePhoneHref(envPhone),
  whatsappNumber: normalizeWhatsAppNumberFromUrl(envWhatsApp || defaultWhatsApp),
  whatsappDisplay: formatWhatsAppDisplay(normalizeWhatsAppNumberFromUrl(envWhatsApp || defaultWhatsApp)),
  whatsappMessage:
    "Hi, I would like to find out more about Aqualyx in Leeds and book",
  whatsappUrl: envWhatsApp || defaultWhatsApp,
  googleBusinessUrl: envGbp || "https://share.google/gZYI1lIiRVhouJFF8",
  reviewRating: "4.9★",
  mostAffordableClaim: "Most affordable in Leeds",
  priceMatchGuarantee: "Price-Match Guarantee",
  localClinicClaim: "Local LS11 clinic",
  trustBadges: ["Rated 4.9★ on Google", "Most affordable in Leeds", "Price-Match Guarantee", "Local LS11 clinic"],
  openingHoursDisplay: "Mon-Tue 09:30-18:30 • Wed-Thu 09:30-19:00 • Fri 09:30-17:30 • Sat 10:00-15:00 • Sun Closed",
  trustPillars: ["Transparent Pricing", "Leeds Clinic", "Free Consultation"],
  social: {
    whatsapp: envWhatsApp || defaultWhatsApp
  }
} as const;
