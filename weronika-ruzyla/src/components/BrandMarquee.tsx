import { site } from "@/content/site";

/** Full-width strip of partner brands with a frosted-glass background instead of a solid fill. */
export default function BrandMarquee({ label }: { label: string }) {
  const row = [...site.brands, ...site.brands];
  return (
    <section
      aria-label={label}
      className="relative overflow-hidden border-y border-white/25 bg-white/[0.06] py-1 backdrop-blur-sm md:py-1.5"
    >
      <p className="sr-only">{site.brands.join(", ")}</p>
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {row.map((brand, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`whitespace-nowrap px-5 text-sm leading-tight text-ink/80 sm:px-8 sm:text-lg ${
                    i % 2 ? "font-light tracking-[0.3em]" : "font-display tracking-[0.08em]"
                  }`}
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
