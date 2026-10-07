import { site } from "@/content/site";
import { Sparkle } from "./Icons";

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
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-8 text-4xl text-ink sm:px-12 sm:text-6xl ${
                    i % 2 ? "display italic" : "font-semibold tracking-[0.2em]"
                  }`}
                >
                  {brand}
                </span>
                <Sparkle className="h-6 w-6 shrink-0 text-rose" />
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
