import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from('.contact-page-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.contact-page-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
        },
      });

      // Form fields stagger
      gsap.from(fieldsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      });

      // Info cards
      gsap.from('.info-card', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 70%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputFocus = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: 'rgba(255,255,255,0.4)',
      boxShadow: '0 0 30px rgba(255,255,255,0.1)',
      duration: 0.3,
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: 'rgba(255,255,255,0.1)',
      boxShadow: '0 0 0 rgba(255,255,255,0)',
      duration: 0.3,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submit animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Reset form or show success
        setFormData({ name: '', email: '', message: '' });
      },
    });
  };

  const infoCards = [
    { label: 'Email', value: 'hello@jigme.design', icon: '✉' },
    { label: 'Location', value: 'Bhutan', icon: '📍' },
    { label: 'Availability', value: 'Open to Projects', icon: '🟢' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '18px 24px',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    color: '#fff',
    fontSize: '15px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <section
      id="contact-page"
      ref={pageRef}
      style={{
        minHeight: '100vh',
        padding: '100px 60px',
        position: 'relative',
        zIndex: 5,
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
      }}
    >
      {/* Background elements */}
      <div
        style={{
          position: 'absolute',
          left: '20%',
          top: '30%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.1), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(150, 100, 255, 0.08), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '80px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left - Form */}
        <div>
          <h1
            className="contact-page-title"
            style={{
              fontSize: 'clamp(48px, 8vw, 72px)',
              fontWeight: 700,
              marginBottom: '16px',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              textShadow: '0 0 60px rgba(255,255,255,0.15)',
            }}
          >
            Let&apos;s Create
            <br />
            Together
          </h1>
          <p
            className="contact-page-subtitle"
            style={{
              fontSize: '16px',
              opacity: 0.6,
              marginBottom: '50px',
              maxWidth: '400px',
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? I&apos;d love to hear about it. Drop me a message and let&apos;s discuss how we can work together.
          </p>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div ref={(el) => (fieldsRef.current[0] = el)} style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={inputStyle}
              />
            </div>

            <div ref={(el) => (fieldsRef.current[1] = el)} style={{ marginBottom: '20px' }}>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={inputStyle}
              />
            </div>

            <div ref={(el) => (fieldsRef.current[2] = el)} style={{ marginBottom: '30px' }}>
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={{
                  ...inputStyle,
                  resize: 'none',
                }}
              />
            </div>

            <button
              ref={(el) => (fieldsRef.current[3] = el)}
              type="submit"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  y: -3,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.2)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  duration: 0.3,
                });
              }}
              style={{
                width: '100%',
                padding: '20px 40px',
                borderRadius: '14px',
                border: 'none',
                background: '#fff',
                color: '#080C72',
                fontWeight: 700,
                fontSize: '15px',
                fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                letterSpacing: '1px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s infinite',
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right - Info Cards */}
        <div style={{ paddingTop: '80px' }}>
          {infoCards.map((card, i) => (
            <div
              key={card.label}
              className="info-card"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -5,
                  background: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  duration: 0.3,
                });
              }}
              style={{
                padding: '28px 32px',
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: '28px' }}>{card.icon}</span>
              <div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    opacity: 0.5,
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: 500,
                  }}
                >
                  {card.value}
                </p>
              </div>
            </div>
          ))}

          {/* Decorative element */}
          <div
            style={{
              marginTop: '40px',
              padding: '30px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(100,100,255,0.1) 0%, rgba(150,100,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                opacity: 0.7,
              }}
            >
              I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out on LinkedIn.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}
