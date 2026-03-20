import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";


import { defaultLocale, isValidLocale, locales } from "@/lib/i18n/i18n-config";
import type { Locale } from "@/lib/i18n/i18n-config";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "INSLAB",
    template: "%s | INSLAB",
  },
  description:
    "INSLAB research website for publications, research themes, and laboratory updates.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* Pass dict and locale down via data attributes isn't ideal —
            children receive them as props from the page layer instead. */}
        {children}
      </body>
    </html>
  );
}
