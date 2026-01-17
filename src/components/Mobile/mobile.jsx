import ParticleBackground from './ParticleBackground'
import Home from './Home'
import About from './About'
import Skills from './Skills'

function App() {
  return (
    <div className='relative gradient text-white w-full min-h-screen overflow-y-auto'>
      {/* <ParticleBackground /> */}
      <Home />
      <About />
      <Skills />
    </div>
  )
}

export default App
