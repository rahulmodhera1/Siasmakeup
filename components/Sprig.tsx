import Image from "next/image";

/**
 * Decorative greenery sprig. Purely ornamental (aria-hidden), positioned
 * absolutely by the caller — keep it faint and tucked toward an edge.
 * The parent section needs `relative overflow-hidden`.
 */
export function Sprig({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <Image
      src="/images/hero/sprig.svg"
      alt=""
      aria-hidden
      width={200}
      height={340}
      className={`pointer-events-none absolute select-none ${flip ? "-scale-x-100" : ""} ${className}`}
    />
  );
}
