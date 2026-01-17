import React, { useEffect, useMemo, useState, memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground.jsx";
import IPhoneModel from "./components/IPhoneModel.jsx";
import CameraRig from "./components/CameraRig.jsx";
import SocialLinks from "./components/SocialLinks.jsx";
import ContentScreen from "./components/ContentScreen.jsx";

// Preload the iPhone model
import { useGLTF } from "@react-three/drei";
useGLTF.preload("/models/iphone_air.glb");

const MobileContentOverlay = memo(({ focusPhone, isIPhoneSettled, isMobile, iPhoneTransform, setFocusPhone }) => {
  if (!focusPhone || !isIPhoneSettled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto"
      style={{
        transform: `translate(${iPhoneTransform.position.x * 2}px, ${iPhoneTransform.position.y * 2}px)`
      }}
    >
      <div
        style={{
          width: isMobile ? "min(85vw, 340px)" : "360px",
          height: isMobile ? "min(82vh, 700px)" : "740px",
          borderRadius: isMobile ? "36px" : "40px",
          overflow: "hidden",
          backgroundImage: "url('/Group 38.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `scaleX(${Math.min(iPhoneTransform.scaleX / (isMobile ? 11.5 : 9.8), 1.05)}) scaleY(${Math.min(iPhoneTransform.scaleY / (isMobile ? 11.5 : 9.8), 1.05)})`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <ContentScreen setFocusPhone={setFocusPhone} />
      </div>
    </motion.div>
  );
});

MobileContentOverlay.displayName = 'MobileContentOverlay';

const TypewriterText = memo(({ roles }) => {
  const [index, setindex] = useState(0);
  const [SubIndex, setSubIndex] = useState(0);
  const [deleting, setdeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && SubIndex < current.length) {
          setSubIndex((v) => v + 1);
        } else if (!deleting && SubIndex === current.length) {
          setTimeout(() => setdeleting(true), 1200);
        } else if (deleting && SubIndex > 0) {
          setSubIndex((v) => v - 1);
        } else if (deleting && SubIndex === 0) {
          setdeleting(false);
          setindex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );
    return () => clearTimeout(timeout);
  }, [SubIndex, index, deleting, roles]);

  return (
    <motion.div
      className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span>{roles[index].substring(0, SubIndex)}</span>
      <span
        className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
        style={{ height: "1em" }}
      />
    </motion.div>
  );
});

TypewriterText.displayName = 'TypewriterText';

export default function Home() {
  const roles = useMemo(
    () => ["Web Developer", "Software Designer", "Creator"],
    []
  );
  const [focusPhone, setFocusPhone] = useState(false);
  const [isIPhoneSettled, setIsIPhoneSettled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iPhoneTransform, setIPhoneTransform] = useState({ position: { x: 0, y: 0, z: 0 }, scaleX: 1, scaleY: 1, rotation: 0 });
  
  const iPhoneScale = useMemo(() => [7.5, 7.5, 7.5], []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-focus iPhone on mobile (using timeout to avoid cascading renders)
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setFocusPhone(true), 0);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Reset settled state when unfocusing
  useEffect(() => {
    if (!focusPhone) {
      const timer = setTimeout(() => setIsIPhoneSettled(false), 0);
      return () => clearTimeout(timer);
    }
  }, [focusPhone]);

  return (
    <section
      id="Home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[500vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[500vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 flex">
        <motion.div
          className="flex flex-col justify-center h-full"
          animate={{
            width: focusPhone || isMobile ? "0%" : "50%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ pointerEvents: (focusPhone || isMobile) ? "none" : "auto", overflow: "hidden", display: isMobile ? "none" : "flex" }}
        >
          <motion.div 
            className="w-full lg:pr-24 mx-auto"
            style={{ minWidth: "48rem", maxWidth: "48rem" }}
            initial={{ opacity: 1 }}
            animate={{
              opacity: (focusPhone || isMobile) ? 0 : 1,
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              delay: (focusPhone || isMobile) ? 0 : 0.3
            }}
          >
            <TypewriterText roles={roles} />
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
            initial={{opacity:0, y:40}}
            animate={{opacity:1, y:0}}
            transition={{duration:1}}>
              Hello, I`m 
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">khgkjgjhgjh</span>
            </motion.h1>

            <motion.p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8,delay:0.4}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed obcaecati reprehenderit fugit aspernatur excepturi, modi expedita earum non voluptatem in a odio ducimus repellendus blanditiis nulla commodi voluptates nobis et!</motion.p>
            <motion.div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.8,delay:0.8}}>
              <a href="#projects" className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all">view my work</a>
              <a href="\AdarshResume 2.pdf" download className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all">resume</a>
            </motion.div>

            <SocialLinks />

          </motion.div>
        </motion.div>
        <motion.div className="relative h-full"
          animate={{
            width: (focusPhone || isMobile) ? "100%" : "50%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="absolute  top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            right:"10px", width:"min(22vw , 410px)", height:"min(40vw , 760px)",borderRadius:"50%",
            filter:"blur(38px)", opacity:0.32,
            background:"conic-gradient(from 0deg , #1cd8d2, #00bf8f, #302b63,#1cd8d2)"
          }} />
          <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
          animate={{
            width: (focusPhone || isMobile) ? "min(90vw, 600px)" : "min(45vw, 780px)",
            height: (focusPhone || isMobile) ? "min(95vh, 900px)" : "min(90vh, 820px)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="w-full h-full">
              <Canvas 
                camera={{ position: [0, 0, 3.4], fov: 45 }} 
                dpr={[1, 2]} 
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%', background: 'transparent' }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 3, 2]} intensity={2} castShadow />
                <CameraRig focusPhone={focusPhone} isMobile={isMobile} />
                <Suspense fallback={null}>
                  <IPhoneModel 
                    scale={iPhoneScale} 
                    focusPhone={focusPhone} 
                    onClick={() => !focusPhone && setFocusPhone(true)} 
                    onSettled={() => setIsIPhoneSettled(true)} 
                    isMobile={isMobile}
                    onTransformUpdate={setIPhoneTransform}
                  />
                </Suspense>
              </Canvas>
              
              <MobileContentOverlay
                focusPhone={focusPhone}
                isIPhoneSettled={isIPhoneSettled}
                isMobile={isMobile}
                iPhoneTransform={iPhoneTransform}
                setFocusPhone={setFocusPhone}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
