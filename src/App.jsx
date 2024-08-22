import "./App.css";
import { useState } from "react";
import { getShuffledDeck } from "./utils/deck";
import Card from "./components/Card";

function App() {
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // to the new variable newDeck gets assigned the shuffled deck from 'getShuffledDeck' --> easier to read, inspect, debug
  const handlePlayButton = () => {
    setGameStarted(true);
    // let-variable to slice it later
    let newDeck = getShuffledDeck();
    const newColumns = [];

    // 'i' will act (1) as a counter and (2) as a key component in slicing the deck
    // slice(startIndex, endIndex): new array is created from startIndex up to (but not including) endIndex
    // 'push': newly created array 'column' is added to the array 'newColumns' (will have 7 columns eventually)
    // 'i' iterates from 1 to 7, 'index' iterates from 0 and gets updated with the current 'i' (index = index + i  <=>  index += i)
    let index = 0;
    for (let i = 1; i <= 7; i++) {
      const column = newDeck.slice(index, index + i);
      newColumns.push(column);
      index += i;
    }

    // Remove the cards that were dealt to the columns from 'newDeck'
    newDeck = newDeck.slice(index);
    setDeck(newDeck); // Update the deck state with remaining cards
    setColumns(newColumns); // Set the columns with the dealt cards
  };

  return (
    <div className="App">
      <h1>Solitaire</h1>
      {/* if game was not started yet, you see the button, otherwise the shuffled deck appears */}
      {!gameStarted ? (
        <button onClick={handlePlayButton}>Play</button>
      ) : (
        <div className="game-area">
          <div className="deck-section">
            <h2>Shuffled Deck</h2>
            {/* 'map' iterates over each card in the deck array and transforms in into JSX elements for rendering */}
            {/* parameter 'card': the current element in the deck array */}
            {/* key={card.id}: idenifier for each element */}
            {deck.map((card) => (
              <Card key={card.id} emoji={card.emoji}></Card>
            ))}
          </div>
          <div className="columns-section">
            {/* column: the current column | columnIndex: individual column index  */}
            {/* for each column, a div element is created */}
            {/* column.map((card): iterate over the individual cards in the column */}
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="column">
                {column.map((card) => (
                  <Card key={card.id} emoji={card.emoji}></Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
