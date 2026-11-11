import { cn } from "@/lib/utils";
import { BRAND } from "@/config/brand";

/**
 * Seivio logo mark — a burgundy rounded square holding a cream speech
 * bubble with a dusty-pink "S" swirl. Pure SVG with fixed brand colours
 * so it reads the same in light and dark mode and on any accent theme.
 * `src/app/icon.tsx` draws the same mark for the favicon.
 */
export function BrandMark({
  className,
  title = BRAND.name,
}: {
  className?: string;
  title?: string;
}) {
  const { burgundy, cream, dustyPink } = BRAND.colors;
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill={burgundy} />
      <path
        d="M8 9.5A2.5 2.5 0 0 1 10.5 7h11A2.5 2.5 0 0 1 24 9.5v8a2.5 2.5 0 0 1-2.5 2.5H14l-4.6 3.8c-.5.4-1.4.1-1.4-.6V9.5Z"
        fill={cream}
      />
      <path
        d="M19.2 10.6c-.6-.5-1.5-.8-2.6-.8-1.8 0-3 .9-3 2.2 0 1.2.9 1.7 2.5 2.1 1.1.3 1.5.5 1.5 1 0 .5-.6.9-1.5.9-.9 0-1.7-.3-2.3-.9"
        fill="none"
        stroke={dustyPink}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Logo mark + wordmark, for headers and brand panels. */
export function BrandLogo({
  className,
  markClassName,
  textClassName,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark className={markClassName} />
      <span
        className={cn(
          "text-base font-semibold tracking-tight text-foreground",
          textClassName,
        )}
      >
        {BRAND.name}
      </span>
    </span>
  );
}
