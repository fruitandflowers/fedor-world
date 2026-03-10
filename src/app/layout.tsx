import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fedor Sokolov — The First World President",
  description:
    "Not a political campaign. A creative project exploring what it means to lead with love, humor, and radical imagination.",
  openGraph: {
    title: "Fedor Sokolov — The First World President",
    description:
      "Not a political campaign. A creative project exploring what it means to lead with love, humor, and radical imagination.",
    images: ["/images/misc/og-image.png"],
    siteName: "fedor.world",
  },
  icons: {
    icon: "/images/misc/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
