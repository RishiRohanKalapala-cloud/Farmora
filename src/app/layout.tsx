import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Using Inter as it pairs perfectly with the 'Stone' color palette and clean UI
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farmora | Sustainable Farming Tech",
  description: "Empowering farmers with innovation, sustainable tools, and a direct-to-consumer marketplace.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon or remove this line
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      {/* 
        antialiased: Smooths the text rendering
        font-sans: Applies the Inter font defined above
        bg-white: Sets a default background
      */}
      <body className="font-sans antialiased bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}