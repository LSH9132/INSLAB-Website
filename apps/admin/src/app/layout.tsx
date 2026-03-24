import type { Metadata } from "next";
import { Suspense } from "react";
import { ToastProvider } from "@/components/toast-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "INSLAB Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Suspense>
          <ToastProvider>{children}</ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
