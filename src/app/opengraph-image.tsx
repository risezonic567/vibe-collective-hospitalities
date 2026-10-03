import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Vibe Collective Hospitality - Luxury Events & Weddings";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1d3347",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          border: "12px solid #b8975a",
          boxSizing: "border-box",
          color: "#f7f3ec",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#b8975a",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          Hospitality · Events · Weddings
        </div>
        <div
          style={{
            fontSize: "64px",
            fontFamily: "serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#f7f3ec",
            marginBottom: "16px",
            textAlign: "center",
            display: "flex",
          }}
        >
          Vibe Collective
        </div>
        <div
          style={{
            fontSize: "24px",
            fontStyle: "italic",
            color: "#e8dfd0",
            textAlign: "center",
            maxWidth: "800px",
            display: "flex",
          }}
        >
          Hospitality, designed to be remembered.
        </div>
        <div
          style={{
            marginTop: "48px",
            height: "1px",
            width: "120px",
            backgroundColor: "#b8975a",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
