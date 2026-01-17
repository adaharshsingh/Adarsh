import { useState, useEffect } from "react";
import App from "./Mobile/mobile";

export default function MobilePortfolioScene({ isMobilePortfolioOpen, onClose }) {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    if (isMobilePortfolioOpen) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setShowApp(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowApp(false);
    }
  }, [isMobilePortfolioOpen]);

  if (!isMobilePortfolioOpen || !showApp) return null;

  return (
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      width: "100vw", 
      height: "100vh", 
      overflow: "auto",
      zIndex: 9999
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "12px 20px",
          background: "#1cd8d2",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          zIndex: 50,
          color: "#000",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#00bf8f";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1cd8d2";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ← Back
      </button>

      {/* Mobile App */}
      <App />
    </div>
  );
}
