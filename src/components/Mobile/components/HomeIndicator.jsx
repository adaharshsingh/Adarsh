import React, { memo, useRef, useState } from "react";
import { gsap } from 'gsap';

const HomeIndicator = memo(({ onSwipeUp }) => {
  const indicatorRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    gsap.to(indicatorRef.current, {
      scaleX: 1.2,
      scaleY: 1.5,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentY.current = e.touches[0].clientY;
    const deltaY = startY.current - currentY.current;
    
    if (deltaY > 0) {
      // Swiping up
      const progress = Math.min(deltaY / 100, 1);
      gsap.to(indicatorRef.current, {
        y: -deltaY * 0.5,
        scaleX: 1.2 + progress * 0.3,
        scaleY: 1.5 + progress * 0.5,
        opacity: 1 - progress * 0.3,
        duration: 0.1,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const deltaY = startY.current - currentY.current;
    
    if (deltaY > 80) {
      // Swipe up threshold met - trigger home action
      gsap.to(indicatorRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          onSwipeUp?.();
          gsap.set(indicatorRef.current, {
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
          });
        }
      });
    } else {
      // Reset to original state
      gsap.to(indicatorRef.current, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e.clientY;
    gsap.to(indicatorRef.current, {
      scaleX: 1.2,
      scaleY: 1.5,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    currentY.current = e.clientY;
    const deltaY = startY.current - currentY.current;
    
    if (deltaY > 0) {
      const progress = Math.min(deltaY / 100, 1);
      gsap.to(indicatorRef.current, {
        y: -deltaY * 0.5,
        scaleX: 1.2 + progress * 0.3,
        scaleY: 1.5 + progress * 0.5,
        opacity: 1 - progress * 0.3,
        duration: 0.1,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaY = startY.current - currentY.current;
    
    if (deltaY > 80) {
      gsap.to(indicatorRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          onSwipeUp?.();
          gsap.set(indicatorRef.current, {
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
          });
        }
      });
    } else {
      gsap.to(indicatorRef.current, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleClick = () => {
    // Animate swipe up on click
    gsap.timeline()
      .to(indicatorRef.current, {
        scaleX: 1.2,
        scaleY: 1.5,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(indicatorRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .call(() => {
        onSwipeUp?.();
        gsap.set(indicatorRef.current, {
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
        });
      });
  };

  return (
    <div className="relative z-50 py-1">
      <div
        ref={indicatorRef}
        className="w-32 h-1 bg-white/80 rounded-full cursor-pointer hover:bg-white hover:scale-105 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{
          touchAction: 'none',
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
});

HomeIndicator.displayName = 'HomeIndicator';

export default HomeIndicator;
