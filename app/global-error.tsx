"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#161210",
          color: "#f5efe6",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <p style={{ letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "0.7rem", color: "#cf9c4d", fontFamily: "system-ui, sans-serif" }}>
            Edwin &amp; Joyce Ormeo
          </p>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 350, margin: "1rem 0 1.5rem", lineHeight: 1.05 }}>
            A little out of focus.
          </h1>
          <p style={{ color: "#c9bba6", lineHeight: 1.6, fontFamily: "system-ui, sans-serif", fontSize: "0.95rem" }}>
            Something went wrong on our end. Please try again — or reach us directly at{" "}
            <a href="mailto:edwinormeo@gmail.com" style={{ color: "#cf9c4d" }}>edwinormeo@gmail.com</a>.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              padding: "0.9rem 2rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "transparent",
              color: "#f5efe6",
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
