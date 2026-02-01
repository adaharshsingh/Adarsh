import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle, lazy, Suspense } from "react";
import * as THREE from "three";
import useCameraMove from "./canvas/useCameraMove";
import { CAMERA_STATES } from "./canvas/cameraStates";
import MacBookApp from "./components/MacBook/App";
import "./components/MacBook/index.css";
import HelpButton from "./components/ui/HelpButton";

const MobilePortfolioScene = lazy(() => import("./components/MobilePortfolioScene"));

// Starfield component with twinkling stars and shooting stars
const Starfield = () => {
  const starsRef = useRef();
  const shootingStarsRef = useRef([]);
  const starTwinkleDataRef = useRef([]);
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    // Create twinkling stars
    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    starTwinkleDataRef.current = [];
    
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800; // z
      
      const brightness = 0.6 + Math.random() * 0.4;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness;
      
      // Twinkle data: phase, speed, baseOpacity
      starTwinkleDataRef.current.push({
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        baseOpacity: 0.3 + Math.random() * 0.7,
      });
    }
    
    starsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, []);
  
  // Animation loop
  useFrame((state) => {
    // Update twinkling stars
    if (starsRef.current?.geometry?.attributes?.position) {
      const material = starsRef.current.material;
      const baseSize = 0.15;
      
      // Vary size slightly for twinkling effect
      const twinkle = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.8;
      material.size = baseSize * twinkle;
    }
    
    // Update shooting stars
    shootingStarsRef.current = shootingStarsRef.current.filter(star => {
      star.progress += star.speed;
      
      // Calculate current position
      star.currentPos.x = star.startPos.x + star.direction.x * star.distance * star.progress;
      star.currentPos.y = star.startPos.y + star.direction.y * star.distance * star.progress;
      star.currentPos.z = star.startPos.z + star.direction.z * star.distance * star.progress;
      
      // Keep a history of recent positions for trail
      star.positionHistory.push(star.currentPos.clone());
      if (star.positionHistory.length > 5) {
        star.positionHistory.shift(); // Keep only last 5 positions
      }
      
      // Update head position
      if (star.head) {
        star.head.position.copy(star.currentPos);
        // Head fades out quickly at the end
        const fadeFactor = Math.max(0, 1 - star.progress * 2); // Fades faster
        star.head.material.opacity = fadeFactor;
      }
      
      // Update trail positions (only recent positions, not full path)
      if (star.trail && star.positionHistory.length > 1) {
        const positions = new Float32Array(star.positionHistory.length * 3);
        
        star.positionHistory.forEach((pos, idx) => {
          positions[idx * 3] = pos.x;
          positions[idx * 3 + 1] = pos.y;
          positions[idx * 3 + 2] = pos.z;
        });
        
        star.trail.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Trail fades out very quickly
        const trailFade = Math.max(0, 1 - star.progress * 3); // Fades 3x faster
        if (star.trail.material) {
          star.trail.material.opacity = trailFade;
        }
      }
      
      // Clean up when complete
      if (star.progress >= 1) {
        // Remove meshes from scene
        if (star.head) {
          star.head.parent?.remove(star.head);
          star.head.geometry.dispose();
          star.head.material.dispose();
        }
        if (star.trail) {
          star.trail.parent?.remove(star.trail);
          star.trail.geometry.dispose();
          star.trail.material.dispose();
        }
        return false; // Remove from array
      }
      
      return true;
    });
    
    // Spawn new shooting stars to maintain minimum count
    const macbookScreenPos = { x: -1.137, y: 8.39, z: 0.23 };
    const minTotal = 6; // Balanced count for performance
    const minBehindMacbook = 2; // Ensure 2-3 stars always pass behind macbook
    
    // Only spawn if needed
    let starsPassingBehindMacbook = shootingStarsRef.current.filter(s => s.passesBehindMacbook).length;
    
    if (shootingStarsRef.current.length < minTotal || starsPassingBehindMacbook < minBehindMacbook) {
      // Decide if this star should pass behind the macbook
      const shouldPassBehindMacbook = starsPassingBehindMacbook < minBehindMacbook;
      
      // Random starting position from edges
      let startX, startY, startZ;
      const bounds = 400;
      let edge;
      
      if (shouldPassBehindMacbook) {
        // For stars passing behind macbook, start from specific edge
        edge = Math.floor(Math.random() * 4);
        const macbookSpawnBuffer = 150;
        
        // Start from edges and aim toward macbook screen area
        if (edge === 0) {
          startX = -bounds;
          startY = macbookScreenPos.y + (Math.random() - 0.5) * 100;
          startZ = macbookScreenPos.z + (Math.random() - 0.5) * 100;
        } else if (edge === 1) {
          startX = bounds;
          startY = macbookScreenPos.y + (Math.random() - 0.5) * 100;
          startZ = macbookScreenPos.z + (Math.random() - 0.5) * 100;
        } else if (edge === 2) {
          startX = macbookScreenPos.x + (Math.random() - 0.5) * 100;
          startY = macbookScreenPos.y + (Math.random() - 0.5) * 100;
          startZ = -bounds;
        } else {
          startX = macbookScreenPos.x + (Math.random() - 0.5) * 100;
          startY = macbookScreenPos.y + (Math.random() - 0.5) * 100;
          startZ = bounds;
        }
      } else {
        // Random stars from any edge
        edge = Math.floor(Math.random() * 4);
        
        if (edge === 0) {
          startX = -bounds;
          startY = (Math.random() - 0.5) * 800;
          startZ = (Math.random() - 0.5) * 800;
        } else if (edge === 1) {
          startX = bounds;
          startY = (Math.random() - 0.5) * 800;
          startZ = (Math.random() - 0.5) * 800;
        } else if (edge === 2) {
          startX = (Math.random() - 0.5) * 800;
          startY = (Math.random() - 0.5) * 800;
          startZ = -bounds;
        } else {
          startX = (Math.random() - 0.5) * 800;
          startY = (Math.random() - 0.5) * 800;
          startZ = bounds;
        }
      }
      
      // Random direction
      const dirX = Math.random() - 0.5;
      const dirY = (Math.random() - 0.5) * 0.5; // Less vertical movement
      const dirZ = Math.random() - 0.5;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
      
      const distance = 600 + Math.random() * 200;
      const speed = 0.0015 + Math.random() * 0.0015; // Much slower: 0.0015-0.003
      
      // Create shooting star head
      const headGeometry = new THREE.BufferGeometry();
      const headPositions = new Float32Array([0, 0, 0]);
      headGeometry.setAttribute('position', new THREE.BufferAttribute(headPositions, 3));
      
      const headMaterial = new THREE.PointsMaterial({
        size: 2,
        color: '#9E00FF',
        transparent: true,
        sizeAttenuation: true,
      });
      
      const headMesh = new THREE.Points(headGeometry, headMaterial);
      headMesh.position.set(startX, startY, startZ);
      headMesh.frustumCulled = false;
      starsRef.current.parent.add(headMesh);
      
      // Create trail line
      const trailGeometry = new THREE.BufferGeometry();
      const trailMaterial = new THREE.LineBasicMaterial({
        color: '#2EB9DF',
        transparent: true,
        opacity: 1,
        linewidth: 2,
      });
      
      const trailMesh = new THREE.Line(trailGeometry, trailMaterial);
      trailMesh.frustumCulled = false;
      starsRef.current.parent.add(trailMesh);
      
      shootingStarsRef.current.push({
        startPos: new THREE.Vector3(startX, startY, startZ),
        currentPos: new THREE.Vector3(startX, startY, startZ),
        direction: new THREE.Vector3(dirX / dirLength, dirY / dirLength, dirZ / dirLength),
        distance: distance,
        speed: speed,
        progress: 0,
        positionHistory: [new THREE.Vector3(startX, startY, startZ)],
        passesBehindMacbook: shouldPassBehindMacbook,
        head: headMesh,
        trail: trailMesh,
      });
    }
  });
  
  return (
    <points ref={starsRef} frustumCulled={false}>
      <bufferGeometry />
      <pointsMaterial 
        size={0.15}
        sizeAttenuation 
        transparent 
        opacity={0.8}
        vertexColors
      />
    </points>
  );
};

function WorkspaceInner({ isPortfolioOpen, setIsPortfolioOpen, isMobilePortfolioOpen, setIsMobilePortfolioOpen }, ref) {
  const { scene } = useGLTF("/models/Untitled.glb");
  const sunRef = useRef();
  const { moveTo, zoom, rotateTableY } = useCameraMove();
  
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

  // Handle scroll for zoom and mouse drag for Y-axis rotation in gallery view
  useEffect(() => {
    let isDragging = false;
    let lastMouseX = 0;
    const dragSensitivity = 0.005;

    const handleWheel = (e) => {
      if (currentCameraState !== "GALLERY" || isPortfolioOpen || isMobilePortfolioOpen) return;
      
      e.preventDefault();
      const zoomDirection = e.deltaY > 0 ? -1 : 1;
      zoom(zoomDirection);
      
      isScrolling.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    const handleMouseDown = (e) => {
      if (currentCameraState !== "GALLERY" || isPortfolioOpen || isMobilePortfolioOpen) return;
      isDragging = true;
      lastMouseX = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!isDragging || currentCameraState !== "GALLERY") return;
      
      const deltaX = e.clientX - lastMouseX;
      rotateTableY(deltaX * dragSensitivity);
      lastMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentCameraState, isPortfolioOpen, isMobilePortfolioOpen, zoom, rotateTableY]);

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
          <Html transform occlude="blending" scale={[0.139 * macbookScale, 0.122 * macbookScale, 1]}>
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
                height: '800px',
                overflow: 'hidden',
                position: 'relative'
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
        camera={{ position: [49, 19, 40], fov: 45, near: 0.1, far: 5000 }} 
        shadows
        frameloop={isPortfolioOpen || isMobilePortfolioOpen ? "never" : "always"}
        style={{
          opacity: isPortfolioOpen || isMobilePortfolioOpen ? 0 : 1,
          transition: "opacity 0.8s ease",
          pointerEvents: isPortfolioOpen || isMobilePortfolioOpen ? "none" : "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <color attach="background" args={["#0a0a1a"]} />
        
        {/* Starfield Background */}
        <Starfield />

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
              top: "41px",
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

      {/* Help Button */}
      <HelpButton isPortfolioOpen={isPortfolioOpen || isMobilePortfolioOpen} />
    </>
  );
}