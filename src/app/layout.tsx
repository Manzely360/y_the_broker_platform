import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Y The Brokers - Premium Real Estate Solutions",
  description: "Discover exceptional properties across Egypt's most prestigious locations. From luxury coastal resorts to prime commercial spaces, we bring you the finest real estate opportunities.",
  keywords: "real estate, Egypt, properties, residential, commercial, coastal, luxury",
  authors: [{ name: "Y The Brokers" }],
  openGraph: {
    title: "Y The Brokers - Premium Real Estate Solutions",
    description: "Discover exceptional properties across Egypt's most prestigious locations.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Y The Brokers - Premium Real Estate Solutions",
    description: "Discover exceptional properties across Egypt's most prestigious locations.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}