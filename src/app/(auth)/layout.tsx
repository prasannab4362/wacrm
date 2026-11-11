import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BRAND } from "@/config/brand";
import { BrandMark } from "@/components/brand/brand-mark";
import { Credits } from "@/components/brand/credits";

// Shared metadata for auth pages (login / signup / forgot-password).
// None of these should be indexed — they'd compete with the marketing
// landing in SERPs and offer nothing to a searcher who hasn't already
// signed up. Each page still gets its own <title> via its own
// metadata.title override below the route group layout.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const HIGHLIGHTS = [
  "One shared WhatsApp inbox for the whole team",
  "Contacts, pipelines and broadcasts in one place",
  "No-code automations and an AI reply assistant",
];

/**
 * Seivio auth frame: a burgundy brand panel on the left (desktop) and
 * the page's own form card on the right. The brand panel uses fixed
 * brand colours so it looks identical in light and dark mode. On mobile
 * the panel collapses to a slim header strip above the form.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  const { burgundy, burgundyDeep, cream, dustyPink } = BRAND.colors;

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel — desktop */}
      <aside
        className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12"
        style={{
          background: `radial-gradient(120% 90% at 0% 0%, ${burgundy} 0%, ${burgundyDeep} 70%)`,
          color: cream,
        }}
      >
        {/* Soft dusty-pink glow for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full opacity-25 blur-3xl"
          style={{ background: dustyPink }}
        />

        <div className="relative flex items-center gap-3">
          <BrandMark className="size-10 ring-1 ring-white/15 rounded-[10px]" />
          <span className="text-2xl font-semibold tracking-tight">
            {BRAND.name}
          </span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl leading-tight font-semibold tracking-tight">
            {BRAND.tagline}
          </h2>
          <ul className="mt-8 space-y-3 text-sm" style={{ color: `${cream}d9` }}>
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{ background: dustyPink }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <Credits
          className="relative text-sm"
          linkClassName="underline decoration-[#d8a7b1]/60 hover:decoration-[#d8a7b1]"
        />
      </aside>

      {/* Form column */}
      <div className="flex min-w-0 flex-col bg-background">
        {/* Brand strip — mobile only */}
        <div
          className="flex items-center gap-2 px-4 py-3 lg:hidden"
          style={{ background: burgundy, color: cream }}
        >
          <BrandMark className="size-7" />
          <span className="text-base font-semibold tracking-tight">
            {BRAND.name}
          </span>
        </div>

        {/* Pages render their own full-screen centred card; the wrapper
            lets that card fill just the remaining space instead. */}
        <div className="flex flex-1 flex-col [&>div]:min-h-0 [&>div]:flex-1 [&>div]:py-10">
          {children}
        </div>

        <Credits
          className="pb-6 text-center lg:hidden"
          linkClassName="text-foreground hover:text-primary"
        />
      </div>
    </div>
  );
}
