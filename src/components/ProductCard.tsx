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
      className="group relative flex flex-col overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--background-alt)] transition-colors hover:border-[var(--neon)]/60"
    >
      <div className="glass relative flex aspect-square items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-40 w-40 rounded-full bg-white/20 blur-3xl"
        />
        <Icon className="relative h-40 w-40 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105" />
        <a
          href="#contatti"
          className="btn-neon absolute bottom-4 right-4 translate-y-2 rounded-full px-5 py-2 font-[family-name:var(--font-display)] text-xs tracking-[0.2em] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          BUY NOW
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-5 py-4">
        <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] neon-text">
          HOME-MADE
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-white">
          {name}
        </h3>
        <p className="text-xs text-[var(--muted)]">{base}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--chrome-1)]">
          {price}
        </p>
      </div>
    </motion.div>
  );
}
