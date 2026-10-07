import { site } from "@/content/site";

/** Animated strip of partner brands; it keeps moving even with reduced motion because it is the brand's signature element. */
export default function BrandMarquee({ label }: { label: string }) {
  const row = [...site.brands, ...site.brands];
  return (
    <section aria-label={label} className="relative overflow-hidden border-y border-espresso/10 bg-sand-deep py-6 md:py-8">
      <p className="sr-only">{site.brands.join(", ")}</p>
      <div className="marquee-track flex w-max hover:[animation-play-state:paused]" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((brand, i) => (
              <span
                key={`${copy}-${i}`}
                className={`whitespace-nowrap px-10 text-4xl text-ink sm:px-16 sm:text-6xl ${
                  i % 2 ? "font-light tracking-[0.3em]" : "font-semibold tracking-[0.12em]"
                }`}
              >
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sand-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sand-deep to-transparent" />
    </section>
  );
}
