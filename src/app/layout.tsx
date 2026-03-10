import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans, Montserrat_Alternates } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const montserratAlt = Montserrat_Alternates({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
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
      <body className={`${bodoni.variable} ${dmSans.variable} ${montserratAlt.variable}`}>
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
