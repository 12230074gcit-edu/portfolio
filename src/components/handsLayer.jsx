import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HandsLayer() {
  const humanRef = useRef(null);
  const robotRef = useRef(null);
  const glowRef = useRef(null);
  const burstRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hidden and positioned off-screen
      gsap.set([humanRef.current, robotRef.current], {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set([glowRef.current, burstRef.current], {
        opacity: 0,
        scale: 0,
      });

      // Fade in when approaching About section
      ScrollTrigger.create({
        trigger: "#about-section",
        start: "top 90%",
        end: "top 50%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to([humanRef.current, robotRef.current], {
            opacity: progress * 0.9,
            scale: 0.8 + progress * 0.2,
            duration: 0.1,
          });
        },
      });

      // Main timeline: hands move toward button as user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-section",
          start: "top 80%",
          endTrigger: "#contact-btn",
          end: "center center",
          scrub: 1.5,
        },
      });

      // Human hand movement - starts from left, moves to center-right
      tl.fromTo(
        humanRef.current,
        { x: -200, y: 100, rotation: -15 },
        { x: 80, y: -20, rotation: 0, ease: "power2.out" },
        0
      );

      // Robot hand movement - starts from right, moves to center-left
      tl.fromTo(
        robotRef.current,
        { x: 200, y: -100, rotation: 15 },
        { x: -80, y: 20, rotation: 0, ease: "power2.out" },
        0
      );

      // Pre-glow buildup as hands approach
      tl.to(
        glowRef.current,
        {
          opacity: 0.6,
          scale: 1.2,
          ease: "power2.out",
        },
        0.7
      );

      // Burst effect when hands "touch"
      tl.to(
        burstRef.current,
        {
          opacity: 1,
          scale: 2,
          ease: "power2.out",
        },
        0.88
      );

      // Glow intensifies
      tl.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 2.5,
          ease: "power2.out",
        },
        0.88
      );

      // Button glow effect
      tl.to(
        "#contact-btn",
        {
          boxShadow: "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.5), 0 20px 60px rgba(0,0,0,0.3)",
          scale: 1.1,
          duration: 0.3,
        },
        0.9
      );

      // Fade out effects
      tl.to(
        [glowRef.current, burstRef.current],
        {
          opacity: 0,
          scale: 3,
          duration: 0.3,
        },
        0.95
      );

      // Button returns to normal with soft glow
      tl.to(
        "#contact-btn",
        {
          boxShadow: "0 0 25px rgba(255,255,255,0.3), 0 8px 30px rgba(0,0,0,0.2)",
          scale: 1,
          duration: 0.2,
        },
        1
      );

      // Particle animation
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const angle = (i / 8) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;

        tl.fromTo(
          particle,
          {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          },
          {
            opacity: 1,
            scale: 1,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            duration: 0.4,
            ease: "power2.out",
          },
          0.88
        );

        tl.to(
          particle,
          {
            opacity: 0,
            scale: 0,
            duration: 0.3,
          },
          0.95
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {/* Central glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "75%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(20px)",
        }}
      />

      {/* Burst effect */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "75%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,200,255,0.6) 30%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(10px)",
        }}
      />

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position: "absolute",
            left: "50%",
            top: "75%",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Human hand */}
      <img
        ref={humanRef}
        src="/human-hand.png"
        alt=""
        style={{
          position: "absolute",
          left: "35%",
          top: "70%",
          width: "280px",
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
        }}
      />

      {/* Robot hand */}
      <img
        ref={robotRef}
        src="/robot-hand.png"
        alt=""
        style={{
          position: "absolute",
          right: "35%",
          top: "70%",
          width: "280px",
          transform: "translate(50%, -50%)",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  );
}
