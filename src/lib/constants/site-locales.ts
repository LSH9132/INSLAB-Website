export type SiteLocale = {
  code: string;
  label: string;
  nativeLabel: string;
  isDefault?: boolean;
};

export const siteLocales: SiteLocale[] = [
  {
    code: "EN",
    label: "English",
    nativeLabel: "English",
    isDefault: true,
  },
  {
    code: "KO",
    label: "Korean",
    nativeLabel: "한국어",
  },
];
