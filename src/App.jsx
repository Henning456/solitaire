import "./App.css";
import { useState, useEffect } from "react";
import { getShuffledDeck } from "./utils/deck";

function App() {
  const [deck, setDeck] = useState([]);

  // useEffect takes two arguments: 1. callback function | 2. optional dependency array: controls when the effect should be executed
  // []: effect does not depend on any external variables or state, so React runs the effect only once
  // shuffled deck is stored in newDeck
  // setDeck(newDeck): re-render of the App component, updates 'deck' by new content of 'setDeck'
  useEffect(() => {
    const newDeck = getShuffledDeck();
    setDeck(newDeck);
    console.log("Shuffled Deck:", newDeck);
  }, []);

  return (
    <div className="App">
      <h1>Solitaire</h1>
      {/* board, cards etc. */}
      {/* map iterated over each card in the deck array and transforms in into JSX elements for rendering */}
      {/* parameters: card: the current element in the deck array | index: index of the current element for identification */}
      {/* key={index}: idenifier for each element | */}
      {deck.map((card) => (
        <div key={card.id}>
          {card.rank} of {card.suit}
        </div>
      ))}
    </div>
  );
}

export default App;
