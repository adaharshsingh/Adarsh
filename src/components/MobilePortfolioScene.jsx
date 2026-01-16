import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo } from "react";
import { TextureLoader } from "three";

// Preload iPhone model
useGLTF.preload("/models/iphone_air.glb");

function ScreenContent() {
  const roles = useMemo(() => ["Web Developer", "Designer", "Creator"], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          setSubIndex((v) => v + 1);
        } else if (!deleting && subIndex === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else if (deleting && subIndex > 0) {
          setSubIndex((v) => v - 1);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <div
      style={{
        width: "390px",
        height: "844px",
        background: "#000",
        borderRadius: "89px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "white",
        border: "1px solid #0a0a0a",
        boxSizing: "border-box",
      }}
    >
      {/* Status Bar */}
      <div
        style={{
          height: "44px",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "16px",
          paddingRight: "16px",
          borderBottom: "1px solid #333",
          fontSize: "12px",
          zIndex: 10,
        }}
      >
        <span>9:41</span>
        <div style={{ display: "flex", gap: "4px" }}>
          <span>📡</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0",
          background: "rgba(0, 0, 0, 0.5)",
          borderBottom: "1px solid rgba(28, 216, 210, 0.2)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {["Home", "Projects", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            style={{
              flex: 1,
              padding: "12px",
              background: activeTab === tab.toLowerCase() ? "rgba(28, 216, 210, 0.2)" : "transparent",
              border: "none",
              color: activeTab === tab.toLowerCase() ? "#1cd8d2" : "#888",
              fontSize: "11px",
              fontWeight: "600",
              cursor: "pointer",
              borderBottom: activeTab === tab.toLowerCase() ? "2px solid #1cd8d2" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          background: "linear-gradient(135deg, #0f1419 0%, #1a2a3a 100%)",
        }}
      >
        {activeTab === "home" && (
          <div>
            {/* Role/Title Animation */}
            <div
              style={{
                fontSize: "12px",
                fontWeight: "600",
                background: "linear-gradient(90deg, #1cd8d2, #00bf8f)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                minHeight: "16px",
                marginBottom: "6px",
              }}
            >
              {roles[index].substring(0, subIndex)}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "0.9em",
                  background: "white",
                  marginLeft: "2px",
                  animation: "pulse 1s infinite",
                  verticalAlign: "middle",
                }}
              />
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                background: "linear-gradient(90deg, #1cd8d2, #00bf8f, #302b63)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hi, I'm Adarsh
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "11px",
                color: "#a0a0a0",
                lineHeight: "1.5",
                margin: "0 0 16px 0",
              }}
            >
              Full stack developer focused on crafting beautiful digital experiences
            </p>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              {[
                { label: "Projects", value: "25+" },
                { label: "Experience", value: "2+ yrs" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px",
                    background: "rgba(28, 216, 210, 0.1)",
                    borderRadius: "6px",
                    fontSize: "11px",
                    border: "1px solid rgba(28, 216, 210, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#888", marginBottom: "2px" }}>{stat.label}</div>
                  <div style={{ color: "#1cd8d2", fontWeight: "600" }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                style={{
                  padding: "10px",
                  background: "linear-gradient(90deg, #1cd8d2, #00bf8f)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#000",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                View Work
              </button>
              <button
                style={{
                  padding: "10px",
                  background: "rgba(28, 216, 210, 0.1)",
                  border: "1px solid #1cd8d2",
                  borderRadius: "8px",
                  color: "#1cd8d2",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(28, 216, 210, 0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(28, 216, 210, 0.1)")}
              >
                Contact Me
              </button>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "#1cd8d2" }}>Featured Projects</h2>
            {[
              { title: "Project Alpha", desc: "Full-stack web app", tech: "React, Node" },
              { title: "Project Beta", desc: "Mobile design system", tech: "React Native" },
            ].map((proj, i) => (
              <div
                key={i}
                style={{
                  padding: "10px",
                  background: "rgba(28, 216, 210, 0.05)",
                  borderRadius: "6px",
                  border: "1px solid rgba(28, 216, 210, 0.15)",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(28, 216, 210, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(28, 216, 210, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(28, 216, 210, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(28, 216, 210, 0.15)";
                }}
              >
                <h3 style={{ fontSize: "12px", fontWeight: "600", margin: "0 0 3px 0", color: "#1cd8d2" }}>{proj.title}</h3>
                <p style={{ fontSize: "10px", color: "#888", margin: "0 0 2px 0" }}>{proj.desc}</p>
                <p style={{ fontSize: "9px", color: "#666", margin: "0" }}>{proj.tech}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", color: "#1cd8d2" }}>About Me</h2>
            <p style={{ fontSize: "11px", color: "#a0a0a0", lineHeight: "1.6", marginBottom: "12px" }}>
              I'm a passionate full-stack developer with expertise in building modern web applications. I love creating intuitive user experiences and writing clean code.
            </p>
            <h3 style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px", color: "white" }}>Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {["React", "Node.js", "TypeScript", "Three.js", "UI/UX"].map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: "10px",
                    padding: "4px 8px",
                    background: "rgba(28, 216, 210, 0.1)",
                    border: "1px solid rgba(28, 216, 210, 0.3)",
                    borderRadius: "4px",
                    color: "#1cd8d2",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 49%, 100% { opacity: 1; }
          50%, 99% { opacity: 0; }
        }
        div::-webkit-scrollbar {
          width: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #1cd8d2;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

function IPhoneModel({ isMoveAnimating }) {
  const { scene } = useGLTF("/models/iphone_air.glb");
  const screenshotTexture = useLoader(
    TextureLoader,
    "/models/Screenshot 2026-01-15 183246.png"
  );
  const groupRef = useRef();
  const [showScreen, setShowScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targetRotationRef = useRef(-84 * Math.PI / 180);
  const isMoveAnimatingRef = useRef(false);
  const rotationCompleteRef = useRef(false);

  // Memoize cloned scene to avoid re-cloning every render
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Calculate plane dimensions from texture aspect ratio
  const planeWidth = useMemo(() => {
    const { image } = screenshotTexture;
    const aspect = image.width / image.height;
    const height = 4.8;
    return height * aspect;
  }, [screenshotTexture]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep ref in sync with prop
  useEffect(() => {
    isMoveAnimatingRef.current = isMoveAnimating;
  }, [isMoveAnimating]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Animation phase: Move iPhone left when camera animating
    // On mobile: stay centered (0), on desktop: move left (-2.8)
    const targetX = isMoveAnimatingRef.current ? (isMobile ? 0 : -2.8) : 0;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.08;

    // Smoothly rotate to target rotation
    const rotationDiff = targetRotationRef.current - groupRef.current.rotation.y;
    groupRef.current.rotation.y += rotationDiff * 0.1;

    // Check if rotation is complete (very close to target)
    if (Math.abs(rotationDiff) < 0.01 && !rotationCompleteRef.current) {
      rotationCompleteRef.current = true;
      // Show screen after rotation completes
      setShowScreen(true);
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      // Set initial rotation
      groupRef.current.rotation.y = -37 * Math.PI / 180;
      groupRef.current.rotation.x = 0; 
      groupRef.current.rotation.z = 0; // Adjust this for side-to-side tilt
      rotationCompleteRef.current = false;
    }
  }, []);

  // Note: Rotation values are continuously updated in useFrame()
  // To adjust the final rotation, modify targetRotationRef.current value
  useEffect(() => {
    targetRotationRef.current = -84 * Math.PI / 180; // Adjust this to rotate the model (1-90 degrees = * Math.PI / 180)
  }, []);

  const handlePointerDown = () => {
    // Rotation disabled - iPhone is non-rotatable
  };

  const handlePointerMove = () => {
    // Rotation disabled - iPhone is non-rotatable
  };

  const handlePointerUp = () => {
    // Rotation disabled - iPhone is non-rotatable
  };

  useEffect(() => {
    // No cleanup needed
  }, []);

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <primitive object={clonedScene} scale={33} />

      {/* Screen mesh - Screenshot texture */}
      {!showScreen && (
        <mesh position={[0.1, -0.13, 0.03]} rotation={[0, 1.57, 0]}>
          <planeGeometry args={[planeWidth, 4.8]} />
          <meshBasicMaterial map={screenshotTexture} />
        </mesh>
      )}

      {/* Screen content - same position/rotation as mesh, above by 0.001 to avoid z-fighting */}
      {showScreen && (
        <group
          position={[0.1, 0.03, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <Html 
            transform
            scale={[2.5, 2.44, 1]}
            distanceFactor={1.0}
            occlude
          >
            <div
              style={{
                opacity: 1,
                transition: "opacity 0.6s ease",
              }}
            >
              <ScreenContent />
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

export default function MobilePortfolioScene({ isOpen, onClose }) {
  const [isMoveAnimating, setIsMoveAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Reset animation state when opening
      setIsMoveAnimating(false);
      // Start animation after a short delay
      const timer = setTimeout(() => {
        setIsMoveAnimating(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Reset animation when closing
      setIsMoveAnimating(false);
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
        background: isMobile ? "#000" : "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)",
        zIndex: 9998,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.6s ease",
        visibility: isOpen ? "visible" : "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 3D Canvas - Full screen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9998,
          pointerEvents: "none",
        }}
      >
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, isMobile ? 7 : 8], fov: 45 }}
          shadows
        >
          <color attach="background" args={["#0f1419"]} />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[0, 8, 5]}
            intensity={2.2}
            castShadow
          />

          {/* iPhone Model */}
          <IPhoneModel isMoveAnimating={isMoveAnimating} />
        </Canvas>
      </div>

      {/* Content Panel - Desktop only */}
      {!isMobile && (
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
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity: isMoveAnimating ? 1 : 0,
            transition: "opacity 1s ease 2s",
            pointerEvents: isMoveAnimating ? "auto" : "none",
            zIndex: 9999,
            background: "rgba(15, 15, 30, 0.95)",
          }}
        >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "0 0 12px 0",
            background: "linear-gradient(90deg, #1cd8d2, #00bf8f, #302b63)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hello, I'm Adarsh
        </h1>

        <p style={{ fontSize: "18px", color: "#a0a0a0", marginBottom: "30px", lineHeight: "1.6" }}>
          Full stack developer focused on crafting beautiful digital experiences and scalable solutions
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
          {[
            { label: "Projects", value: "25+" },
            { label: "Experience", value: "2+ years" },
            { label: "Focus", value: "Performance & UX" },
            { label: "Open to", value: "Opportunities" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "16px",
                background: "rgba(28, 216, 210, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(28, 216, 210, 0.2)",
              }}
            >
              <p style={{ fontSize: "12px", color: "#888", margin: "0 0 4px 0" }}>{stat.label}</p>
              <p style={{ fontSize: "20px", fontWeight: "600", color: "#1cd8d2", margin: "0" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px", color: "white" }}>About Me</h2>
        <p style={{ fontSize: "16px", color: "#a0a0a0", lineHeight: "1.8", marginBottom: "24px" }}>
          I'm a passionate developer with expertise in building modern web applications. I love creating intuitive user experiences and writing clean, efficient code. When I'm not coding, you can find me exploring new technologies or contributing to open source projects.
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px", color: "white" }}>Featured Projects</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
          {[
            { title: "Project Alpha", desc: "A full-stack web application" },
            { title: "Project Beta", desc: "Mobile-first design system" },
            { title: "Project Gamma", desc: "Real-time collaboration tool" },
          ].map((proj, i) => (
            <div
              key={i}
              style={{
                padding: "16px",
                background: "rgba(28, 216, 210, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(28, 216, 210, 0.15)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(28, 216, 210, 0.1)";
                e.currentTarget.style.borderColor = "rgba(28, 216, 210, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(28, 216, 210, 0.05)";
                e.currentTarget.style.borderColor = "rgba(28, 216, 210, 0.15)";
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0", color: "#1cd8d2" }}>{proj.title}</h3>
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}>{proj.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              flex: 1,
              padding: "12px",
              background: "linear-gradient(90deg, #1cd8d2, #00bf8f)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            View My Work
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px",
              background: "rgba(28, 216, 210, 0.1)",
              color: "#1cd8d2",
              border: "1px solid #1cd8d2",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(28, 216, 210, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(28, 216, 210, 0.1)")}
          >
            Get in Touch
          </button>
        </div>
        </div>
      )}

      {/* Close Button - Desktop only */}
      {!isMobile && (
        <button
          onClick={onClose}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 20px",
            background: "#1cd8d2",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            zIndex: 10000,
            color: "#000",
          }}
        >
          Back (ESC)
        </button>
      )}
    </div>
  );
}
