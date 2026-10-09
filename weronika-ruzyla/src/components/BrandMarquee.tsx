import { site } from "@/content/site";

/** Full-width strip of partner brands with a frosted-glass background instead of a solid fill. */
export default function BrandMarquee({ label }: { label: string }) {
  const row = [...site.brands, ...site.brands];
  return (
    <section
      aria-label={label}
      className="relative overflow-hidden border-y border-white/45 bg-[linear-gradient(140deg,rgba(255,250,242,0.32),rgba(255,250,242,0.08))] py-3 shadow-[inset_0_1px_0_rgba(255,250,242,0.5)] backdrop-blur-md md:py-4"
    >
      <p className="sr-only">{site.brands.join(", ")}</p>
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {row.map((brand, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`whitespace-nowrap px-7 text-xl text-ink sm:px-10 sm:text-3xl ${
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
