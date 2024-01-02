import { useAppContext } from "../../store/context-fn";
import styles from "../CardList/CardList.module.css";
import FlashCard from "../../components/Card/Card";
import { shuffleArray } from "../../utils/helper";
import { useEffect, useState } from "react";
import { Card } from "../../store/app-context";
import { IoReload } from "react-icons/io5";

export default function CardList() {
  const { cards } = useAppContext();
  console.log(cards);
  const [finalCards, setFinalCards] = useState<Card[]>([]);
  useEffect(() => {
    setFinalCards(shuffleArray(cards));
  }, [cards]);

  const shuffleAgain = () => {
    const shuffled = shuffleArray(cards);
    setFinalCards(shuffled);
  };

  return (
    <main className={styles.container}>
      <button className={styles.button} onClick={shuffleAgain}>
        <IoReload />
        Shuffle Again
      </button>
      {finalCards.length !== 0 && (
        <section className={styles["card-container"]}>
          {finalCards.map((el, i) => (
            <FlashCard key={i} disabled={true} content={el} />
          ))}
        </section>
      )}
      {cards.length === 0 && (
        <header className={styles.notFound}>
          Nothing to show 😢. Add flashcards please...
        </header>
      )}
    </main>
  );
}
