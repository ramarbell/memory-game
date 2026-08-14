function GameBoard({ children, difficulty }) {
  return <div className={`game-board ${difficulty}`}>{children}</div>;
}

export default GameBoard;
