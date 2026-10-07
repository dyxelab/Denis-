import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../globals.css";
import { hasLocale, localeLabels, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { images, site } from "@/content/site";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#d9cdb9",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeLabels[lang].og,
      type: "website",
      images: [{ url: images.hero.src, width: images.hero.width, height: images.hero.height }],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={localeLabels[lang].htmlLang} className={`${serif.variable} ${sans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
