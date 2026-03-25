import "./globals.css";

/**
 * Minimal root layout — the [locale]/layout.tsx handles <html>, <body>,
 * fonts, and lang attribute. This file must exist for Next.js but delegates
 * everything to the locale sub-layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
