"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { socialLinks } from "@/lib/social-links";

type AnnouncementItem = {
  text: string;
  href?: string;
};

type SiteUtilityBarProps = {
  announcements: AnnouncementItem[];
};

/** Animated announcement ticker */
function AnnouncementTicker({
  announcements,
}: {
  announcements: AnnouncementItem[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(id);
  }, [announcements.length]);

  const current = announcements[index];

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
      {/* Blinking dot */}
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
      </span>

      <div className="relative h-4 min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {current.href ? (
              current.href.startsWith("http") ? (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-[10.5px] font-medium tracking-wide text-slate-600 transition-colors hover:text-slate-900"
                >
                  {current.text}
                </a>
              ) : (
                <Link
                  href={current.href}
                  className="block truncate text-[10.5px] font-medium tracking-wide text-slate-600 transition-colors hover:text-slate-900"
                >
                  {current.text}
                </Link>
              )
            ) : (
              <p className="truncate text-[10.5px] font-medium tracking-wide text-slate-600">
                {current.text}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SiteUtilityBar({ announcements }: SiteUtilityBarProps) {
  return (
    <div className="border-b border-slate-100/80 bg-slate-50/90 backdrop-blur-sm">
      <div className="mx-auto flex h-7 max-w-7xl items-center gap-4 px-6 lg:px-8">
        {/* Left: Announcement ticker */}
        <AnnouncementTicker announcements={announcements} />

        {/* Divider */}
        <span className="hidden h-3 w-px flex-shrink-0 bg-slate-200 sm:block" />

        {/* Right: Social icons + Language switcher */}
        <div className="flex flex-shrink-0 items-center gap-2">
          {/* Social links */}
          <div className="hidden items-center gap-0.5 sm:flex">
            {socialLinks.map(({ id, href, label, Icon }) => (
              <motion.a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-5 w-5 items-center justify-center rounded text-slate-400 transition-colors hover:text-slate-700"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon className="h-[13px] w-[13px]" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <span className="hidden h-3 w-px bg-slate-200 sm:block" />

          {/* Language switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
