function Heading({ children }) {
  return (
    <div className="heading">
      <h1>
        Memory Game
        <span>🧠</span>
      </h1>
      {children}
    </div>
  );
}

export default Heading;
