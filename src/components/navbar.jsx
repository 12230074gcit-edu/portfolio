import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about-section' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      }
    );

    // Stagger links
    gsap.fromTo(
      linksRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.6
      }
    );
  }, []);

  const handleHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      y: isEnter ? -2 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleClick = (e, item) => {
    setActiveItem(item.label);
    
    // Smooth scroll
    e.preventDefault();
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        maxWidth: '90%',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 40px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '48px',
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{ 
            width: '100%', 
            height: '100%',
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))'
          }}
        />
      </div>

      {/* Navigation links */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.label}
            ref={el => linksRef.current[index] = el}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            style={{
              fontSize: '15px',
              fontWeight: activeItem === item.label ? 600 : 400,
              fontFamily: "'Montserrat', sans-serif",
              color: activeItem === item.label ? '#fff' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              position: 'relative',
              padding: '8px 0',
              transition: 'color 0.3s ease',
            }}
          >
            {item.label}
            {/* Active indicator */}
            <span 
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: activeItem === item.label ? '20px' : '0',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
                boxShadow: activeItem === item.label 
                  ? '0 0 10px rgba(255,255,255,0.5)' 
                  : 'none'
              }}
            />
          </a>
        ))}
      </div>
    </nav>
  );
};
