import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700"] });

export const metadata: Metadata = {
  title: "Y The Brokers",
  description: "Certified Projects by Y The Brokers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-dvh bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
