import {  useEffect, useRef, useState,React } from 'react';
import OverlaysMenu from './OverlaysMenu.jsx';
import logo from '../assets/logo.png';
import { IoIosMenu } from "react-icons/io";


const Navbar = () => {
  const [menuOpen, setmenuOpen] = useState(false);
  const [Visible, setVisible] = useState(true);
  const [ForceVisible, setForceVisible] = useState(false);
  const lastScrollY =useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector('#home');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
        setForceVisible(true);
        setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    if (homeSection) {
      observer.observe(homeSection);
    } return () => {
      if (homeSection) {
        observer.unobserve(homeSection);
      }}
    },[])

    useEffect(() => {
      const handleScroll = () => {
        if (ForceVisible) {
          setVisible(true);
        return
      }
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          setVisible(false);
        } else {
          setVisible(true);
        }
          if (timerId.current) {
            clearTimeout(timerId.current);
          }
          timerId.current = setTimeout(() => {
            setVisible(false);
          }, 2000);
        
        lastScrollY.current = currentScrollY;
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timerId.current) {
          clearTimeout(timerId.current);
        }
      }
    },[ForceVisible]);

  return (
    <div >
      <nav className={'fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 $(visible ? "translate-y-0" : "-translate-y-full")'}>
        <div className='flex items-center space-x-2'>
          <img src={logo} alt="logo" className='w-[200px] h-[90px]' />
          <div className='text-2xl font-bold text-white hidden sm:block'></div>
        </div>
        <div className=' block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2'>
        <button onClick={() => setmenuOpen(true)} className='text-white text-3xl focus:outline-None 'aria-label="open Menu">
          <IoIosMenu />

        </button>
        </div>
        <div className='hidden lg:block'>
          <a href='#Contact' className='bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow:lg hover:from-pink-600 hover:to-blue-600 transition-colors duration-300'>
            Reach Out
          </a>
        </div>

      </nav>
      <OverlaysMenu isOpen={menuOpen} onClose={()=> setmenuOpen(false)}/>
    </div>
  )
}

export default Navbar