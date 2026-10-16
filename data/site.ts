/**
 * SITE CONFIG — the only file you need to edit for contact details.
 * Leave a value as an empty string and that link simply won't appear on the site.
 * Nothing here is invented: fill in your real details.
 */
export const site = {
  name: "Reign Krista Garcia",
  shortName: "Reign",
  role: "AI Video Editor & Direct-Response Creative Specialist",
  location: "Philippines",
  description:
    "AI video editor and direct-response creative. Scroll-stopping UGC, VSLs and paid-social ads for DTC brands, e-commerce founders and agencies.",

  contact: {
    email: "garciareignkrista09@gmail.com",
    phone: "+63 992 530 2791",
  },

  /** Drop your portrait at /public/images/portrait.jpg and flip this to true. Until then a clearly-marked placeholder shows. */
  hasPortrait: true,
} as const;

export const stats = [
  { label: "Years of direct-response editing", value: 3, suffix: "+", counter: true },
  { label: "VSLs produced in a recent 12 months", value: 30, suffix: "–40", counter: true },
  { label: "Specialised creative production", value: 0, text: "AI + DR", counter: false },
] as const;
