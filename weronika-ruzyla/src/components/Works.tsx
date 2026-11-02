import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import EdgeFade from "./EdgeFade";

type Key = keyof Dictionary["works"]["captions"];
const rows: Key[][] = [
  ["holidayVoucher", "voucherShelf", "medestelle"],
  ["holidayBlack", "voucherEnvelope", "proxn"],
];

/** Two rows of photos drifting in opposite directions, like the Framer draft; pure CSS so scrolling stays smooth. */
export default function Works({ dict }: { dict: Dictionary["works"] }) {
  return (
    <section id="works" data-tone="dark" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#1f5244_0%,#143d30_60%,#0c271f_100%)] py-28 md:py-32">
      <EdgeFade color="#1a4a3c" className="h-24 sm:h-28" />
      <EdgeFade color="#e4d2b8" side="bottom" />
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="light" className="px-5" />
      <p className="mx-auto mt-4 max-w-lg px-5 text-center font-light leading-relaxed text-ivory/80">{dict.text}</p>

      <div className="mt-8 flex flex-col gap-3 sm:gap-4">
        {rows.map((row, r) => (
          <div key={r} className="-my-5 overflow-hidden py-6">
            <div
              className={`marquee-track flex w-max hover:[animation-play-state:paused] ${r === 1 ? "marquee-reverse" : ""}`}
              style={{ animationDuration: r === 0 ? "48s" : "56s" }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-3 pr-3 sm:gap-5 sm:pr-5" aria-hidden={copy === 1}>
                  {[...row, ...row].map((key, i) => {
                    const img = images[key];
                    return (
                      <div
                        key={`${copy}-${i}`}
                        className="relative h-[170px] shrink-0 overflow-hidden rounded-2xl shadow-[0_10px_22px_-12px_rgba(43,36,32,0.45)] sm:h-[260px]"
                        style={{ aspectRatio: `${img.width} / ${img.height}` }}
                      >
                        <Image
                          src={img.src}
                          alt={copy === 0 && i < row.length ? dict.captions[key] : ""}
                          fill
                          sizes="(min-width: 640px) 260px, 160px"
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
