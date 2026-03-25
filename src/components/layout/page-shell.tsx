import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import { getAnnouncements } from "@/lib/content";

import type { NavData, FooterData } from "@/types/messages";

type PageShellProps = {
  children: ReactNode;
  locale: string;
  currentPath?: string;
  mainClassName?: string;
  nav: NavData;
  footer: FooterData;
};

export function PageShell({
  children,
  locale,
  currentPath,
  mainClassName,
  nav,
  footer,
}: PageShellProps) {
  const announcements = getAnnouncements().map((a) => ({
    text: a[locale as "ko" | "en"],
    href: a.href,
  }));
  const navWithAnnouncements = { ...nav, announcements };

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader currentPath={currentPath} nav={navWithAnnouncements} />
      <main id="main-content" className={mainClassName ?? "flex-1"}>{children}</main>
      <SiteFooter footer={footer} />
    </div>
  );
}
