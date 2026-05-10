import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

// Generate ambient music using Web Audio API
const createAmbientMusic = (audioCtx) => {
  if (!audioCtx) return null;

  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(audioCtx.destination);

  // Create a reverb/delay effect
  const convolver = audioCtx.createConvolver();
  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.3;
  
  // Create impulse response for reverb
  const impulseLength = audioCtx.sampleRate * 2;
  const impulse = audioCtx.createBuffer(2, impulseLength, audioCtx.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const impulseData = impulse.getChannelData(channel);
    for (let i = 0; i < impulseLength; i++) {
      impulseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 2);
    }
  }
  convolver.buffer = impulse;
  convolver.connect(reverbGain);
  reverbGain.connect(masterGain);

  const oscillators = [];
  const gains = [];

  // Ambient pad notes (Cmaj7 chord spread across octaves)
  const frequencies = [130.81, 164.81, 196.00, 246.94, 261.63, 329.63];
  
  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    // Add subtle detune for warmth
    osc.detune.value = Math.random() * 10 - 5;
    
    filter.type = 'lowpass';
    filter.frequency.value = 800 + Math.random() * 400;
    filter.Q.value = 1;
    
    gain.gain.value = 0;
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    gain.connect(convolver);
    
    oscillators.push(osc);
    gains.push(gain);
  });

  // Slowly modulate volumes for evolving texture
  const modulateVolumes = () => {
    gains.forEach((gain, i) => {
      const targetGain = 0.03 + Math.random() * 0.04;
      const duration = 3 + Math.random() * 4;
      
      gain.gain.linearRampToValueAtTime(targetGain, audioCtx.currentTime + duration);
    });
  };

  return {
    start: () => {
      oscillators.forEach(osc => osc.start());
      modulateVolumes();
      // Continuous modulation
      setInterval(modulateVolumes, 5000);
    },
    stop: () => {
      gains.forEach(gain => {
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      });
      setTimeout(() => {
        oscillators.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
      }, 600);
    },
    setVolume: (vol) => {
      masterGain.gain.linearRampToValueAtTime(vol * 0.15, audioCtx.currentTime + 0.1);
    }
  };
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef(null);
  const musicRef = useRef(null);
  const buttonRef = useRef(null);
  const barsRef = useRef([]);

  const toggleMusic = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      musicRef.current = createAmbientMusic(audioCtxRef.current);
    }

    if (isPlaying) {
      musicRef.current?.stop();
      // Recreate for next play
      setTimeout(() => {
        musicRef.current = createAmbientMusic(audioCtxRef.current);
      }, 600);
    } else {
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      musicRef.current?.start();
    }

    setIsPlaying(!isPlaying);

    // Button animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  // Animate bars when playing
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
            delay: i * 0.1
          });
        }
      });
    } else {
      barsRef.current.forEach(bar => {
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
        border: `1px solid ${isPlaying ? 'rgba(100,150,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
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
      {/* Sound bars visualization */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={el => barsRef.current[i] = el}
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

      {/* Tooltip */}
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
        {isPlaying ? 'Pause Music' : 'Play Ambient Music'}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="position: fixed"][style*="bottom: 30px"][style*="left: 30px"] {
            bottom: 20px !important;
            left: 20px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
