import type { Metadata } from "next";
import { Bebas_Neue, Inter, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIKONIC — Streetwear Custom",
  description:
    "NIKONIC: composizioni streetwear home-made costruite su capi e accessori di marchi reali e originali. Stile street/punk, pezzi unici.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${bebasNeue.variable} ${mrsSaintDelafield.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)] font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
