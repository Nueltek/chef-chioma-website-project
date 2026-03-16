import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Lora,
  Outfit,
  Pinyon_Script,
} from "next/font/google";
import "./globals.css";

// Self-hosted fonts via next/font - guaranteed same on all devices
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert",
    template: "%s | Chef Chioma Okonkwo",
  },
  description:
    "Experience elevated Nigerian cuisine with Chef Chioma Okonkwo. Private dining, event catering, and cooking classes in Lagos, Abuja, and beyond.",
  keywords: [
    "Nigerian chef",
    "private chef Lagos",
    "Nigerian cuisine",
    "catering Lagos",
    "private dining Nigeria",
    "cooking classes Lagos",
    "West African cuisine",
    "luxury catering",
    "event catering Nigeria",
  ],
  authors: [{ name: "Chef Chioma Okonkwo" }],
  creator: "Chef Chioma Okonkwo",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://chefchioma.com",
    siteName: "Chef Chioma Okonkwo",
    title: "Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert",
    description:
      "Experience elevated Nigerian cuisine with Chef Chioma Okonkwo. Private dining, event catering, and cooking classes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chef Chioma Okonkwo - Elevated Nigerian Cuisine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chef Chioma Okonkwo | Private Chef & Nigerian Cuisine Expert",
    description:
      "Experience elevated Nigerian cuisine. Private dining, event catering, and cooking classes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A0F0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${lora.variable} ${outfit.variable} ${pinyonScript.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
