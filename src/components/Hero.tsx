import ThornVine from "./ThornVine";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center"
    >
      {/* corner atmosphere */}
      <div className="pointer-events-none absolute -left-16 -top-10 opacity-70 blur-[1px] md:opacity-100">
        <ThornVine id="hero-tl" width={420} height={160} thorns={12} className="w-[280px] md:w-[420px]" />
      </div>
      <div className="pointer-events-none absolute -right-16 -top-10 -scale-x-100 opacity-70 blur-[1px] md:opacity-100">
        <ThornVine id="hero-tr" width={420} height={160} thorns={12} className="w-[280px] md:w-[420px]" />
      </div>
      <div className="pointer-events-none absolute -bottom-6 -left-20 rotate-6 opacity-40 blur-sm">
        <ThornVine id="hero-bl" width={500} height={140} thorns={10} className="w-[320px] md:w-[500px]" />
      </div>
      <div className="pointer-events-none absolute -bottom-6 -right-20 -scale-x-100 rotate-6 opacity-40 blur-sm">
        <ThornVine id="hero-br" width={500} height={140} thorns={10} className="w-[320px] md:w-[500px]" />
      </div>

      <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.5em] text-[var(--muted)]">
        STREETWEAR &middot; CUSTOM &middot; HOME-MADE
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-script)] text-[4.5rem] leading-none chrome-text sm:text-[6.5rem] md:text-[8.5rem]">
        Nikonic
      </h1>

      <p className="mt-6 max-w-xl text-balance font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-[var(--chrome-1)] sm:text-xl">
        COMPOSIZIONI UNICHE SU MARCHI REALI E ORIGINALI
      </p>
      <p className="mt-3 max-w-md text-balance text-sm text-[var(--muted)]">
        Capi e accessori rilavorati a mano, assemblati in composizioni irripetibili.
        Ogni pezzo nasce dalla strada, vive di punk attitude.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#composizioni"
          className="bg-[var(--chrome-1)] px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-black transition-transform hover:-translate-y-0.5"
        >
          SCOPRI LE COMPOSIZIONI
        </a>
        <a
          href="#manifesto"
          className="border border-[var(--chrome-4)] px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[var(--chrome-1)] transition-colors hover:border-[var(--chrome-1)]"
        >
          IL MANIFESTO
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[var(--muted)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
        </svg>
      </div>
    </section>
  );
}
