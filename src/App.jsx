import "./App.css";
import { useState } from "react";
import { getShuffledDeck } from "./utils/deck";

function App() {
  const [deck, setDeck] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // new variable newDeck gets assigned the shuffled deck from 'getShuffledDeck' --> easier to read, inspect, debug
  const handlePlayButtonClick = () => {
    const newDeck = getShuffledDeck();
    setDeck(newDeck);
    setGameStarted(true);
  };

  return (
    <div className="App">
      <h1>Solitaire</h1>
      {!gameStarted ? (
        <button onClick={handlePlayButtonClick}>Play</button>
      ) : (
        <div>
          {/* map iterates over each card in the deck array and transforms in into JSX elements for rendering */}
          {/* parameters: card: the current element in the deck array | index: index of the current element for identification */}
          {/* key={index}: idenifier for each element | */}
          {deck.map((card) => (
            <div key={card.id}>
              {card.rank} of {card.suit}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
