import { useEffect } from "react";

export default function PortfolioModal({ isOpen, onClose, onEscapeWithAnimation }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        if (onEscapeWithAnimation) {
          onEscapeWithAnimation();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, onEscapeWithAnimation]);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f1419 0%, #1a2a3a 100%)",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        transition: "opacity 0.6s ease, visibility 0.6s ease",
        zIndex: 9999,
        overflow: "auto",
        color: "#e0e0e0",
        padding: "60px 40px",
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
          padding: "10px 20px",
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

      <div style={{ marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "0 0 10px 0",
            background: "linear-gradient(90deg, #fdb813, #ff6b6b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Portfolio
        </h1>
        <div
          style={{
            width: "100px",
            height: "4px",
            background: "linear-gradient(90deg, #fdb813, #ff6b6b)",
            borderRadius: "2px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "60px",
        }}
      >
        {["Project 1", "Project 2", "Project 3", "Project 4"].map((project, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(253, 184, 19, 0.2)",
              borderRadius: "12px",
              padding: "20px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(253, 184, 19, 0.1)";
              e.currentTarget.style.borderColor = "rgba(253, 184, 19, 0.5)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(253, 184, 19, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "150px",
                background: "linear-gradient(135deg, rgba(253, 184, 19, 0.2), rgba(255, 107, 107, 0.2))",
                borderRadius: "8px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#999",
              }}
            >
              [Project {idx + 1}]
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#fdb813" }}>
              {project}
            </h3>
            <p style={{ margin: "0", fontSize: "13px", color: "#888", lineHeight: "1.6" }}>
              Innovative solution with modern design & seamless experience
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "rgba(253, 184, 19, 0.1)",
          border: "1px solid rgba(253, 184, 19, 0.3)",
          borderRadius: "12px",
          padding: "30px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ margin: "0 0 15px 0", color: "#fdb813", fontSize: "24px" }}>
          About Me
        </h2>
        <p style={{ margin: "0", color: "#aaa", lineHeight: "1.8", fontSize: "14px" }}>
          I'm a full-stack developer passionate about creating beautiful, performant web experiences.
          This 3D portfolio is built with React Three Fiber and showcases my skills in interactive design.
        </p>
      </div>

      <div style={{ height: "1500px" }} />
    </div>
  );
}
