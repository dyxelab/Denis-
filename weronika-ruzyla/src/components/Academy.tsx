"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

export default function Academy({ dict }: { dict: Dictionary["academy"] }) {
  return (
    <section id="academy" className="relative overflow-hidden px-5 py-20 sm:px-8 md:py-28">
      {/* static blurred photo behind a glass panel */}
      <Image src={images.voucher.src} alt="" fill sizes="100vw" className="scale-110 object-cover blur-md" />
      <div className="absolute inset-0 bg-espresso/55" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-dark relative mx-auto flex max-w-3xl flex-col items-center rounded-[2.5rem] px-6 py-12 text-center text-ivory sm:px-12 sm:py-16"
      >
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="light" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/85">{dict.text}</p>
        </Reveal>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {dict.points.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
              className="glass-dark eyebrow rounded-full px-4 py-2.5 text-[0.6rem]"
            >
              {p}
            </motion.li>
          ))}
        </ul>
        <Reveal delay={0.4} className="mt-10">
          <a
            href={whatsappLink(dict.message)}
            target="_blank"
            rel="noreferrer"
            className="shine eyebrow inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-ivory px-7 py-5 !tracking-[0.16em] text-espresso transition-colors hover:bg-rose hover:text-ivory sm:px-9 sm:!tracking-[0.28em]"
          >
            {dict.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </motion.div>
    </section>
  );
}
