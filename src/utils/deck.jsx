export const originalDeck = [
  { id: 1, suit: "hearts", rank: "2" },
  { id: 2, suit: "hearts", rank: "3" },
  { id: 3, suit: "hearts", rank: "4" },
  { id: 4, suit: "hearts", rank: "5" },
  { id: 5, suit: "hearts", rank: "6" },
  { id: 6, suit: "hearts", rank: "7" },
  { id: 7, suit: "hearts", rank: "8" },
  { id: 8, suit: "hearts", rank: "9" },
  { id: 9, suit: "hearts", rank: "10" },
  { id: 10, suit: "hearts", rank: "J" },
  { id: 11, suit: "hearts", rank: "Q" },
  { id: 12, suit: "hearts", rank: "K" },
  { id: 13, suit: "hearts", rank: "A" },

  { id: 14, suit: "diamonds", rank: "2" },
  { id: 15, suit: "diamonds", rank: "3" },
  { id: 16, suit: "diamonds", rank: "4" },
  { id: 17, suit: "diamonds", rank: "5" },
  { id: 18, suit: "diamonds", rank: "6" },
  { id: 19, suit: "diamonds", rank: "7" },
  { id: 20, suit: "diamonds", rank: "8" },
  { id: 21, suit: "diamonds", rank: "9" },
  { id: 22, suit: "diamonds", rank: "10" },
  { id: 23, suit: "diamonds", rank: "J" },
  { id: 24, suit: "diamonds", rank: "Q" },
  { id: 25, suit: "diamonds", rank: "K" },
  { id: 26, suit: "diamonds", rank: "A" },

  { id: 27, suit: "clubs", rank: "2" },
  { id: 28, suit: "clubs", rank: "3" },
  { id: 29, suit: "clubs", rank: "4" },
  { id: 30, suit: "clubs", rank: "5" },
  { id: 31, suit: "clubs", rank: "6" },
  { id: 32, suit: "clubs", rank: "7" },
  { id: 33, suit: "clubs", rank: "8" },
  { id: 34, suit: "clubs", rank: "9" },
  { id: 35, suit: "clubs", rank: "10" },
  { id: 36, suit: "clubs", rank: "J" },
  { id: 37, suit: "clubs", rank: "Q" },
  { id: 38, suit: "clubs", rank: "K" },
  { id: 39, suit: "clubs", rank: "A" },

  { id: 40, suit: "spades", rank: "2" },
  { id: 41, suit: "spades", rank: "3" },
  { id: 42, suit: "spades", rank: "4" },
  { id: 43, suit: "spades", rank: "5" },
  { id: 44, suit: "spades", rank: "6" },
  { id: 45, suit: "spades", rank: "7" },
  { id: 46, suit: "spades", rank: "8" },
  { id: 47, suit: "spades", rank: "9" },
  { id: 48, suit: "spades", rank: "10" },
  { id: 49, suit: "spades", rank: "J" },
  { id: 50, suit: "spades", rank: "Q" },
  { id: 51, suit: "spades", rank: "K" },
  { id: 52, suit: "spades", rank: "A" },
];

// Shuffle the deck: Fisher-Yates-Algorithm
// function shuffleDeck takes a deck and shuffles it
// start with the last card (length - 1), loop stops before reaching the first card (i > 0)
// Math.random: generates floating-point number (Gleitkommazahl) between 0 (incl.) and 1 (excl.)
// Math.random()*(i+1): result is a number between 0 and i+1 (so any place in the deck)
// Math.floor(...): rounds down to the nearest integer: j
// swap cards on the positions i and j
export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// getShuffledDeck
// shuffle a copy of the original deck (using the spread operator to copy all elements)
export function getShuffledDeck() {
  const shufflingDeckCopy = [...originalDeck];
  return shuffleDeck(shufflingDeckCopy);
}
