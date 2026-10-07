"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { bookingLink, images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

const photos = [
  { img: images.hands, offset: "translate-y-6" },
  { img: images.facial, offset: "" },
  { img: images.product, offset: "translate-y-6" },
];

export default function Treatments({ dict }: { dict: Dictionary }) {
  const t = dict.treatments;

  return (
    <section id="treatments" className="blooms px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />

      <div className="mx-auto mt-12 flex max-w-2xl justify-center gap-3 sm:gap-5">
        {photos.map(({ img, offset }, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`relative aspect-[3/4] w-1/3 overflow-hidden rounded-3xl border-4 border-white/80 shadow-xl shadow-espresso/15 ${offset}`}
          >
            <Image src={img.src} alt="" fill sizes="(min-width: 640px) 14rem, 33vw" className="object-cover" />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-4">
        {t.items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card group w-full rounded-3xl px-6 py-7 text-center transition-transform duration-500 hover:-translate-y-1.5 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
          >
            <h3 className="display text-[0.95rem] tracking-[0.04em] text-espresso transition-colors duration-500 group-hover:text-rose">
              {item.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-[0.95rem] leading-relaxed text-mocha">{item.text}</p>
          </motion.article>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <a
          href={bookingLink(dict.bookingMessage)}
          target="_blank"
          rel="noreferrer"
          className="shine eyebrow inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-espresso px-8 py-5 !tracking-[0.18em] text-ivory transition-colors hover:bg-rose sm:px-10 sm:!tracking-[0.28em]"
        >
          {t.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}
