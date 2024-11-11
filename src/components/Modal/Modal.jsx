import Modal from "react-modal";
import styles from "./Modal.module.css";
import sprite from "../../../public/sprite.svg";

const customStyles = {
  content: {
    inset: "auto",
    padding: "10px",
    minHeight: "120px",
    borderRadius: "10px",
    borderColor: "transparent",
    background: "#bedbb0",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
};

Modal.setAppElement("#root");

export default function ModalWindow({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="ModalWindow"
    >
      <span onClick={onClose} className={styles.closeButton}>
        <svg className={styles.icon}>
          <use href={`${sprite}#close_icon`} />
        </svg>
      </span>
      <div className={styles.contentWrapper}>{children}</div>
      <div onClick={onClose} className={styles.okButton}>
        OK
      </div>
    </Modal>
  );
}
