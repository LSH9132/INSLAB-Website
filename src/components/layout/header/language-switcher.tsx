"use client";

import { motion } from "motion/react";

import type { Locale } from "@/lib/i18n/i18n-config";

type LanguageSwitcherProps = {
  locale: Locale;
  currentPath?: string;
};

const localeLabels: Record<Locale, { code: string; label: string; nativeLabel: string }> = {
  en: { code: "EN", label: "English", nativeLabel: "English" },
  ko: { code: "KO", label: "Korean", nativeLabel: "한국어" },
};

const localeOrder: Locale[] = ["en", "ko"];

function buildLocalePath(locale: Locale, currentPath?: string): string {
  const path = currentPath ?? "/";
  if (locale === "en") {
    return path.startsWith("/ko") ? path.slice(3) || "/" : path;
  }
  if (path.startsWith("/ko")) return path;
  return `/ko${path === "/" ? "" : path}`;
}

export function LanguageSwitcher({ locale, currentPath }: LanguageSwitcherProps) {
  return (
    <div
      className="relative inline-flex items-center gap-1.5 text-[10px] text-slate-400"
      aria-label="Available site languages"
    >
      {/* Globe icon */}
      <span className="flex h-4 w-4 items-center justify-center text-slate-300">
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z" />
        </svg>
      </span>

      {/* Locale buttons with sliding underline */}
      <div className="relative flex items-center divide-x divide-slate-200">
        {localeOrder.map((loc) => {
          const info = localeLabels[loc];
          const isActive = loc === locale;
          const href = buildLocalePath(loc, currentPath);

          return (
            <div key={loc} className="relative px-1.5">
              <motion.a
                href={href}
                className={`relative block py-0.5 font-medium tracking-[0.18em] uppercase transition-colors ${
                  isActive ? "text-slate-700" : "text-slate-400 hover:text-slate-600"
                }`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${info.label} (${info.nativeLabel})`}
                whileHover={{ y: -0.5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {info.code}
                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="lang-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] rounded-full bg-slate-700"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
