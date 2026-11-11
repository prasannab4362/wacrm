import { ImageResponse } from "next/og";
import { BRAND } from "@/config/brand";

// Seivio favicon — the same mark as `BrandMark` in
// `src/components/brand/brand-mark.tsx`: burgundy rounded square,
// cream speech bubble, dusty-pink "S" swirl. Next.js renders this at
// build time and auto-injects <link rel="icon"> into <head>.

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const { burgundy, cream, dustyPink } = BRAND.colors;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: burgundy,
          borderRadius: 8,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
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
      </div>
    ),
    { ...size },
  );
}
