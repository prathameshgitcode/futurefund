/**
 * Central site configuration — contact details, social links, compliance info.
 * Swap these values in one place to update them across the entire site.
 */

export const SITE = {
  name: "FutureFund.in",
  advisor: "Arjun Mehra",
  advisorTitle: "AMFI Registered Mutual Fund Distributor · CFP",

  // ── Contact details (placeholders — replace with real values) ──
  phone: "+91 9167762675",
  phoneRaw: "+919167762675", // used in tel: and wa.me links (no spaces)
  whatsapp: "919167762675", // wa.me number (country code, no +)
  email: "dalvisamiksha2@gmail.com",
  officeAddress:
    "3rd Floor, Sunrise Plaza, MG Road, Bengaluru, Karnataka 560001",

  // ── Compliance ──
  arnNumber: "ARN-123456", // AMFI Registration Number
  euin: "E123456", // Employee Unique Identification Number
  amfiVerifyUrl:
    "https://www.amfiindia.com/locate-your-nearest-mutual-fund-distributor-details",

  // ── Social ──
  social: {
    whatsapp: "https://wa.me/919167762675",
    instagram: "https://instagram.com/futurefundin",
    linkedin: "https://linkedin.com/company/futurefundin",
    youtube: "https://youtube.com/@futurefundin",
  },
} as const;

/** Build a pre-filled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
