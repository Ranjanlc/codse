import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        React FlashCards
      </h1>
      <nav className={styles.actions}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/list"
        >
          Flashcards
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/study"
        >
          Study mode
        </NavLink>
      </nav>
    </header>
  );
}
