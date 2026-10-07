export const locales = ["pl", "en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  pl: { short: "PL", name: "Polski", htmlLang: "pl", og: "pl_PL" },
  en: { short: "EN", name: "English", htmlLang: "en", og: "en_GB" },
  it: { short: "IT", name: "Italiano", htmlLang: "it", og: "it_IT" },
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
