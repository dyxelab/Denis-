"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";

type ProductCardProps = {
  name: string;
  base: string;
  price: string;
  Icon: ComponentType<{ className?: string }>;
};

export default function ProductCard({ name, base, price, Icon }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-[var(--neon)]/60"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-40 w-40 rounded-full bg-white/20 blur-3xl"
        />
        <Icon className="relative h-40 w-40 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transition-all duration-300 sm:group-hover:scale-105 sm:group-hover:blur-sm" />

        {/* mobile: buy now is always visible, no hover needed on touch */}
        <a
          href="#contatti"
          className="btn-neon absolute bottom-3 right-3 px-4 py-1.5 font-[family-name:var(--font-display)] text-[0.65rem] tracking-[0.15em] sm:hidden"
        >
          BUY NOW
        </a>

        {/* desktop/tablet: blurred overlay revealed on hover */}
        <div className="absolute inset-0 hidden items-center justify-center bg-black/45 opacity-0 backdrop-blur-md transition-opacity duration-300 sm:flex sm:group-hover:opacity-100">
          <a
            href="#contatti"
            className="btn-neon scale-90 px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.25em] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
          >
            BUY NOW
          </a>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col gap-1 border-t border-white/10 px-5 py-3 text-center sm:text-left">
        <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] neon-text">
          HOME-MADE
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-white">
          {name}
        </h3>
        <p className="text-xs tracking-wide text-[var(--muted)] sm:tracking-normal">{base}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--chrome-1)] sm:tracking-normal">
          {price}
        </p>
      </div>
    </motion.div>
  );
}
