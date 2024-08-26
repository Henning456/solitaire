import "./Card.css";

export const Card = ({ emoji, stackIndex }) => {
  return (
    <div className="card" style={{ "--stack-index": stackIndex }}>
      <div>{emoji}</div>
    </div>
  );
};

export default Card;
