"use client";

import { motion } from "framer-motion";
import Monogram from "./Monogram";

export default function RotatingBadge({ text, className = "" }: { text: string; className?: string }) {
  const content = `${text} • ${text} • `;
  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="currentColor" style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          <textPath href="#badge-circle" textLength="482">
            {content}
          </textPath>
        </text>
      </motion.svg>
      <Monogram className="absolute left-1/2 top-1/2 h-[42%] w-auto -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
