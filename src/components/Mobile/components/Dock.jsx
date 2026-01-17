import React, { memo, useRef } from "react";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const DockIcon = memo(({ icon, alt, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="dock-icon relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform active:scale-90 will-change-transform"
  >
    <img 
      src={icon} 
      alt={alt} 
      className="relative w-full h-full object-contain p-1 pointer-events-none drop-shadow-lg"
      draggable="false"
    />
  </button>
));

DockIcon.displayName = 'DockIcon';

const Dock = memo(({ onScreenChange }) => {
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;
    
    const icons = dock.querySelectorAll(".dock-icon");
    
    const animateIcons = (clientX) => {
      const { left, width } = dock.getBoundingClientRect();
      const relativeX = clientX - left;
      
      icons.forEach((icon) => {
        const { left: iconLeft, width: iconWidth } = icon.getBoundingClientRect();
        const iconCenter = iconLeft - left + iconWidth / 2;
        const distance = Math.abs(relativeX - iconCenter);
        
        // iOS-like scaling with smooth falloff
        const maxScale = 1.5;
        const maxDistance = width / 3;
        const intensity = Math.max(0, 1 - (distance / maxDistance));
        const scale = 1 + (maxScale - 1) * Math.pow(intensity, 2);
        const translateY = -20 * Math.pow(intensity, 2);
        
        gsap.to(icon, {
          scale: scale,
          y: translateY,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      animateIcons(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        animateIcons(e.touches[0].clientX);
      }
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("touchmove", handleTouchMove, { passive: true });
    dock.addEventListener("mouseleave", resetIcons);
    dock.addEventListener("touchend", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("touchmove", handleTouchMove);
      dock.removeEventListener("mouseleave", resetIcons);
      dock.removeEventListener("touchend", resetIcons);
    };
  }, []);

  const dockApps = [
    {
      id: 1,
      icon: "/icons/phone.png",
      alt: "Phone",
      ariaLabel: "Call",
      action: () => window.location.href = 'tel:+1234567890'
    },
    {
      id: 2,
      icon: "/icons/gmail.png",
      alt: "Email",
      ariaLabel: "Send Email",
      action: () => window.location.href = 'mailto:your.email@example.com'
    },
    {
      id: 3,
      icon: "/icons/LinkdIn.png",
      alt: "LinkedIn",
      ariaLabel: "Open LinkedIn",
      action: () => window.open('https://linkedin.com/in/yourprofile', '_blank')
    },
    {
      id: 4,
      icon: "/icons/info.svg",
      alt: "Resume",
      ariaLabel: "View Resume",
      action: () => onScreenChange?.("resume")
    },
  ];

  return (
    <div className="w-full px-3 pb-5 sm:pb-6">
      <div 
        ref={dockRef}
        className="relative mx-auto max-w-md"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Dock Container with iOS-like glassmorphism */}
        <div 
          className="relative bg-white/15 backdrop-blur-2xl rounded-[24px] px-3 py-3 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(255,255,255,0.1)_inset]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
          }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-white/5 to-white/10 pointer-events-none"></div>
          
          {/* Icons Container */}
          <div className="relative flex justify-around items-end gap-2 sm:gap-3">
            {dockApps.map((app) => (
              <DockIcon
                key={app.id}
                icon={app.icon}
                alt={app.alt}
                ariaLabel={app.ariaLabel}
                onClick={app.action}
              />
            ))}
          </div>
        </div>
        
        {/* Shadow beneath dock */}
        <div 
          className="absolute inset-x-0 -bottom-1 h-4 bg-gradient-radial from-black/30 via-black/10 to-transparent blur-md"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)",
          }}
        ></div>
      </div>
    </div>
  );
});

Dock.displayName = 'Dock';

export default Dock;
