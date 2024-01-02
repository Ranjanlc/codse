import { useEffect, useRef, useState } from "react";
import { Card } from "../../store/app-context";
import styles from "./Card.module.css";
import { HiDotsVertical } from "react-icons/hi";
import ConfirmDialog, { Dialog } from "../../UI/ConfirmDialog/ConfirmDialog";
import CardForm from "../CardForm/CardForm";
import { useNavigate } from "react-router-dom";
export default function FlashCard({
  content,
  disabled = false,
}: {
  content: Card;
  disabled?: boolean;
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dialog, setDialog] = useState({
    isOpen: false,
    id: 0,
  });
  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (cardRef.current && !cardRef.current?.contains(event.target as Node)) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cardRef]);
  return (
    <>
      <article
        className={styles.card}
        ref={cardRef}
        onClick={() => {
          navigate(`/detail/${content.id}`);
        }}
      >
        <p> {content.question}</p>

        {!disabled && (
          <HiDotsVertical
            onClick={(e: Event) => {
              e.stopPropagation();
              setDropDownOpen((open) => !open);
            }}
          />
        )}
        <div
          className={`${styles.dropdown} ${dropDownOpen ? styles.active : ""}`}
        >
          <button
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className={styles.delete}
            onClick={() => {
              setDialog({ isOpen: true, id: content.id });
            }}
          >
            Delete
          </button>
        </div>
      </article>
      {dialog.isOpen && (
        <ConfirmDialog
          dialog={dialog}
          clickHandler={(dialog: Dialog) => {
            setDialog(dialog);
          }}
        />
      )}
      {editModalOpen && (
        <CardForm
          onClose={() => {
            setEditModalOpen(false);
          }}
          edit={content.id}
        />
      )}
    </>
  );
}
