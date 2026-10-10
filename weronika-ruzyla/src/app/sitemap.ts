import type { MetadataRoute } from "next";
import { localeLabels, locales } from "@/i18n/config";
import { site } from "@/content/site";

export const dynamic = "force-static";

// one entry per language, each listing its translations so Google links them together
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `${site.url}/${l}/`]));
  return locales.map((l) => ({
    url: `${site.url}/${l}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "pl" ? 1 : 0.8,
    alternates: { languages },
  }));
}
