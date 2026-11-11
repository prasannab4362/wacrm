import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * "Built by Prasanna B & Pranash" credit line with GitHub links.
 * Used on the auth screens, the sidebar footer and Settings → Overview.
 */
export function Credits({
  className,
  linkClassName,
  prefix = "Built by",
}: {
  className?: string;
  linkClassName?: string;
  prefix?: string;
}) {
  const [first, second] = BRAND.creators;
  const link = (c: (typeof BRAND.creators)[number]) => (
    <a
      href={c.github}
      target="_blank"
      rel="noopener noreferrer"
      title={`${c.name} on GitHub (@${c.handle})`}
      className={cn(
        "font-medium underline-offset-2 hover:underline",
        linkClassName,
      )}
    >
      {c.name}
    </a>
  );
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {prefix} {link(first)} &amp; {link(second)}
    </p>
  );
}
