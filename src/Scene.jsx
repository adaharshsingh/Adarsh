import { Canvas } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useCameraMove from "./canvas/useCameraMove";
import { CAMERA_STATES } from "./canvas/cameraStates";
import DesktopPortfolio from "./ui/DesktopPortfolio";

function Workspace() {
  const { scene } = useGLTF("/models/Untitled.glb");
  const sunRef = useRef();
  const { moveTo } = useCameraMove();

  // Auto-move camera after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      moveTo(CAMERA_STATES.GALLERY);
    }, 800);

    return () => clearTimeout(timer);
  }, [moveTo]);

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
        onClick={() => moveTo(CAMERA_STATES.MACBOOK)}
      >
        <boxGeometry args={[4, 3, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* MacBook Screen */}
      {/* MacBook Screen (pivoted groups to avoid translation when rotating) */}
      <group position={[-1.137, 8.39, 0.23]} rotation-y={Math.PI / 2}>
        <group rotation-x={-0.14}>
          <Html transform occlude scale={[0.138, 0.12, 1]}>
            <DesktopPortfolio />
          </Html>
        </group>
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [49, 19, 40], fov: 45 }} shadows>
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
      <Workspace />
    </Canvas>
  );
}