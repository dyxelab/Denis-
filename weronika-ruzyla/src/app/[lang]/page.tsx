import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Treatments from "@/components/Treatments";
import Dermalux from "@/components/Dermalux";
import Equipment from "@/components/Equipment";
import Academy from "@/components/Academy";
import Support from "@/components/Support";
import BrandMarquee from "@/components/BrandMarquee";
import FindMe from "@/components/FindMe";
import Footer from "@/components/Footer";
import FloatingBook from "@/components/FloatingBook";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Intro label={dict.intro} />
      <Header lang={lang} dict={dict} />
      <main>
        <Hero dict={dict} />
        <About dict={dict.about} />
        <Works dict={dict.works} />
        <Treatments dict={dict} />
        <Dermalux dict={dict.dermalux} />
        <Equipment dict={dict.equipment} />
        <Support dict={dict.support} />
        <Academy dict={dict.academy} />
        <BrandMarquee label={dict.brands.eyebrow} />
        <FindMe dict={dict} />
      </main>
      <Footer dict={dict} />
      <FloatingBook dict={dict} />
    </>
  );
}
