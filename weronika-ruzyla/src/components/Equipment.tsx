"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import SectionHeading from "./SectionHeading";

export default function Equipment({ dict }: { dict: Dictionary["equipment"] }) {
  return (
    <section id="equipment" className="bg-ivory px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} align="center" />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {dict.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-espresso/10 bg-cream p-8 md:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-soft/0 blur-2xl transition-all duration-700 group-hover:bg-rose-soft/70" />
              <span className="display relative block text-7xl italic text-sand-deep transition-colors duration-500 group-hover:text-rose">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="eyebrow relative mt-10 text-[0.62rem] text-taupe">{item.brand}</p>
              <h3 className="display relative mt-3 text-4xl text-espresso">{item.title}</h3>
              <p className="relative mt-4 font-light leading-relaxed text-mocha">{item.text}</p>
              <span className="relative mt-8 block h-px w-12 bg-espresso/30 transition-all duration-700 group-hover:w-full group-hover:bg-rose" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
