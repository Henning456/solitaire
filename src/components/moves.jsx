//
// Rules for moves to Column
//
export function canMoveCardToColumn(card, targetColumn) {
  if (targetColumn.length === 0) {
    // only a King can be moved to an empty column
    return card.rank === "K";
  }

  const topCard = targetColumn[targetColumn.length - 1];

  // Rules: Descending order and alternating colors
  return isOneRankLower(card, topCard) && isOppositeColor(card, topCard);
}

// Helper functions

const isOneRankLower = (card, topCard) => {
  const rankOrder = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const cardRankIndex = rankOrder.indexOf(card.rank);
  const topCardRankIndex = rankOrder.indexOf(topCard.rank);

  return cardRankIndex === topCardRankIndex - 1;
};

const isOppositeColor = (card, topCard) => {
  const redSuits = ["hearts", "diamonds"];
  const blackSuits = ["spades", "clubs"];

  // Check if the colors are different
  return (
    (redSuits.includes(card.suit) && blackSuits.includes(topCard.suit)) ||
    (blackSuits.includes(card.suit) && redSuits.includes(topCard.suit))
  );
};

//
// Rules for moves to Foundation
//
export function canMoveCardToFoundation(card, foundationStack) {
  if (foundationStack.length === 0) {
    // Only an Ace (A) can be moved to an empty foundation stack
    return card.rank === "A";
  }

  const topCard = foundationStack[foundationStack.length - 1];

  // Rules: Ascending order, same suit
  return isOneRankHigher(card, topCard) && card.suit === topCard.suit;
}

// Helper function

const isOneRankHigher = (card, topCard) => {
  const rankOrder = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const cardRankIndex = rankOrder.indexOf(card.rank);
  const topCardRankIndex = rankOrder.indexOf(topCard.rank);

  return cardRankIndex === topCardRankIndex + 1;
};
