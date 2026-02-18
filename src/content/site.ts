const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const envPhone = process.env.NEXT_PUBLIC_PHONE?.trim();
const envWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP?.trim();
const envAddress = process.env.NEXT_PUBLIC_CLINIC_ADDRESS?.trim();

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
  googleBusinessUrl: "https://share.google/gZYI1lIiRVhouJFF8",
  trustPillars: ["Transparent Pricing", "Leeds Clinic", "Free Consultation"],
  social: {
    whatsapp: envWhatsApp || defaultWhatsApp
  }
} as const;
