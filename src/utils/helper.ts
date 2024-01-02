import { Card } from "../store/app-context";

export const storeLocal = (cards: Card[]) => {
  localStorage.setItem("cards", JSON.stringify(cards));
};

export const shuffleArray = (array: Card[]) => {
  // To not experience a  issue related to the mutability of arrays in JavaScript. If your shuffling function modifies the input array in place, calling it with the same array each time will not result in a shuffled array, as the original array is being modified and subsequent calls will operate on the already shuffled array.
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const colorPicker = (value: number) => {
  const mapObj = new Map([
    [1, { color: "green", level: "Easy" }],
    [2, { color: "yellow", level: "Medium" }],
    [3, { color: "red", level: "Hard" }],
  ]);
  return mapObj.get(value);
};
