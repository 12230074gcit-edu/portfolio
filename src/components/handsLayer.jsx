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
  const ringsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - positioned at corners, hidden
      gsap.set(humanRef.current, {
        opacity: 0,
        left: "0%",
        top: "100%",
        xPercent: -50,
        yPercent: 0,
        rotation: -45,
        scale: 1.2,
      });

      gsap.set(robotRef.current, {
        opacity: 0,
        left: "100%",
        top: "100%",
        xPercent: 50,
        yPercent: 0,
        rotation: 45,
        scale: 1.2,
      });

      gsap.set([glowRef.current, burstRef.current], {
        opacity: 0,
        scale: 0,
      });

      gsap.set(ringsRef.current, {
        opacity: 0,
        scale: 0,
      });

      // Phase 1: Hands appear from corners when Services section enters
      ScrollTrigger.create({
        trigger: "#services-section",
        start: "top 90%",
        end: "top 50%",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Human hand - bottom left corner, moves up and right
          gsap.to(humanRef.current, {
            opacity: Math.min(progress * 1.5, 1),
            left: `${5 + progress * 15}%`,
            top: `${90 - progress * 20}%`,
            rotation: -45 + progress * 20,
            scale: 1.2 - progress * 0.2,
            duration: 0.1,
          });
          
          // Robot hand - bottom right corner, moves up and left
          gsap.to(robotRef.current, {
            opacity: Math.min(progress * 1.5, 1),
            left: `${95 - progress * 15}%`,
            top: `${90 - progress * 20}%`,
            rotation: 45 - progress * 20,
            scale: 1.2 - progress * 0.2,
            duration: 0.1,
          });
        },
      });

      // Phase 2: Hands continue converging through Services
      ScrollTrigger.create({
        trigger: "#services-section",
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Human hand converges toward center
          gsap.to(humanRef.current, {
            left: `${20 + progress * 15}%`,
            top: `${70 - progress * 15}%`,
            rotation: -25 + progress * 15,
            duration: 0.1,
          });
          
          // Robot hand converges toward center
          gsap.to(robotRef.current, {
            left: `${80 - progress * 15}%`,
            top: `${70 - progress * 15}%`,
            rotation: 25 - progress * 15,
            duration: 0.1,
          });
        },
      });

      // Phase 3: Final convergence at Contact button - hands point to it
      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
      });

      // Human hand points to button
      finalTl.to(
        humanRef.current,
        {
          left: "38%",
          top: "50%",
          rotation: 15,
          scale: 0.9,
          ease: "power3.inOut",
        },
        0
      );

      // Robot hand points to button
      finalTl.to(
        robotRef.current,
        {
          left: "62%",
          top: "50%",
          rotation: -15,
          scale: 0.9,
          ease: "power3.inOut",
        },
        0
      );

      // Pre-glow buildup
      finalTl.to(
        glowRef.current,
        {
          opacity: 0.4,
          scale: 0.8,
          ease: "power2.out",
        },
        0.4
      );

      // Glow intensifies as hands meet
      finalTl.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 2.5,
          ease: "power2.out",
        },
        0.7
      );

      // Burst effect at touch
      finalTl.to(
        burstRef.current,
        {
          opacity: 1,
          scale: 3,
          ease: "expo.out",
        },
        0.8
      );

      // Expanding rings
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return;
        finalTl.to(
          ring,
          {
            opacity: 0.7 - i * 0.2,
            scale: 1.5 + i * 0.6,
            ease: "power2.out",
          },
          0.8 + i * 0.05
        );
      });

      // Button glow effect - make it really stand out
      finalTl.to(
        "#contact-btn",
        {
          boxShadow:
            "0 0 80px rgba(255,255,255,1), 0 0 150px rgba(100,100,255,0.7), 0 0 200px rgba(255,255,255,0.5)",
          scale: 1.2,
          ease: "elastic.out(1, 0.4)",
        },
        0.85
      );

      // Particles burst outward
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const angle = (i / 16) * Math.PI * 2;
        const distance = 120 + Math.random() * 80;

        finalTl.fromTo(
          particle,
          {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          },
          {
            opacity: 1,
            scale: 1.5 + Math.random(),
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            ease: "power2.out",
          },
          0.85
        );

        finalTl.to(
          particle,
          {
            opacity: 0,
            scale: 0,
            ease: "power2.in",
          },
          0.95
        );
      });

      // Fade effects
      finalTl.to(
        [glowRef.current, burstRef.current, ...ringsRef.current],
        {
          opacity: 0,
          scale: 4,
          ease: "power2.in",
        },
        0.95
      );

      // Button settles with premium persistent glow
      finalTl.to(
        "#contact-btn",
        {
          boxShadow:
            "0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(100,100,255,0.3), 0 15px 50px rgba(0,0,0,0.3)",
          scale: 1.08,
          ease: "power2.out",
        },
        1
      );
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
          top: "50%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(150,150,255,0.6) 30%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(30px)",
        }}
      />

      {/* Burst effect */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,200,255,0.8) 25%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(20px)",
        }}
      />

      {/* Expanding rings */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`ring-${i}`}
          ref={(el) => (ringsRef.current[i] = el)}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            borderRadius: "50%",
            border: `${3 - i * 0.5}px solid rgba(255,255,255,${0.7 - i * 0.15})`,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${25 - i * 5}px rgba(255,255,255,${0.4 - i * 0.1})`,
          }}
        />
      ))}

      {/* Particles */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: "50%",
            background: "rgba(255,255,255,1)",
            boxShadow:
              "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(100,100,255,0.6)",
            transform: "translate(-50%, -50%)",
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
          width: "350px",
          transformOrigin: "center center",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
        }}
      />

      {/* Robot hand - right side */}
      <img
        ref={robotRef}
        src="/robot-hand.png"
        alt=""
        style={{
          position: "absolute",
          width: "350px",
          transformOrigin: "center center",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
        }}
      />
    </div>
  );
}
