import { ImageResponse } from "next/og";

export const alt = "Ocani — Dietética Mayorista";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#FEFAE0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#283618",
            color: "#DDA15E",
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            marginBottom: 32,
          }}
        >
          O
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#283618",
            fontFamily: "Georgia, serif",
          }}
        >
          Ocani
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 34,
            color: "#606C38",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Frutos secos, semillas, harinas y más — al por mayor
        </div>
      </div>
    ),
    { ...size },
  );
}
