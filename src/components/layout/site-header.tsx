import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  currentPath?: string;
};

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/publications", label: "Publications" },
];

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-inslab-black-transparent-v1.png"
            alt="INSLAB logo"
            width={132}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  isActive
                    ? "font-semibold text-slate-950"
                    : "font-medium text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-full border border-border bg-white px-4 py-2 text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            Research Lab
          </div>
        </div>
      </div>
    </header>
  );
}
