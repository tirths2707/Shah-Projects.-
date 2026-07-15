import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e14f2a",
          borderRadius: 7,
        }}
      >
        <svg width="18" height="15" viewBox="0 0 18 15">
          <polygon points="9,0 18,15 0,15" fill="#fdfbf7" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
