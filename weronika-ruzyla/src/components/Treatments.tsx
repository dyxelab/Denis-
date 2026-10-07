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
  const yB = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [6, -4]);

  return (
    <section ref={ref} id="treatments" className="relative bg-cream px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} icon="heart" />
          <ol className="mt-10 border-t border-espresso/15">
            {t.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border-b border-espresso/15 py-5"
              >
                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-rose transition-all duration-700 group-hover:w-full" />
                <div className="flex items-baseline gap-5">
                  <span className="eyebrow text-[0.62rem] text-taupe">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <h3 className="display text-[clamp(1.6rem,2.6vw,2.2rem)] text-espresso transition-all duration-500 group-hover:translate-x-2 group-hover:italic">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-[0.95rem] font-light leading-relaxed text-mocha">{item.text}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
          <Reveal delay={0.2} className="mt-10">
            <a
              href={bookingLink(dict.bookingMessage)}
              target="_blank"
              rel="noreferrer"
              className="shine eyebrow inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-taupe px-8 py-5 !tracking-[0.18em] text-ivory transition-colors hover:bg-espresso sm:px-10 sm:!tracking-[0.32em]"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        {/* mirrored collage: the arch opens on the left, opposite the hero arch */}
        <div className="relative hidden h-[600px] md:block">
          <motion.div
            style={{ y: yA }}
            className="absolute left-0 top-0 h-[80%] w-[72%] overflow-hidden rounded-[2rem] rounded-t-[999px]"
          >
            <Image src={images.facial.src} alt={t.items[1].title} fill sizes="(min-width: 768px) 30vw, 72vw" className="object-cover" />
          </motion.div>
          <motion.div
            style={{ y: yB, rotate }}
            className="absolute bottom-0 right-0 h-[55%] w-[46%] overflow-hidden rounded-[2rem] rounded-b-[999px] border-[6px] border-cream shadow-2xl shadow-espresso/25"
          >
            <Image src={images.hands.src} alt="" fill sizes="(min-width: 768px) 20vw, 46vw" className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
