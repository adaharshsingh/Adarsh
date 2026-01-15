import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";

// Preload iPhone model
useGLTF.preload("/models/iphone_air.glb");

function IPhoneModel({ isMoveAnimating }) {
  const { scene } = useGLTF("/models/iphone_air.glb");
  const groupRef = useRef();
  const startXRef = useRef(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const targetRotationRef = useRef(-84 * Math.PI / 180); // Initial rotation -37 degrees

  // Animate iPhone moving from center to left
  useFrame(() => {
    if (groupRef.current) {
      if (isMoveAnimating) {
        // Move to left
        groupRef.current.position.x += (-4 - groupRef.current.position.x) * 0.08;
        setCurrentX(groupRef.current.position.x);
      }
      // Smoothly rotate to target rotation
      groupRef.current.rotation.y += (targetRotationRef.current - groupRef.current.rotation.y) * 0.1;
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      startXRef.current = groupRef.current.position.x;
      // Set initial rotation
      groupRef.current.rotation.y = -37 * Math.PI / 180;
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    targetRotationRef.current += delta * 0.005;
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartX;
    targetRotationRef.current += delta * 0.005;
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerLeave={handleMouseUp}
    >
      <primitive object={scene} scale={33} />
    </group>
  );
}

export default function MobilePortfolioScene({ isOpen, onClose }) {
  const [isMoveAnimating, setIsMoveAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Start animation after a short delay
      setTimeout(() => {
        setIsMoveAnimating(true);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)",
        zIndex: 9998,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.6s ease",
        visibility: isOpen ? "visible" : "hidden",
      }}
    >
      {/* Close Button */}
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
        Back (ESC)
      </button>

      {/* 3D Canvas */}
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        shadows
      >
        <color attach="background" args={["#1a1a1a"]} />

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[-8, 12, 3]}
          intensity={1.8}
          castShadow
        />

        {/* iPhone Model */}
        <IPhoneModel isMoveAnimating={isMoveAnimating} />
      </Canvas>

      {/* Content Panel (will appear on right side after iPhone moves) */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          padding: "60px 40px",
          overflowY: "auto",
          color: "#e0e0e0",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          opacity: isMoveAnimating ? 1 : 0,
          transition: "opacity 1s ease 2s",
          pointerEvents: isMoveAnimating ? "auto" : "none",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "0 0 20px 0",
            background: "linear-gradient(90deg, #fdb813, #ff6b6b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Mobile Portfolio
        </h1>

        <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#fdb813" }}>
              About
            </h2>
            <p>Experience my work on mobile. Designed for touch and optimized for smaller screens.</p>
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
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>Project One</h3>
                <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>Mobile-optimized project</p>
              </div>
              <div
                style={{
                  padding: "15px",
                  background: "rgba(253, 184, 19, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid #fdb813",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>Project Two</h3>
                <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>Mobile-optimized project</p>
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#fdb813" }}>
              Get In Touch
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                style={{
                  padding: "12px",
                  background: "#fdb813",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Email
              </button>
              <button
                style={{
                  padding: "12px",
                  background: "#fdb813",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                LinkedIn
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
