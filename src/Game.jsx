import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Board from "./components/Board";
import EmojiPicker from "./components/EmojiPicker";
import Help from "./components/Help";
import { EMOJI_CATEGORIES, INITIAL_GRID } from "./utils/constants";
import { checkWinner } from "./utils/checkWinner";
import { placeSound, winSound, clickSound, errorSound } from "./utils/sounds";
import { useCategories } from "./context/CategoryContext";

export default function Game() {
  const navigate = useNavigate();
  const { selectedCategories } = useCategories();
  const { player1Category, player2Category } = selectedCategories;
  const [showHelp, setShowHelp] = useState(false);
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [moves, setMoves] = useState({ 1: [], 2: [] });
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [errorPopup, setErrorPopup] = useState("");
  const players = { 1: player1Category, 2: player2Category };

  useEffect(() => {
    const saved = localStorage.getItem("blinkScores");
    if (saved) setScores(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("blinkScores", JSON.stringify(scores));
  }, [scores]);

  const checkGameEnd = useCallback((gridState, lastPlayer) => {
    const winningPattern = checkWinner(gridState);
    if (winningPattern) {
      setWinner(lastPlayer);
      setScores((prev) => ({ ...prev, [lastPlayer]: prev[lastPlayer] + 1 }));
      winSound.play();
    }
  }, []);

  const handleDrop = useCallback(
    (item, toIndex) => {
      if (winner || grid[toIndex]) return;

      const player = item.player;
      if (player !== turn) {
        setErrorPopup("Not your turn!");
        errorSound.play();
        setTimeout(() => setErrorPopup(""), 1500);
        return;
      }

      let emoji = item.emoji;
      const usedEmojis = moves[player].map((index) => grid[index]?.emoji);

      if (item.fromPalette) {
        const category = EMOJI_CATEGORIES[players[player]];
        const unused = category.filter((em) => !usedEmojis.includes(em));
        if (unused.length === 0) return;
        emoji = unused[Math.floor(Math.random() * unused.length)];
      }

      const newGrid = [...grid];
      const newMoves = { ...moves };

      if (newMoves[player].length === 3) {
        const oldestIndex = newMoves[player].shift();
        newGrid[oldestIndex] = null;
      }

      newGrid[toIndex] = { emoji, player };
      newMoves[player].push(toIndex);

      setGrid(newGrid);
      setMoves(newMoves);
      setTurn(player === 1 ? 2 : 1);
      placeSound.play();
      checkGameEnd(newGrid, player);
    },
    [grid, moves, winner, players, checkGameEnd, turn]
  );

  const handleReset = () => {
    setGrid(INITIAL_GRID);
    setMoves({ 1: [], 2: [] });
    setTurn(1);
    setWinner(null);
    clickSound.play();
  };

  const handleScoreReset = () => {
    setScores({ 1: 0, 2: 0 });
    localStorage.removeItem("blinkScores");
    clickSound.play();
  };

  const handleNewGame = () => {
    navigate("/");
    clickSound.play();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-orange-100 to-yellow-200">
        <motion.h1
          className="text-4xl font-extrabold text-orange-700 mb-3 drop-shadow"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tic Tac Toe
        </motion.h1>

        <motion.div
          className="text-lg font-medium text-orange-900 mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Player {turn}'s turn: <span className="font-bold">{players[turn]}</span>
        </motion.div>

        <div className="flex justify-between w-full max-w-4xl mb-6">
          {[1, 2].map((player) => (
            <motion.div
              key={player}
              className="text-center"
              initial={{ opacity: 0, x: player === 1 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: player * 0.2 }}
            >
              <h2 className="text-xl font-semibold text-orange-800 mb-2">
                Player {player}: {players[player]}
              </h2>
              <EmojiPicker category={players[player]} player={player} />
              <p className="mt-2 text-lg text-orange-700">Score: {scores[player]}</p>
            </motion.div>
          ))}
        </div>

        <Board grid={grid} onDrop={handleDrop} currentTurn={turn} winner={winner} />

        <div className="w-full px-4 mt-6">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
            >
              Reset Game
            </button>
            <button
              onClick={handleScoreReset}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Reset Scores
            </button>
            <button
              onClick={handleNewGame}
              className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
            >
              New Game
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Help
            </button>
          </div>
        </div>

        <AnimatePresence>
          {winner && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-2xl text-center max-w-sm mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <p className="text-4xl mb-4 animate-pulse">🎉🎊🥳</p>
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Congratulations Player {winner}!
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  You blinked your way to victory! 🕹️💥
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    OK
                  </button>
                  <button
                    onClick={handleNewGame}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    New Game
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHelp && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white p-6 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <button
                  onClick={() => setShowHelp(false)}
                  className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-600 transition"
                  aria-label="Close"
                >
                  ❌
                </button>
                <Help onClose={() => setShowHelp(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {errorPopup && (
            <motion.div
              className="fixed bottom-10 px-4 py-2 bg-red-600 text-white rounded-md shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {errorPopup}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}