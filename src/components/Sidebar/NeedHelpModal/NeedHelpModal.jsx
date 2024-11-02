import { useState } from "react";
import PropTypes from "prop-types";
import css from "./NeedHelpModal.module.css";

const NeedHelpModal = ({ onClose, onSend }) => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (!email.trim()) {
      alert("Please enter an email address");
      return;
    }
    // Простая проверка на валидный email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }
    onSend({ email, comment });
    onClose();
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2>Need help</h2>
        
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css.input}
        />
        
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={css.textarea}
        ></textarea>

        <button onClick={handleSend} className={css.sendButton} aria-label="Send help request">
          Send
        </button>
      </div>
    </div>
  );
};

NeedHelpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default NeedHelpModal;
