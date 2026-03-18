import { siteLocales } from "@/lib/constants/site-locales";

export function LanguageSwitcher() {
  return (
    <div
      className="inline-flex items-center gap-1 text-[10px] text-slate-400"
      aria-label="Available site languages"
    >
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

      <div className="flex items-center">
        {siteLocales.map((locale) => (
          <button
            key={locale.code}
            type="button"
            className={`px-1 py-0.5 font-medium tracking-[0.18em] uppercase ${
              locale.isDefault
                ? "text-slate-600"
                : "text-slate-300 hover:text-slate-500"
            }`}
            aria-pressed={locale.isDefault ?? false}
            aria-label={`${locale.label} (${locale.nativeLabel})`}
          >
            {locale.code}
          </button>
        ))}
      </div>
    </div>
  );
}
