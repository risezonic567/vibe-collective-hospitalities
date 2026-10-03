import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/config/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1d3347",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vibe Collective Hospitality | Luxury Hospitality & Celebrations",
    template: "%s | Vibe Collective Hospitality",
  },
  description:
    "Curators of ultra-luxury destination weddings, bespoke corporate conclaves, and private estate hospitality across royal palaces and global retreats.",
  keywords: [
    "luxury weddings",
    "destination wedding planner",
    "bespoke hospitality",
    "Udaipur royal wedding",
    "high-end event production",
    "private estate stays",
    "Vibe Collective",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: "Vibe Collective Hospitality | Luxury Hospitality & Celebrations",
    description:
      "Curators of ultra-luxury destination weddings, bespoke corporate conclaves, and private estate hospitality across royal palaces and global retreats.",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Collective Hospitality | Luxury Hospitality & Celebrations",
    description:
      "Curators of ultra-luxury destination weddings, bespoke corporate conclaves, and private estate hospitality.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f7f3ec] text-[#14202b] antialiased selection:bg-[#b8975a] selection:text-[#14202b]">
        <Navbar />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
