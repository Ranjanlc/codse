import { FC, ReactNode } from "react";

import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div className={styles.backdrop} onClick={onClick} />;
};

const ModalOverlay: FC<{ children: ReactNode }> = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal: FC<{ children: ReactNode; onClose: () => void }> = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop
          onClick={() => {
            props.onClose();
          }}
        />,
        document.getElementById("backdrop") as HTMLElement
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal") as HTMLElement
      )}
    </>
  );
};

export default Modal;
