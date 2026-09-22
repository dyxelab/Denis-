const links = [
  { label: "Composizioni", href: "#composizioni" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Contatti", href: "#contatti" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-[var(--line)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a
          href="#top"
          className="font-[family-name:var(--font-script)] text-2xl chrome-text tracking-wide"
        >
          Nikonic
        </a>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-white"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </nav>
        <a
          href="#contatti"
          className="border border-[var(--chrome-3)] px-4 py-1.5 font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-[var(--chrome-1)] transition-colors hover:bg-[var(--chrome-3)] hover:text-black"
        >
          RICHIEDI UN PEZZO
        </a>
      </div>
    </header>
  );
}
