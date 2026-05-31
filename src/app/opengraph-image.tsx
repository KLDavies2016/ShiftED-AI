/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ShiftED AI — Build the human skills, one practice at a time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG card. Pure JSX + inline styles (Edge runtime constraint).
 * Uses brand gradient on the deep-navy background to match the site.
 */
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 30% 20%, rgba(250,102,198,0.4), transparent 55%), radial-gradient(circle at 80% 80%, rgba(84,112,254,0.4), transparent 55%), #00092d",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "Inter, system-ui",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #fa66c6 0%, #a76be2 50%, #5470fe 100%)",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            ShiftED <span style={{ opacity: 0.7 }}>AI</span>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Build the human skills,{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #fa66c6 0%, #a76be2 50%, #5470fe 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              one practice at a time.
            </span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              opacity: 0.75,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            A gym for the mind. Practice-based training for emotional
            intelligence at work.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          <span>shifted.ai</span>
          <span>Empathy is a finite resource. Treat it like one.</span>
        </div>
      </div>
    ),
    size,
  );
}
