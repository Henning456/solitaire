import "./Card.css";
// import PropTypes from "prop-types";

export const Card = ({ emoji, stackIndex, isFaceUp, onClick, isSelected }) => {
  return (
    <div
      className={`card ${isFaceUp ? "" : "card-back"} ${
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

// PropTypes for prop validation
// Card.propTypes = {
//   emoji: PropTypes.string.isRequired, // emoji should be a string and is required
//   stackIndex: PropTypes.number.isRequired, // stackIndex should be a number and is required
//   isFaceUp: PropTypes.bool.isRequired, // isFaceUp should be a boolean and is required
// };

export default Card;
