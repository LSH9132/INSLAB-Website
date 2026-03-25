"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

const localeLabels: Record<Locale, { code: string; label: string; nativeLabel: string }> = {
  en: { code: "EN", label: "English", nativeLabel: "English" },
  ko: { code: "KO", label: "Korean", nativeLabel: "한국어" },
};

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();

  const nextLocale: Locale = currentLocale === "en" ? "ko" : "en";
  const nextInfo = localeLabels[nextLocale];

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="relative inline-flex items-center gap-1.5 text-[10px] text-slate-400 transition-colors hover:text-slate-600"
      aria-label={`Switch to ${nextInfo.label} (${nextInfo.nativeLabel})`}
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

      {/* EN | KO display — whole thing is one clickable link */}
      <div className="relative flex items-center divide-x divide-slate-200">
        {routing.locales.map((loc) => {
          const info = localeLabels[loc];
          const isActive = loc === currentLocale;

          return (
            <div key={loc} className="relative px-1.5">
              <span
                className={`relative block py-0.5 font-medium tracking-[0.18em] uppercase ${
                  isActive ? "text-slate-700" : "text-slate-400"
                }`}
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
              </span>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
