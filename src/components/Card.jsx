import "./Card.css";

export const Card = ({ emoji, stackIndex, isFaceUp, onClick, isSelected }) => {
  return (
    <div
      className={`card ${isFaceUp ? "card" : "card-back"} ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
      style={{
        "--stack-index": stackIndex,
        top: `calc(35px * ${stackIndex})`,
        zIndex: stackIndex,
      }}
    >
      {isFaceUp && (
        <>
          <div>{emoji}</div>
        </>
      )}
    </div>
  );
};

export default Card;
