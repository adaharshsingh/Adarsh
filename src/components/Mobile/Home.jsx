import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ParticleBackground from "./ParticleBackground.jsx";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

// iPhone Model Component with proper two-phase animation
function IPhoneModel({ scale, focusPhone, onClick }) {
  const { scene } = useGLTF("/models/iphone_air.glb");
  const groupRef = useRef();

  // ---- CONSTANTS ----
  const HERO_POSITION = new THREE.Vector3(0.6, -0.2, 0);
  const HERO_SCALE = new THREE.Vector3(...scale);
  const BASE_ROT_Y = Math.PI * 1.5; // 270°
  const IDLE_ROT_SPEED = 0.2;

  const hasSettled = useRef(false);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    // ===== PHASE 1: ENTRY ANIMATION =====
    if (!hasSettled.current) {
      g.position.lerp(HERO_POSITION, delta * 2.5);
      g.scale.lerp(HERO_SCALE, delta * 2.5);

      g.rotation.y = THREE.MathUtils.lerp(
        g.rotation.y,
        BASE_ROT_Y,
        delta * 2.5
      );

      // ---- SNAP & LOCK when close enough ----
      if (
        g.position.distanceTo(HERO_POSITION) < 0.001 &&
        Math.abs(g.rotation.y - BASE_ROT_Y) < 0.001
      ) {
        g.position.copy(HERO_POSITION);
        g.scale.copy(HERO_SCALE);
        g.rotation.y = BASE_ROT_Y;
        hasSettled.current = true;
      }

      return;
    }

    // ===== PHASE 2: IDLE ROTATION ONLY =====
    if (!focusPhone) {
      g.rotation.y += delta * IDLE_ROT_SPEED;
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
}

const socials = [
  {
    Icon:FaXTwitter,label:"Twitter",href:"https://adarsh-plum.vercel.app/"
  },
  {
    Icon:FaLinkedin,label:"LinkedIn",href:"https://www.linkedin.com/in/adarsh-kumar-singh-226228239/"
  },
  {
    Icon:FaGithub,label:"GitHub",href:"https://github.com/adaharshsingh"},
  ]

  const glowVariants = {
    initial: {scale:1, y:0,filter:"drop-shadow(0 0 0 rgba(0,0,0,0))"},
    hover: {scale:1.2, y:-3, filter:"drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: {type:"spring", stiffness:300,damping:15},
  },
  tap:{scale:0.95,y:0,transition:{duration:0.98}}
}


export default function Home() {
  const roles = useMemo(
    () => ["Web Developer", "Software Designer", "Creator"],
    []
  );
  const [index, setindex] = useState(0);
  const [SubIndex, setSubIndex] = useState(0);
  const [deleting, setdeleting] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  
  // iPhone scale state
  const [iPhoneScale, setIPhoneScale] = useState([8, 8, 8]);

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
    <section
      id="Home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[500vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[500vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 h-full  w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <motion.div 
          className="flex flex-col justify-center h-full text-center lg:text-left relative"
          animate={{ opacity: focusPhone ? 0 : 1, x: focusPhone ? -50 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ pointerEvents: focusPhone ? "none" : "auto" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6}}>
              <span>
                {roles[index].substring(0, SubIndex)}
              </span>
              <span className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle "
              style={{height:"1em"}} ></span>
            </motion.div>
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

            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({Icon,label,href}) => (
                <motion.a href={href} key={label} target="_blank" aria-label={label} rel="noopener noreferrer" variants={glowVariants} initial='initial' whileHover="hover" whileTap="tap" className="text-gray-300 ">
                  <Icon/>
                  </motion.a>
              ))}

            </div>

          </div>
        </motion.div>
        <div className="relative hidden lg:block h-full">
          <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            right:"10px", width:"min(22vw , 410px)", height:"min(40vw , 760px)",borderRadius:"50%",
            filter:"blur(38px)", opacity:0.32,
            background:"conic-gradient(from 0deg , #1cd8d2, #00bf8f, #302b63,#1cd8d2)"
          }} />
          <motion.div 
          className="absolute -translate-y-[50%] object-contain select-none pointer-events-auto w-full h-full"
          style={{
            right:"-30px", width:"min(45vw , 780px)", maxHeight:"90vh"
          }}
          initial={{opacity:0, y:40 , scale:0.98}}
          animate={{opacity:1, y:0, scale:1}}
          transition={{duration:0.8, delay:0.2}}>
            {/* Framer Motion wrapper for Canvas scale animation */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ width: '100%', height: '100%' }}
            >
              <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 3, 2]} intensity={2} castShadow />
                <IPhoneModel scale={iPhoneScale} focusPhone={focusPhone} onClick={() => setFocusPhone(true)} />
              </Canvas>
              
              {focusPhone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto"
                >
                  <div
                    style={{
                      width: "360px",
                      height: "740px",
                      borderRadius: "40px",
                      overflow: "hidden",
                      background: "#000",
                    }}
                  >
                    {/* Mobile Portfolio Content */}
                    <div className="text-white text-center py-20">
                      <p>Portfolio Content Here</p>
                      <button 
                        onClick={() => setFocusPhone(false)}
                        className="mt-6 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
