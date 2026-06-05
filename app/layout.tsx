import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// One variable grotesk superfamily carries the whole system.
// wdth axis (up to 125) gives the wide "Expanded" masthead stance for display.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const SITE = "https://edwinandjoyce.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Edwin & Joyce Ormeo Photography — Austin, Texas",
    template: "%s · Edwin & Joyce",
  },
  description:
    "Edwin & Joyce — a husband-and-wife photography studio in Austin, Texas. Natural-light weddings, couples, families, seniors & portraits across the Texas Hill Country.",
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
      "Natural-light weddings, families, seniors & portraits in Austin & the Texas Hill Country.",
    images: [{ url: "/img/family/depottey.webp", width: 1024, height: 682 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
