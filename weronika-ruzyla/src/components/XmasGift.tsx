"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";
import EdgeFade from "./EdgeFade";

const SH = "shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]";

/** Christmas gift-voucher block on deep wine, with gold accents. */
export default function XmasGift({ dict }: { dict: Dictionary["xmas"] }) {
  return (
    <section id="gift" data-tone="dark" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#8a1d30_0%,#5c1020_55%,#3d0a14_100%)] px-5 py-28 text-ivory sm:px-8 md:py-32">
      <EdgeFade color="#7f1b2e" className="h-24 sm:h-28" />
      <EdgeFade color="#1a4a3c" side="bottom" />
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="light" />
      <div className="relative mx-auto mt-8 flex max-w-2xl items-end justify-center gap-4 sm:gap-6">
        {[images.voucherEnvelope, images.holidayVoucher].map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: i ? -18 : 0, rotate: i ? 3 : -3 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`relative aspect-[3/4] w-[44%] max-w-[14rem] overflow-hidden rounded-3xl ring-1 ring-gold/50 ${SH}`}
          >
            <Image src={img.src} alt="" fill sizes="(min-width: 640px) 14rem, 44vw" className="object-cover" />
          </motion.div>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-xl text-center leading-relaxed text-ivory/85">{dict.text}</p>
      </Reveal>
      <Reveal delay={0.2} className="mt-8 flex justify-center">
        <a
          href={whatsappLink(dict.message)}
          target="_blank"
          rel="noreferrer"
          className="shine eyebrow inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-gradient-to-r from-[#b8893a] via-[#e3c57d] to-[#b8893a] px-8 py-4 text-wine-deep shadow-[0_12px_30px_-12px_rgba(201,162,79,0.7)] transition-transform hover:scale-[1.03]"
        >
          {dict.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}
