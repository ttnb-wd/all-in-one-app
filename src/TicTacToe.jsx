import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [modalSize, setModalSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const updateModalSize = () => {
      const boardElement = document.querySelector('.board');
      if (boardElement) {
        setModalSize({
          width: boardElement.offsetWidth,
          height: boardElement.offsetHeight
        });
      }
    };

    updateModalSize();
    window.addEventListener('resize', updateModalSize);
    return () => window.removeEventListener('resize', updateModalSize);
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || gameOver) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every(square => square)) {
      setGameOver(true);
    }
  };

  const handleTouch = (e, i) => {
    e.preventDefault(); // Prevent double-tap zoom and other touch events
    e.stopPropagation(); // Stop event bubbling
    if (board[i] || gameOver) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every(square => square)) {
      setGameOver(true);
    }
  };

  const handleResetTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetGame();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const handleModalClick = (e) => {
    // Close modal only if clicking the overlay, not the modal content
    if (e.target.className === 'modal-overlay') {
      resetGame();
    }
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}`
    : board.every(square => square)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, i) => (
          <button 
            key={i} 
            className={`square ${square ? 'filled' : ''}`} 
            onClick={() => handleClick(i)}
            onTouchEnd={(e) => handleTouch(e, i)}
            onTouchStart={(e) => e.preventDefault()}
          >
            <span>{square}</span>
          </button>
        ))}
        {winner && (
          <div className="modal-overlay" onClick={handleModalClick}>
            <Confetti
              width={modalSize.width}
              height={modalSize.height}
              recycle={false}
              numberOfPieces={200}
              confettiSource={{
                x: modalSize.width / 2,
                y: modalSize.height / 2
              }}
            />
            <div className="winner-modal">
              <h2>🎉 Player {winner} Wins! 🎉</h2>
            </div>
          </div>
        )}
      </div>
      <button 
        className="reset-button" 
        onClick={resetGame}
        onTouchEnd={handleResetTouch}
        onTouchStart={(e) => e.preventDefault()}
      >
        Reset Game
      </button>
    </div>
  );
}

export default TicTacToe; 