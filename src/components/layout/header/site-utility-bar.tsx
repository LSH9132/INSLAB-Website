"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/i18n-config";
import { LanguageSwitcher } from "./language-switcher";

type SiteUtilityBarProps = {
  locale: Locale;
  currentPath?: string;
  announcements: Dictionary["nav"]["announcements"];
};

/** Icon: GitHub mark */
function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** Icon: Google Scholar */
function ScholarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5 12 0z" />
    </svg>
  );
}

/** Icon: ResearchGate */
function ResearchGateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zM12.18 17.787c-.738 0-1.414-.196-1.936-.56v2.104H8.75V9.256h1.414v.518c.508-.392 1.17-.63 1.894-.63 1.994 0 3.326 1.52 3.326 4.388 0 2.717-1.332 4.255-3.204 4.255zm5.668-.168h-1.494v-8.35h1.494v8.35zm-.747-9.702a.896.896 0 1 1 0-1.792.896.896 0 0 1 0 1.792zm-4.795 8.33c1.008 0 1.75-.868 1.75-2.726 0-1.848-.714-2.964-1.75-2.964-.518 0-.966.224-1.33.56v4.486c.35.392.826.644 1.33.644z" />
    </svg>
  );
}

const socialLinks = [
  {
    id: "github",
    href: "https://github.com/inslab",
    label: "GitHub",
    Icon: GithubIcon,
  },
  {
    id: "scholar",
    href: "https://scholar.google.com",
    label: "Google Scholar",
    Icon: ScholarIcon,
  },
  {
    id: "researchgate",
    href: "https://www.researchgate.net",
    label: "ResearchGate",
    Icon: ResearchGateIcon,
  },
];

/** Animated announcement ticker */
function AnnouncementTicker({
  announcements,
}: {
  announcements: string[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(id);
  }, [announcements.length]);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
      {/* Blinking dot */}
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
      </span>

      <div className="relative h-4 min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute inset-0 truncate text-[10.5px] font-medium tracking-wide text-slate-600"
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SiteUtilityBar({
  locale,
  currentPath,
  announcements,
}: SiteUtilityBarProps) {
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
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <span className="hidden h-3 w-px bg-slate-200 sm:block" />

          {/* Language switcher */}
          <LanguageSwitcher locale={locale} currentPath={currentPath} />
        </div>
      </div>
    </div>
  );
}
