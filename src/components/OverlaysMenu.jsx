import { FiX } from "react-icons/fi";
import React from "react";
import { motion ,AnimatePresence } from "framer-motion";

export default function OverlaysMenu({isOpen, onClose}) {

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%": "50% 8%";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className='fixed inset-0 flex items-center justify-center z-50'
        
        initial={{clipPath: `circle(0% at ${origin})`}}
        animate={{clipPath: `circle(150% at ${origin})`}}
        exit={{clipPath: `circle(0% at ${origin})`}}
        transition={{type: 'spring', stiffness: 20, restDelta: 2, duration:0.5}}
        style={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
          <button className="absolute top-6 right-6 text-white text-3xl " onClick={onClose} aria-label="close Menu">
            <FiX />

          </button>
          <ul className="space-y-6 text-center">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Testimonials', 'Contact'].map((item,index) => (
             <motion.li key={item}
             initial={{opacity:0, y:20}}
             animate={{opacity:1, y:0}}
             transition={{delay: 0.3+index *0.1}}>
              <a href={`#${item.toLowerCase()}`} onClick={onClose} 
              className="text-4xl font-semibold text-white hover:text-pink-400 transition-colors duration-300">
                {item}
              </a>
             </motion.li>
             ))}

          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}