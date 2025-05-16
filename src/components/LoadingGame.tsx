import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Player = 'X' | 'O' | null;

const LoadingGame: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-20 h-20 border-2 border-gray-300 dark:border-gray-600 text-3xl font-bold focus:outline-none text-primary-dark dark:text-primary-light"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </motion.button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-primary-dark dark:text-primary-light">
          While we style your outfit...
        </h2>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <motion.div
              className="bg-accent h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
            Processing: {loadingProgress}%
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array(9).fill(null).map((_, index) => (
            <div key={index} className="flex justify-center">
              {renderSquare(index)}
            </div>
          ))}
        </div>

        <div className="text-center">
          {winner ? (
            <p className="text-xl font-bold mb-4 text-primary-dark dark:text-primary-light">
              Winner: {winner}!
            </p>
          ) : (
            <p className="text-xl font-bold mb-4 text-primary-dark dark:text-primary-light">
              Next player: {isXNext ? 'X' : 'O'}
            </p>
          )}
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingGame; 