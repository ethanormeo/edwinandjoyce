import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE = "https://edwinandjoyce.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Edwin & Joyce Ormeo Photography — Austin, Texas",
    template: "%s · Edwin & Joyce Ormeo Photography",
  },
  description:
    "Husband-and-wife photographers in Austin, Texas. Warm, golden-hour wedding, family, senior & portrait photography across the Texas Hill Country.",
  keywords: [
    "Austin photographer",
    "Austin wedding photographer",
    "Texas Hill Country photographer",
    "family photographer Austin",
    "senior portraits Austin",
    "Edwin and Joyce Ormeo",
  ],
  authors: [{ name: "Edwin & Joyce Ormeo" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Edwin & Joyce Ormeo Photography",
    title: "Edwin & Joyce Ormeo Photography — Austin, Texas",
    description:
      "Warm, golden-hour wedding, family, senior & portrait photography in Austin & the Texas Hill Country.",
    images: [{ url: "/img/family/depottey.webp", width: 1024, height: 682 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} grain`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
