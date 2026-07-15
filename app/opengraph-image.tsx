import { ImageResponse } from "next/og";

export const alt = "SnackIt — Craving something real? That's SnackIt.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 18% 20%, rgba(225,79,42,0.16), transparent 45%), radial-gradient(circle at 82% 75%, rgba(61,133,87,0.16), transparent 45%), #fdfbf7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="68" height="56" viewBox="0 0 68 56">
            <polygon points="34,0 68,56 0,56" fill="#e14f2a" />
          </svg>
          <div style={{ fontSize: 92, fontWeight: 800, color: "#241611" }}>SnackIt</div>
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "#e14f2a", fontWeight: 700 }}>
          Craving something real?
        </div>
        <div style={{ marginTop: 18, fontSize: 24, color: "rgba(36,22,17,0.55)" }}>
          Nadiad, India &nbsp;&middot;&nbsp; Calgary, Canada
        </div>
      </div>
    ),
    { ...size },
  );
}
