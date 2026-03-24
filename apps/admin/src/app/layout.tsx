import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { BuildStatus } from "@/components/build-status";
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
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6">
              <div />
              <BuildStatus />
            </header>
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
