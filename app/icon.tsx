import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          background: "#283618",
          borderRadius: "50%",
          color: "#DDA15E",
          fontSize: 36,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}
