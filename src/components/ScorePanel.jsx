function ScorePanel({ moves, bestScore, onReset }) {
  return (
    <div className="panel">
      <div className="score-panel">Moves: {moves}</div>
      <div className="score-panel">
        Best: {bestScore === null ? "-" : bestScore}
      </div>
      <button className="reset-button" onClick={onReset}>
        Restart
      </button>
    </div>
  );
}

export default ScorePanel;
