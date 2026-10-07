"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowRight, Sparkle } from "./Icons";

export default function Academy({ dict }: { dict: Dictionary["academy"] }) {
  return (
    <section id="academy" className="bg-cream px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 overflow-hidden rounded-[2.5rem] bg-espresso p-8 text-ivory sm:p-12 md:grid-cols-[1.2fr_0.8fr] md:p-16">
        <div>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="light" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-sand">{dict.text}</p>
          </Reveal>
          <ul className="mt-8 flex flex-col gap-3">
            {dict.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <Sparkle className="h-5 w-5 text-rose" />
                <span className="eyebrow text-[0.68rem]">{p}</span>
              </motion.li>
            ))}
          </ul>
          <Reveal delay={0.5} className="mt-10">
            <a
              href={whatsappLink(dict.message)}
              target="_blank"
              rel="noreferrer"
              className="shine eyebrow inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-ivory px-7 py-5 !tracking-[0.18em] sm:px-9 sm:!tracking-[0.32em] text-espresso transition-colors hover:bg-rose hover:text-ivory"
            >
              {dict.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
        <motion.div
          initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
          whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] rounded-tr-[7rem]"
        >
          <Image src={images.voucher.src} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
