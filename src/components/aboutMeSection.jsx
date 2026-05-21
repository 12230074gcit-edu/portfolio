import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance with scroll trigger
      gsap.from(".about-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-button", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.45,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Avatar entrance
      gsap.from(avatarRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Button interactions
  const handleButtonHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      y: -3,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.3)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 8px 30px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleButtonClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        navigate('/about');
      }
    });
  };

  // Avatar tilt effect
  const handleMouseMove = (e) => {
    if (!avatarRef.current) return;
    const bounds = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const rotateY = ((x / bounds.width) - 0.5) * 15;
    const rotateX = ((y / bounds.height) - 0.5) * -15;

    gsap.to(avatarRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const resetTilt = () => {
    gsap.to(avatarRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="about-me-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 80px",
        color: "#fff",
        position: "relative",
        zIndex: 5,
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(100, 100, 255, 0.1), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="about-me-container"
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "80px",
        }}
      >
        {/* Left - Avatar */}
        <div
          className="about-me-avatar"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            position: "relative",
            width: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Glow behind avatar */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "450px",
              height: "450px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              filter: "blur(120px)",
              zIndex: 1,
            }}
          />

          <img
            ref={avatarRef}
            src="/me.png"
            alt="Jigme Namgyel"
            width={450}
            height={450}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              maxWidth: "450px",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "50%",
              position: "relative",
              zIndex: 2,
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
            }}
          />

        </div>

        {/* Right - Content */}
        <div ref={contentRef} className="about-me-content" style={{ width: "50%" }}>
          <p
            className="about-subtitle"
            style={{
              letterSpacing: "8px",
              fontSize: "12px",
              marginBottom: "16px",
              opacity: 0.6,
              fontWeight: 500,
            }}
          >
            A BIT
          </p>

          <h1
            className="about-title"
            style={{
              fontSize: "clamp(40px, 5vw, 56px)",
              fontWeight: 700,
              marginBottom: "24px",
              letterSpacing: "-1px",
              textShadow: "0 0 40px rgba(255,255,255,0.15)",
            }}
          >
            ABOUT ME
          </h1>

          <p
            className="about-text"
            style={{
              fontSize: "16px",
              lineHeight: 1.9,
              maxWidth: "480px",
              marginBottom: "36px",
              opacity: 0.85,
              fontWeight: 400,
            }}
          >
            Jigme Namgyel is an aspiring Interactive Designer focused on
            creating engaging, user-centered experiences. Passionate about
            blending creativity with functionality to craft memorable digital
            interactions.
          </p>

          <button
            ref={buttonRef}
            className="about-button"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={handleButtonClick}
            style={{
              padding: "18px 40px",
              borderRadius: "50px",
              border: "none",
              background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
              color: "#080C72",
              fontWeight: 700,
              fontSize: "14px",
              fontFamily: "'Montserrat', sans-serif",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              position: "relative",
              overflow: "hidden",
            }}
          >
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
            <span style={{ position: "relative", zIndex: 1 }}>Explore More</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// Add responsive styles
if (typeof document !== 'undefined' && !document.getElementById('about-me-responsive')) {
  const style = document.createElement('style');
  style.id = 'about-me-responsive';
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @media (max-width: 1024px) {
      .about-me-section {
        padding: 80px 40px !important;
      }
      .about-me-container {
        flex-direction: column !important;
        gap: 50px !important;
        text-align: center !important;
      }
      .about-me-avatar {
        width: 100% !important;
        order: 1;
      }
      .about-me-avatar img {
        max-width: 350px !important;
      }
      .about-me-content {
        width: 100% !important;
        order: 2;
      }
      .about-me-content p {
        margin-left: auto !important;
        margin-right: auto !important;
      }
    }
    @media (max-width: 768px) {
      .about-me-section {
        padding: 50px 20px !important;
        min-height: auto !important;
      }
      .about-me-container {
        gap: 32px !important;
      }
      .about-me-avatar img {
        max-width: 240px !important;
      }
      .about-me-content h2 {
        font-size: 28px !important;
      }
      .about-me-content p {
        font-size: 14px !important;
        line-height: 1.7 !important;
      }
      .about-me-content button {
        padding: 14px 28px !important;
        font-size: 12px !important;
      }
    }
    @media (max-width: 480px) {
      .about-me-section {
        padding: 40px 16px !important;
      }
      .about-me-avatar img {
        max-width: 200px !important;
      }
      .about-me-content h2 {
        font-size: 24px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default AboutMe;
