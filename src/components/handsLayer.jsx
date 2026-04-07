import { useEffect, useRef, useState } from "react";
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
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Get button position for targeting
    const updateButtonPos = () => {
      const btn = document.getElementById("contact-btn");
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setButtonPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    // Update position on scroll and resize
    window.addEventListener("scroll", updateButtonPos);
    window.addEventListener("resize", updateButtonPos);
    updateButtonPos();

    const ctx = gsap.context(() => {
      // Initial state - completely hidden off-screen
      gsap.set(humanRef.current, {
        opacity: 0,
        x: "-100vw",
        y: 0,
        rotation: -30,
        scale: 1,
      });

      gsap.set(robotRef.current, {
        opacity: 0,
        x: "100vw",
        y: 0,
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

      // Phase 1: Hands appear from sides when About section enters
      ScrollTrigger.create({
        trigger: "#about-section",
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Human hand enters from left
          gsap.to(humanRef.current, {
            opacity: progress,
            x: -300 + (progress * 200), // Move from far left toward center
            rotation: -30 + (progress * 15),
            duration: 0.1,
          });
          // Robot hand enters from right
          gsap.to(robotRef.current, {
            opacity: progress,
            x: 300 - (progress * 200), // Move from far right toward center
            rotation: 30 - (progress * 15),
            duration: 0.1,
          });
        },
      });

      // Phase 2: Main scroll animation - hands converge toward Contact button
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#services-section",
          start: "top 80%",
          endTrigger: "#contact",
          end: "center center",
          scrub: 1.5,
        },
      });

      // Human hand moves toward center-right (near button)
      mainTl.to(
        humanRef.current,
        {
          x: -60,
          y: 0,
          rotation: -5,
          ease: "power2.inOut",
        },
        0
      );

      // Robot hand moves toward center-left (near button)
      mainTl.to(
        robotRef.current,
        {
          x: 60,
          y: 0,
          rotation: 5,
          ease: "power2.inOut",
        },
        0
      );

      // Phase 3: Final convergence and glow effect at Contact button
      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 60%",
          end: "center center",
          scrub: 1,
        },
      });

      // Hands converge to touch point
      finalTl.to(
        humanRef.current,
        {
          x: 20,
          y: 50,
          rotation: 0,
          scale: 0.9,
          ease: "power3.inOut",
        },
        0
      );

      finalTl.to(
        robotRef.current,
        {
          x: -20,
          y: 50,
          rotation: 0,
          scale: 0.9,
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
        0.3
      );

      // Glow intensifies as hands meet
      finalTl.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 2,
          ease: "power2.out",
        },
        0.7
      );

      // Burst effect at touch
      finalTl.to(
        burstRef.current,
        {
          opacity: 1,
          scale: 2.5,
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
            opacity: 0.6 - (i * 0.15),
            scale: 1.5 + (i * 0.5),
            ease: "power2.out",
          },
          0.8 + (i * 0.05)
        );
      });

      // Button glow effect - make it stand out
      finalTl.to(
        "#contact-btn",
        {
          boxShadow: "0 0 60px rgba(255,255,255,0.9), 0 0 120px rgba(100,100,255,0.6), 0 0 180px rgba(255,255,255,0.4)",
          scale: 1.15,
          ease: "elastic.out(1, 0.5)",
        },
        0.85
      );

      // Particles burst outward
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 60;

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
            scale: 1 + Math.random() * 0.5,
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

      // Fade effects and settle button
      finalTl.to(
        [glowRef.current, burstRef.current, ...ringsRef.current],
        {
          opacity: 0,
          scale: 3,
          ease: "power2.in",
        },
        0.95
      );

      // Button settles with premium glow
      finalTl.to(
        "#contact-btn",
        {
          boxShadow: "0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(100,100,255,0.2), 0 10px 40px rgba(0,0,0,0.3)",
          scale: 1.05,
          ease: "power2.out",
        },
        1
      );
    });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", updateButtonPos);
      window.removeEventListener("resize", updateButtonPos);
    };
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
      {/* Central glow - positioned at button area */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(150,150,255,0.5) 30%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(25px)",
        }}
      />

      {/* Burst effect */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,200,255,0.7) 25%, transparent 60%)",
          transform: "translate(-50%, -50%)",
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
            left: "50%",
            top: "50%",
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.5)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
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
            left: "50%",
            top: "50%",
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(100,100,255,0.5)",
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
          left: "50%",
          top: "50%",
          width: "320px",
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
          left: "50%",
          top: "50%",
          width: "320px",
          transformOrigin: "center center",
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
        }}
      />
    </div>
  );
}
