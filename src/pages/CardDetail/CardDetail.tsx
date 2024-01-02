import { useParams } from "react-router-dom";
import { useAppContext } from "../../store/context-fn";
import styles from "./CardDetail.module.css";
import { colorPicker } from "../../utils/helper";
export default function CardDetail() {
  const { id } = useParams();
  const { cards } = useAppContext();
  const finalId = +(id || 0);
  const curCard = cards.find((el) => el.id === finalId);
  console.log(curCard);
  return (
    <>
      {curCard && (
        <main className={styles.container}>
          <section className={styles.question}>
            <h1>Question:</h1>
            <p>{curCard?.question}</p>
          </section>
          <section className={styles.answer}>
            <h1>Answer:</h1>
            <p>{curCard?.answer}</p>
          </section>
          <section className={styles.difficulty}>
            <h3>Difficulty:</h3>
            <span
              style={{
                backgroundColor: colorPicker(curCard.difficulty)?.color,
              }}
            >
              {colorPicker(curCard.difficulty)?.level}
            </span>
          </section>
        </main>
      )}
    </>
  );
}
