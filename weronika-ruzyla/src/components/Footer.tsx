"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images, site } from "@/content/site";
import Monogram from "./Monogram";
import { Facebook, Instagram, WhatsApp } from "./Icons";

export default function Footer({ dict }: { dict: Dictionary }) {
  const f = dict.footer;
  const words = f.quote.split(" ");
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <Image src={images.hero.src} alt="" fill sizes="100vw" className="object-cover object-[50%_30%] opacity-25 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-10 pt-24 text-center sm:px-8 md:pt-32">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Monogram draw className="h-24 w-auto" />
        </motion.div>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-10 h-px w-32 bg-ivory/40"
        />

        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ staggerChildren: 0.05 }}
          className="display mt-10 text-[clamp(2rem,5vw,3.6rem)] italic leading-[1.1]"
        >
          “
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 0.8 }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
          ”
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 max-w-xl text-lg font-light leading-relaxed text-sand"
        >
          {f.sub}
        </motion.p>

        <p className="eyebrow mt-16 text-sand">{f.getInTouch}</p>
        <div className="mt-6 flex gap-4">
          {[
            { href: site.instagram, Icon: Instagram, label: "Instagram" },
            { href: site.facebook, Icon: Facebook, label: "Facebook" },
            { href: `https://wa.me/${site.whatsappNumber}`, Icon: WhatsApp, label: "WhatsApp" },
          ].map(({ href, Icon, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/15 bg-ivory/5 backdrop-blur transition-colors hover:border-rose hover:bg-rose"
            >
              <Icon className="h-6 w-6" />
            </motion.a>
          ))}
        </div>

        <a href="#home" className="eyebrow mt-16 text-[0.6rem] text-sand/70 transition-colors hover:text-ivory">
          ↑ {f.backToTop}
        </a>

        <div className="mt-10 w-full border-t border-ivory/10 pt-8 text-sm">
          <p className="font-light text-sand">
            © {new Date().getFullYear()} {site.name} <span className="mx-2 opacity-40">|</span> {f.rights}
          </p>
          <p className="eyebrow mt-3 text-[0.6rem] text-sand/70">
            {f.createdBy} <span className="text-ivory">{site.credit.name}</span> | <span className="text-ivory">{site.credit.studio}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
