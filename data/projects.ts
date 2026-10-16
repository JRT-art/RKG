/**
 * PORTFOLIO DATA — one entry per video.
 *
 * Adding a video without touching any component:
 *   1. Put the web file in   /public/videos/<id>.mp4          (720p H.264, faststart — see README "Media workflow")
 *   2. Optional hover loop   /public/videos/<id>-preview.mp4  (3–5s, muted, ~360px wide)
 *   3. Poster frame          /public/images/<id>.jpg
 *   4. Add an object below.
 *
 * Titles are neutral descriptions of what is visible in each video — no client names, results or claims are implied.
 * `fullUrl` links to the complete, uncut video in Google Drive.
 */
export type Category =
  | "Video Sales Letters"
  | "AI UGC"
  | "AI Storytelling"
  | "Direct-Response Ads"
  | "Product Creatives";

export type Project = {
  id: string;
  title: string;
  category: Category;
  /** one-line description of what is on screen */
  blurb: string;
  /** full length of the original, in seconds */
  duration: number;
  /** width / height of the original */
  aspect: number;
  /** length of the on-site excerpt, in seconds (the player shows the opening of the edit) */
  excerpt: number;
  video: string;
  preview: string;
  poster: string;
  fullUrl: string;
  /** shown first / larger */
  featured?: boolean;
  /** formats / traits shown as small mono tags */
  tags: string[];
};

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

export const projects: Project[] = [
  {
    id: "p2",
    title: "Smart Plug — Founder-Story VSL",
    category: "Video Sales Letters",
    blurb: "AI-generated presenter, cinematic home scenes and kinetic captions carrying a product story from hook to offer.",
    duration: 108,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p2.mp4",
    preview: "/videos/p2-preview.mp4",
    poster: "/images/p2.jpg",
    fullUrl: drive("1bMraDDfGtMTmYvg2fDKxIiGGgPEyJ9lK"),
    featured: true,
    tags: ["9:16", "VSL", "AI scenes", "Kinetic captions"],
  },
  {
    id: "p5",
    title: "WiFi Extender — 3D Animated Story",
    category: "AI Storytelling",
    blurb: "A stylised 3D character story that dramatises a dead-zone problem before revealing the product.",
    duration: 189,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p5.mp4",
    preview: "/videos/p5-preview.mp4",
    poster: "/images/p5.jpg",
    fullUrl: drive("1L3fC8mfn8tpl_Y9dnp4wH1hnCpkVai0P"),
    tags: ["9:16", "AI animation", "Narrative hook"],
  },
  {
    id: "p3",
    title: "Wellness Pad — Doctor Testimonial",
    category: "AI UGC",
    blurb: "Talking-head clinician intercut with body-worn product demonstrations and on-screen proof points.",
    duration: 203,
    aspect: 3 / 4,
    excerpt: 60,
    video: "/videos/p3.mp4",
    preview: "/videos/p3-preview.mp4",
    poster: "/images/p3.jpg",
    fullUrl: drive("1GnZYFDf5ZyjnxvmIiv3PNsCEaowSDA1c"),
    tags: ["3:4", "AI talking head", "Demo B-roll"],
  },
  {
    id: "p7",
    title: "Kidney Health — Dramatic Story VSL",
    category: "AI Storytelling",
    blurb: "A character-driven narrative with emphasis captions and cinematic cutaways, built for long-form retention.",
    duration: 327,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p7.mp4",
    preview: "/videos/p7-preview.mp4",
    poster: "/images/p7.jpg",
    fullUrl: drive("1BSmcjNK19k0xffX7l35kRfM9umO7xuW0"),
    tags: ["9:16", "Long-form", "Emphasis captions"],
  },
  {
    id: "p1",
    title: "Home Energy Plug — Presenter VSL",
    category: "Video Sales Letters",
    blurb: "Expert-style presenter, product demos and an offer stack closing on a clear guarantee callout.",
    duration: 184,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p1.mp4",
    preview: "/videos/p1-preview.mp4",
    poster: "/images/p1.jpg",
    fullUrl: drive("1_cVLkpcO2fFycSq2lzTVIEu0mMjRF9Xb"),
    tags: ["9:16", "VSL", "Offer stack"],
  },
  {
    id: "p6",
    title: "Memory Support — AI Doctor Talking Head",
    category: "AI UGC",
    blurb: "Direct-to-camera AI presenter with bold word-by-word captions and visual explainers.",
    duration: 170,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p6.mp4",
    preview: "/videos/p6-preview.mp4",
    poster: "/images/p6.jpg",
    fullUrl: drive("1BFcN4RVvtcAQeoICzHW776-xpV6C7GnR"),
    tags: ["9:16", "AI talking head", "Word captions"],
  },
  {
    id: "p8",
    title: "Streaming Box — Customer Story VSL",
    category: "Video Sales Letters",
    blurb: "A relatable customer story that walks from first doubt to everyday use, with product screens inserted on beat.",
    duration: 303,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p8.mp4",
    preview: "/videos/p8-preview.mp4",
    poster: "/images/p8.jpg",
    fullUrl: drive("15GAS40aaNy1BOo3cKuDn9FJA4FtRiO3Y"),
    tags: ["9:16", "VSL", "Screen inserts"],
  },
  {
    id: "p4",
    title: "Dog Harness — Swedish-Language VSL",
    category: "Direct-Response Ads",
    blurb: "Localised creative: real-feel pet scenes, translated captions and a trainer-led proof section.",
    duration: 93,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p4.mp4",
    preview: "/videos/p4-preview.mp4",
    poster: "/images/p4.jpg",
    fullUrl: drive("1PMtxeXcKLmGHDCXDpVe1yzK3fpNsZ-zE"),
    tags: ["9:16", "Localisation", "Pet niche"],
  },
  {
    id: "p9",
    title: "Streaming Device — Offer Creative",
    category: "Product Creatives",
    blurb: "Product-first cut: hardware close-ups, app-store visuals and a bold price reveal.",
    duration: 155,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p9.mp4",
    preview: "/videos/p9-preview.mp4",
    poster: "/images/p9.jpg",
    fullUrl: drive("1Mp-r_VjtSwfjwTfW8nkobGv4wp6gzH-1"),
    tags: ["9:16", "Product", "Price reveal"],
  },
  {
    id: "p10",
    title: "Hair Colour — Short-Form Ad (Swedish)",
    category: "Direct-Response Ads",
    blurb: "Fast, caption-led short-form: problem close-ups, routine shots and a product reveal in under 70 seconds.",
    duration: 70,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p10.mp4",
    preview: "/videos/p10-preview.mp4",
    poster: "/images/p10.jpg",
    fullUrl: drive("1uexcxXdsmY1sRUPGruhm-2HK5Qotl7Ll"),
    tags: ["9:16", "Short-form", "Localisation"],
  },
  {
    id: "p11",
    title: "Hearing Health — Stage-Talk VSL",
    category: "Video Sales Letters",
    blurb: "A keynote-style speaker intercut with medical visuals and product inserts to carry a long-form pitch.",
    duration: 124,
    aspect: 9 / 16,
    excerpt: 60,
    video: "/videos/p11.mp4",
    preview: "/videos/p11-preview.mp4",
    poster: "/images/p11.jpg",
    fullUrl: drive("1q4JSBOnIoub_E7mpqIaA22ZXO-CVzcJk"),
    tags: ["9:16", "VSL", "Explainer visuals"],
  },
];

export const categories: ("All" | Category)[] = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export const heroReel = ["p2", "p5", "p3"] as const;
