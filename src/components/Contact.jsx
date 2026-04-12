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
          Let&apos;s Join
          <br />
          Forces
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            opacity: 0.6,
            fontSize: "clamp(14px, 2vw, 18px)",
            maxWidth: "500px",
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          As long as there&apos;s room to turn things up a notch, we&apos;re in.
          Let&apos;s create something extraordinary together.
        </p>

        {/* Contact button - THIS IS THE TARGET FOR HANDS */}
        <button
          id="contact-btn"
          ref={buttonRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleClick}
          style={{
            padding: "18px 40px",
            borderRadius: "16px",
            border: "none",
            background: "#fff",
            color: "#080C72",
            fontWeight: 700,
            fontSize: "16px",
            fontFamily: "'Montserrat', sans-serif",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)",
            letterSpacing: "1px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer effect */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s infinite",
              pointerEvents: "none",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>Contact Me</span>
        </button>
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
            padding: 50px 24px !important;
            min-height: 60vh !important;
          }
        }
      `}</style>
    </section>
  );
}
