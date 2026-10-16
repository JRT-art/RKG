import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${site.shortName} — AI Video Editor & Direct-Response Creative`,
  description: site.description,
  openGraph: {
    title: `${site.shortName} — I don't just edit ads. I make them impossible to ignore.`,
    description: site.description,
    type: "website",
    images: [{ url: "/images/p2.jpg", width: 720, height: 1280, alt: "Selected AI direct-response ad" }],
  },
  twitter: { card: "summary_large_image", title: `${site.shortName} — AI Video Editor`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    address: { "@type": "PostalAddress", addressCountry: "PH" },
    knowsAbout: ["AI video production", "Direct-response advertising", "Video sales letters", "UGC advertising", "Meta and TikTok ads"],
  };
  return (
    <html lang="en" suppressHydrationWarning className={`${space.variable} ${inter.variable} ${jb.variable}`}>
      <body className="grain has-cursor">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
