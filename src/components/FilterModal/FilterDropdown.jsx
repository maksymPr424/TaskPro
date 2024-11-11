import icons from "../../assets/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import s from "./FilterDropdown.module.css";
import {
  resetFilter,
  setColorFilter,
} from "../../redux/boards/sliceHeaderDashboard/filtersSlice";

export default function FilterDropdown({ onClose }) {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => state.filters.selectedColor);
  const handleColorChange = (color) => {
    dispatch(setColorFilter(color));
    // onClose();
  };

  const handleReset = () => {
    dispatch(resetFilter());
    // onClose();
  };

  return (
    <div className={s.dropdown}>
      <button className={s.closeButton} onClick={onClose}>
        <svg className={s.closeIcon}>
          <use href={`${icons}#x`}></use>
        </svg>
      </button>
      <h3 className={s.titleFilter}>Filters</h3>
      <div className={s.subtitle}>
        <h4 className={s.label}>Label color</h4>
        <button onClick={handleReset} className={s.show}>
          Show all
        </button>
      </div>

      <div className={s.buttonsContainer}>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="Without"
            onChange={() => handleColorChange("Without")}
            checked={selectedColor === "Without"}
          />
          <span
            className={s.radioBtn}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.30)",
            }}
          ></span>
          <span className={s.radioLabel}> Without priority</span>
        </label>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="Low"
            onChange={() => handleColorChange("Low")}
            checked={selectedColor === "Low"}
          />
          <span
            className={s.radioBtn}
            style={{ backgroundColor: "#8FA1D0" }}
          ></span>
          <span className={s.radioLabel}>Low</span>
        </label>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="Medium"
            onChange={() => handleColorChange("Medium")}
            checked={selectedColor === "Medium"}
          />
          <span
            className={s.radioBtn}
            style={{ backgroundColor: "#E09CB5" }}
          ></span>
          <span className={s.radioLabel}>Medium</span>
        </label>
        <label className={s.radioText}>
          <input
            type="radio"
            name="color"
            value="High"
            onChange={() => handleColorChange("High")}
            checked={selectedColor === "High"}
          />
          <span
            className={s.radioBtn}
            style={{ backgroundColor: "#BEDBB0" }}
          ></span>
          <span className={s.radioLabel}>High</span>
        </label>
      </div>
    </div>
  );
}
