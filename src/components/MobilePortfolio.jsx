export default function MobilePortfolio({ isOpen, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        transition: "opacity 0.6s ease, visibility 0.6s ease",
        zIndex: 9999,
        overflow: "auto",
        color: "#e0e0e0",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "12px 24px",
          background: "#fdb813",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          zIndex: 10000,
        }}
      >
        Back (Press 1)
      </button>

      <div style={{ marginTop: "40px", maxWidth: "100%" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 20px 0",
            background: "linear-gradient(90deg, #fdb813, #ff6b6b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textDecoration: "none",
          }}
        >
          Mobile Portfolio
        </h1>

        <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#fdb813" }}>
              About
            </h2>
            <p>This is a mobile-optimized view of the portfolio with stacked layouts and large touch targets.</p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#fdb813" }}>
              Projects
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div
                style={{
                  padding: "15px",
                  background: "rgba(253, 184, 19, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid #fdb813",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(253, 184, 19, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(253, 184, 19, 0.1)";
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>Project One</h3>
                <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>Description of project</p>
              </div>
              <div
                style={{
                  padding: "15px",
                  background: "rgba(253, 184, 19, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid #fdb813",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(253, 184, 19, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(253, 184, 19, 0.1)";
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>Project Two</h3>
                <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>Description of project</p>
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#fdb813" }}>
              Contact
            </h2>
            <p>Get in touch with large, easy-to-tap buttons:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                style={{
                  padding: "15px",
                  background: "#fdb813",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Email
              </button>
              <button
                style={{
                  padding: "15px",
                  background: "#fdb813",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                LinkedIn
              </button>
              <button
                style={{
                  padding: "15px",
                  background: "#fdb813",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                GitHub
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
