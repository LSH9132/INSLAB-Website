import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";

type PageShellProps = {
  children: ReactNode;
  currentPath?: string;
  mainClassName?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  nav: any;
  footer: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

export function PageShell({
  children,
  currentPath,
  mainClassName,
  nav,
  footer,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader currentPath={currentPath} nav={nav} />
      <main className={mainClassName ?? "flex-1"}>{children}</main>
      <SiteFooter footer={footer} />
    </div>
  );
}
