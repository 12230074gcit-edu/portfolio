import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NAV_ITEMS = ['Home', 'Projects', 'About Me', 'Contact Me'];

export const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        onComplete: () => {
          gsap.set(navRef.current, { opacity: 1 }); // force full opacity
        }
      }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '20px',
        left: '0',
        width: '93%',
        zIndex: 9999,
        opacity: 1, // force visible
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 50px',
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Navigation links */}
      <div style={{ display: 'flex', gap: '48px' }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            style={{
              fontSize: '20px',
              fontWeight: 400,
              googleFont: 'poppins',
              color: 'white',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              opacity: 1, // ensure links are visible
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fff';
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};