import "./App.css";
import { useState } from "react";
import { getShuffledDeck } from "./utils/deck";
import Card from "./components/Card";

function App() {
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealedDeck, setRevealedDeck] = useState([]);

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

    newDeck = newDeck.slice(index); // Remove the cards that were dealt to the columns from 'newDeck'
    setDeck(newDeck); // Update the 'deck' state with remaining cards
    setColumns(newColumns); // Update the 'columns' state with the dealt cards
  };

  const handleRevealCard = () => {
    if (deck.length > 0) {
      const [firstCard, ...restOfDeck] = deck; // array destructuring: 'deck' gets divided in the first element and the rest
      setRevealedDeck([...revealedDeck, firstCard]); // Add the revealed card to the revealedDeck array (using a temporary copy in this operation)
      setDeck(restOfDeck); // Update the deck to remove the revealed card
    }
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
            <h2>Deck</h2>
            <div className="card-back" onClick={handleRevealCard}></div>
          </div>

          <div className="revealed-deck">
            {revealedDeck.map((card, index) => (
              <Card
                key={card.id}
                emoji={card.emoji}
                stackIndex={index} // pass stack index to control stacking
              ></Card>
            ))}
          </div>

          <div className="columns-section">
            {/* column: the current column | columnIndex: current individual column index  */}
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
