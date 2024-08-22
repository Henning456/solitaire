import "./Card.css";

export const Card = ({ emoji }) => {
  return (
    <div className="card">
      <div>{emoji}</div>
    </div>
  );
};

export default Card;
