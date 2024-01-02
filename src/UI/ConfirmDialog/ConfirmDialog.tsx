import { FC } from "react";
import styles from "./ConfirmDialog.module.css";
import { useAppContext } from "../../store/context-fn";

export interface Dialog {
  isOpen: boolean;
  id: number;
}

const ConfirmDialog: FC<{
  dialog: Dialog;
  clickHandler: (dialog: Dialog) => void;
}> = ({ dialog, clickHandler }) => {
  const { cardRemoveHandler } = useAppContext();
  console.log(dialog.id);
  const handleDelete = async () => {
    cardRemoveHandler(dialog.id);
    clickHandler({ id: dialog.id, isOpen: false });
  };

  return (
    <div className={styles.dialog}>
      <div className={styles.container}>
        <h1>Do you want to delete this card?</h1>
        <div>
          <button onClick={handleDelete}>Confirm</button>
          <button
            className={styles.close}
            onClick={() => {
              clickHandler({ id: dialog.id, isOpen: false });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
