import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { memo } from "react";

const CameraRig = memo(({ focusPhone, isMobile }) => {
  useFrame(({ camera }, delta) => {
    const targetPos = focusPhone
      ? new THREE.Vector3(0, 0, isMobile ? 2.5 : 2.2)
      : new THREE.Vector3(0, 0, isMobile ? 4 : 3.4);

    camera.position.lerp(targetPos, delta * 2.5);
    camera.lookAt(0, 0, 0);
  });

  return null;
});

CameraRig.displayName = 'CameraRig';

export default CameraRig;
