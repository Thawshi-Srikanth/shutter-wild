import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import NewsletterBanner from "@/components/NewsletterBanner";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shutter Wild - Expeditions",
  description:
    "Premium wildlife photography expeditions, services, and conservation storytelling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body
        className="font-sans antialiased bg-[#F4F4F0] text-[#1A1A1A]"
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
        <CookieBanner />
        <NewsletterBanner />
      </body>
    </html>
  );
}
