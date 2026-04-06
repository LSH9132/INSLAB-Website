import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://inslab.sch.ac.kr"),
};

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "45 920",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
