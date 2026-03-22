import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import { getAnnouncements } from "@/lib/content";

type PageShellProps = {
  children: ReactNode;
  locale: string;
  currentPath?: string;
  mainClassName?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  nav: any;
  footer: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

export function PageShell({
  children,
  locale,
  currentPath,
  mainClassName,
  nav,
  footer,
}: PageShellProps) {
  const announcements = getAnnouncements().map(
    (a) => a[locale as "ko" | "en"],
  );
  const navWithAnnouncements = { ...nav, announcements };

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader currentPath={currentPath} nav={navWithAnnouncements} />
      <main className={mainClassName ?? "flex-1"}>{children}</main>
      <SiteFooter footer={footer} />
    </div>
  );
}
