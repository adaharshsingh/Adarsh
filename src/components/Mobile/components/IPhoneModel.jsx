import React, { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const IPhoneModel = memo(({ scale, focusPhone, onClick, onSettled, isMobile, onTransformUpdate }) => {
  const { scene } = useGLTF("/models/iphone_air.glb");
  const groupRef = useRef();
  const hasNotifiedSettled = useRef(false);
  const rotationStartValue = useRef(0);
  const hasStartedFocusRotation = useRef(false);
  const exitRotationTarget = useRef(null);

  // ---- CONSTANTS ----
  const NORMAL_POSITION = new THREE.Vector3(0.3, -0.1, 0);
  const NORMAL_SCALE = new THREE.Vector3(...scale);
  
  const FOCUS_POSITION = new THREE.Vector3(0, 0, 0);
  const FOCUS_SCALE = new THREE.Vector3(
    isMobile ? 11.5 : 9.8,
    isMobile ? 11.5 : 9.8,
    isMobile ? 11.5 : 9.8
  );
  
  const BASE_ROT_Y = Math.PI * 1.5;
  const DOUBLE_ROTATION = Math.PI * 4;
  const SINGLE_ROTATION = Math.PI * 2;

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const targetPosition = focusPhone ? FOCUS_POSITION : NORMAL_POSITION;
    const targetScale = focusPhone ? FOCUS_SCALE : NORMAL_SCALE;

    g.position.lerp(targetPosition, delta * 2);
    g.scale.lerp(targetScale, delta * 2);

    if (!focusPhone) {
      if (hasStartedFocusRotation.current !== false && exitRotationTarget.current !== null) {
        if (Math.abs(g.rotation.y - exitRotationTarget.current) > 0.05) {
          g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, exitRotationTarget.current, delta * 2);
        } else {
          hasStartedFocusRotation.current = false;
          exitRotationTarget.current = null;
        }
      } else {
        g.rotation.y += delta * 0.1;
      }
    } else {
      if (!hasStartedFocusRotation.current) {
        const currentAngle = g.rotation.y % (Math.PI * 2);
        const targetAngle = BASE_ROT_Y % (Math.PI * 2);
        let angleDiff = targetAngle - currentAngle;
        if (angleDiff < 0) angleDiff += Math.PI * 2;
        
        rotationStartValue.current = g.rotation.y;
        hasStartedFocusRotation.current = g.rotation.y + SINGLE_ROTATION + angleDiff;
        exitRotationTarget.current = hasStartedFocusRotation.current + SINGLE_ROTATION;
      }

      g.rotation.y = THREE.MathUtils.lerp(
        g.rotation.y,
        hasStartedFocusRotation.current,
        delta * 2
      );
    }

    if (focusPhone && !hasNotifiedSettled.current) {
      const positionDist = g.position.distanceTo(targetPosition);
      const scaleDiff = Math.abs(g.scale.x - targetScale.x);
      const rotationDiff = Math.abs(g.rotation.y - hasStartedFocusRotation.current);

      if (positionDist < 0.01 && scaleDiff < 0.05 && rotationDiff < 0.05) {
        hasNotifiedSettled.current = true;
        onSettled?.();
      }
    }

    if (!focusPhone) {
      hasNotifiedSettled.current = false;
    }

    if (onTransformUpdate) {
      onTransformUpdate({
        position: g.position.clone(),
        scaleX: g.scale.x,
        scaleY: g.scale.y,
        rotation: g.rotation.y
      });
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[4, 4, 4]}
      rotation={[0, 0, 0]}
      onClick={onClick}
    >
      <primitive object={scene} />
    </group>
  );
});

IPhoneModel.displayName = 'IPhoneModel';

export default IPhoneModel;
