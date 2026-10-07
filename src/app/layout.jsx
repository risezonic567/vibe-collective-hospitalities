import { Cormorant_Garamond, Jost, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";
import { VineScroll } from "@/components/ui/VineScroll";
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
const navFont = Cinzel({
    variable: "--font-nav",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

export const viewport = {
    themeColor: "#1d3347",
    width: "device-width",
    initialScale: 1,
};
export const metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: "Vibe Collective Hospitality | Luxury Hospitality & Celebrations",
        template: "%s | Vibe Collective Hospitality",
    },
    description: "Curators of ultra-luxury destination weddings, bespoke corporate conclaves, and private estate hospitality across royal palaces and global retreats.",
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
        description: "Curators of ultra-luxury destination weddings, bespoke corporate conclaves, and private estate hospitality across royal palaces and global retreats.",
        siteName: site.name,
    },
    twitter: {
        card: "summary_large_image",
        title: "Vibe Collective Hospitality | Luxury Hospitality & Celebrations",
        description: "Curators of ultra-luxury destination weddings, bespoke corporate conclaves, and private estate hospitality.",
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function RootLayout({ children, }) {
    return (<html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jost.variable} ${navFont.variable} h-full scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-[#f7f3ec] text-[#14202b] antialiased selection:bg-[#b8975a] selection:text-[#14202b]">
        <VineScroll />
        <Navbar />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>);
}
