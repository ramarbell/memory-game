import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Card from "./components/Card";
import Heading from "./components/Heading";
import ScorePanel from "./components/ScorePanel";
import DifficultyCard from "./components/DifficultyCard";
import cardData from "./data/cards";

const BEST_SCORE_KEY = "memory-game-best-score";

function getBestScoreKey(difficulty) {
  return `${BEST_SCORE_KEY}-${difficulty}`;
}

function deckBuilder(difficulty) {
  if (difficulty === "easy") {
    return cardData.slice(0, 6);
  } else if (difficulty === "medium") {
    return cardData.slice(0, 10);
  } else if (difficulty === "hard") {
    return cardData.slice(0, 12);
  } else {
    return cardData.slice(0, 6);
  }
}

function createDeck(difficulty) {
  return deckBuilder(difficulty)
    .flatMap((pair) => [
      { ...pair, id: crypto.randomUUID() },
      { ...pair, id: crypto.randomUUID() },
    ])
    .sort(() => Math.random() - 0.5);
}
function getSavedBestScore(difficulty) {
  const savedScore = localStorage.getItem(getBestScoreKey(difficulty));
  return savedScore === null ? null : Number(savedScore);
}

export default function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState(() => createDeck("easy"));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(() => getSavedBestScore("easy"));

  function startNewGame(nextDifficulty = difficulty) {
    setMoves(0);
    setFlippedCards([]);
    setMatchedIds(new Set());
    setCards(() => createDeck(nextDifficulty));
    setIsLocked(false);
  }

  function handleDifficultyChange(nextDifficulty) {
    setDifficulty(nextDifficulty);
    setBestScore(getSavedBestScore(nextDifficulty));
    startNewGame(nextDifficulty);
  }

  function handleCardClick(card) {
    if (isLocked) return;
    if (matchedIds.has(card.id)) return;
    if (flippedCards.some((c) => c.id === card.id)) return;

    if (flippedCards.length === 0) {
      setFlippedCards([card]);
      return;
    }

    if (flippedCards.length !== 1) return;

    setIsLocked(true);
    const [first] = flippedCards;
    const second = card;
    const isMatch = first.image === second.image;
    const nextMoves = isMatch ? Math.max(moves, 1) : moves + 1;

    setFlippedCards([first, second]);
    setMoves(nextMoves);

    if (isMatch) {
      setMatchedIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(first.id);
        newSet.add(second.id);
        return newSet;
      });

      if (matchedIds.size + 2 === cards.length) {
        setBestScore((currentBestScore) => {
          if (currentBestScore !== null && currentBestScore <= nextMoves) {
            return currentBestScore;
          }

          localStorage.setItem(getBestScoreKey(difficulty), String(nextMoves));
          return nextMoves;
        });
      }

      setFlippedCards([]);
      setIsLocked(false);
    } else {
      setTimeout(() => {
        setFlippedCards([]);
        setIsLocked(false);
      }, 800);
    }
  }

  function handleReset() {
    startNewGame();
  }

  const hasWon = matchedIds.size === cards.length;

  return (
    <div>
      <Heading>
        <DifficultyCard
          difficulty={difficulty}
          setDifficultyChange={handleDifficultyChange}
        />
      </Heading>

      <GameBoard difficulty={difficulty}>
        {cards.map((card) => {
          const isFlipped =
            flippedCards.some((c) => c.id === card.id) ||
            matchedIds.has(card.id);

          return (
            <Card
              key={card.id}
              isFlipped={isFlipped}
              image={card.image}
              onClick={() => handleCardClick(card)}
              cardData={cardData}
            />
          );
        })}
      </GameBoard>

      <ScorePanel moves={moves} bestScore={bestScore} onReset={handleReset} />

      {hasWon && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>You Win🎉</h2>
            <p>Nice memory skills.</p>
            <button className="new-game" onClick={handleReset}>
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
