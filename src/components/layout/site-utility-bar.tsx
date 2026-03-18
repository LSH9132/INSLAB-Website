import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function SiteUtilityBar() {
  return (
    <div className="border-b border-slate-100/80 bg-white/92 backdrop-blur-sm">
      <div className="mx-auto flex h-7 max-w-7xl items-center justify-end px-6 lg:px-8">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
