"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section id="about" className="blooms px-5 py-14 sm:px-8 md:py-20">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />

      <div className="relative mx-auto mt-8 flex max-w-2xl items-end justify-center gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] w-[44%] max-w-[14rem] overflow-hidden rounded-3xl shadow-2xl shadow-espresso/20"
        >
          <Image src={images.portrait.src} alt="Weronika Rużyła" fill sizes="(min-width: 640px) 17rem, 46vw" className="object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 5 }}
          whileInView={{ opacity: 1, y: -24, rotate: 3 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] w-[44%] max-w-[14rem] overflow-hidden rounded-3xl shadow-2xl shadow-espresso/20"
        >
          <Image src={images.portraitBw.src} alt="" fill sizes="(min-width: 640px) 17rem, 46vw" className="object-cover" />
        </motion.div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <Reveal>
          <p className="leading-relaxed text-mocha sm:text-lg">{dict.p1}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 leading-relaxed text-mocha sm:text-lg">{dict.p2}</p>
        </Reveal>
      </div>

      <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
        {dict.values.map((v, i) => (
          <motion.li
            key={v}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card eyebrow rounded-full px-5 py-2.5 text-center text-[0.58rem] text-espresso"
          >
            {v}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
