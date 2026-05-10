import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const barsRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // 👇 put your music file inside public/music/
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);

    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    if (isPlaying) {
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.to(bar, {
            scaleY: 0.3 + Math.random() * 0.7,
            duration: 0.3 + Math.random() * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.1,
          });
        }
      });
    } else {
      barsRef.current.forEach((bar) => {
        if (bar) {
          gsap.killTweensOf(bar);
          gsap.to(bar, { scaleY: 0.3, duration: 0.3 });
        }
      });
    }
  }, [isPlaying]);

  return (
    <div
      ref={buttonRef}
      onClick={toggleMusic}
      onMouseEnter={() => {
        setIsHovered(true);
        gsap.to(buttonRef.current, { scale: 1.1, duration: 0.3 });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });
      }}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: isPlaying
          ? 'linear-gradient(135deg, rgba(100,150,255,0.3) 0%, rgba(150,100,255,0.3) 100%)'
          : 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${
          isPlaying ? 'rgba(100,150,255,0.4)' : 'rgba(255,255,255,0.1)'
        }`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        zIndex: 1000,
        boxShadow: isPlaying
          ? '0 0 20px rgba(100,150,255,0.3), inset 0 0 20px rgba(100,150,255,0.1)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          style={{
            width: '3px',
            height: '16px',
            borderRadius: '2px',
            background: isPlaying
              ? 'linear-gradient(to top, rgba(100,150,255,0.8), rgba(150,100,255,0.8))'
              : 'rgba(255,255,255,0.4)',
            transformOrigin: 'bottom',
            transform: 'scaleY(0.3)',
            transition: 'background 0.3s',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.8)',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: "'Montserrat', sans-serif",
          color: 'white',
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
        }}
      >
        {isPlaying ? 'Pause Music' : 'Play My Music'}
      </div>
    </div>
  );
};

export default MusicPlayer;