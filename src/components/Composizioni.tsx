"use client";

import { motion } from "framer-motion";
import { BagIcon, BootIcon, CapIcon, ChainIcon, HoodieIcon, TeeIcon } from "./ProductArt";
import ProductCard from "./ProductCard";

const items = [
  {
    name: "Tote Nera Ribattuta",
    base: "Base canvas vintage rigenerata a mano",
    price: "€ 68",
    Icon: BagIcon,
  },
  {
    name: "Tee Distressed",
    base: "Capo originale, stampa e strappi custom",
    price: "€ 54",
    Icon: TeeIcon,
  },
  {
    name: "Cap Leather Patch",
    base: "Visiera vintage con toppa cucita a mano",
    price: "€ 46",
    Icon: CapIcon,
  },
  {
    name: "Hoodie Reworked",
    base: "Felpa originale, taglio e cuciture custom",
    price: "€ 89",
    Icon: HoodieIcon,
  },
  {
    name: "Combat Boots Studs",
    base: "Stivali originali con borchie applicate",
    price: "€ 128",
    Icon: BootIcon,
  },
  {
    name: "Chain Kit Argento",
    base: "Catena e ganci lavorati a mano",
    price: "€ 32",
    Icon: ChainIcon,
  },
];

export default function Composizioni() {
  return (
    <section id="composizioni" className="relative border-t border-[var(--line)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex flex-col items-start gap-3"
        >
          <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] neon-text">
            LA COLLEZIONE
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-white sm:text-5xl">
            COMPOSIZIONI <span className="neon-text">HOME-MADE</span>
          </h2>
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            Ogni pezzo parte da un capo o accessorio originale e reale, scelto e
            rilavorato a mano nel nostro studio: strappi, cuciture, borchie,
            stampe. Nessun pezzo è uguale all&apos;altro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProductCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
