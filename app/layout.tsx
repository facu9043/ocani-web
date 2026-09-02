import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Frutos secos, semillas, harinas, condimentos y productos naturales al por mayor. Precios mayoristas a partir de 1 kg, envíos a todo Argentina.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ocani | Dietética Mayorista",
    template: "%s | Ocani",
  },
  description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Ocani",
    title: "Ocani | Dietética Mayorista",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocani | Dietética Mayorista",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
