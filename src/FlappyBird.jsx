import React, { useEffect, useRef, useState } from 'react';
import './FlappyBird.css';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const birdImageRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0); // Add a ref to track the score
  const birdRef = useRef({
    x: 50,
    y: 200,
    velocity: 0,
    gravity: 0.5,
    jumpStrength: -8
  });
  const pipesRef = useRef([]);
  const animationFrameRef = useRef();

  const createPipe = () => {
    const gap = 150;
    const minHeight = 50;
    const maxHeight = 300;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;
    return {
      x: 400,
      topHeight: height,
      bottomY: height + gap,
      width: 50,
      counted: false
    };
  };

  const resetGame = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    birdRef.current = {
      x: 50,
      y: 200,
      velocity: 0,
      gravity: 0.5,
      jumpStrength: -8
    };
    pipesRef.current = [createPipe()];
    scoreRef.current = 0; // Reset the score ref
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const handleClick = () => {
    if (gameOver) {
      resetGame();
    } else {
      if (!gameStarted) {
        setGameStarted(true);
      }
      birdRef.current.velocity = birdRef.current.jumpStrength;
    }
  };

    // Add keyboard event handler
  const handleKeyPress = (e) => {
    if (e.code === 'Space') {
      handleClick();
    }
  };

  // Create bird image
  useEffect(() => {
    const birdImage = new Image();
    birdImage.src = '/png-clipart-flappy-bird-blue-minecraft-bird-flappy-bird-bird-removebg-preview.png';
    birdImage.onload = () => {
      birdImageRef.current = birdImage;
    };
    // Set immediate fallback in case image loading fails
    birdImageRef.current = birdImage;
  }, []);

  const updateGame = () => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bird = birdRef.current;
    let shouldEndGame = false;

    // Update bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Update pipes
    pipesRef.current.forEach(pipe => {
      pipe.x -= 2;
    });

    // Add new pipe
    if (pipesRef.current[pipesRef.current.length - 1].x < 250) {
      pipesRef.current.push(createPipe());
    }

    // Remove off-screen pipes
    pipesRef.current = pipesRef.current.filter(pipe => pipe.x > -pipe.width);

    // Check collisions and scoring
    pipesRef.current.forEach(pipe => {
      // Score counting
      if (!pipe.counted && bird.x + 20 > pipe.x + pipe.width) {
        pipe.counted = true;
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      // Collision detection
      if (
        bird.x + 20 > pipe.x && bird.x < pipe.x + pipe.width &&
        (bird.y < pipe.topHeight || bird.y + 20 > pipe.bottomY)
      ) {
        shouldEndGame = true;
      }
    });

    // Check boundaries
    if (bird.y < 0 || bird.y > canvas.height) {
      shouldEndGame = true;
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird with rotation based on velocity
    if (birdImageRef.current) {
      ctx.save();
      ctx.translate(bird.x + 30, bird.y + 30);
      const rotation = Math.min(Math.max(bird.velocity * 0.05, -0.5), 0.5);
      ctx.rotate(rotation);
      ctx.drawImage(birdImageRef.current, -30, -30, 60, 60);
      ctx.restore();
    }

    // Draw pipes
    ctx.fillStyle = '#2ECC71';
    pipesRef.current.forEach(pipe => {
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
      ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
    });

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

    if (shouldEndGame) {
      setGameOver(true);
      cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    animationFrameRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 500;

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyPress);
    
    resetGame();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clean up keyboard listener
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationFrameRef.current = requestAnimationFrame(updateGame);
    }
  }, [gameStarted, gameOver]);

  return (
    <div className="flappy-bird-container">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      {!gameStarted && !gameOver && (
        <div className="game-message" onClick={handleClick}>Click to Start</div>
      )}
      {gameOver && (
        <div className="game-message" onClick={handleClick}>
          Game Over! Score: {score}<br />
          Click to Play Again
        </div>
      )}
    </div>
  );
};

export default FlappyBird;