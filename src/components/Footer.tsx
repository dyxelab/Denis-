const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer id="contatti" className="relative border-t border-[var(--line)] px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-[var(--muted)]">
          VUOI UN PEZZO UNICO?
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-script)] text-5xl chrome-text sm:text-6xl">
          Parliamone
        </h2>
        <p className="mt-4 max-w-md text-sm text-[var(--muted)]">
          Scrivici su Instagram o via email per ordinare una composizione o
          proporre il tuo capo da rilavorare. Ogni richiesta viene seguita a
          mano, una alla volta.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:info@nikonic.it"
            className="bg-[var(--chrome-1)] px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-black transition-transform hover:-translate-y-0.5"
          >
            SCRIVICI
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--chrome-4)] px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[var(--chrome-1)] transition-colors hover:border-[var(--chrome-1)]"
            >
              {social.label.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="mt-16 flex w-full flex-col items-center gap-2 border-t border-[var(--line)] pt-8 text-xs text-[var(--muted)]">
          <span className="font-[family-name:var(--font-script)] text-xl chrome-text">
            Nikonic
          </span>
          <span>&copy; {new Date().getFullYear()} Nikonic. Tutti i pezzi sono fatti a mano, in edizione limitata.</span>
        </div>
      </div>
    </footer>
  );
}
