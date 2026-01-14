import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";

export default function useCameraMove() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0, z: 0 });

  const moveTo = ({ position, target: t }) => {
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

  return { moveTo };
}
