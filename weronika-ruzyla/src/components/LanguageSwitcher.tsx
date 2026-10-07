"use client";

import Link from "next/link";
import { localeLabels, locales, type Locale } from "@/i18n/config";

type Props = { lang: Locale; className?: string; onNavigate?: () => void };

export default function LanguageSwitcher({ lang, className = "", onNavigate }: Props) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={`/${l}`}
            hrefLang={localeLabels[l].htmlLang}
            aria-current={l === lang ? "true" : undefined}
            title={localeLabels[l].name}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
              onNavigate?.();
            }}
            className={`eyebrow px-1 py-1 transition-opacity ${l === lang ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
          >
            {localeLabels[l].short}
          </Link>
        </span>
      ))}
    </div>
  );
}
