import React, { useEffect, useRef } from "react";

export const GlowingEffect = ({ 
  spread = 40, 
  glow = true, 
  disabled = false, 
  proximity = 25, 
  inactiveZone = 0.01,
  color = "rgba(28, 216, 210, 0.8)"
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (disabled || !glow || !containerRef.current) return;

    const container = containerRef.current;
    const parent = container.parentElement;

    if (!parent) return;

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const distX = x - centerX;
      const distY = y - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance = Math.max(rect.width, rect.height) / 2 + proximity;

      if (distance < maxDistance) {
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        container.style.opacity = String(Math.min(intensity, 0.8));
        container.style.boxShadow = `0 0 ${spread}px ${spread / 2}px ${color}`;
      } else {
        container.style.opacity = "0";
      }
    };

    const handleMouseLeave = () => {
      container.style.opacity = "0";
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, glow, proximity, inactiveZone, spread, color]);

  if (disabled || !glow) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-300"
      style={{
        opacity: 0,
        boxShadow: `0 0 ${spread}px ${spread / 2}px ${color}`,
      }}
    />
  );
};

export default GlowingEffect;
