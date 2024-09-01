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
    // console.log(stacks);

    newDeck = newDeck.slice(index); // Remove the cards that were dealt to the columns from 'newDeck'
    setDeck(newDeck); // Update the 'deck' state with remaining cards
    setColumns(stacks); // Update the 'columns' state with the dealt cards
  };

  const handleRevealCard = () => {
    if (deck.length > 0) {
      const [firstCard, ...restOfDeck] = deck;

      // console.log(firstCard);
      const revealedCard = { ...firstCard, isFaceUp: true }; // set isFaceUp on true
      console.log(revealedCard);
      setRevealedDeck([...revealedDeck, revealedCard]); // add the revealed card to the revealedDeck

      setDeck(restOfDeck); // update deck
    }
  };

  //
  // Select and move Cards
  //
  // if null: card not from column but revealedDeck
  const handleCardSelect = (card, fromColumnIndex = null) => {
    // selected card and origin are saved in state
    setSelectedCard({ card, fromColumnIndex });
  };

  const handleCardDrop = (toColumnIndex) => {
    if (!selectedCard) return;

    // card and fromColumnIndex are destructured from selectedCard
    const { card, fromColumnIndex } = selectedCard;

    // check if card is from a column (not null)
    if (fromColumnIndex !== null) {
      setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns]; // copy of prevColumns, original prevColumns is not changed
        updatedColumns[fromColumnIndex] = // gets the specific column in the updatedColumns array
          // check if id of current card (c.id) is not the same id of the card that will be deleted
          // result: new array that contains all cards aside the card that is to be deleted
          updatedColumns[fromColumnIndex].filter((c) => c.id !== card.id);
        return updatedColumns;
      });
    } else {
      // if card is from revealedDeck (fromColumnIndex === null): card will be deleted from revealedDeck
      setRevealedDeck(revealedDeck.filter((c) => c.id !== card.id));
    }

    // add card to another column: update 'columns' state; add selected card to new column
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      // new array is created, containing all cards in target column plus new card (new array created by spred operator) --> then new array is assigned to 'updatedColumns[toColumnIndex]'
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
          <div className="foundation-section">
            <div className="foundation-stack hearts"></div>
            <div className="foundation-stack diamonds"></div>
            <div className="foundation-stack clubs"></div>
            <div className="foundation-stack spades"></div>
          </div>
          <div className="deck-section">
            <h2>Deck</h2>
            <div className="card-back" onClick={handleRevealCard}></div>
            <div className="placeholder"></div>
            <div className="revealed-deck">
              <div className="placeholder"></div>
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
                <div className="placeholder"></div>
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
