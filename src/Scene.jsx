import { Canvas } from "@react-three/fiber";
import { Html, useGLTF, OrbitControls } from "@react-three/drei";
import DesktopPortfolio from "./ui/DesktopPortfolio";

function Workspace() {
  const { scene } = useGLTF("/models/Untitled.glb");

  return (
    <>
      {/* 3D Workspace */}
      <primitive object={scene} />

      {/* MacBook Screen */}
      {/* MacBook Screen (pivoted groups to avoid translation when rotating) */}
      <group position={[-1.137, 8.3, 0.2]} rotation-y={Math.PI / 2}>
        <group rotation-x={-0.14}>
          <Html transform occlude scale={0.133}>
            <DesktopPortfolio />
          </Html>
        </group>
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 10, 18], fov: 45 }}>
      <color attach="background" args={["#1a1a1a"]} />

      {/* Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />

      {/* Scene */}
      <Workspace />

      {/* Enable mouse controls */}
      <OrbitControls />
    </Canvas>
  );
}