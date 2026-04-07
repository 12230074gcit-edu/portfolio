import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AboutMe = () => {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const buttonRef = useRef(null);
  const humanRef = useRef(null);
  const robotRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // TEXT ENTRANCE
      gsap.from(".about-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".about-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from(".about-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
      });

      gsap.from(".about-button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "back.out(1.7)",
      });

      // AVATAR ENTRANCE
      gsap.from(avatarRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // HANDS ANIMATIONS
      gsap.from(humanRef.current, {
        x: -300,
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(robotRef.current, {
        x: 300,
        opacity: 0,
        duration: 1.2,
        delay: 1,
        ease: "power3.out",
      });

      // FLOATING LOOP
      gsap.to(avatarRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // BUTTON INTERACTION
  const handleButtonHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.08,
      duration: 0.2,
    });
  };

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
    });
  };

  const handleButtonClick = () => {
    gsap.fromTo(
      buttonRef.current,
      { scale: 1 },
      { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 }
    );
  };

  // AVATAR TILT
  const handleMouseMove = (e) => {
    const bounds = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const rotateY = ((x / bounds.width) - 0.5) * 20;
    const rotateX = ((y / bounds.height) - 0.5) * -20;

    gsap.to(avatarRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 500,
      duration: 0.3,
    });
  };

  const resetTilt = () => {
    gsap.to(avatarRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
    });
  };

  return (
    <section
      id="about-section"
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        color: "#fff",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            position: "relative",
            width: "40%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Human Hand */}
          <img
            ref={humanRef}
            src="/images/human-hand.png"
            style={{
              position: "absolute",
              left: "-150px",
              top: "40%",
              width: "300px",
              zIndex: 4,
            }}
          />

          {/* Robot Hand */}
          <img
            ref={robotRef}
            src="/images/robot-hand.png"
            style={{
              position: "absolute",
              right: "-150px",
              top: "40%",
              width: "300px",
              zIndex: 4,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: "50%",
              filter: "blur(200px)",
              zIndex: 1,
            }}
          />

          <img
            ref={avatarRef}
            src="me.png"
            alt="avatar"
            style={{
              width: "500px",
              position: "relative",
              zIndex: 2,
            }}
          />

          <img
            src="/hat.svg"
            alt="hat"
            style={{
              position: "absolute",
              top: "-60px",
              width: "220px",
              zIndex: 3,
            }}
          />
        </div>

        {/* RIGHT */}
        <div style={{ width: "50%" }}>
          <p className="about-subtitle" style={{ letterSpacing: "6px", fontSize: "12px", marginBottom: "10px", opacity: 0.8 }}>
            A BIT
          </p>

          <h1 className="about-title" style={{ fontSize: "56px", fontWeight: "700", marginBottom: "20px" }}>
            ABOUT ME
          </h1>

          <p className="about-text" style={{ fontSize: "16px", lineHeight: "1.8", maxWidth: "480px", marginBottom: "30px", opacity: 0.9 }}>
            Jigme Namgyel is an aspiring Interactive Designer focused on
            creating engaging, user-centered experiences.
          </p>

          <button
            ref={buttonRef}
            className="about-button"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onClick={handleButtonClick}
            style={{
              padding: "14px 28px",
              borderRadius: "12px",
              border: "none",
              background: "#fff",
              color: "#1a1a6c",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            EXPLORE MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;