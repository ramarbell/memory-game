function DifficultyCard({ difficulty, setDifficultyChange }) {
  return (
    <div className="difficulty-card">
      <button
        className={`difficulty-card-button ${
          difficulty === "easy" ? "active" : ""
        }`}
        onClick={() => setDifficultyChange("easy")}
      >
        Easy
      </button>
      <button
        className={`difficulty-card-button ${
          difficulty === "medium" ? "active" : ""
        }`}
        onClick={() => setDifficultyChange("medium")}
      >
        Medium
      </button>
      <button
        className={`difficulty-card-button ${
          difficulty === "hard" ? "active" : ""
        }`}
        onClick={() => setDifficultyChange("hard")}
      >
        Hard
      </button>
    </div>
  );
}

export default DifficultyCard;
