import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import { BookingModalProvider } from "@/components/BookingModalProvider";
import { NewsletterModalProvider } from "@/components/NewsletterModalProvider";
import ImageProtector from "@/components/ImageProtector";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  metadataBase: new URL("https://shutterwild.co.uk"),
  title: {
    default: "Shutter Wild - Premium Wildlife Photography Expeditions",
    template: "%s | Shutter Wild",
  },
  description:
    "Premium wildlife photography expeditions, professional fieldcraft workshops, and conservation storytelling. Join award-winning photographers in the world's most pristine habitats.",
  keywords: [
    "wildlife photography",
    "photography expeditions",
    "nature photography",
    "wildlife tours",
    "photography workshops",
    "ethical wildlife photography",
    "Norway raptors photography",
    "Sri Lanka leopard safari",
    "India tiger photography",
    "Pantanal jaguar tours",
  ],
  authors: [{ name: "Thinesh Thirugnanasampanthar" }],
  creator: "Shutter Wild",
  publisher: "Shutter Wild",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shutterwild.co.uk",
    siteName: "Shutter Wild Expeditions",
    title: "Shutter Wild - Premium Wildlife Photography Expeditions",
    description:
      "Immersive wildlife photography journeys built around ethical encounters, fieldcraft knowledge, and meaningful storytelling.",
    images: [
      {
        url: "/captures/Norway Winter/golden-eagle-hunting-winter-norway.webp",
        width: 1200,
        height: 630,
        alt: "Golden Eagle hunting in Winter Norway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shutter Wild - Premium Wildlife Photography Expeditions",
    description:
      "Immersive wildlife photography journeys built around ethical encounters and professional guidance.",
    images: ["/captures/Norway Winter/golden-eagle-hunting-winter-norway.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <NewsletterModalProvider>
          <BookingModalProvider>
            <ImageProtector />
            <SmoothScroll>{children}</SmoothScroll>
            <CookieBanner />
            <WhatsAppButton />
          </BookingModalProvider>
        </NewsletterModalProvider>
      </body>
    </html>
  );
}
