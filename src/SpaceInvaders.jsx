import { useEffect, useRef, useState } from 'react';
import './SpaceInvaders.css';

const SpaceInvaders = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const playerImage = useRef(null);
  const alienImage = useRef(null);
  const gameLoopRef = useRef(null);  // Add this to track the game loop

  const player = useRef({
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    speed: 5,
    ships: [
      { offset: 0 }  // single center ship
    ]
  });

  const aliens = useRef([]);
  const bullets = useRef([]);
  const keys = useRef({});

  // Level configurations
  const getLevelConfig = (level) => {
    return {
      alienRows: Math.min(3 + Math.floor(level / 2), 6),
      alienCols: Math.min(6 + Math.floor(level / 3), 10),
      alienSpeed: 2 + level * 0.5,
      alienDropDistance: 20 + level * 5,
      bulletSpeed: 7 + level * 0.3,
      alienSpacing: Math.max(80 - level * 5, 60)
    };
  };

  // Load images
  useEffect(() => {
    // Load player image
    const playerImg = new Image();
    playerImg.src = '/706026-removebg-preview.png';
    playerImg.onload = () => {
      playerImage.current = playerImg;
    };

    // Load alien image
    const alienImg = new Image();
    alienImg.src = '/unnamed-removebg-preview.png';
    alienImg.onload = () => {
      alienImage.current = alienImg;
    };
  }, []);

  const handleKeyDown = (e) => {
    if (gameOver) return;  // Prevent actions if game is over
    
    keys.current[e.key] = true;
    
    if (e.key === ' ') {
      // Create single bullet shot
      bullets.current.push({
        x: player.current.x + player.current.width / 2,
        y: player.current.y,
        angle: 0  // Straight up
      });
    }
  };

  const handleKeyUp = (e) => {
    keys.current[e.key] = false;
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    // Clear any remaining game state
    aliens.current = [];
    bullets.current = [];
    keys.current = {};
  };

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const config = getLevelConfig(level);
    
    // Initialize game state
    const initGame = () => {
      // Initialize player position and ships
      player.current = {
        x: canvas.width / 2 - 30,
        y: canvas.height - 100,
        width: 60,
        height: 60,
        speed: 5,
        ships: [
          { offset: 0 }  // single center ship
        ]
      };
      
      // Create aliens
      aliens.current = [];
      for (let i = 0; i < config.alienRows; i++) {
        for (let j = 0; j < config.alienCols; j++) {
          aliens.current.push({
            x: j * config.alienSpacing + 50,
            y: i * config.alienSpacing + 50,
            width: 50,
            height: 50,
            direction: 1
          });
        }
      }
    };

    // Game loop
    const gameLoop = () => {
      if (gameOver) {
        cancelAnimationFrame(gameLoopRef.current);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Check if player is properly initialized
      if (!player.current || !player.current.ships) {
        initGame();
      }
      
      // Move player
      if (keys.current.ArrowLeft && player.current.x > 0) {
        player.current.x -= player.current.speed;
      }
      if (keys.current.ArrowRight && player.current.x < canvas.width - player.current.width) {
        player.current.x += player.current.speed;
      }

      // Draw player ships
      if (playerImage.current && player.current.ships) {
        player.current.ships.forEach(ship => {
          ctx.drawImage(
            playerImage.current,
            player.current.x + ship.offset,
            player.current.y,
            player.current.width,
            player.current.height
          );
        });
      }

      // Move and draw bullets
      bullets.current.forEach((bullet, index) => {
        bullet.y -= config.bulletSpeed;
        bullet.x += config.bulletSpeed * bullet.angle; // Add horizontal movement based on angle
        ctx.fillStyle = '#fff';
        ctx.fillRect(bullet.x, bullet.y, 5, 15);

        // Remove bullets that are off screen
        if (bullet.y < 0 || bullet.x < 0 || bullet.x > canvas.width) {
          bullets.current.splice(index, 1);
        }

        // Check for collision with aliens
        aliens.current.forEach((alien, alienIndex) => {
          if (
            bullet.x < alien.x + alien.width &&
            bullet.x + 5 > alien.x &&
            bullet.y < alien.y + alien.height &&
            bullet.y + 15 > alien.y
          ) {
            bullets.current.splice(index, 1);
            aliens.current.splice(alienIndex, 1);
            setScore(prev => prev + 100);

            // Check for level completion
            if (aliens.current.length === 0) {
              setLevel(prev => prev + 1);
              initGame();
            }
          }
        });
      });

      // Move and draw aliens
      let shouldChangeDirection = false;
      aliens.current.forEach(alien => {
        alien.x += config.alienSpeed * alien.direction;
        
        if (alien.x <= 0 || alien.x >= canvas.width - alien.width) {
          shouldChangeDirection = true;
        }

        // Draw alien
        if (alienImage.current) {
          ctx.drawImage(
            alienImage.current,
            alien.x,
            alien.y,
            alien.width,
            alien.height
          );
        }

        // Check for game over
        if (alien.y + alien.height >= player.current.y) {
          endGame();
          return;
        }
      });

      if (shouldChangeDirection) {
        aliens.current.forEach(alien => {
          alien.direction *= -1;
          alien.y += config.alienDropDistance;
        });
      }

      if (!gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Start game
    initGame();
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, level]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    // Clear any previous game state
    aliens.current = [];
    bullets.current = [];
    keys.current = {};
  };

  return (
    <div className="space-invaders">
      <div className="game-header">
        <h2>Space Invaders</h2>
        <div className="score-level">
          <div className="score">Score: {score}</div>
          <div className="level">Level: {level}</div>
        </div>
      </div>
      {!gameStarted || gameOver ? (
        <div className="game-menu">
          <h3>{gameOver ? 'Game Over!' : 'Space Invaders'}</h3>
          {gameOver && <div className="final-score">Final Score: {score}</div>}
          {gameOver && <div className="final-level">Level Reached: {level}</div>}
          <button onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
          <div className="instructions">
            <p>Use ← → to move</p>
            <p>Space to shoot</p>
          </div>
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className={gameStarted && !gameOver ? 'active' : ''}
      />
    </div>
  );
};

export default SpaceInvaders; 