import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle, lazy, Suspense } from "react";
import * as THREE from "three";
import useCameraMove from "./canvas/useCameraMove";
import { CAMERA_STATES } from "./canvas/cameraStates";
import MacBookApp from "./components/MacBook/App";
import "./components/MacBook/index.css";

const MobilePortfolioScene = lazy(() => import("./components/MobilePortfolioScene"));

function WorkspaceInner({ isPortfolioOpen, setIsPortfolioOpen, isMobilePortfolioOpen, setIsMobilePortfolioOpen }, ref) {
  const { scene } = useGLTF("/models/Untitled.glb");
  const sunRef = useRef();
  const { moveTo } = useCameraMove();
  
  // Refs for mouse tracking
  const mouseRef = useRef(null);
  const mouseBasePos = useRef({ x: 0, y: 0, z: 0 });
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const [currentCameraState, setCurrentCameraState] = useState("DESK");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const autoClickRef = useRef(false);

  // Mobile detection with resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-trigger iPhone when mobile reaches gallery position
  useEffect(() => {
    if (isMobile && currentCameraState === "GALLERY" && !autoClickRef.current) {
      autoClickRef.current = true;
      // Simulate click on iPhone mesh
      setTimeout(() => {
        moveTo(CAMERA_STATES.IPHONE);
        setCurrentCameraState("IPHONE");
        
        setTimeout(() => {
          setIsMobilePortfolioOpen(true);
        }, 1200);
      }, 500); // Small delay for smooth transition
    }
  }, [isMobile, currentCameraState, moveTo, setIsMobilePortfolioOpen]);

  // Expose exitPortfolio method to parent
  useImperativeHandle(ref, () => ({
    exitPortfolio: () => {
      // Check if coming from mobile (iPhone) or desktop (MacBook)
      if (currentCameraState === "IPHONE" || isMobilePortfolioOpen) {
        // Mobile: Move to IPHONE first, then to GALLERY
        moveTo(CAMERA_STATES.IPHONE);
        setCurrentCameraState("IPHONE");
        
        // Then after 1.2s (camera animation), move to GALLERY and close portfolio
        setTimeout(() => {
          moveTo(CAMERA_STATES.GALLERY);
          setCurrentCameraState("GALLERY");
          autoClickRef.current = false; // Reset for next mobile auto-click
          setIsPortfolioOpen(false);
          setIsMobilePortfolioOpen(false);
        }, 1200);
      } else {
        // Desktop: Move to MACBOOK first
        moveTo(CAMERA_STATES.MACBOOK);
        setCurrentCameraState("MACBOOK");
        
        // Then after 1.2s (camera animation), move to GALLERY and close portfolio
        setTimeout(() => {
          moveTo(CAMERA_STATES.GALLERY);
          setCurrentCameraState("GALLERY");
          autoClickRef.current = false; // Reset for next mobile auto-click
          setIsPortfolioOpen(false);
          setIsMobilePortfolioOpen(false);
        }, 1200);
      }
    }
  }), [moveTo, setIsPortfolioOpen, setIsMobilePortfolioOpen, currentCameraState, isMobilePortfolioOpen]);

  // Disable mouse tracking during scroll
  useEffect(() => {
    const handleScroll = () => {
      isScrolling.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  // Keyboard controls for camera switching (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyPress = (e) => {
      const cameraKeys = {
        "1": "DESK",
        "2": "GALLERY",
        "3": "MACBOOK",
        "4": "IPHONE",
      };

      const key = e.key;
      
      // Press 1 to close portfolio
      if (key === "1" && isPortfolioOpen) {
        setIsPortfolioOpen(false);
        setCurrentCameraState("GALLERY");
        return;
      }
      
      if (cameraKeys[key]) {
        const targetState = cameraKeys[key];
        if (CAMERA_STATES[targetState]) {
          moveTo(CAMERA_STATES[targetState]);
          setCurrentCameraState(targetState);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [moveTo, isPortfolioOpen]);

  // Auto-move camera after 2 seconds (only once on first load)
  const hasMovedRef = useRef(false);
  
  useEffect(() => {
    if (hasMovedRef.current) return; // Don't run again
    
    const timer = setTimeout(() => {
      hasMovedRef.current = true;
      moveTo(CAMERA_STATES.GALLERY);
      setCurrentCameraState("GALLERY");
    }, 800);

    return () => clearTimeout(timer);
  }, [moveTo]);

  // Extract and store mouse mesh from GLB
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.name.toLowerCase().includes("mouse")) {
        mouseRef.current = obj;
      }
    });
  }, [scene]);

  // Store mouse's resting position
  useEffect(() => {
    if (!mouseRef.current) return;

    mouseBasePos.current = {
      x: mouseRef.current.position.x,
      y: mouseRef.current.position.y,
      z: mouseRef.current.position.z,
    };
  }, [scene]);

  // Mouse cursor tracking with smooth movement (ONLY in GALLERY view)
  useFrame(({ mouse }) => {
    if (isMobile || !mouseRef.current || isScrolling.current || currentCameraState !== "GALLERY" || isPortfolioOpen || isMobilePortfolioOpen) return;

    // Larger movement area (2x the previous size)
    const MAX_MOVE_X = 1.0;   // left-right slide (doubled)
    const MAX_MOVE_Z = 0.5;   // forward-back (doubled)

    // Direct mapping: swap axes to match cursor to 3D space correctly
    const targetX = mouseBasePos.current.x - mouse.y * MAX_MOVE_X;
    const targetZ = mouseBasePos.current.z - mouse.x * MAX_MOVE_Z;

    // Smooth movement (physical feel)
    mouseRef.current.position.x +=
      (targetX - mouseRef.current.position.x) * 0.15;

    mouseRef.current.position.z +=
      (targetZ - mouseRef.current.position.z) * 0.15;
  });

  // Scale animation for MacBook screen
  const macbookScaleRef = useRef(1);
  const [macbookScale, setMacbookScale] = useState(1);
  const [isAnimatingMacbook, setIsAnimatingMacbook] = useState(false);
  const macbookScreenRef = useRef();
  const baseScreenZ = useRef(0);

  // Store base Z position of MacBook screen
  useEffect(() => {
    if (macbookScreenRef.current) {
      baseScreenZ.current = macbookScreenRef.current.position.z;
    }
  }, []);

  useEffect(() => {
    if (isPortfolioOpen) return;
    if (!isAnimatingMacbook) return;

    // Just open portfolio, no screen animation needed
    setIsPortfolioOpen(true);
    setIsAnimatingMacbook(false);
  }, [isAnimatingMacbook, isPortfolioOpen]);

  // Reset scale and position when closing portfolio
  useEffect(() => {
    if (!isPortfolioOpen) {
      macbookScaleRef.current = 1;
      setMacbookScale(1);
      // Reset Z position back to original
      if (macbookScreenRef.current) {
        macbookScreenRef.current.position.z = baseScreenZ.current;
      }
    }
  }, [isPortfolioOpen]);

  // Enable shadows on all objects in the scene
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;

      // Ensure material reacts to light
      if (obj.material) {
        obj.material.side = THREE.FrontSide;
      }

      // Prevent screen-related acne
      if (
        obj.name.toLowerCase().includes("screen") ||
        obj.name.toLowerCase().includes("display")
      ) {
        obj.castShadow = false;
      }
    }
  });

  return (
    <>
      {/* 3D Workspace */}
      <primitive object={scene} />

      {/* Visual Sun */}
      <mesh ref={sunRef} position={[-20, 25, -15]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          emissive="#FDB813"
          emissiveIntensity={1}
          color="#FDB813"
        />
      </mesh>

      {/* Invisible click area on MacBook - removed, use screen click instead */}

      {/* iPhone Screen - CLICKABLE */}
      <mesh
        position={[0.2, 6.29, -2.88]}
        rotation={[0, 2.68, 0]} 
        onClick={() => {
          moveTo(CAMERA_STATES.IPHONE);
          setCurrentCameraState("IPHONE");
          
          // Wait for camera animation (1.2s) then transition to full screen
          setTimeout(() => {
            setIsMobilePortfolioOpen(true);
          }, 1200);
        }}
      >
        <boxGeometry args={[1.7, 0, 0.73]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* MacBook Screen (pivoted groups to avoid translation when rotating) */}
      <group ref={macbookScreenRef} position={[-1.137, 8.39, 0.23]} rotation-y={Math.PI / 2}>
        <group rotation-x={-0.14}>
          <Html transform occlude scale={[0.139 * macbookScale, 0.122 * macbookScale, 1]}>
            <div
              onClick={(e) => {
                if (!isPortfolioOpen) {
                  moveTo(CAMERA_STATES.MACBOOK);
                  setCurrentCameraState("MACBOOK");
                  
                  // Camera animation is 1.2s, then open portfolio
                  setTimeout(() => {
                    setIsAnimatingMacbook(true);
                  }, 1200);
                }
              }}
              style={{ 
                cursor: isPortfolioOpen ? "default" : "pointer",
                width: '1280px',
                height: '800px'
              }}
            >
              <MacBookApp />
            </div>
          </Html>
        </group>
      </group>
    </>
  );
}

const Workspace = forwardRef(WorkspaceInner);

export default function Scene() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);
  const cameraRef = useRef(null);

  const handleClosePortfolioWithAnimation = () => {
    // This will be called from PortfolioModal when ESC is pressed
    // We need to pass the camera control to it
    if (cameraRef.current) {
      cameraRef.current.exitPortfolio();
    } else {
      setIsPortfolioOpen(false);
    }
  };

  const handleCloseMobilePortfolioWithAnimation = () => {
    // This will be called from MobilePortfolio when ESC is pressed
    if (cameraRef.current) {
      cameraRef.current.exitPortfolio();
    } else {
      setIsMobilePortfolioOpen(false);
    }
  };

  return (
    <>
      <Canvas 
        camera={{ position: [49, 19, 40], fov: 45 }} 
        shadows
        frameloop={isPortfolioOpen || isMobilePortfolioOpen ? "never" : "always"}
        style={{
          opacity: isPortfolioOpen || isMobilePortfolioOpen ? 0 : 1,
          transition: "opacity 0.8s ease",
          pointerEvents: isPortfolioOpen || isMobilePortfolioOpen ? "none" : "auto",
        }}
      >
        <color attach="background" args={["#1a1a1a"]} />

        {/* Lights */}
        <ambientLight intensity={0.35} />

        <directionalLight
          position={[-20, 25, -15]}
          intensity={1.6}
          castShadow
          shadow-bias={-0.0005}
          shadow-normalBias={0.04}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={5}
          shadow-camera-far={60}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        {/* Scene */}
        <Workspace 
          ref={cameraRef}
          isPortfolioOpen={isPortfolioOpen} 
          setIsPortfolioOpen={setIsPortfolioOpen} 
          isMobilePortfolioOpen={isMobilePortfolioOpen} 
          setIsMobilePortfolioOpen={setIsMobilePortfolioOpen} 
        />
      </Canvas>

      {/* Desktop Portfolio Full Screen */}
      {isPortfolioOpen && (
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          width: "100vw", 
          height: "100vh", 
          overflow: "auto",
          zIndex: 9999,
          background: "linear-gradient(to bottom, #0a0a0f 0%, #1a1a2e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/* Close Button */}
          <button
            onClick={handleClosePortfolioWithAnimation}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              padding: "12px 20px",
              background: "#fdb813",
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
              e.currentTarget.style.background = "#ff6b6b";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fdb813";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ← Back
          </button>

          {/* MacBook App */}
          <div style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}>
            <MacBookApp />
          </div>
        </div>
      )}

      {/* Mobile Portfolio Scene - Outside Canvas */}
      <Suspense fallback={null}>
        {isMobilePortfolioOpen && (
          <MobilePortfolioScene 
            isMobilePortfolioOpen={isMobilePortfolioOpen} 
            onClose={handleCloseMobilePortfolioWithAnimation}
          />
        )}
      </Suspense>
    </>
  );
}