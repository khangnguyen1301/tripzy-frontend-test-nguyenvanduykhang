import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/layouts/Header";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Booking - Avian Solutions",
  description: "Search and book bus, hotel, and flight services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen relative">
          {/* Top Section with Gradient Background */}
          <div className="bg-linear-to-b from-[#5F8FF] to-[#DBF5FF] h-[60vh] relative">
            {/* Header */}
            <Header />
          </div>

          {/* Bottom Section with White Background */}
          <div className="bg-white h-[40vh]"></div>

          {/* Centered Content Overlay */}
          <div className="absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="container mx-auto max-w-7xl px-4">{children}</div>
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
