import { useState, useEffect } from "react";
import App from "./Mobile/mobile";

export default function MobilePortfolioScene({ isMobilePortfolioOpen, onClose }) {
  const [showApp, setShowApp] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Mobile detection with resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* Close Button - Only show on desktop */}
      {!isMobile && <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "12px 24px",
          background: "linear-gradient(135deg, #1cd8d2 0%, #00bf8f 100%)",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          zIndex: 50,
          color: "#000",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 4px 12px rgba(28, 216, 210, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #00bf8f 0%, #1cd8d2 100%)";
          e.currentTarget.style.transform = "translateX(-4px) scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(28, 216, 210, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #1cd8d2 0%, #00bf8f 100%)";
          e.currentTarget.style.transform = "translateX(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(28, 216, 210, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateX(-2px) scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateX(-4px) scale(1.05)";
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={3} 
          stroke="currentColor" 
          style={{ width: "18px", height: "18px" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>Back to Camera</span>
      </button>}

      {/* Mobile App */}
      <App />
    </div>
  );
}
