import { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import Home from './Home'
import About from './About'
import Skills from './Skills'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [scrollLocked, setScrollLocked] = useState(window.innerWidth < 1024) // Lock only on mobile

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // When switching to desktop, unlock scroll; when switching to mobile, lock scroll
      setScrollLocked(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Lock/unlock scroll based on state
  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [scrollLocked])

  const toggleScroll = () => {
    setScrollLocked(!scrollLocked)
  }

  return (
    <div className='relative gradient text-white w-full min-h-screen' style={{ overflow: scrollLocked ? 'hidden' : 'auto', height: scrollLocked ? '100vh' : 'auto' }}>
      {/* <ParticleBackground /> */}
      <Home scrollLocked={scrollLocked} toggleScroll={toggleScroll} isMobile={isMobile} />
      <About />
      <Skills />
    </div>
  )
}

export default App
