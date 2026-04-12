import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const NAV_ITEMS = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Projects', href: '#projects-section', type: 'scroll' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Contact', href: '/contact', type: 'route' }
];

export const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const [activeItem, setActiveItem] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Set active based on current route
    if (location.pathname === '/') setActiveItem('Home');
    else if (location.pathname === '/about') setActiveItem('About');
    else if (location.pathname === '/contact') setActiveItem('Contact');
  }, [location]);

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
    e.preventDefault();
    setActiveItem(item.label);

    if (item.type === 'route') {
      navigate(item.href);
    } else {
      // If on home page, scroll to section
      if (location.pathname === '/') {
        const target = document.querySelector(item.href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home first, then scroll
        navigate('/');
        setTimeout(() => {
          const target = document.querySelector(item.href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? 'calc(100% - 40px)' : 'auto',
          maxWidth: '90%',
          zIndex: 9999,
          display: 'flex',
          justifyContent: isMobile ? 'space-between' : 'center',
          alignItems: 'center',
          padding: isMobile ? '12px 20px' : '16px 40px',
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
          onClick={() => navigate('/')}
          style={{
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: isMobile ? '0' : '48px',
            cursor: 'pointer',
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

        {/* Desktop Navigation links */}
        {!isMobile && (
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
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: '#fff',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#fff',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#fff',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }} />
          </button>
        )}
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '90px',
            left: '20px',
            right: '20px',
            zIndex: 9998,
            background: 'rgba(8, 12, 114, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleClick(e, item);
                setMobileMenuOpen(false);
              }}
              style={{
                fontSize: '16px',
                fontWeight: activeItem === item.label ? 600 : 400,
                fontFamily: "'Montserrat', sans-serif",
                color: activeItem === item.label ? '#fff' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '14px 20px',
                borderRadius: '12px',
                background: activeItem === item.label ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};
