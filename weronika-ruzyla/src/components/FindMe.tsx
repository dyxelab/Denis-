"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { site, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Clock, Facebook, Instagram, MapPin, Phone, WhatsApp } from "./Icons";

export default function FindMe({ dict }: { dict: Dictionary }) {
  const f = dict.find;
  const rows = [
    { icon: Phone, label: f.phone, value: site.phone, href: site.phoneHref },
    { icon: WhatsApp, label: f.whatsapp, value: site.phone, href: whatsappLink(dict.bookingMessage) },
    { icon: Clock, label: f.hours, value: f.hoursValue },
    ...(site.address
      ? [{ icon: MapPin, label: f.address, value: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}` }]
      : []),
  ];

  return (
    <section id="find" className="bg-ivory px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={f.eyebrow} title={f.title} icon="heart" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-mocha">{f.text}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <p className="eyebrow text-[0.62rem] text-taupe">{f.social}</p>
            <div className="mt-4 flex gap-3">
              {[
                { href: site.instagram, Icon: Instagram, label: "Instagram" },
                { href: site.facebook, Icon: Facebook, label: "Facebook" },
                { href: `https://wa.me/${site.whatsappNumber}`, Icon: WhatsApp, label: "WhatsApp" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-all duration-500 hover:-translate-y-1 hover:border-rose hover:bg-rose hover:text-ivory"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="flex flex-col justify-center">
          {rows.map(({ icon: Icon, label, value, href }, i) => {
            const body = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-rose transition-colors duration-500 group-hover:bg-rose group-hover:text-ivory">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="eyebrow text-[0.6rem] text-taupe">{label}</span>
                  <span className="display mt-1 text-3xl text-espresso">{value}</span>
                </span>
              </>
            );
            return (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-espresso/10 first:border-t"
              >
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-6 py-6">
                    {body}
                  </a>
                ) : (
                  <div className="group flex items-center gap-6 py-6">{body}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
