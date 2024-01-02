import { FormEvent, useEffect, useRef, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import styles from "./CardForm.module.css";
import { useAppContext } from "../../store/context-fn";
export default function CardForm({
  onClose,
  edit,
}: {
  onClose: () => void;
  edit: number | null;
}) {
  const { cardAddHandler, cards, cardUpdateHandler } = useAppContext();

  const [activeTag, setActiveTag] = useState(0);
  const questionRef = useRef<HTMLInputElement | null>(null);
  const answerRef = useRef<HTMLInputElement | null>(null);
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      id: edit ? edit : +(Math.random() * 10).toFixed(5),
      question: questionRef.current?.value ?? "",
      answer: answerRef.current?.value ?? "",
      difficulty: activeTag,
    };
    !edit && cardAddHandler(data);
    edit && cardUpdateHandler(data);
    onClose();
  };
  const curCard = edit && cards.find((el) => el.id === edit);

  useEffect(() => {
    if (curCard && questionRef.current && answerRef.current) {
      questionRef.current.value = curCard.question;
      answerRef.current.value = curCard.question;
      setActiveTag(curCard.difficulty);
    }
  }, [curCard]);

  return (
    <Modal onClose={onClose}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <section className={styles.inputs}>
          <label htmlFor="question">Question:</label>
          <input
            name="question"
            placeholder="Enter a question (Max character.80)"
            maxLength={80}
            ref={questionRef}
          />
        </section>
        <section className={styles.inputs}>
          <label htmlFor="answer">Answer:</label>
          <input
            name="answer"
            ref={answerRef}
            placeholder="Enter your answer"
          />
        </section>
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
        <section className={styles.buttons}>
          <button className={styles.add} type="submit">
            {edit ? "Edit" : "Add"}
          </button>
          <button
            type="reset"
            className={styles.add}
            style={{ backgroundColor: "#d62222", color: "#fff" }}
            onClick={() => {
              onClose();
            }}
          >
            Close
          </button>
        </section>
      </form>
    </Modal>
  );
}
