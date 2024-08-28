import "./App.css";
import "./components/Card.css";
import { useState } from "react";
import { getShuffledDeck } from "./utils/deck";
import Card from "./components/Card";

function App() {
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealedDeck, setRevealedDeck] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

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

    const stacks = newColumns.map((stack) =>
      stack.map((card, index, array) =>
        index === array.length - 1 ? { ...card, isFaceUp: true } : card
      )
    );
    console.log(stacks);

    newDeck = newDeck.slice(index); // Remove the cards that were dealt to the columns from 'newDeck'
    setDeck(newDeck); // Update the 'deck' state with remaining cards
    setColumns(stacks); // Update the 'columns' state with the dealt cards
  };

  const handleRevealCard = () => {
    if (deck.length > 0) {
      const [firstCard, ...restOfDeck] = deck;

      console.log(firstCard);
      const revealedCard = { ...firstCard, isFaceUp: true }; // set isFaceUp on true
      console.log(revealedCard);
      setRevealedDeck([...revealedDeck, revealedCard]); // add the revealed card to the revealedDeck

      setDeck(restOfDeck); // Aktualisiere den Deck, um die aufgedeckte Karte zu entfernen
    }
  };

  //
  // Select and move Cards
  //
  const handleCardSelect = (card, fromColumnIndex = null) => {
    setSelectedCard({ card, fromColumnIndex });
    console.log(selectedCard);
  };
  console.log(selectedCard);
  const handleCardDrop = (toColumnIndex) => {
    if (!selectedCard) return;

    const { card, fromColumnIndex } = selectedCard;

    if (fromColumnIndex !== null) {
      setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns];
        updatedColumns[fromColumnIndex] = updatedColumns[
          fromColumnIndex
        ].filter((c) => c.id !== card.id);
        return updatedColumns;
      });
    } else {
      setRevealedDeck(revealedDeck.filter((c) => c.id !== card.id));
    }

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[toColumnIndex] = [...updatedColumns[toColumnIndex], card];
      return updatedColumns;
    });

    setSelectedCard(null);
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

            <div className="revealed-deck">
              {revealedDeck.map((card) => (
                <Card
                  key={card.id}
                  emoji={card.emoji}
                  isFaceUp={true}
                  isSelected={selectedCard?.card?.id === card.id}
                  onClick={() => handleCardSelect(card)}
                ></Card>
              ))}
            </div>
          </div>

          <div className="columns-section">
            {/* column: the current column | columnIndex: current individual column index  */}
            {/* for each column, a div element is created */}
            {/* column.map((card): iterate over the individual cards in the column */}
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="column"
                onClick={() => handleCardDrop(columnIndex)}
              >
                {column.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    emoji={card.emoji}
                    stackIndex={cardIndex}
                    isFaceUp={card.isFaceUp}
                    onClick={() =>
                      cardIndex === column.length - 1
                        ? handleCardSelect(card, columnIndex)
                        : null
                    }
                    isSelected={selectedCard?.card?.id === card.id}
                  ></Card>
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
