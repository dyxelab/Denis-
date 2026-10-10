import { wordmark } from "@/content/site";

/** The "Weronika Rużyła" lettering from the brand files, as a mask so it takes the current text colour. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Weronika Rużyła"
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: `${wordmark.width} / ${wordmark.height}`,
        WebkitMaskImage: `url(${wordmark.src})`,
        maskImage: `url(${wordmark.src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
