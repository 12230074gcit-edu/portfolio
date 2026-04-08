import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HandsLayer() {
  const containerRef = useRef(null);
  const humanRef = useRef(null);
  const robotRef = useRef(null);
  const glowRef = useRef(null);
  const burstRef = useRef(null);
  const particlesRef = useRef([]);
  const ringsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - completely hidden
      gsap.set(humanRef.current, {
        opacity: 0,
        x: "-100vw",
        y: "20vh",
        rotation: -30,
        scale: 1,
      });

      gsap.set(robotRef.current, {
        opacity: 0,
        x: "100vw",
        y: "20vh",
        rotation: 30,
        scale: 1,
      });

      gsap.set([glowRef.current, burstRef.current], {
        opacity: 0,
        scale: 0,
      });

      gsap.set(ringsRef.current, {
        opacity: 0,
        scale: 0,
      });

      // Phase 1: Hands appear from edges when Services section starts
      ScrollTrigger.create({
        trigger: "#services-section",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Human hand - enters from left, moves toward center
          gsap.to(humanRef.current, {
            opacity: progress,
            x: -400 + (progress * 200),
            y: 100 - (progress * 50),
            rotation: -30 + (progress * 15),
            duration: 0.1,
          });
          
          // Robot hand - enters from right, moves toward center
          gsap.to(robotRef.current, {
            opacity: progress,
            x: 400 - (progress * 200),
            y: 100 - (progress * 50),
            rotation: 30 - (progress * 15),
            duration: 0.1,
          });
        },
      });

      // Phase 2: Hands continue moving inward through Services
      ScrollTrigger.create({
        trigger: "#services-section",
        start: "top 20%",
        end: "bottom 50%",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Human hand continues toward center
          gsap.to(humanRef.current, {
            x: -200 + (progress * 100),
            y: 50 - (progress * 30),
            rotation: -15 + (progress * 10),
            duration: 0.1,
          });
          
          // Robot hand continues toward center
          gsap.to(robotRef.current, {
            x: 200 - (progress * 100),
            y: 50 - (progress * 30),
            rotation: 15 - (progress * 10),
            duration: 0.1,
          });
        },
      });

      // Phase 3: Final convergence - hands point at Contact button and stay
      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      });

      // Human hand points to button - final centered position
      finalTl.to(
        humanRef.current,
        {
          x: -120,
          y: 0,
          rotation: 10,
          scale: 0.85,
          ease: "power3.inOut",
        },
        0
      );

      // Robot hand points to button - final centered position
      finalTl.to(
        robotRef.current,
        {
          x: 120,
          y: 0,
          rotation: -10,
          scale: 0.85,
          ease: "power3.inOut",
        },
        0
      );

      // Pre-glow buildup
      finalTl.to(
        glowRef.current,
        {
          opacity: 0.5,
          scale: 1,
          ease: "power2.out",
        },
        0.5
      );

      // Glow intensifies
      finalTl.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 2,
          ease: "power2.out",
        },
        0.75
      );

      // Burst effect
      finalTl.to(
        burstRef.current,
        {
          opacity: 1,
          scale: 2.5,
          ease: "expo.out",
        },
        0.85
      );

      // Expanding rings
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return;
        finalTl.to(
          ring,
          {
            opacity: 0.6 - i * 0.15,
            scale: 1.5 + i * 0.5,
            ease: "power2.out",
          },
          0.85 + i * 0.04
        );
      });

      // Button glow effect
      finalTl.to(
        "#contact-btn",
        {
          boxShadow:
            "0 0 100px rgba(255,255,255,1), 0 0 180px rgba(100,100,255,0.8), 0 0 250px rgba(255,255,255,0.5)",
          scale: 1.15,
          ease: "elastic.out(1, 0.5)",
        },
        0.88
      );

      // Particles burst
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 60;

        finalTl.fromTo(
          particle,
          { opacity: 0, scale: 0, x: 0, y: 0 },
          {
            opacity: 1,
            scale: 1 + Math.random() * 0.5,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            ease: "power2.out",
          },
          0.88
        );

        finalTl.to(
          particle,
          { opacity: 0, scale: 0, ease: "power2.in" },
          0.96
        );
      });

      // Fade effects
      finalTl.to(
        [glowRef.current, burstRef.current, ...ringsRef.current],
        {
          opacity: 0,
          scale: 3.5,
          ease: "power2.in",
        },
        0.96
      );

      // Button settles with premium glow - hands stay pointed
      finalTl.to(
        "#contact-btn",
        {
          boxShadow:
            "0 0 50px rgba(255,255,255,0.6), 0 0 100px rgba(100,100,255,0.3), 0 15px 50px rgba(0,0,0,0.3)",
          scale: 1.05,
          ease: "power2.out",
        },
        1
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Central glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(150,150,255,0.5) 30%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      {/* Burst effect */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,200,255,0.7) 25%, transparent 60%)",
          filter: "blur(15px)",
        }}
      />

      {/* Expanding rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`ring-${i}`}
          ref={(el) => (ringsRef.current[i] = el)}
          style={{
            position: "absolute",
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            borderRadius: "50%",
            border: `2px solid rgba(255,255,255,${0.5 - i * 0.1})`,
            boxShadow: `0 0 20px rgba(255,255,255,${0.3 - i * 0.08})`,
          }}
        />
      ))}

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position: "absolute",
            width: `${5 + Math.random() * 5}px`,
            height: `${5 + Math.random() * 5}px`,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(100,100,255,0.5)",
          }}
        />
      ))}

      {/* Human hand - left side */}
      <img
        ref={humanRef}
        src="/human-hand.png"
        alt=""
        style={{
          position: "absolute",
          width: "300px",
          transformOrigin: "center center",
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
        }}
      />

      {/* Robot hand - right side */}
      <img
        ref={robotRef}
        src="/robot-hand.png"
        alt=""
        style={{
          position: "absolute",
          width: "300px",
          transformOrigin: "center center",
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
        }}
      />
    </div>
  );
}
