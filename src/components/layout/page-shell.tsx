import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";

type PageShellProps = {
  children: ReactNode;
  currentPath?: string;
  mainClassName?: string;
};

export function PageShell({
  children,
  currentPath,
  mainClassName,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader currentPath={currentPath} />
      <main className={mainClassName ?? "flex-1"}>{children}</main>
      <SiteFooter />
    </div>
  );
}
