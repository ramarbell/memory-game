function Card({ image, onClick, isFlipped, cardData }) {
  return (
    <div>
      <button
        className={`card ${isFlipped ? "flipped" : ""} `}
        onClick={onClick}
        aria-label={
          isFlipped ? `Card showing ${cardData.pairId}` : "Hidden card"
        }
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="content"></div>
          </div>
          <div className="card-back">
            <div className="content">{image}</div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Card;
