
import { useState } from "react";
import PropTypes from "prop-types";
import css from "./NewBoardModal.module.css";

const icons = ["icon1", "icon2", "icon3", "icon4", "icon5"];
const backgrounds = ["bg1", "bg2", "bg3", "bg4", "bg5"];

const NewBoardModal = ({ onClose, onCreateBoard }) => {
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0]); // Изменено на backgrounds[0]

  const handleCreateBoard = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const newBoard = {
      title,
      icon: selectedIcon, // Обновлено здесь для правильного использования
      background: selectedBackground, // Обновлено здесь для правильного использования
    };

    onCreateBoard(newBoard);
    onClose();
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>×</button>
        <h2>New board</h2>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={css.input}
        />
        
        <div className={css.iconsSection}>
          <p>Icons</p>
          <div className={css.iconOptions}>
            {icons.map((icon, index) => (
              <label key={index} className={css.iconLabel}>
                <input
                  type="radio"
                  name="icon"
                  value={icon}
                  checked={selectedIcon === icon}
                  onChange={() => setSelectedIcon(icon)}
                  className={css.hiddenInput}
                />
                <svg className={`${css.iconOption} ${selectedIcon === icon ? css.selected : ""}`}>
                  <use href={`/src/assets/${icon}.svg#${icon}`}></use>
                </svg>
              </label>
            ))}
          </div>
        </div>

        <div className={css.backgroundSection}>
          <p>Background</p>
          <div className={css.backgroundOptions}>
            {backgrounds.map((bg, index) => (
              <label key={index} className={css.backgroundLabel}>
                <input
                  type="radio"
                  name="background"
                  value={bg}
                  checked={selectedBackground === bg}
                  onChange={() => setSelectedBackground(bg)}
                  className={css.hiddenInput}
                />
                <div
                  className={`${css.backgroundOption} ${selectedBackground === bg ? css.selected : ""}`}
                  style={{ backgroundImage: `url(/src/assets/${bg}.jpg)` }}
                ></div>
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleCreateBoard} className={css.createButton}>
          <svg className={css.createIcon}>
            <use href="/src/assets/plus.svg#plus"></use>
          </svg>
          Create
        </button>
      </div>
    </div>
  );
};

NewBoardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardModal;
