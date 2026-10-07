"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About({ dict }: { dict: Dictionary["about"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["15%", "-30%"]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-cream px-5 py-24 sm:px-8 md:py-36">
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -right-8 top-10 select-none text-[28vw] italic leading-none text-sand/40 md:text-[18vw]"
      >
        WR
      </span>
      <div className="relative mx-auto grid max-w-7xl items-center gap-24 md:grid-cols-2 md:gap-20">
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <motion.div
            style={{ y: yBig }}
            initial={{ clipPath: "inset(0 0 100% 0 round 999px 999px 24px 24px)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0 round 999px 999px 24px 24px)" }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[3/4] w-[82%] overflow-hidden"
          >
            <Image src={images.portrait.src} alt="Weronika Rużyła" fill sizes="(min-width: 768px) 40vw, 80vw" className="object-cover" />
          </motion.div>
          <motion.div
            style={{ y: ySmall }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 right-0 aspect-[4/5] w-[44%] overflow-hidden rounded-2xl border-[6px] border-cream shadow-2xl shadow-espresso/20"
          >
            <Image src={images.voucherGift.src} alt="" fill sizes="(min-width: 768px) 20vw, 40vw" className="object-cover" />
          </motion.div>
        </div>

        <div>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} icon="heart" />
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg font-light leading-relaxed text-mocha">{dict.p1}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 text-lg font-light leading-relaxed text-mocha">{dict.p2}</p>
          </Reveal>
          <ul className="mt-10 divide-y divide-espresso/10 border-y border-espresso/10">
            {dict.values.map((v, i) => (
              <motion.li
                key={v}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-5 py-4"
              >
                <span className="display text-2xl italic text-rose">0{i + 1}</span>
                <span className="eyebrow text-espresso">{v}</span>
              </motion.li>
            ))}
          </ul>
          <Reveal delay={0.6}>
            <p className="display mt-10 text-5xl italic text-taupe">Weronika</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
