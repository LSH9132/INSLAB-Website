"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth-actions";

interface NavGroup {
  label: string | null;
  items: { href: string; label: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [{ href: "/", label: "Dashboard" }],
  },
  {
    label: "Content",
    items: [
      { href: "/team", label: "Team" },
      { href: "/publications", label: "Publications" },
      { href: "/research", label: "Research" },
      { href: "/news", label: "News" },
      { href: "/director", label: "Director" },
      { href: "/announcements", label: "Announcements" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/messages", label: "i18n Messages" },
      { href: "/deploys", label: "Deploys" },
      { href: "/preview", label: "Preview" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-gray-50 sticky top-0 h-screen flex flex-col">
      <div className="px-4 py-5 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">INSLAB Admin</h1>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label ?? "_top"}>
            {group.label && (
              <h2 className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {group.label}
              </h2>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
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
            </div>
          </div>
        ))}
      </nav>
      <div className="px-2 py-3 border-t border-gray-200">
        <form action={logoutAction}>
          <button
            type="submit"
            className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
