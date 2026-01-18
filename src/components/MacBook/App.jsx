import { Dock, Home, Navbar, Welcome } from './components'
import { Draggable } from 'gsap/Draggable'
import { gsap } from 'gsap'
import { Terminal, Safari, Resume, Text, Finder, Image, Contact, Gallery } from './windows';
import './index.css';
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main id="macbook-portfolio">
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Text />
      <Finder />
      <Image />
      <Contact />
      <Gallery />
      <Home />
    </main>
  )
}

export default App