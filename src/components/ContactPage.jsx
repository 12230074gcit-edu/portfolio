import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bubbles from './Bubbles';
import { Navbar } from './navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  const gridRef = useRef(null);
  const orbitRef = useRef(null);
  const particlesRef = useRef([]);
  const titleCharsRef = useRef([]);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance
      gsap.fromTo(pageRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Title characters animation
      titleCharsRef.current.forEach((char, i) => {
        if (!char) return;
        gsap.fromTo(char,
          { y: 100, opacity: 0, rotateX: -90 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.3 + i * 0.04
          }
        );
      });

      // Subtitle
      gsap.fromTo('.contact-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      // Form fields stagger
      gsap.fromTo(fieldsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      // Info items
      gsap.fromTo('.info-item',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.8,
        }
      );

      // Rotating orbit
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
      });

      // Floating particles
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        gsap.to(particle, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Grid parallax
      const handleMouseMove = (e) => {
        if (!gridRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(gridRef.current, {
          x, y,
          duration: 1.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    });

    return () => ctx.revert();
  }, []);

  const handleInputFocus = (e, fieldName) => {
    setFocusedField(fieldName);
    gsap.to(e.currentTarget, {
      borderColor: 'rgba(100,150,255,0.6)',
      boxShadow: '0 0 50px rgba(100,150,255,0.2), 0 0 100px rgba(100,150,255,0.1), inset 0 0 30px rgba(100,150,255,0.05)',
      duration: 0.5,
      ease: 'power2.out'
    });
    gsap.to(e.currentTarget.parentElement.querySelector('.field-label'), {
      y: -30,
      scale: 0.85,
      color: 'rgba(100,150,255,1)',
      duration: 0.3
    });
  };

  const handleInputBlur = (e, fieldName) => {
    setFocusedField(null);
    const hasValue = e.currentTarget.value.length > 0;
    gsap.to(e.currentTarget, {
      borderColor: 'rgba(255,255,255,0.1)',
      boxShadow: '0 0 0 rgba(255,255,255,0)',
      duration: 0.4,
    });
    if (!hasValue) {
      gsap.to(e.currentTarget.parentElement.querySelector('.field-label'), {
        y: 0,
        scale: 1,
        color: 'rgba(255,255,255,0.4)',
        duration: 0.3
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Button animation
    gsap.to(formRef.current.querySelector('button'), {
      scale: 0.95,
      duration: 0.15,
    });

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    gsap.to(formRef.current.querySelector('button'), {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)'
    });

    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const titleText = "Let's Connect";
  
  const infoItems = [
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email', 
      value: 'jigmenamgyel.dev@gmail.com',
      href: 'mailto:jigmenamgyel.dev@gmail.com'
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location', 
      value: 'Thimphu, Bhutan',
      href: null
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      ),
      label: 'Status', 
      value: 'Open for Projects',
      href: null,
      highlight: true
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
        </svg>
      ),
      label: 'LinkedIn', 
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/jigmenamgyel'
    },
  ];

  const inputStyle = {
    width: '100%',
    padding: '22px 24px',
    paddingTop: '32px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    color: '#fff',
    fontSize: '16px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    transition: 'all 0.4s ease',
  };

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        overflow: 'hidden',
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
          background: 'linear-gradient(135deg, #080C72 0%, #0a0e5c 40%, #050830 100%)'
        }} />

        {/* Animated grid */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: '-100px',
            opacity: 0.04,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 60%)',
          }}
        />

        {/* Floating orbs */}
        <div style={{
          position: 'absolute',
          left: '5%',
          top: '15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(60, 80, 200, 0.2), transparent 60%)',
          filter: 'blur(100px)',
          animation: 'pulse 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          right: '-5%',
          bottom: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(100, 60, 200, 0.15), transparent 60%)',
          filter: 'blur(80px)',
          animation: 'pulse 10s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          left: '40%',
          top: '60%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(80, 120, 255, 0.1), transparent 60%)',
          filter: 'blur(60px)',
          animation: 'pulse 6s ease-in-out infinite',
        }} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            style={{
              position: 'absolute',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              borderRadius: '50%',
              background: `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, 255, ${0.2 + Math.random() * 0.3})`,
              boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(100,150,255,0.3)`,
            }}
          />
        ))}

        {/* Orbiting element */}
        <div
          ref={orbitRef}
          style={{
            position: 'absolute',
            right: '15%',
            top: '20%',
            width: '200px',
            height: '200px',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(100,150,255,0.8)',
            boxShadow: '0 0 20px rgba(100,150,255,0.6)',
          }} />
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className="contact-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '140px 40px 100px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        {/* Left - Form Section */}
        <div>
          {/* Title with character animation */}
          <h1
            style={{
              fontSize: 'clamp(48px, 7vw, 72px)',
              fontWeight: 700,
              marginBottom: '20px',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              perspective: '1000px',
            }}
          >
            {titleText.split('').map((char, i) => (
              <span
                key={i}
                ref={el => titleCharsRef.current[i] = el}
                style={{
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                  textShadow: '0 0 60px rgba(255,255,255,0.3)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          
          <p
            className="contact-subtitle"
            style={{
              fontSize: '18px',
              opacity: 0.6,
              marginBottom: '50px',
              maxWidth: '500px',
              lineHeight: 1.8,
            }}
          >
            Have an exciting project where you need help? Or just want to say hello? 
            I&apos;d love to hear from you.
          </p>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Name Field */}
              <div ref={el => fieldsRef.current[0] = el} style={{ position: 'relative' }}>
                <label 
                  className="field-label"
                  style={{
                    position: 'absolute',
                    left: '24px',
                    top: '22px',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease',
                    transformOrigin: 'left',
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={(e) => handleInputFocus(e, 'name')}
                  onBlur={(e) => handleInputBlur(e, 'name')}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Email Field */}
              <div ref={el => fieldsRef.current[1] = el} style={{ position: 'relative' }}>
                <label 
                  className="field-label"
                  style={{
                    position: 'absolute',
                    left: '24px',
                    top: '22px',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease',
                    transformOrigin: 'left',
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={(e) => handleInputFocus(e, 'email')}
                  onBlur={(e) => handleInputBlur(e, 'email')}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Subject Field */}
            <div ref={el => fieldsRef.current[2] = el} style={{ position: 'relative', marginBottom: '20px' }}>
              <label 
                className="field-label"
                style={{
                  position: 'absolute',
                  left: '24px',
                  top: '22px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'left',
                }}
              >
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onFocus={(e) => handleInputFocus(e, 'subject')}
                onBlur={(e) => handleInputBlur(e, 'subject')}
                style={inputStyle}
                required
              />
            </div>

            {/* Message Field */}
            <div ref={el => fieldsRef.current[3] = el} style={{ position: 'relative', marginBottom: '40px' }}>
              <label 
                className="field-label"
                style={{
                  position: 'absolute',
                  left: '24px',
                  top: '22px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'left',
                }}
              >
                Your Message
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={(e) => handleInputFocus(e, 'message')}
                onBlur={(e) => handleInputBlur(e, 'message')}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  minHeight: '150px',
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              ref={el => fieldsRef.current[4] = el}
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                if (isSubmitting) return;
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  y: -3,
                  boxShadow: '0 20px 60px rgba(100,150,255,0.4), 0 0 80px rgba(100,150,255,0.2)',
                  duration: 0.4,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  boxShadow: '0 10px 40px rgba(100,150,255,0.2)',
                  duration: 0.4,
                });
              }}
              style={{
                width: '100%',
                padding: '22px 40px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, rgba(100,150,255,0.9) 0%, rgba(80,100,200,0.9) 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '16px',
                fontFamily: "'Montserrat', sans-serif",
                cursor: isSubmitting ? 'wait' : 'pointer',
                boxShadow: '0 10px 40px rgba(100,150,255,0.2)',
                letterSpacing: '1px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'opacity 0.3s ease',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite',
                }}
              />
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                {isSubmitting ? (
                  <>
                    <span style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right - Info Section */}
        <div style={{ paddingTop: '0' }}>
          {/* Info Cards */}
          <div style={{ marginBottom: '50px' }}>
            {infoItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href || '#'}
                className="info-item"
                onClick={(e) => !item.href && e.preventDefault()}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 12,
                    background: 'rgba(100,150,255,0.1)',
                    borderColor: 'rgba(100,150,255,0.3)',
                    duration: 0.4,
                    ease: 'power2.out'
                  });
                  gsap.to(e.currentTarget.querySelector('.info-icon'), {
                    scale: 1.1,
                    background: 'rgba(100,150,255,0.3)',
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 0,
                    background: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    duration: 0.4,
                  });
                  gsap.to(e.currentTarget.querySelector('.info-icon'), {
                    scale: 1,
                    background: 'rgba(255,255,255,0.05)',
                    duration: 0.3
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '24px 28px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: item.href ? 'pointer' : 'default',
                  transition: 'all 0.4s ease',
                }}
              >
                <div 
                  className="info-icon"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.highlight ? 'rgba(100,255,150,0.9)' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    opacity: 0.4,
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: item.highlight ? 'rgba(100,255,150,0.9)' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    {item.value}
                    {item.highlight && (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'rgba(100,255,150,0.9)',
                        boxShadow: '0 0 12px rgba(100,255,150,0.6)',
                        animation: 'pulse 2s ease-in-out infinite',
                      }} />
                    )}
                  </p>
                </div>
                {item.href && (
                  <svg 
                    style={{ marginLeft: 'auto', opacity: 0.3 }} 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                )}
              </a>
            ))}
          </div>

          {/* Response Time Card */}
          <div
            style={{
              padding: '32px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(100,150,255,0.1) 0%, rgba(80,100,200,0.05) 100%)',
              border: '1px solid rgba(100,150,255,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(100,150,255,0.15), transparent 60%)',
              filter: 'blur(40px)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(100,150,255,0.8)" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', opacity: 0.6 }}>
                  TYPICAL RESPONSE TIME
                </span>
              </div>
              <p style={{
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #fff 0%, rgba(100,150,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Within 24 Hours
              </p>
              <p style={{
                fontSize: '14px',
                opacity: 0.5,
                lineHeight: 1.6,
              }}>
                I aim to respond to all inquiries within one business day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bubbles */}
      <Bubbles />

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            padding: 120px 24px 80px !important;
          }
        }
        @media (max-width: 768px) {
          .contact-grid {
            padding: 100px 20px 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
