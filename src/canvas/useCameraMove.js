import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";

export default function useCameraMove() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0, z: 0 });
  const cameraState = useRef({ 
    basePosition: { x: 0, y: 0, z: 0 },
    zoom: 1,
    rotationY: 0 
  });

  const moveTo = ({ position, target: t }) => {
    cameraState.current.basePosition = {
      x: position[0],
      y: position[1],
      z: position[2],
    };
    cameraState.current.zoom = 1;
    cameraState.current.rotationY = 0;

    gsap.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1.2,
      ease: "power3.inOut",
    });

    gsap.to(target.current, {
      x: t[0],
      y: t[1],
      z: t[2],
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.lookAt(
          target.current.x,
          target.current.y,
          target.current.z
        );
      },
    });
  };

  const zoom = (delta) => {
    const zoomSpeed = 0.15;
    const MAX_ZOOM_OUT_DISTANCE = 250; // Maximum distance from target (staying within starfield at ±400)
    const MIN_ZOOM_IN_DISTANCE = 2;    // Minimum distance from target
    
    // Calculate distance from camera to target
    const dx = camera.position.x - target.current.x;
    const dy = camera.position.y - target.current.y;
    const dz = camera.position.z - target.current.z;
    const currentDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
    // Calculate new distance (negative delta zooms in, positive zooms out)
    const newDistance = currentDistance * (1 + delta * zoomSpeed);
    
    // Clamp zoom distance to limits - can zoom in to MIN_ZOOM_IN_DISTANCE, but not out beyond MAX_ZOOM_OUT_DISTANCE
    const clampedDistance = Math.max(MIN_ZOOM_IN_DISTANCE, Math.min(MAX_ZOOM_OUT_DISTANCE, newDistance));
    const ratio = clampedDistance / currentDistance;
    
    // Update camera position
    camera.position.x = target.current.x + dx * ratio;
    camera.position.y = target.current.y + dy * ratio;
    camera.position.z = target.current.z + dz * ratio;
    
    camera.lookAt(target.current.x, target.current.y, target.current.z);
  };

  const rotateTableY = (angle) => {
    cameraState.current.rotationY += angle;
    
    // Rotate around target on Y axis
    const dx = camera.position.x - target.current.x;
    const dz = camera.position.z - target.current.z;
    
    const currentAngle = Math.atan2(dz, dx);
    const newAngle = currentAngle + angle;
    
    const distance = Math.sqrt(dx * dx + dz * dz);
    const dy = camera.position.y - target.current.y;
    
    camera.position.x = target.current.x + Math.cos(newAngle) * distance;
    camera.position.z = target.current.z + Math.sin(newAngle) * distance;
    
    camera.lookAt(target.current.x, target.current.y, target.current.z);
  };

  return { moveTo, zoom, rotateTableY, cameraState };
}
