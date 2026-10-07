import { site } from "@/content/site";

export default function BrandMarquee({ label }: { label: string }) {
  const row = [...site.brands, ...site.brands, ...site.brands];
  return (
    <section aria-label={label} className="overflow-hidden border-y border-espresso/10 bg-sand-deep py-10">
      <p className="eyebrow mb-8 text-center text-[0.62rem] text-espresso/70">{label}</p>
      <div className="flex w-max marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((brand, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className={`px-10 text-4xl text-espresso/85 sm:px-14 sm:text-5xl ${i % 2 ? "display italic" : "font-medium tracking-[0.25em]"}`}>
                  {brand}
                </span>
                <span className="text-rose">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
