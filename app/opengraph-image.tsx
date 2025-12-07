import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Timezone Converter - Convert times between timezones";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🌐</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Timezone Converter
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.85)",
            marginBottom: 30,
          }}
        >
          Convert times between timezones instantly
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              padding: "12px 24px",
              borderRadius: 8,
              color: "white",
              fontSize: 22,
            }}
          >
            🕐 DST Aware
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              padding: "12px 24px",
              borderRadius: 8,
              color: "white",
              fontSize: 22,
            }}
          >
            🌍 300+ Timezones
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              padding: "12px 24px",
              borderRadius: 8,
              color: "white",
              fontSize: 22,
            }}
          >
            🆓 Free Tool
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
