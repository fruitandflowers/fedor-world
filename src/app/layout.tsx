import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat_Alternates } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const gaqire = localFont({
  src: "../../public/fonts/GAQIRE-Regular.otf",
  variable: "--font-display",
  display: "swap",
});

const neueMontreal = localFont({
  src: [
    { path: "../../public/fonts/NeueMontreal-Light.otf", weight: "300" },
    { path: "../../public/fonts/NeueMontreal-Regular.otf", weight: "400" },
    { path: "../../public/fonts/NeueMontreal-Bold.otf", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

const montserratAlt = Montserrat_Alternates({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["300"],
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
      <body className={`${gaqire.variable} ${neueMontreal.variable} ${montserratAlt.variable}`}>
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
