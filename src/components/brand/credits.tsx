import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * "Designed by Pranash & Prasanna B · Based on wacrm" credit line with
 * GitHub links. Used on the auth screens, the sidebar footer and
 * Settings → Overview.
 *
 * `showBasedOn` controls the wacrm attribution; `stacked` puts it on a
 * second line for narrow spaces like the sidebar.
 */
export function Credits({
  className,
  linkClassName,
  prefix = "Designed by",
  showBasedOn = true,
  stacked = false,
}: {
  className?: string;
  linkClassName?: string;
  prefix?: string;
  showBasedOn?: boolean;
  stacked?: boolean;
}) {
  const [first, second] = BRAND.creators;
  const linkCls = cn(
    "font-medium underline-offset-2 hover:underline",
    linkClassName,
  );
  const person = (c: (typeof BRAND.creators)[number]) => (
    <a
      href={c.github}
      target="_blank"
      rel="noopener noreferrer"
      title={`${c.name} on GitHub (@${c.handle})`}
      className={linkCls}
    >
      {c.name}
    </a>
  );
  const basedOn = (
    <>
      Based on{" "}
      <a
        href={BRAND.basedOn.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`${BRAND.basedOn.name} by ${BRAND.basedOn.author} (MIT)`}
        className={linkCls}
      >
        {BRAND.basedOn.name}
      </a>
    </>
  );

  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {prefix} {person(first)} &amp; {person(second)}
      {showBasedOn &&
        (stacked ? (
          <>
            <br />
            {basedOn}
          </>
        ) : (
          <>
            <span aria-hidden> · </span>
            {basedOn}
          </>
        ))}
    </p>
  );
}
