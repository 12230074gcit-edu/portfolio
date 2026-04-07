import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, Flip, ScrollTrigger);

export const Hero = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1️⃣ Entrance animation for hat
      gsap.from(iconRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 2,
        ease: 'back.out(1.7)',
        delay: 0.8,
      });

      // 2️⃣ Hat motion path with pulsing
      const hatTl = gsap.timeline({ repeat: -1, yoyo: true });
      
      // Motion along waypoints
      hatTl.to(iconRef.current, {
        duration: 8,
        ease: 'power1.inOut',
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 60, y: -30 },
            { x: 120, y: 20 },
            { x: 80, y: 60 },
            { x: 0, y: 40 },
            { x: -40, y: 20 },
          ],
          curviness: 1.5,
          autoRotate: true,
        },
      });

      // Subtle pulsing scale animation alongside motion
      gsap.to(iconRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3️⃣ Text entrance animation
      const textTl = gsap.timeline();
      textTl.from(titleRef.current, { y: 60, opacity: 0, duration: 1.5, ease: 'power4.out', delay: 0.3 })
            .from(subtitleRef.current, { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8');

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={contentRef}
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "0 24px",
        maxWidth: "1024px",
        margin: "0 auto",
      }}
    >
      {/* White blurred circle behind avatar */}
      <div
        style={{
          position: "absolute",
          left: "-120px",
          top: "0px",
          width: "250px",
          height: "250px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "50%",
          filter: "blur(200px)",
          zIndex: 25,
        }}
      />

      {/* Hat icon */}
      <div
        id="shared-hat"
        ref={iconRef}
        style={{
          position: "absolute",
          left: "-100px",
          top: "20px",
          width: "100px",
          height: "100px",
          zIndex: 30,
        }}
      >
        <img
          src="/hat.svg"
          alt="Hat"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        style={{
          fontSize: "72px",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "white",
          marginBottom: "24px",
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        Retention isn't luck.<br />It's designed.
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        style={{
          fontSize: "20px",
          fontWeight: 400,
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.9)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        I help product teams boost user retention through<br />user-centered gamification design.
      </p>

      {/* Decorative floating blocks */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "15%",
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        borderRadius: "8px",
        transform: "rotate(15deg)"
      }} />
      <div style={{
        position: "absolute",
        top: "30%",
        right: "20%",
        width: "30px",
        height: "30px",
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        borderRadius: "8px",
        transform: "rotate(-10deg)"
      }} />
      <div style={{
        position: "absolute",
        bottom: "35%",
        left: "25%",
        width: "35px",
        height: "35px",
        backgroundColor: "rgba(236, 72, 153, 0.3)",
        borderRadius: "8px",
        transform: "rotate(25deg)"
      }} />
      <div style={{
        position: "absolute",
        bottom: "25%",
        right: "15%",
        width: "45px",
        height: "45px",
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        borderRadius: "8px",
        transform: "rotate(-20deg)"
      }} />
    </div>
  );
};