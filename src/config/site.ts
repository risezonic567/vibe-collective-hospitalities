export const site = {
  name: "Vibe Collective Hospitality",
  shortName: "Vibe Collective",
  tagline: "Hospitality, designed to be remembered.",
  url: "https://vibecollective.com", // TODO: replace with production domain
  phone: "+91 98765 43210", // TODO: replace with client phone number
  whatsapp: "919876543210", // TODO: replace with client WhatsApp number (country code + digits, no spaces)
  email: "concierge@vibecollective.com", // TODO: replace with client email address
  address: [
    "Level 4, The Grand Pavilion, 18 MG Road", // TODO: replace with actual office line 1
    "Bengaluru, Karnataka 560001, India", // TODO: replace with actual city, state, country
  ],
  officeHours: "Monday to Saturday: 10:00 AM – 7:30 PM IST", // TODO: replace with operating hours
  socials: {
    instagram: "https://instagram.com/vibecollective", // TODO: replace with verified Instagram handle
    facebook: "https://facebook.com/vibecollective", // TODO: replace with verified Facebook page
    youtube: "https://youtube.com/@vibecollective", // TODO: replace with verified YouTube channel
    linkedin: "https://linkedin.com/company/vibecollective", // TODO: replace with verified LinkedIn profile
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Journey", href: "/journey" },
    { label: "Events", href: "/events" },
    { label: "Weddings", href: "/weddings" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof site;
