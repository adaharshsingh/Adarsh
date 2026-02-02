import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const MagneticCursor = ({ isActive = true }) => {
  const cursorDotRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [targetCorners, setTargetCorners] = useState(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    // Restore cursor when inactive
    if (!isActive) {
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => el.style.cursor = '');
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'magnetic-cursor-style';
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setIsCursorVisible(true);
      setMousePosition({ x: clientX, y: clientY });

      // Check for interactive elements
      const element = document.elementFromPoint(clientX, clientY);
      const isClickable =
        element?.tagName === 'BUTTON' ||
        element?.tagName === 'A' ||
        element?.classList.contains('clickable') ||
        element?.classList.contains('dock-icon') ||
        element?.getAttribute('role') === 'button' ||
        element?.closest('button') ||
        element?.closest('a') ||
        element?.closest('[role="button"]');

      if (isClickable && element) {
        const rect = element.getBoundingClientRect();
        const corners = {
          topLeft: { x: rect.left, y: rect.top },
          topRight: { x: rect.right, y: rect.top },
          bottomRight: { x: rect.right, y: rect.bottom },
          bottomLeft: { x: rect.left, y: rect.bottom },
          center: { x: clientX, y: clientY },
        };
        setTargetCorners(corners);
        setIsHoveringClickable(true);
      } else {
        setTargetCorners(null);
        setIsHoveringClickable(false);
      }
    };

    const handleMouseLeave = () => {
      document.body.style.cursor = 'auto';
      setTargetCorners(null);
      setIsHoveringClickable(false);
      setIsCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
    };

    // Animation loop for rotating corners when not hovering
    const animate = () => {
      if (!isHoveringClickable) {
        setRotation((prev) => (prev + 2) % 360);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    document.addEventListener('mouseenter', handleMouseEnter);

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      const styleEl = document.getElementById('magnetic-cursor-style');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [isActive, isHoveringClickable]);

  if (!isActive || !isCursorVisible) return null;

  // Corner bracket size and distance
  const cornerBracketSize = 8;
  const cornerDistance = 18;
  const bracketThickness = 2;

  // Corner positions when rotating
  const rotationRad = (rotation * Math.PI) / 180;
  const cornerPositions = [
    {
      x: Math.cos(rotationRad) * cornerDistance,
      y: Math.sin(rotationRad) * cornerDistance,
    },
    {
      x: Math.cos(rotationRad + Math.PI / 2) * cornerDistance,
      y: Math.sin(rotationRad + Math.PI / 2) * cornerDistance,
    },
    {
      x: Math.cos(rotationRad + Math.PI) * cornerDistance,
      y: Math.sin(rotationRad + Math.PI) * cornerDistance,
    },
    {
      x: Math.cos(rotationRad + (3 * Math.PI) / 2) * cornerDistance,
      y: Math.sin(rotationRad + (3 * Math.PI) / 2) * cornerDistance,
    },
  ];

  const cornerRotations = [135, 225, 315, 45]; // Diagonal rotations to point inward

  return (
    <>
      {/* Center dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 1200,
          damping: 20,
          mass: 0.1,
        }}
      />

      {/* Corner brackets */}
      {[0, 1, 2, 3].map((idx) => {
        const isHovering = isHoveringClickable && targetCorners;
        const corner = cornerPositions[idx];
        
        // Hover positions and rotations
        const hoverCorners = [
          { corner: targetCorners?.topLeft, rotation: 355, offsetX: 0, offsetY: 0 },
          { corner: targetCorners?.topRight, rotation: 85, offsetX: -cornerBracketSize, offsetY: 0 },
          { corner: targetCorners?.bottomRight, rotation: 175, offsetX: -cornerBracketSize, offsetY: -cornerBracketSize },
          { corner: targetCorners?.bottomLeft, rotation: 265, offsetX: 0, offsetY: -cornerBracketSize },
        ];
        
        return (
          <motion.div
            key={`bracket-${idx}`}
            className="fixed pointer-events-none z-[9998]"
            style={{
              width: cornerBracketSize,
              height: cornerBracketSize,
              overflow: 'visible',
            }}
            animate={
              isHovering
                ? {
                    x: hoverCorners[idx].corner.x + hoverCorners[idx].offsetX,
                    y: hoverCorners[idx].corner.y + hoverCorners[idx].offsetY,
                  }
                : {
                    x: mousePosition.x - cornerBracketSize / 2 + corner.x,
                    y: mousePosition.y - cornerBracketSize / 2 + corner.y,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: isHovering ? 200 : 400,
              damping: isHovering ? 25 : 30,
              mass: isHovering ? 0.5 : 0.3,
            }}
          >
            <svg
              width={cornerBracketSize}
              height={cornerBracketSize}
              viewBox={`0 0 ${cornerBracketSize} ${cornerBracketSize}`}
              style={{
                transform: `rotate(${
                  isHovering
                    ? hoverCorners[idx].rotation
                    : rotation + cornerRotations[idx]
                }deg)`,
                overflow: 'visible',
              }}
            >
              <path
                d={`M 0 0 L ${cornerBracketSize * 0.4} 0 M 0 0 L 0 ${cornerBracketSize * 0.4}`}
                stroke="white"
                strokeWidth={bracketThickness}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        );
      })}
    </>
  );
};

export default MagneticCursor;
