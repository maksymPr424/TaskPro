import { useState } from "react";
import PropTypes from "prop-types";
import css from "./EditBoardModal.module.css";

const icons = ["icon1", "icon2", "icon3", "icon4", "icon5"];
const backgrounds = ["bg1", "bg2", "bg3", "bg4", "bg5"]; 

const EditBoardModal = ({ boardData, onClose, onSaveChanges }) => {
  const [title, setTitle] = useState(boardData.title || "");
  const [selectedIcon, setSelectedIcon] = useState(boardData.icon || icons[0]);
  const [selectedBackground, setSelectedBackground] = useState(boardData.background || backgrounds[0]);

  const handleSaveChanges = () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    
    // Передаем ID доски вместе с остальными изменениями
    onSaveChanges({ 
      id: boardData.id, 
      title, 
      icon: selectedIcon, 
      background: selectedBackground 
    });
    onClose();
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>×</button>
        <h2>Edit Board</h2>
        
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

        <button onClick={handleSaveChanges} className={css.saveButton}>
          <svg className={css.saveIcon}>
            <use href="/src/assets/edit.svg#edit"></use>
          </svg>
          Save
        </button>
      </div>
    </div>
  );
};

EditBoardModal.propTypes = {
  boardData: PropTypes.shape({
    id: PropTypes.string, // Добавляем тип для ID доски
    title: PropTypes.string,
    icon: PropTypes.string,
    background: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
};

export default EditBoardModal;
