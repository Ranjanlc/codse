import { useEffect, useState } from "react";
import { useAppContext } from "../../store/context-fn";
import styles from "./CardList.module.css";
import { IoMdAdd } from "react-icons/io";
import CardForm from "../../components/CardForm/CardForm";
import FlashCard from "../../components/Card/Card";
import { Card } from "../../store/app-context";
import Loader from "../../UI/Loader/Loader";

// const FLASHCARDS = [
//   {
//     id: 1,
//     question: "What is the capital of France?",
//     answer: "Paris",
//   },
//   {
//     id: 2,
//     question: "Who wrote 'Romeo and Juliet'?",
//     answer: "William Shakespeare",
//   },
//   {
//     id: 3,
//     question: "What is the largest planet in our solar system?",
//     answer: "Jupiter",
//   },
//   {
//     id: 4,
//     question: "Who is the first President of the United States?",
//     answer: "George Washington",
//   },
//   {
//     id: 5,
//     question: "What is the square root of 25?",
//     answer: "5",
//   },
//   {
//     id: 6,
//     question:
//       "Which programming language is known for building dynamic websites?",
//     answer: "JavaScript",
//   },
//   {
//     id: 7,
//     question: "What is the chemical symbol for gold?",
//     answer: "Au",
//   },
//   {
//     id: 8,
//     question: "In which year did the Titanic sink?",
//     answer: "1912",
//   },
//   {
//     id: 9,
//     question: "What is the powerhouse of the cell?",
//     answer: "Mitochondria",
//   },
//   {
//     id: 10,
//     question: "Who painted the Mona Lisa?",
//     answer: "Leonardo da Vinci",
//   },
// ];

export default function CardList() {
  const { cards } = useAppContext();
  console.log(cards);
  const [open, setOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(0);
  const [finalCards, setFinalCards] = useState<Card[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timeoutId = setTimeout(() => {
      if (activeTag === 0) {
        setFinalCards(cards);
      } else {
        setFinalCards(cards.filter((el) => el.difficulty === activeTag));
      }
      setIsTransitioning(false);
    }, 300); // Adjust the duration (in milliseconds) as needed

    return () => clearTimeout(timeoutId);
  }, [activeTag, cards]);
  return (
    <main className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        <IoMdAdd />
        New Flashcards
      </button>

      <section className={styles["tag-container"]}>
        <p>Difficulty:</p>
        <article className={styles.tags}>
          {[
            { title: "Easy", value: 1, color: "green" },
            { title: "Medium", value: 2, color: "yellow" },
            { title: "Hard", value: 3, color: "red" },
          ].map(({ value, color, title }, i) => (
            <span
              key={i}
              style={{
                backgroundColor: activeTag === value ? color : "#bab6b6",
              }}
              onClick={() => {
                setActiveTag(value);
              }}
            >
              {title}
            </span>
          ))}
        </article>
      </section>
      {finalCards.length !== 0 && (
        <section
          className={`${styles["card-container"]} ${
            isTransitioning ? styles.transitioning : ""
          }`}
        >
          {finalCards.map((el, i) => (
            <FlashCard key={i} content={el} />
          ))}
        </section>
      )}
      {isTransitioning && (
        <div className={styles.centered}>
          <Loader />
        </div>
      )}
      {finalCards.length === 0 && !isTransitioning && (
        <header className={styles.notFound}>
          Nothing to show 😢. Add flashcards please...
        </header>
      )}
      {open && (
        <CardForm
          onClose={() => {
            setOpen(false);
          }}
          edit={null}
        />
      )}
    </main>
  );
}
