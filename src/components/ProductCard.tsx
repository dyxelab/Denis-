import type { ComponentType } from "react";

type ProductCardProps = {
  name: string;
  base: string;
  price: string;
  Icon: ComponentType<{ className?: string }>;
};

export default function ProductCard({ name, base, price, Icon }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col border border-[var(--line)] bg-[var(--background-alt)] transition-colors hover:border-[var(--chrome-3)]">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden noise-card">
        <Icon className="h-40 w-40 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105" />
        <a
          href="#contatti"
          className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-emerald-500/90 px-5 py-2 font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-black opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          BUY NOW
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-5 py-4">
        <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] text-[var(--muted)]">
          HOME-MADE
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-white">
          {name}
        </h3>
        <p className="text-xs text-[var(--muted)]">{base}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--chrome-1)]">
          {price}
        </p>
      </div>
    </div>
  );
}
