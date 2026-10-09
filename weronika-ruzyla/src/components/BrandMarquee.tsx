import { site } from "@/content/site";

/** Small frosted-glass pill with the partner brands scrolling inside; sits over the hero photo. */
export default function BrandMarquee({ label, className = "" }: { label: string; className?: string }) {
  const row = [...site.brands, ...site.brands];
  return (
    <div aria-label={label} className={`glass overflow-hidden rounded-full py-2.5 ${className}`}>
      <p className="sr-only">{site.brands.join(", ")}</p>
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {row.map((brand, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`whitespace-nowrap px-5 text-sm text-ivory sm:px-7 sm:text-base ${
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
    </div>
  );
}
