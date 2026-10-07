import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images } from "@/content/site";
import SectionHeading from "./SectionHeading";

type Key = keyof Dictionary["works"]["captions"];
const rows: Key[][] = [
  ["voucherGift", "portrait", "facial", "product"],
  ["voucher", "hands", "voucherGift", "facial", "portrait"],
];

/** Two rows of photos drifting in opposite directions, like the Framer draft; pure CSS so scrolling stays smooth. */
export default function Works({ dict }: { dict: Dictionary["works"] }) {
  return (
    <section id="works" className="overflow-hidden bg-sand py-20 md:py-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} icon="heart" align="center" className="px-5" />
      <p className="mx-auto mt-5 max-w-lg px-5 text-center font-light leading-relaxed text-mocha">{dict.text}</p>

      <div className="mt-12 flex flex-col gap-3 sm:gap-5">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
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
                        className="relative h-[200px] shrink-0 overflow-hidden rounded-md sm:h-[320px]"
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
