import "./App.css";
import { useState } from "react";
import { getShuffledDeck } from "./utils/deck";

function App() {
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // to the new variable newDeck gets assigned the shuffled deck from 'getShuffledDeck' --> easier to read, inspect, debug
  const handlePlayButtonClick = () => {
    const newDeck = getShuffledDeck();
    setDeck(newDeck);

    // 'i' will act (1) as a counter and (2) as a key component in slicing the deck
    // slice(startIndex, endIndex): new array is created from startIndex up to (but not including) endIndex
    // 'push': newly created array 'column' is added to the array 'newColumns' (will have 7 columns eventually)
    // 'i' iterates from 1 to 7, 'index' iterates from 0 and gets updated with the current 'i' (index = index + i  <=>  index += i)
    const newColumns = [];
    let index = 0;
    for (let i = 1; i <= 7; i++) {
      const column = newDeck.slice(index, index + i);
      newColumns.push(column);
      index += i;
    }

    setColumns(newColumns);

    setGameStarted(true);
  };

  return (
    <div className="App">
      <h1>Solitaire</h1>
      {/* if game was not started yet, you see the button, otherwise the shuffled deck appears */}
      {!gameStarted ? (
        <button onClick={handlePlayButtonClick}>Play</button>
      ) : (
        <div>
          {/* 'map' iterates over each card in the deck array and transforms in into JSX elements for rendering */}
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
