import BrandMarquee from "@/components/BrandMarquee";
import Composizioni from "@/components/Composizioni";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <Composizioni />
        <Manifesto />
        <span aria-hidden="true" className="ornament-diamond my-2 block sm:hidden" />
      </main>
      <Footer />
    </>
  );
}
