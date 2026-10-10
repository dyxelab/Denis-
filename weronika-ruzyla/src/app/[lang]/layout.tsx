import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Outfit, Unbounded } from "next/font/google";
import "../globals.css";
import { hasLocale, localeLabels, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { images, site } from "@/content/site";

// titles: wide geometric caps; body: clean modern sans; logo: the serif of the WR monogram only
const display = Unbounded({ variable: "--font-display", subsets: ["latin", "latin-ext"] });
const sans = Outfit({ variable: "--font-sans", subsets: ["latin", "latin-ext"] });
const logo = Cormorant_Garamond({ variable: "--font-logo", weight: "300", subsets: ["latin", "latin-ext"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#171310",
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
      canonical: `/${lang}/`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `/${l}/`])),
        "x-default": "/pl/",
      },
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
      apple: "/apple-touch-icon.png",
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description, images: [images.hero.src] },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeLabels[lang].og,
      type: "website",
      siteName: site.name,
      url: `/${lang}/`,
      images: [{ url: images.hero.src, width: images.hero.width, height: images.hero.height }],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={localeLabels[lang].htmlLang} className={`${display.variable} ${sans.variable} ${logo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
