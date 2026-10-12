import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { tokens } from "@/lib/tokens";

// The preview card shown when the site link is shared on WhatsApp, Instagram etc.
export const alt = `${site.name} — unisex salon in ${site.area}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: tokens.brand,
          color: tokens.surface,
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 3, textTransform: "uppercase", color: tokens.onBrandMuted }}>
          {`Unisex salon · ${site.area}`}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 28, color: tokens.onBrandMuted }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
