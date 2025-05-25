import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMOJI_CATEGORIES } from "../utils/constants";
import { useCategories } from "../context/CategoryContext";
import { clickSound, placeSound } from "../utils/sounds";
import clsx from "clsx";

const CategorySelection = () => {
  const [player1Category, setPlayer1Category] = useState("");
  const [player2Category, setPlayer2Category] = useState("");
  const [showError, setShowError] = useState(false);
  const { setSelectedCategories } = useCategories();
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (player1Category && player2Category) {
      placeSound.play();
      setSelectedCategories({ player1Category, player2Category });
      navigate("/game");
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    }
  };

  const handleCategoryClick = (player, category) => {
    if (player === 1) {
      if (category !== player2Category) {
        clickSound.play();
        setPlayer1Category(category);
      }
    } else {
      if (category !== player1Category) {
        clickSound.play();
        setPlayer2Category(category);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex flex-col items-center justify-center p-4 relative">
      
      <h1 className="text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-pink-500 drop-shadow-md">
        Blink Tic Tac Toe
      </h1>

      {showError && (
        <div className="absolute top-4 bg-orange-600 text-white px-6 py-3 rounded-xl text-sm shadow-lg animate-fade-in-out z-50">
          Please select categories for both players!
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 w-full max-w-4xl transition-all duration-500">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-orange-700 mb-8">
          Select Emoji Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-4 text-center">Player 1 Category</h3>
            <div className="space-y-3">
              {Object.entries(EMOJI_CATEGORIES).map(([name, emojis]) => (
                <div
                  key={name}
                  onClick={() => handleCategoryClick(1, name)}
                  className={clsx(
                    "cursor-pointer p-3 rounded-lg border-2 transition transform hover:scale-105",
                    player1Category === name
                      ? "bg-orange-500 text-white border-orange-600 shadow-md"
                      : player2Category === name
                      ? "opacity-50 cursor-not-allowed border-orange-200 bg-orange-100"
                      : "bg-orange-50 hover:bg-orange-200 border-orange-300"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{name}</span>
                    <span className="text-2xl">{emojis.join(" ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-4 text-center">Player 2 Category</h3>
            <div className="space-y-3">
              {Object.entries(EMOJI_CATEGORIES).map(([name, emojis]) => (
                <div
                  key={name}
                  onClick={() => handleCategoryClick(2, name)}
                  className={clsx(
                    "cursor-pointer p-3 rounded-lg border-2 transition transform hover:scale-105",
                    player2Category === name
                      ? "bg-orange-500 text-white border-orange-600 shadow-md"
                      : player1Category === name
                      ? "opacity-50 cursor-not-allowed border-orange-200 bg-orange-100"
                      : "bg-orange-50 hover:bg-orange-200 border-orange-300"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{name}</span>
                    <span className="text-2xl">{emojis.join(" ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleStartGame}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
