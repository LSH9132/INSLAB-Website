import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/i18n-config";

type PageShellProps = {
  children: ReactNode;
  currentPath?: string;
  mainClassName?: string;
  locale: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
};

export function PageShell({
  children,
  currentPath,
  mainClassName,
  locale,
  nav,
  footer,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader currentPath={currentPath} locale={locale} nav={nav} />
      <main className={mainClassName ?? "flex-1"}>{children}</main>
      <SiteFooter locale={locale} footer={footer} />
    </div>
  );
}
