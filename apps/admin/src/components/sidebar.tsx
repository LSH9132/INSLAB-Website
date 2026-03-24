"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/team", label: "Team" },
  { href: "/publications", label: "Publications" },
  { href: "/research", label: "Research" },
  { href: "/news", label: "News" },
  { href: "/director", label: "Director" },
  { href: "/announcements", label: "Announcements" },
  { href: "/messages", label: "i18n Messages" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-gray-50 min-h-screen">
      <div className="px-4 py-5 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">INSLAB Admin</h1>
      </div>
      <nav className="px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm ${
                active
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
