import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import useCameraMove from "./canvas/useCameraMove";
import { CAMERA_STATES } from "./canvas/cameraStates";
import PortfolioModal from "./components/PortfolioModal";
import DesktopPortfolio from "./ui/DesktopPortfolio";

function Workspace({ isPortfolioOpen, setIsPortfolioOpen }) {
  const { scene } = useGLTF("/models/Untitled.glb");
  const sunRef = useRef();
  const { moveTo } = useCameraMove();
  
  // Refs for mouse tracking
  const mouseRef = useRef(null);
  const mouseBasePos = useRef({ x: 0, y: 0, z: 0 });
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const [currentCameraState, setCurrentCameraState] = useState("DESK");
  
  // Mobile detection
  const isMobile = window.innerWidth < 768;

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

  // Keyboard controls for camera switching (1, 2, 3)
  useEffect(() => {
    const handleKeyPress = (e) => {
      const cameraKeys = {
        "1": "DESK",
        "2": "GALLERY",
        "3": "MACBOOK",
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
    if (isMobile || !mouseRef.current || isScrolling.current || currentCameraState !== "GALLERY") return;

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

      {/* Invisible click area on MacBook */}
      <mesh
        position={[-1.137, 8.39, 0.23]}
        onClick={() => {
          moveTo(CAMERA_STATES.MACBOOK);
          setCurrentCameraState("MACBOOK");
          
          setTimeout(() => {
            setIsPortfolioOpen(true);
          }, 1200);
        }}
      >
        <boxGeometry args={[4, 3, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* MacBook Screen -1.137, 8.39, 0.23*/}
      {/* MacBook Screen (pivoted groups to avoid translation when rotating) */}
      <group position={[-1.137, 8.39, 0.23]} rotation-y={Math.PI / 2}>
        <group rotation-x={-0.14}>
          <Html transform occlude scale={[0.139, 0.122, 1]}>
            <div
              onClick={() => {
                moveTo(CAMERA_STATES.MACBOOK);
                setCurrentCameraState("MACBOOK");
                
                // Camera animation is 1.2 seconds, transition to full screen right after
                setTimeout(() => {
                  setIsPortfolioOpen(true);
                }, 880);
              }}
              style={{ cursor: "pointer" }}
            >
              <DesktopPortfolio />
            </div>
          </Html>
        </group>
      </group>
    </>
  );
}

export default function Scene() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  return (
    <>
      <Canvas 
        camera={{ position: [49, 19, 40], fov: 45 }} 
        shadows
        style={{
          opacity: isPortfolioOpen ? 0 : 1,
          transition: "opacity 0.8s ease",
          pointerEvents: isPortfolioOpen ? "none" : "auto",
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
        <Workspace isPortfolioOpen={isPortfolioOpen} setIsPortfolioOpen={setIsPortfolioOpen} />
      </Canvas>

      {/* Portfolio Modal - Outside Canvas */}
      <PortfolioModal 
        isOpen={isPortfolioOpen} 
        onClose={() => setIsPortfolioOpen(false)}
      />
    </>
  );
}