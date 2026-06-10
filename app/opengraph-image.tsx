import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rychlo Technology Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 999,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#60a5fa",
            }}
          />
          <span style={{ color: "#93c5fd", fontSize: 18, fontWeight: 500 }}>
            Build. Automate. Scale.
          </span>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 20,
          }}
        >
          Rychlo
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          AI Automation · Cybersecurity · Custom Software
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            color: "rgba(255,255,255,0.25)",
            fontSize: 18,
          }}
        >
          rychlo.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
