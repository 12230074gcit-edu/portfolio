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

export const TetrisCanvas = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [scale, setScale] = useState(1);

  const gridRef = useRef(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const activePieceRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dropCounterRef = useRef(0);
  const dropIntervalRef = useRef(900);

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

    clearLines();
  };

  const clearLines = () => {
    let linesCleared = 0;

    gridRef.current = gridRef.current.filter(row => {
      const full = row.every(cell => cell !== 0);
      if (full) linesCleared++;
      return !full;
    });

    while (gridRef.current.length < ROWS) {
      gridRef.current.unshift(Array(COLS).fill(0));
    }

    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
    }
  };

  const moveDown = useCallback(() => {
    if (!activePieceRef.current) return;

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
        activePieceRef.current = resetGame();
      }
    }

    dropCounterRef.current = 0;
  }, [spawnPiece]);

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

    let animId;

    const update = (time = 0) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      dropCounterRef.current += deltaTime;

      if (dropCounterRef.current > dropIntervalRef.current) {
        moveDown();
      }

      draw();
      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [draw, moveDown, spawnPiece]);

  function resetGame() {
    gridRef.current = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    setScore(0);
    setTime(0);
    const newPiece = spawnPiece();
    activePieceRef.current = newPiece;
    return newPiece;
  }

  return (
    <>
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
        opacity: 0.5,
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
    </>
  );
};
