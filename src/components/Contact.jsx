import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Subtitle entrance
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Button entrance
      gsap.from(buttonRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.4,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Subtle floating animation for button
      gsap.to(buttonRef.current, {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button hover effects
  const handleHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      y: -8,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.3)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 8px 30px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        navigate('/contact');
      }
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-cta-section"
      style={{
        minHeight: "80vh",
        position: "relative",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        fontFamily: "'Montserrat', sans-serif",
        padding: "60px 40px",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(100, 100, 255, 0.12), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Eyebrow text */}
        <p
          style={{
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            opacity: 0.5,
            marginBottom: "16px",
            fontWeight: 500,
          }}
        >
          Ready to Build Something Amazing?
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          style={{
            fontSize: "clamp(48px, 10vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "24px",
            textShadow: "0 0 60px rgba(255,255,255,0.2)",
          }}
        >
          Your Vision,
          <br />
          My Craft
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            opacity: 0.7,
            fontSize: "clamp(15px, 2vw, 19px)",
            maxWidth: "520px",
            margin: "0 auto 20px",
            lineHeight: 1.7,
          }}
        >
          Got a project that deserves more than ordinary? I turn bold ideas into 
          pixel-perfect realities that users actually love.
        </p>

        {/* Value proposition */}
        <p
          style={{
            opacity: 0.5,
            fontSize: "13px",
            maxWidth: "400px",
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          No fluff. No endless meetings. Just results that speak for themselves.
        </p>

        {/* Contact button - THIS IS THE TARGET FOR HANDS */}
        <button
          id="contact-btn"
          ref={buttonRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleClick}
          style={{
            padding: "20px 48px",
            borderRadius: "50px",
            border: "none",
            background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
            color: "#080C72",
            fontWeight: 700,
            fontSize: "15px",
            fontFamily: "'Montserrat', sans-serif",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)",
            letterSpacing: "1.5px",
            position: "relative",
            overflow: "hidden",
            textTransform: "uppercase",
          }}
        >
          {/* Shimmer effect */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s infinite",
              pointerEvents: "none",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>Start a Conversation</span>
        </button>

        {/* Trust indicator */}
        <p
          style={{
            opacity: 0.4,
            fontSize: "11px",
            marginTop: "24px",
            letterSpacing: "1px",
          }}
        >
          Typically respond within 24 hours
        </p>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      />

      {/* Add shimmer keyframes and responsive styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @media (max-width: 768px) {
          .contact-cta-section {
            padding: 40px 20px !important;
            min-height: 50vh !important;
          }
          .contact-cta-section h2 {
            font-size: clamp(28px, 8vw, 40px) !important;
          }
          .contact-cta-section p {
            font-size: 14px !important;
          }
          .contact-cta-section button {
            padding: 14px 32px !important;
            font-size: 13px !important;
          }
        }
        @media (max-width: 480px) {
          .contact-cta-section {
            padding: 30px 16px !important;
            min-height: 40vh !important;
          }
          .contact-cta-section h2 {
            font-size: 26px !important;
          }
        }
      `}</style>
    </section>
  );
}
