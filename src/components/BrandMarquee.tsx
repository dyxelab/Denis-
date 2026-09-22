const brands = [
  "NIKE",
  "ADIDAS",
  "TOMMY HILFIGER",
  "CARHARTT WIP",
  "THE NORTH FACE",
  "LEVI'S",
  "CONVERSE",
  "VANS",
  "NEW BALANCE",
  "STONE ISLAND",
];

export default function BrandMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/20 py-4 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent"
        aria-hidden="true"
      />
      <div className="marquee-track items-center">
        {[...brands, ...brands].map((brand, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 pr-10">
            <span className="font-[family-name:var(--font-display)] text-base tracking-[0.3em] text-[var(--muted)] transition-colors hover:text-[var(--neon)] sm:text-lg">
              {brand}
            </span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[var(--neon)]/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
