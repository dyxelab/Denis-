"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { bookingLink, images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

export default function Treatments({ dict }: { dict: Dictionary }) {
  const t = dict.treatments;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section ref={ref} id="treatments" className="relative bg-cream px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} icon="heart" />

        <div className="mt-16 grid gap-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative h-[460px] md:sticky md:top-28 md:h-[640px]">
            <motion.div
              style={{ y: yA }}
              className="absolute right-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem] rounded-tl-[6rem]"
            >
              <Image src={images.facial.src} alt={t.items[1].title} fill sizes="(min-width: 768px) 30vw, 72vw" className="object-cover" />
            </motion.div>
            <motion.div
              style={{ y: yB, rotate }}
              className="absolute bottom-0 left-0 h-[58%] w-[48%] overflow-hidden rounded-[2rem] rounded-br-[5rem] border-[6px] border-cream shadow-2xl shadow-espresso/25"
            >
              <Image src={images.hands.src} alt="" fill sizes="(min-width: 768px) 20vw, 48vw" className="object-cover" />
            </motion.div>
          </div>

          <div>
            <ol className="border-t border-espresso/15">
              {t.items.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative border-b border-espresso/15 py-8"
                >
                  <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-rose transition-all duration-700 group-hover:w-full" />
                  <div className="flex items-start gap-6">
                    <span className="eyebrow mt-3 text-[0.65rem] text-taupe">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <h3 className="display text-[clamp(1.9rem,3.4vw,2.75rem)] text-espresso transition-all duration-500 group-hover:translate-x-2 group-hover:italic">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-md font-light leading-relaxed text-mocha">{item.text}</p>
                    </div>
                    <span className="mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-rose group-hover:bg-rose group-hover:text-ivory">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.li>
              ))}
            </ol>
            <Reveal delay={0.2} className="mt-12">
              <a
                href={bookingLink(dict.bookingMessage)}
                target="_blank"
                rel="noreferrer"
                className="shine eyebrow inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-taupe px-8 py-5 !tracking-[0.18em] sm:px-10 sm:!tracking-[0.32em] text-ivory transition-colors hover:bg-espresso"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
