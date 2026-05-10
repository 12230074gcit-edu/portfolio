import React, { useEffect, useRef, useState, useCallback } from 'react';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 42;

const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
];

const COLORS = [
  'transparent',
  'rgba(0, 240, 240, 0.7)',
  'rgba(240, 240, 0, 0.7)',
  'rgba(160, 0, 240, 0.7)',
  'rgba(240, 160, 0, 0.7)',
  'rgba(0, 0, 240, 0.7)',
  'rgba(0, 240, 0, 0.7)',
  'rgba(240, 0, 0, 0.7)',
];

// Sound effects using Web Audio API
const createAudioContext = () => {
  if (typeof window !== 'undefined') {
    return new (window.AudioContext || window.webkitAudioContext)();
  }
  return null;
};

const playSound = (audioCtx, type = 'clear') => {
  if (!audioCtx) return;
  
  try {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'clear') {
      // Line clear sound - ascending sweep
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.2);
    } else if (type === 'drop') {
      // Piece drop sound - soft thud
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'combo') {
      // Multi-line clear - celebratory sound
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'gameOver') {
      // Dramatic game over sound - descending sweep with rumble
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const osc3 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      const gain2 = audioCtx.createGain();
      const gain3 = audioCtx.createGain();
      
      // Main descending tone
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 1.5);
      gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      
      // Low rumble
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(60, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(40, audioCtx.currentTime + 0.5);
      gain2.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      // Dissonant high
      osc3.type = 'square';
      osc3.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc3.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.8);
      gain3.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain3.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc3.connect(gain3);
      gain3.connect(audioCtx.destination);
      
      osc1.start(audioCtx.currentTime);
      osc2.start(audioCtx.currentTime);
      osc3.start(audioCtx.currentTime);
      osc1.stop(audioCtx.currentTime + 1.5);
      osc2.stop(audioCtx.currentTime + 1.2);
      osc3.stop(audioCtx.currentTime + 0.8);
      return;
    }
  } catch (e) {
    // Silently fail if audio not supported
  }
};

// Particle class for blast effects
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 8 + 4;
    this.speedX = (Math.random() - 0.5) * 12;
    this.speedY = (Math.random() - 0.5) * 12 - 4;
    this.gravity = 0.3;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.015;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.speedX *= 0.98;
    this.life -= this.decay;
    this.rotation += this.rotationSpeed;
    this.size *= 0.97;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    
    // Draw a small square particle
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    
    ctx.restore();
  }
}

export const TetrisCanvas = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [scale, setScale] = useState(1);
  const [screenFlash, setScreenFlash] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [controlsOpacity, setControlsOpacity] = useState(1);

  const gridRef = useRef(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const activePieceRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dropCounterRef = useRef(0);
  const dropIntervalRef = useRef(900);
  const particlesRef = useRef([]);
  const audioCtxRef = useRef(null);
  const clearedRowsRef = useRef([]);
  const gameLoopRef = useRef(null);

  // Check if mobile (hide tetris on mobile, show on tablet and desktop)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize audio context on first interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = createAudioContext();
      }
    };
    
    window.addEventListener('keydown', initAudio, { once: true });
    window.addEventListener('click', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('click', initAudio);
    };
  }, []);

  // Responsive scale
  useEffect(() => {
    const updateScale = () => {
      const newScale = Math.min(
        window.innerHeight / (ROWS * BLOCK_SIZE + 120),
        window.innerWidth / (COLS * BLOCK_SIZE + 120),
        1.1
      );
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-fade controls after 5 seconds
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setControlsOpacity(0.15);
    }, 5000);
    return () => clearTimeout(fadeTimer);
  }, []);

  const spawnPiece = useCallback(() => {
    const index = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[index];
    const colorIndex = index + 1;
    const pos = { x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 };

    if (checkCollision(gridRef.current, shape, pos)) {
      return null;
    }

    return { shape, pos, colorIndex };
  }, []);

  function checkCollision(grid, shape, pos) {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;

          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && grid[newY][newX])
          ) return true;
        }
      }
    }
    return false;
  }

  const mergePiece = () => {
    if (!activePieceRef.current) return;

    const { shape, pos, colorIndex } = activePieceRef.current;

    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value && pos.y + y >= 0 && pos.y + y < ROWS) {
          gridRef.current[pos.y + y][pos.x + x] = colorIndex;
        }
      });
    });

    // Play drop sound
    playSound(audioCtxRef.current, 'drop');

    clearLines();
  };

  const clearLines = () => {
    let linesCleared = 0;
    const rowsToClear = [];

    // Find full rows first
    gridRef.current.forEach((row, y) => {
      const full = row.every(cell => cell !== 0);
      if (full) {
        rowsToClear.push({ y, cells: [...row] });
        linesCleared++;
      }
    });

    // Create blast particles for cleared rows
    if (linesCleared > 0) {
      rowsToClear.forEach(({ y, cells }) => {
        cells.forEach((colorIndex, x) => {
          if (colorIndex !== 0) {
            const particleX = x * BLOCK_SIZE + BLOCK_SIZE / 2;
            const particleY = y * BLOCK_SIZE + BLOCK_SIZE / 2;
            const color = COLORS[colorIndex];
            
            // Create multiple particles per cell for more impact
            for (let i = 0; i < 6; i++) {
              particlesRef.current.push(new Particle(particleX, particleY, color));
            }
          }
        });
      });

      // Play sound effect
      if (linesCleared >= 4) {
        playSound(audioCtxRef.current, 'combo');
      } else if (linesCleared > 1) {
        playSound(audioCtxRef.current, 'combo');
      } else {
        playSound(audioCtxRef.current, 'clear');
      }

      // Screen flash effect
      setScreenFlash(true);
      setTimeout(() => setScreenFlash(false), 150);
    }

    // Remove cleared rows
    gridRef.current = gridRef.current.filter(row => {
      const full = row.every(cell => cell !== 0);
      return !full;
    });

    while (gridRef.current.length < ROWS) {
      gridRef.current.unshift(Array(COLS).fill(0));
    }

    if (linesCleared > 0) {
      // Bonus points for multiple lines
      const bonus = linesCleared === 4 ? 800 : linesCleared * 100;
      setScore(prev => prev + bonus);
    }
  };

  const triggerGameOver = useCallback(() => {
    setFinalScore(score);
    setGameOver(true);
    playSound(audioCtxRef.current, 'gameOver');
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, [score]);

  const moveDown = useCallback(() => {
    if (!activePieceRef.current || gameOver) return;

    const nextPos = {
      ...activePieceRef.current.pos,
      y: activePieceRef.current.pos.y + 1
    };

    if (!checkCollision(gridRef.current, activePieceRef.current.shape, nextPos)) {
      activePieceRef.current.pos = nextPos;
    } else {
      mergePiece();
      const nextPiece = spawnPiece();
      if (nextPiece) {
        activePieceRef.current = nextPiece;
      } else {
        // Game over - can't spawn new piece
        triggerGameOver();
        return;
      }
    }

    dropCounterRef.current = 0;
  }, [spawnPiece, gameOver, triggerGameOver]);

  const moveLeft = () => {
    if (!activePieceRef.current) return;
    const nextPos = { ...activePieceRef.current.pos, x: activePieceRef.current.pos.x - 1 };
    if (!checkCollision(gridRef.current, activePieceRef.current.shape, nextPos)) {
      activePieceRef.current.pos = nextPos;
    }
  };

  const moveRight = () => {
    if (!activePieceRef.current) return;
    const nextPos = { ...activePieceRef.current.pos, x: activePieceRef.current.pos.x + 1 };
    if (!checkCollision(gridRef.current, activePieceRef.current.shape, nextPos)) {
      activePieceRef.current.pos = nextPos;
    }
  };

  const rotate = () => {
    if (!activePieceRef.current) return;

    const rotated = activePieceRef.current.shape[0].map((_, i) =>
      activePieceRef.current.shape.map(row => row[i]).reverse()
    );
    if (!checkCollision(gridRef.current, rotated, activePieceRef.current.pos)) {
      activePieceRef.current.shape = rotated;
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid cells with soft glow
    gridRef.current.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell !== 0) {
          ctx.fillStyle = COLORS[cell];
          ctx.shadowColor = COLORS[cell];
          ctx.shadowBlur = 15;
          ctx.fillRect(
            x * BLOCK_SIZE + 2,
            y * BLOCK_SIZE + 2,
            BLOCK_SIZE - 4,
            BLOCK_SIZE - 4
          );
        }
      })
    );

    // Draw active piece with glow
    if (activePieceRef.current) {
      ctx.fillStyle = COLORS[activePieceRef.current.colorIndex];
      ctx.shadowColor = COLORS[activePieceRef.current.colorIndex];
      ctx.shadowBlur = 20;

      activePieceRef.current.shape.forEach((row, y) =>
        row.forEach((value, x) => {
          if (value) {
            ctx.fillRect(
              (activePieceRef.current.pos.x + x) * BLOCK_SIZE + 2,
              (activePieceRef.current.pos.y + y) * BLOCK_SIZE + 2,
              BLOCK_SIZE - 4,
              BLOCK_SIZE - 4
            );
          }
        })
      );
    }

    ctx.shadowBlur = 0;

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.update();
      particle.draw(ctx);
      return particle.life > 0;
    });
  }, []);

  useEffect(() => {
    activePieceRef.current = spawnPiece() || resetGame();

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowUp': rotate(); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const update = (time = 0) => {
      if (gameOver) return;
      
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      dropCounterRef.current += deltaTime;

      if (dropCounterRef.current > dropIntervalRef.current) {
        moveDown();
      }

      draw();
      gameLoopRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [draw, moveDown, spawnPiece, gameOver]);

  const resetGame = useCallback(() => {
    gridRef.current = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    setScore(0);
    setTime(0);
    setGameOver(false);
    setFinalScore(0);
    particlesRef.current = [];
    const newPiece = spawnPiece();
    activePieceRef.current = newPiece;
    return newPiece;
  }, [spawnPiece]);

  const handleTryAgain = () => {
    resetGame();
    // Restart game loop
    const update = (time = 0) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      dropCounterRef.current += deltaTime;

      if (dropCounterRef.current > dropIntervalRef.current) {
        moveDown();
      }

      draw();
      gameLoopRef.current = requestAnimationFrame(update);
    };
    update();
  };

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }

  // Keyboard key style - compact for side panel
  const kbdStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '26px',
    height: '26px',
    padding: '2px 6px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.2)',
    fontSize: '12px',
    fontWeight: 500,
  };

  return (
    <>
      {/* Screen flash effect on line clear */}
      {screenFlash && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(100,150,255,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 5,
          animation: 'flashPulse 0.15s ease-out',
        }} />
      )}

      {/* Controls Guide - Side Panel with auto-fade */}
      <div 
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '16px 20px',
          background: 'rgba(8,12,114,0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'white',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '12px',
          zIndex: 10,
          pointerEvents: 'auto',
          opacity: controlsOpacity,
          transition: 'opacity 0.5s ease-out',
          cursor: 'default',
        }}
        onMouseEnter={() => setControlsOpacity(1)}
        onMouseLeave={() => setControlsOpacity(0.15)}
      >
        <div style={{ 
          marginBottom: '12px', 
          fontSize: '10px', 
          fontWeight: 600,
          letterSpacing: '2px',
          opacity: 0.6,
        }}>
          CONTROLS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <kbd style={kbdStyle}>←</kbd>
            <kbd style={kbdStyle}>→</kbd>
            <span style={{ opacity: 0.7, fontSize: '11px' }}>Move</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <kbd style={kbdStyle}>↓</kbd>
            <span style={{ opacity: 0.7, fontSize: '11px' }}>Drop</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <kbd style={kbdStyle}>↑</kbd>
            <span style={{ opacity: 0.7, fontSize: '11px' }}>Rotate</span>
          </div>
        </div>
      </div>

      {/* HUD */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        color: 'white',
        fontFamily: "'Montserrat', monospace",
        fontSize: '16px',
        textAlign: 'right',
        zIndex: 10,
        pointerEvents: 'none',
        textShadow: '0 0 20px rgba(255,255,255,0.3)',
      }}>
        <div style={{ opacity: 0.8, marginBottom: '8px' }}>SCORE: {score}</div>
        <div style={{ opacity: 0.5 }}>TIME: {time}s</div>
      </div>

      {/* Game canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: gameOver ? 0.3 : 0.85,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          position: 'relative',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}>
          <canvas
            ref={canvasRef}
            width={COLS * BLOCK_SIZE}
            height={ROWS * BLOCK_SIZE}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              backgroundColor: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 0 60px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Game Over Overlay - contained within the tetris area */}
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 64px',
          background: 'radial-gradient(circle, rgba(8,12,114,0.98) 0%, rgba(0,0,0,0.95) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
          zIndex: 100,
          animation: 'gameOverFadeIn 0.5s ease-out',
          pointerEvents: 'auto',
        }}>
          {/* Dramatic glow */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,50,50,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'gameOverPulse 2s ease-in-out infinite',
          }} />

          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '48px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
            textShadow: '0 0 40px rgba(255,50,50,0.5)',
            letterSpacing: '4px',
          }}>
            GAME OVER
          </h2>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '8px',
          }}>
            Final Score
          </p>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '56px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '40px',
            textShadow: '0 0 30px rgba(100,150,255,0.5)',
          }}>
            {finalScore}
          </p>

          <button
            onClick={handleTryAgain}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(100,150,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(100,150,255,0.3)';
            }}
            style={{
              padding: '16px 48px',
              fontSize: '16px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, rgba(100,150,255,0.3) 0%, rgba(150,100,255,0.3) 100%)',
              border: '1px solid rgba(100,150,255,0.5)',
              borderRadius: '50px',
              cursor: 'pointer',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(100,150,255,0.3)',
              transition: 'all 0.3s ease',
              pointerEvents: 'auto',
            }}
          >
            Try Again
          </button>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '24px',
          }}>
            Press any key or click to restart
          </p>
        </div>
      )}

      {/* Keyframe animation for flash */}
      <style>{`
        @keyframes flashPulse {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes gameOverFadeIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes gameOverPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
