import type { Locale } from "@/i18n/config";
import { localeLabels } from "@/i18n/config";
import { images, site } from "@/content/site";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** schema.org data so Google can show the studio as a local business (address, hours, phone, profiles). */
export default function StructuredData({ lang, description }: { lang: Locale; description: string }) {
  const openingHoursSpecification = site.hours.flatMap((h, i) => {
    if (!h) return [];
    const [opens, closes] = h.split("–").map((t) => `${t}:00`);
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${dayNames[i]}`, opens, closes }];
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${site.url}/#business`,
    name: `${site.name} – ${site.tagline}`,
    description,
    url: `${site.url}/${lang}/`,
    inLanguage: localeLabels[lang].htmlLang,
    image: `${site.url}${images.hero.src}`,
    logo: `${site.url}/icon-512.png`,
    telephone: site.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Władysława IV 1",
      postalCode: "81-353",
      addressLocality: "Gdynia",
      addressRegion: "pomorskie",
      addressCountry: "PL",
    },
    areaServed: ["Gdynia", "Sopot", "Gdańsk", "Trójmiasto"],
    openingHoursSpecification,
    sameAs: [site.instagram, site.facebook, site.bookingUrl].filter(Boolean),
    potentialAction: site.bookingUrl ? { "@type": "ReserveAction", target: site.bookingUrl } : undefined,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
