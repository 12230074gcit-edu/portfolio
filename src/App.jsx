import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/navbar';
import { Hero } from './components/Hero';
import { TetrisCanvas } from './components/tetris';
import { QuoteSection } from './components/quote';
import ProjectsSection from './components/ProjectSection';
import AboutMe from './components/aboutMeSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/Contact';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import Bubbles from './components/Bubbles';
import Footer from './components/Footer';
import { FloatingCrystal } from './components/Interactive3D';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const mainRef = useRef(null);
  const gridRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    // Smooth reveal on load
    gsap.to(mainRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    });

    // Parallax grid movement
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      gsap.to(gridRef.current, {
        x,
        y,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Floating circles with soft animations
    circlesRef.current.forEach((circle) => {
      if (!circle) return;
      const randomX = gsap.utils.random(-20, 20);
      const randomY = gsap.utils.random(-20, 20);
      const duration = gsap.utils.random(5, 10);
      gsap.to(circle, {
        x: randomX,
        y: randomY,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const circleConfigs = [
    { top: '15%', left: '0%', color: '#070DC7', size: 300 },
    { top: '15%', right: '-2%', color: '#1A64BA', size: 300 },
    { bottom: '5%', left: '5%', color: '#6048B7', size: 340 },
    { bottom: '1%', right: '1%', color: '#6A44F4', size: 310 },
  ];

  return (
    <div
      ref={mainRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        opacity: 0,
        overflowX: 'hidden',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >


      {/* Premium Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}>
        {/* Base gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #080C72 0%, #0a0e5c 50%, #080C72 100%)'
        }} />

        {/* Soft blur overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(150px)'
        }} />

        {/* Animated grid with soft edges */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: '-50px',
            opacity: 0.08,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />
      </div>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 100 }}>
        <Navbar />
      </div>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          position: 'relative',
          height: '100vh',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Tetris background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <TetrisCanvas />
        </div>

        {/* Floating gradient circles */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {circleConfigs.map((c, i) => (
            <div
              key={i}
              ref={el => circlesRef.current[i] = el}
              onMouseEnter={e => gsap.to(e.currentTarget, {
                scale: 1.15,
                opacity: 0.9,
                duration: 0.5,
                ease: 'power2.out'
              })}
              onMouseLeave={e => gsap.to(e.currentTarget, {
                scale: 1,
                opacity: 0.7,
                duration: 0.5,
                ease: 'power2.out'
              })}
              style={{
                position: 'absolute',
                ...(c.center
                  ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
                  : c),
                width: `${c.size}px`,
                height: `${c.size}px`,
                backgroundColor: c.color,
                borderRadius: '50%',
                filter: 'blur(60px)',
                opacity: 0.7,
                transition: 'filter 0.5s ease',
              }}
            />
          ))}
        </div>

        {/* 3D Interactive Elements */}
        <FloatingCrystal size={100} position={{ right: '8%', top: '25%' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
        </div>
      </section>

      {/* Interactive Bubbles - below hero */}
      <Bubbles />

      {/* Quote Section */}
      <QuoteSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* About Me Section */}
      <AboutMe />

      {/* Services Section */}
      <ServicesSection />

      {/* Contact CTA Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
      </Routes>
    </main>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}
