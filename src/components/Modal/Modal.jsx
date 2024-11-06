import Modal from "react-modal";
import styles from "./Modal.module.css";
import sprite from "../../../public/sprite.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    padding: "10px",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    minHeight: "120px",
    borderRadius: "10px",
    borderColor: "transparent",
    background: "#bedbb0",
  },
  overlay: {
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
      contentLabel='ModalWindow'>
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
