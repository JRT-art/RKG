/**
 * TESTIMONIALS — only add REAL, approved quotes.
 * While this array is empty the whole "Good work builds trust" section is hidden from the public site.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Reign made the whole process easy. She listened to my ideas and brought them to life!",
    name: "Emily Carter",
    role: "Client, USA",
  },
  {
    quote: "I loved Reign's creativity and attention to detail. A pleasure to work with!",
    name: "Oliver Bennett",
    role: "Client, UK",
  },
];
