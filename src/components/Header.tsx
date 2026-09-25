"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Composizioni", href: "#composizioni" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Contatti", href: "#contatti" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-header fixed top-0 inset-x-0 z-30"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 sm:py-2">
        <a href="#top" className="block">
          <Image
            src="/nikonic-logo.jpg"
            alt="Nikonic"
            width={1079}
            height={674}
            priority
            className="h-11 w-auto object-contain mix-blend-screen sm:h-14"
          />
        </a>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--neon)]"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </nav>
        <a
          href="#contatti"
          className="btn-neon-outline px-3 py-1 font-[family-name:var(--font-display)] text-[0.65rem] tracking-[0.15em] sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.2em]"
        >
          RICHIEDI UN PEZZO
        </a>
      </div>
    </motion.header>
  );
}
