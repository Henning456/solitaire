import "./App.css";
import "./components/Card.css";
import { useState } from "react";
import { getShuffledDeck } from "./utils/deck";
import {
  canMoveCardToColumn,
  canMoveCardToFoundation,
} from "./components/moves";
import Card from "./components/Card";
import Login from "./components/login";

function App() {
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealedDeck, setRevealedDeck] = useState([]);
  // { card, fromColumnIndex, fromFoundation }
  const [selectedCards, setSelectedCards] = useState([]);
  const [foundations, setFoundations] = useState({
    hearts: [],
    diamonds: [],
    clubs: [],
    spades: [],
  });

  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
    //backend Zugang?
  };

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

    // top card of each column is set to isFaceUp: true
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

  const handleDrawCard = () => {
    if (deck.length > 0) {
      const [firstCard, ...restOfDeck] = deck;

      const revealedCard = { ...firstCard, isFaceUp: true }; // set isFaceUp on true
      setRevealedDeck([...revealedDeck, revealedCard]); // add the revealed card to the revealedDeck
      setDeck(restOfDeck); // update deck
    }
  };

  // Reverse cards from revealedCards back to deck (when deck is empty)
  const handleResetDeck = () => {
    if (deck.length === 0 && revealedDeck.length > 0) {
      setDeck(revealedDeck.map((card) => ({ ...card, isFaceUp: false })));
      setRevealedDeck([]); // empty revealedDeck
    }
  };

  // Select and move Cards
  //
  // if null: card not from column but revealedDeck or foundation
  const handleCardSelect = (
    card,
    fromColumnIndex = null,
    fromFoundation = null
  ) => {
    // selected card, origin, and foundation are saved in state
    if (fromColumnIndex) {
      const cards = [];
      let cardFound = false;
      for (let c of columns[fromColumnIndex]) {
        if (cardFound || c.id === card.id) {
          cardFound = true;
          cards.push(c);
        }
      }
      console.log(
        cards.map((c) => {
          return { card: c, fromColumnIndex, fromFoundation };
        })
      );
      setSelectedCards(
        cards.map((c) => {
          return { card: c, fromColumnIndex, fromFoundation };
        })
      );
    } else {
      setSelectedCards([{ card, fromColumnIndex, fromFoundation }]);
    }
  };

  const handleCardDrop = (toColumnIndex = null, toFoundation = null) => {
    if (!selectedCards.length) return;

    // card, fromColumnIndex, and fromFoundation are destructured from selectedCard
    const { card, fromColumnIndex, fromFoundation } = selectedCards[0];

    //
    // Check if card can be moved to column
    //
    if (toColumnIndex !== null) {
      if (canMoveCardToColumn(card, columns[toColumnIndex])) {
        // card will be moved to column
        // update 'columns' state; add selected card to new column
        setColumns((prevColumns) => {
          const updatedColumns = [...prevColumns];
          // new array is created, containing all cards in target column plus the new card (new array created by spread operator) --> then new array is assigned to 'updatedColumns[toColumnIndex]'
          updatedColumns[toColumnIndex] = [
            ...updatedColumns[toColumnIndex],
            ...selectedCards.map((item) => item.card),
          ];

          // Delete the selected card from its orignal column (based on its columnIndex)
          if (fromColumnIndex !== null) {
            // updatedColumns is a copy of the current state of columns, fromColumnIndex is the specific column (it is then filtered and assigned back to 'updatedColumns[fromColumnIndex]')
            const selectedRootCardIndex = updatedColumns[
              fromColumnIndex
            ].findIndex((c) => c.id === card.id);
            updatedColumns[fromColumnIndex] = updatedColumns[
              fromColumnIndex
            ].filter((_, index) => index < selectedRootCardIndex); // new array is created, containing all cards in original column minus the moved card / we filter and keep only the cards that have a different id then the moved card

            // Uncover the new top card if it's face down
            if (updatedColumns[fromColumnIndex].length > 0) {
              const topCard =
                updatedColumns[fromColumnIndex][ // column in which the top card was deleted
                  updatedColumns[fromColumnIndex].length - 1 // determines the index of the top card of this column (=last card in this array)
                ];
              if (!topCard.isFaceUp) {
                topCard.isFaceUp = true;
              }
            }
          }
          return updatedColumns;
        });
        // the card was moved successfully, so the selectedCard state is set back to null
        setSelectedCards([]);
      }
    }

    //
    // Check if card can be moved to foundation
    //
    else if (toFoundation !== null) {
      if (canMoveCardToFoundation(card, foundations[toFoundation])) {
        // card is moved to foundation
        setFoundations((prevFoundations) => {
          const updatedFoundations = { ...prevFoundations }; // object {...} is used, because we have the four keys: { hearts: [], diamonds: [], clubs: [], spades: [] }
          // new array is created, containing all cards in target foundation plus the new card (new array created by spread operator) --> then new array is assigned to 'updatedFoundations[toFoundation]'
          updatedFoundations[toFoundation] = [
            ...updatedFoundations[toFoundation],
            card,
          ];
          return updatedFoundations;
        });

        // delete card from original column
        if (fromColumnIndex !== null) {
          setColumns((prevColumns) => {
            const updatedColumns = [...prevColumns];
            updatedColumns[fromColumnIndex] = updatedColumns[
              fromColumnIndex
            ].filter((c) => c.id !== card.id);

            // Uncover the new top card if it's face down
            if (updatedColumns[fromColumnIndex].length > 0) {
              const topCard =
                updatedColumns[fromColumnIndex][
                  updatedColumns[fromColumnIndex].length - 1
                ];
              if (!topCard.isFaceUp) {
                topCard.isFaceUp = true;
              }
            }

            return updatedColumns;
          });
        }

        // delete card from a foundation if it came from a foundation
        if (fromFoundation !== null) {
          setFoundations((prevFoundations) => {
            const updatedFoundations = { ...prevFoundations };
            updatedFoundations[fromFoundation] = updatedFoundations[
              fromFoundation
            ].filter((c) => c.id !== card.id);
            return updatedFoundations;
          });
        }
        // the card was moved successfully, so the selectedCard state is set back to null
        setSelectedCards([]);
      }
    }
    // card is deleted from revealedDeck if it came from revealedDeck
    if (fromFoundation === null && fromColumnIndex === null) {
      setRevealedDeck((prevRevealedDeck) => {
        const updatedRevealedDeck = prevRevealedDeck.filter(
          (c) => c.id !== card.id
        );
        return updatedRevealedDeck;
      });
    }

    // if (toColumnIndex !== null) {
    //   // add card to column
    //   setColumns((prevColumns) => {
    //     const updatedColumns = [...prevColumns];
    //     updatedColumns[toColumnIndex] = [
    //       ...updatedColumns[toColumnIndex],
    //       card,
    //     ];
    //     return updatedColumns;
    //   });
    // } else if (toFoundation !== null) {
    //   // add card to foundation
    //   setFoundations((prevFoundations) => {
    //     const updatedFoundations = { ...prevFoundations };
    //     updatedFoundations[toFoundation] = [
    //       ...updatedFoundations[toFoundation],
    //       card,
    //     ];
    //     return updatedFoundations;
    //   });

    //   // set back selectedCard
    //   setSelectedCard(null);
    // }
  };

  return (
    <div className="App">
      <h1>Solitaire</h1>

      <div>
        {user ? (
          <div>
            <h1>Welcome, {user}!</h1>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>

      <h2>{JSON.stringify(selectedCards)}</h2>
      {/* if game was not started yet, you see the button, otherwise the shuffled deck appears */}
      {!gameStarted ? (
        <button onClick={handlePlayButton}>Play</button>
      ) : (
        <div className="game-area">
          <div className="foundation-section">
            {Object.keys(foundations).map((suit) => (
              <div
                key={suit}
                className={`foundation-stack ${suit}`}
                onClick={() => handleCardDrop(null, suit)}
              >
                <div className="placeholder"></div>
                {foundations[suit].length > 0 && (
                  <Card
                    key={foundations[suit][foundations[suit].length - 1].id}
                    card={foundations[suit][foundations[suit].length - 1]}
                    isFaceUp={true}
                    emoji={
                      foundations[suit][foundations[suit].length - 1].emoji
                    }
                    onClick={() =>
                      handleCardSelect(
                        foundations[suit][foundations[suit].length - 1],
                        null,
                        suit
                      )
                    }
                  ></Card>
                )}
              </div>
            ))}
          </div>
          <div className="deck-section">
            {deck.length > 0 ? (
              <div className="card-back" onClick={handleDrawCard}></div>
            ) : (
              <div className="deck-placeholder" onClick={handleResetDeck}>
                Click to reverse deck
              </div>
            )}

            <div className="revealed-deck">
              <div className="placeholder"></div>
              {revealedDeck.map((card) => (
                <Card
                  key={card.id}
                  emoji={card.emoji}
                  isFaceUp={true}
                  isSelected={selectedCards[0]?.card?.id === card.id}
                  onClick={() => handleCardSelect(card)}
                ></Card>
              ))}
            </div>
          </div>

          {/* {deck.length === 0 && revealedDeck.length > 0 && (
            <button onClick={handleResetDeck}>Reset Deck</button>
          )} */}

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
                    onClick={() => {
                      const minSelectableIndex = columns[columnIndex].findIndex(
                        (card) => card.isFaceUp
                      );
                      if (cardIndex >= minSelectableIndex) {
                        handleCardSelect(card, columnIndex);
                      }
                    }}
                    isSelected={selectedCards[0]?.card?.id === card.id}
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
