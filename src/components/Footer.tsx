"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer id="contatti" className="relative border-t border-[var(--line)] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] neon-text">
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

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:info@nikonic.it"
            className="btn-neon px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em]"
          >
            SCRIVICI
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="btn-neon-outline px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em]"
            >
              {social.label.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="mt-10 flex w-full flex-col items-center gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)]">
          <Image
            src="/nikonic-logo.jpg"
            alt="Nikonic"
            width={1079}
            height={674}
            className="h-8 w-auto object-contain mix-blend-screen"
          />
          <span>&copy; {new Date().getFullYear()} Nikonic. Tutti i pezzi sono fatti a mano, in edizione limitata.</span>
        </div>
      </motion.div>
    </footer>
  );
}
