import ThornVine from "./ThornVine";

const pillars = [
  {
    title: "REALE",
    text: "Partiamo sempre da capi e accessori originali, veri, mai repliche.",
  },
  {
    title: "HOME-MADE",
    text: "Ogni intervento — cuciture, strappi, borchie, stampe — è fatto a mano.",
  },
  {
    title: "UNICO",
    text: "Piccoli lotti, pezzi numerati. Quello che compri non lo trovi altrove.",
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--background-alt)] px-6 py-24"
    >
      <div className="pointer-events-none absolute -left-10 top-0 opacity-30 blur-sm">
        <ThornVine id="manifesto-l" width={360} height={100} thorns={9} className="w-[260px]" />
      </div>
      <div className="pointer-events-none absolute -right-10 bottom-0 -scale-x-100 opacity-30 blur-sm">
        <ThornVine id="manifesto-r" width={360} height={100} thorns={9} className="w-[260px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-[var(--muted)]">
          IL MANIFESTO
        </span>
        <h2 className="mt-4 text-balance font-[family-name:var(--font-display)] text-3xl leading-tight tracking-wide text-white sm:text-4xl">
          NON SEGUIAMO LO STREETWEAR.
          <br />
          LO <span className="chrome-text">RICOSTRUIAMO</span> A MANO.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Nikonic nasce dalla strada e dal punk. Prendiamo capi e accessori
          reali, li smontiamo e li rimontiamo secondo la nostra estetica:
          grezza, metallica, ribelle. Il risultato sono composizioni
          irripetibili, pensate per chi non vuole essere uguale a tutti.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="border-t border-[var(--chrome-4)] pt-5">
              <h3 className="font-[family-name:var(--font-display)] text-lg tracking-[0.2em] chrome-text">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
