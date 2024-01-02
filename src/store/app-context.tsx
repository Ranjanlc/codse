import { FC, createContext, ReactNode, useReducer, useEffect } from "react";
import { storeLocal } from "../utils/helper";

export interface Card {
  id: number;
  question: string;
  answer: string;
  difficulty: number;
}

interface AppHandler {
  cards: Card[] | [];
  cardRemoveHandler: (_id: number) => void;
  cardAddHandler: (cardItem: Card) => void;
  cardUpdateHandler: (cardItem: Card) => void;
}

const AppContext = createContext<AppHandler | null>(null);

type Action =
  | { type: "INCREMENT"; payload: Card }
  | { type: "UPDATE"; payload: Card }
  | { type: "STORED"; payload: Card[] }
  | { type: "REMOVE"; payload: number };

const cardReducer = (state: Card[], action: Action) => {
  const { type } = action;
  if (type === "INCREMENT") {
    const newCards = [...state, action.payload];
    storeLocal(newCards);
    return newCards;
  } else if (type === "UPDATE") {
    const { id } = action.payload;
    const updatingIndex = state.findIndex((el) => el.id === id);
    const duplicate = state.slice();
    duplicate[updatingIndex] = action.payload;
    console.log(duplicate, updatingIndex);
    storeLocal(duplicate);
    return duplicate;
  } else if (type === "STORED") {
    return action.payload;
  } else if (type === "REMOVE") {
    const id = action.payload;
    const deletingItem = state.find((el) => el.id === id) as Card;
    const items = state.slice().filter(({ id }) => id !== deletingItem.id);
    storeLocal(items);
    return items;
  } else {
    return state;
  }
};

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initCardState: Card[] = [];
  const [cards, dispatchCard] = useReducer(cardReducer, initCardState);

  const cardAddHandler = (details: Card) => {
    dispatchCard({ type: "INCREMENT", payload: details });
  };
  const cardUpdateHandler = (details: Card) => {
    console.log(details);
    dispatchCard({ type: "UPDATE", payload: details });
  };
  const cardRemoveHandler = (id: number) => {
    dispatchCard({ type: "REMOVE", payload: id });
  };
  useEffect(() => {
    const storedCard = localStorage.getItem("cards")
      ? (JSON.parse(localStorage.getItem("cards") || "") as Card[])
      : [];

    dispatchCard({ type: "STORED", payload: storedCard });
  }, []);

  return (
    <AppContext.Provider
      value={{
        cards,
        cardAddHandler,
        cardRemoveHandler,
        cardUpdateHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
